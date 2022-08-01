import Whisky from "../img/whisky-glass.png";
import OtherDrinks from "../img/other-drinks.png";
import Accessories from "../img/accessories.png";
import Cigars from "../img/cigars.png";

export const productsData = [
  {
    id: 1,
    name: "Whisky",
    desc: "Whisky",
    price: "from 12",
    imageSrc: Whisky,
  },
  {
    id: 2,
    name: "Others",
    desc: "Other alcohols",
    price: "from 38",
    imageSrc: OtherDrinks,
  },
  {
    id: 3,
    name: "Cigars",
    desc: "Cigars",
    price: "from 6.30",
    imageSrc: Cigars,
  },
  {
    id: 4,
    name: "Accessories",
    desc: "Accessories",
    price: "from 6.99",
    imageSrc: Accessories,
  },
];


export const categories = [
  {
    id: 1,
    name: "Whisky",
    urlParamName: "whisky"
  },
  {
    id: 2,
    name: "Others",
    urlParamName: "others"
  },
  {
    id: 3,
    name: "Cigars",
    urlParamName: "cigars",
  },
  {
    id: 4,
    name: "Accessories",
    urlParamName: "accessories"
  }
]