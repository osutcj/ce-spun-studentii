import {firestore, db} from '../utils/firebase/firebase';
import {
    collection,
    addDoc,
    getDoc,
    doc,
    getDocs,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import {QUESTIONS_COLLECTION} from '../utils/contants';
import {DBQuestion} from '../shared/models/questions';

const QuestionsService = {
    get: async () => {
        const querySnapshot = await getDocs(collection(firestore, QUESTIONS_COLLECTION));

        const gamesData: Array<object> = [];
        querySnapshot.forEach(doc => {
            gamesData.push(doc.data());
        })

        return gamesData;
    },
    getById: async (id : string) => {
        const querySnapshot = await getDoc(doc(firestore, QUESTIONS_COLLECTION, id));

        return querySnapshot.data();
    },
    insert: async (question : DBQuestion) => {
        const docRef = await addDoc(collection(firestore, QUESTIONS_COLLECTION), question);
        return docRef;
    },
    update: async (id : string, question : DBQuestion) => {
        const gameRef = doc(firestore, QUESTIONS_COLLECTION, id);
        await updateDoc(gameRef, question);
    },
    remove: async (id : string) => {
        await deleteDoc(doc(firestore, QUESTIONS_COLLECTION, id));
    }
}

export default QuestionsService;
