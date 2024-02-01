import Menu from '@/components/menu/Menu';
import { Item } from '@/model/Item';
import { connectToDB, getCollection } from '@/util/db';

type Props = {
  items: Item[];
  searchTerm: string;
};

export default function Homepage(props: Props) {
  return <Menu items={props.items} searchTerm={props.searchTerm} />;
}

export async function getStaticProps() {
  //connecting to database
  const client = await connectToDB();
  const result = await getCollection(client, 'items').find().toArray();
  client.close();

  const itemsArr = result.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    price: item.price,
    description: item.description,
    image: item.image,
    veg: item.veg,
    avgRating: item.avgRating,
  }));

  return { props: { items: itemsArr } };
}
