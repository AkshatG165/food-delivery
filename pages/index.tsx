import Menu from '@/components/menu/Menu';
import { Item } from '@/model/Item';
import { MongoClient } from 'mongodb';

type Props = {
  items: Item[];
  searchTerm: string;
};

export default function Homepage(props: Props) {
  return <Menu items={props.items} searchTerm={props.searchTerm} />;
}

export async function getStaticProps() {
  //connecting to database
  const client = await MongoClient.connect(
    'mongodb+srv://akshat:akshat123@fooddelivery.xcarl62.mongodb.net/food-delivery?retryWrites=true&w=majority'
  );
  const db = client.db();
  const items = db.collection('items');
  const result = await items.find().toArray();
  client.close();

  const itemsArr = result.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    price: item.price,
    description: item.description,
    image: item.image,
    veg: item.veg,
    rating: item.rating,
  }));

  return { props: { items: itemsArr } };
}
