import { nanoid } from 'nanoid';
import image1 from './images/icon-1.svg';
import image2 from './images/icon-2.svg';
import image3 from './images/icon-3.svg';
import image4 from './images/icon-4.svg';
const data = {
  cards: [
    {
      id: nanoid(),
      name: 'card1',
      image: image1
    },
    {
      id: nanoid(),
      name: 'card2',
      image: image2
    },
    {
      id: nanoid(),
      name: 'card3',
      image: image3
    },
    {
      id: nanoid(),
      name: 'card4',
      image: image4
    }
  ]
};

export default data;
