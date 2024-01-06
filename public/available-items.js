const AvailableItems = [
  {
    id: 'm1',
    name: 'Mac & Cheese',
    price: 8.99,
    description:
      'Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.',
    image: 'https://live.staticflickr.com/65535/53446105048_276a3519e1_m.jpg',
    veg: true,
    rating: 4.5,
  },
  {
    id: 'm2',
    name: 'Margherita Pizza',
    price: 12.99,
    description:
      'A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.',
    image: 'https://live.staticflickr.com/65535/53445045247_01df96ecff_m.jpg',
    veg: true,
    rating: 4.65,
  },
  {
    id: 'm3',
    name: 'Caesar Salad',
    price: 7.99,
    description:
      'Romaine lettuce tossed in Caesar dressing, topped with croutons and parmesan shavings.',
    image: 'https://live.staticflickr.com/65535/53446382460_9b1345c468_m.jpg',
    veg: true,
    rating: 2.95,
  },
  {
    id: 'm4',
    name: 'Spaghetti Carbonara',
    price: 10.99,
    description:
      'Al dente spaghetti with a creamy sauce made from egg yolk, pecorino cheese, pancetta, and pepper.',
    image: 'https://live.staticflickr.com/65535/53446289594_cd08586edf_m.jpg',
    veg: false,
    rating: 4.1,
  },
  {
    id: 'm5',
    name: 'Veggie Burger',
    price: 9.99,
    description:
      'A juicy veggie patty served on a whole grain bun with lettuce, tomato, and a tangy sauce.',
    image: 'https://live.staticflickr.com/65535/53445969161_8353b8a462_m.jpg',
    veg: true,
    rating: 3.9,
  },
  {
    id: 'm6',
    name: 'Grilled Chicken Sandwich',
    price: 10.99,
    description:
      'Tender grilled chicken breast with avocado, bacon, lettuce, and honey mustard on a toasted bun.',
    image: 'https://live.staticflickr.com/65535/53446105108_b58b9b4950_m.jpg',
    veg: false,
    rating: 4.27,
  },
  {
    id: 'm7',
    name: 'Steak Frites',
    price: 17.99,
    description:
      'Succulent steak cooked to your preference, served with crispy golden fries and herb butter.',
    image: 'https://live.staticflickr.com/65535/53445969166_05a130f46e_m.jpg',
    veg: false,
    rating: 3.6,
  },
  {
    id: 'm8',
    name: 'Sushi Roll Platter',
    price: 15.99,
    description:
      'An assortment of fresh sushi rolls including California, Spicy Tuna, and Eel Avocado.',
    image: 'https://live.staticflickr.com/65535/53446104983_14030bcc53_m.jpg',
    veg: false,
    rating: 2.1,
  },
  {
    id: 'm9',
    name: 'Chicken Curry',
    price: 13.99,
    description:
      'Tender pieces of chicken simmered in a rich and aromatic curry sauce, served with basmati rice.',
    image: 'https://live.staticflickr.com/65535/53446105128_3e1a9a45c7_m.jpg',
    veg: false,
    rating: 3.77,
  },
  {
    id: 'm10',
    name: 'Vegan Buddha Bowl',
    price: 11.99,
    description:
      'A hearty bowl filled with quinoa, roasted veggies, avocado, and a tahini dressing.',
    image: 'https://live.staticflickr.com/65535/53445045207_f2048231ba_m.jpg',
    veg: true,
    rating: 1.7,
  },
  {
    id: 'm11',
    name: 'Seafood Paella',
    price: 19.99,
    description:
      'A Spanish delicacy filled with saffron-infused rice, shrimp, mussels, and chorizo.',
    image: 'https://live.staticflickr.com/65535/53446382355_80887d3ca5_m.jpg',
    veg: false,
    rating: 1.9,
  },
  {
    id: 'm12',
    name: 'Pancake Stack',
    price: 8.99,
    description:
      'Fluffy pancakes stacked high, drizzled with maple syrup and topped with fresh berries.',
    image: 'https://live.staticflickr.com/65535/53445045222_cb6d6cbf73_m.jpg',
    veg: true,
    rating: 4.82,
  },
  {
    id: 'm13',
    name: 'Miso Ramen',
    price: 12.99,
    description:
      'A warming bowl of ramen with miso broth, tender pork, soft-boiled egg, and green onions.',
    image: 'https://live.staticflickr.com/65535/53446382380_851943a2aa_m.jpg',
    veg: false,
    rating: 2.46,
  },
  {
    id: 'm14',
    name: 'Beef Tacos',
    price: 9.99,
    description:
      'Three soft tortillas filled with seasoned beef, fresh salsa, cheese, and sour cream.',
    image: 'https://live.staticflickr.com/65535/53446289689_9ab05d4b77_m.jpg',
    veg: false,
    rating: 2.8,
  },
  {
    id: 'm15',
    name: 'Chocolate Brownie',
    price: 5.99,
    description:
      'A rich and fudgy brownie, topped with a scoop of vanilla ice cream and chocolate sauce.',
    image: 'https://live.staticflickr.com/65535/53446105123_9ddc03719b_m.jpg',
    veg: true,
    rating: 4.9,
  },
  {
    id: 'm16',
    name: 'Lobster Bisque',
    price: 14.99,
    description:
      'A creamy soup made from lobster stock, aromatic vegetables, and a touch of brandy.',
    image: 'https://live.staticflickr.com/65535/53446105058_d0dbb931bb_m.jpg',
    veg: false,
    rating: 3.3,
  },
  {
    id: 'm17',
    name: 'Mushroom Risotto',
    price: 13.99,
    description:
      'Creamy Arborio rice cooked with a medley of wild mushrooms and finished with parmesan.',
    image: 'https://live.staticflickr.com/65535/53446105043_cef0ca5d84_m.jpg',
    veg: true,
    rating: 2.5,
  },
  {
    id: 'm18',
    name: 'Eggplant Parmesan',
    price: 11.99,
    description:
      'Layers of breaded eggplant, marinara sauce, and melted mozzarella and parmesan cheeses.',
    image: 'https://live.staticflickr.com/65535/53445969256_c7bd21e307_m.jpg',
    veg: false,
    rating: 1.2,
  },
  {
    id: 'm19',
    name: 'Lemon Cheesecake',
    price: 6.99,
    description:
      'A creamy cheesecake with a tangy lemon flavor, served on a crumbly biscuit base.',
    image: 'https://live.staticflickr.com/65535/53446105088_9403dcefe0_m.jpg',
    veg: true,
    rating: 3.87,
  },
  {
    id: 'm20',
    name: 'Falafel Wrap',
    price: 8.99,
    description:
      'Crispy falafels wrapped in a warm pita with lettuce, tomatoes, and a tahini sauce.',
    image: 'https://live.staticflickr.com/65535/53446289654_92a646d10e_m.jpg',
    veg: true,
    rating: 4.69,
  },
];

export default AvailableItems;
