import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import getSession from '../get-session';

type Rating = {
  orderId: string;
  userEmail: string;
  rating: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const data: { orderId: string; itemName: string; rating: number }[] =
      req.body;
    const session = await getSession(req, res);

    if (!data) return res.status(422).json({ message: 'Invalid data' });

    try {
      const client = await connectToDB();
      const itemsCollection = getCollection(client, 'items');

      // Createing an array to store promises for each database operation
      const promises = data.map(async (item) => {
        const currItem = {
          ...(await itemsCollection.findOne({ name: item.itemName })),
        };
        delete currItem._id;

        const rating = {
          orderId: item.orderId,
          userEmail: session?.user?.email,
          rating: item.rating,
        };

        //this is the old rating, which is getting replaced by new rating
        let prevRating = 0;

        // replacing old rating with new
        currItem.ratings.forEach((element: Rating) => {
          if (element.orderId === item.orderId) {
            prevRating = element.rating;
            element.rating = item.rating;
          }
        });

        //calculating new average rating
        currItem.avgRating =
          (currItem.avgRating * currItem.ratings.length -
            prevRating +
            item.rating) /
          currItem.ratings.length;

        // Replace the document in the collection & return that promise
        return itemsCollection.replaceOne({ name: currItem.name }, currItem);
      });

      // Wait for all database operations to complete
      await Promise.all(promises);
      client.close();

      return res.status(201).json({ message: 'Ratings updated' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Some error occoured, unable to update ratings' });
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
