export default class Item {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  veg: boolean;
  rating: number;

  constructor(
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    veg: boolean,
    rating: number
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.veg = veg;
    this.rating = rating;
  }
}
