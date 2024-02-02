type Rating = {
  orderId: string;
  userEmail: string;
  rating: number;
};

export class Item {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  veg: boolean;
  avgRating?: number;
  ratings?: Rating[];

  constructor(
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    veg: boolean,
    avgRating?: number,
    ratings?: Rating[]
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.veg = veg;
    this.avgRating = avgRating;
    this.ratings = ratings;
  }
}
