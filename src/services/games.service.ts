import { firestore, db } from '../firebase/firebase';
import { collection, addDoc, getDoc, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { GAMES_COLLECTION } from '../utils/constants';
import { NormalGame } from '../types/game';

const GamesService = {
  get: async () => {
    const querySnapshot = await getDocs(collection(firestore, GAMES_COLLECTION));

    const gamesData: NormalGame[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as NormalGame;
      gamesData.push({
        ...data,
        id: doc.id
      });
    });

    return gamesData;
  },
  getById: async (id: string) => {
    const querySnapshot = await getDoc(doc(firestore, GAMES_COLLECTION, id));

    return querySnapshot.data();
  },
  insert: async (game: NormalGame) => {
    const docRef = await addDoc(collection(firestore, GAMES_COLLECTION), game);
    return docRef;
  },
  update: async (id: string, game: NormalGame | any) => {
    const gameRef = doc(firestore, GAMES_COLLECTION, id);
    await updateDoc(gameRef, game);
  },
  remove: async (id: string) => {
    await deleteDoc(doc(firestore, GAMES_COLLECTION, id));
  }
};

export default GamesService;
