import { firestore, db } from '../utils/firebase/firebase';
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { QUESTIONS_COLLECTION } from '../utils/contants';
import { DBQuestion } from '../shared/types/questions';

const QuestionsService = {
  get: async () => {
    const querySnapshot = await getDocs(
      collection(firestore, QUESTIONS_COLLECTION)
    );

    const gamesData: DBQuestion[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as DBQuestion;
      gamesData.push({
        ...data,
        id: doc.id,
      });
    });

    return gamesData;
  },
  getById: async (id: string) => {
    const querySnapshot = await getDoc(
      doc(firestore, QUESTIONS_COLLECTION, id)
    );

    return querySnapshot.data();
  },
  insert: async (question: DBQuestion) => {
    const docRef = await addDoc(
      collection(firestore, QUESTIONS_COLLECTION),
      question
    );
    return docRef.id;
  },
  update: async (id: string, question: DBQuestion | any) => {
    const gameRef = doc(firestore, QUESTIONS_COLLECTION, id);
    await updateDoc(gameRef, question);
  },
  remove: async (id: string) => {
    await deleteDoc(doc(firestore, QUESTIONS_COLLECTION, id));
  },
  removeCollection: async () => {
    const querySnapshot = await getDocs(collection(firestore, QUESTIONS_COLLECTION));
  
    const deletePromises = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });
  
    await Promise.all(deletePromises);
  }
};

export default QuestionsService;
