import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { FlashRound } from '../shared/types/flashRound';
import { FLASH_ROUND_COLLECTION } from '../utils/contants';
import { firestore } from '../utils/firebase/firebase';

const FlashRoundService = {
  get: async () => {
    const querySnapshot = await getDocs(
      collection(firestore, FLASH_ROUND_COLLECTION)
    );

    const flashData: FlashRound[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as FlashRound;
      flashData.push({
        ...data,
        id: doc.id,
      });
    });

    return flashData;
  },
  getById: async (id: string) => {
    const documentSnapshot = await getDoc(
      doc(firestore, FLASH_ROUND_COLLECTION, id)
    );

    return documentSnapshot.data();
  },
  insert: async (document: FlashRound) => {
    const docRef = await addDoc(
      collection(firestore, FLASH_ROUND_COLLECTION),
      document
    );
    return docRef;
  },
  update: async (id: string, document: FlashRound | any) => {
    const docRef = doc(firestore, FLASH_ROUND_COLLECTION, id);
    await updateDoc(docRef, document);
  },
  delete: async (id: string) => {
    await deleteDoc(doc(firestore, FLASH_ROUND_COLLECTION, id));
  },
};

export default FlashRoundService;
