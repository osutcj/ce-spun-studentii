import { firestore } from '../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { FLASH_ROUND_COLLECTION } from '../utils/contants';

const arrayOfObjects = [
  {
    answer: 'Answer 1',
    points: 10,
    showPoints: false
  },
  {
    answer: 'Answer 2',
    points: 5,
    showPoints: false
  }
];

const collectionRef = collection(firestore, FLASH_ROUND_COLLECTION);

addDoc(collectionRef, { answers: arrayOfObjects })
  .then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding document: ', error);
  });
