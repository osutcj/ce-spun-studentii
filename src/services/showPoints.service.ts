import { firestore } from '../utils/firebase/firebase';
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
const SHOW_POINTS_COLLECTION = 'showPoints';

interface ShowPoints {
  id: string;
  showPoints: boolean[];
}

const ShowPointsService = {
  get: async () => {
    const querySnapshot = await getDocs(
      collection(firestore, SHOW_POINTS_COLLECTION)
    );

    const showPointsData: ShowPoints[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as ShowPoints;
      showPointsData.push({
        ...data,
        id: doc.id,
      });
    });

    return showPointsData;
  },
  getById: async (id: string) => {
    const querySnapshot = await getDoc(doc(firestore, SHOW_POINTS_COLLECTION, id));

    return querySnapshot.data() as ShowPoints;
  },
  insert: async (showPoints: boolean[]) => {
    const docRef = await addDoc(collection(firestore, SHOW_POINTS_COLLECTION), {
      showPoints,
    });
    return docRef.id;
  },
  update: async (id: string, showPoints: boolean[]) => {
    const showPointsRef = doc(firestore, SHOW_POINTS_COLLECTION, id);
    await updateDoc(showPointsRef, { showPoints });
  },
  remove: async (id: string) => {
    await deleteDoc(doc(firestore, SHOW_POINTS_COLLECTION, id));
  },
};

export default ShowPointsService;