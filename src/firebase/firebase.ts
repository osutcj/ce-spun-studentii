import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { environmentType } from '../utils/contants';

// Your web app's Firebase configuration for local development
const firebaseConfigDev = {
  apiKey: 'AIzaSyCKbzlajmZjuKyeWyZSxYboy51OeLzfcgE',
  authDomain: 'osut-divertisment-testing.firebaseapp.com',
  projectId: 'osut-divertisment-testing',
  storageBucket: 'osut-divertisment-testing.appspot.com',
  messagingSenderId: '538903092781',
  appId: '1:538903092781:web:e02312ae6f3818416f62a4'
};

// Your web app's Firebase configuration for production
const firebaseConfigProd = {
  apiKey: 'AIzaSyCoS-q_rga3axs7gFpr6bdtkdfqoebczo0',
  authDomain: 'osut-divertisment.firebaseapp.com',
  databaseURL: 'https://osut-divertisment-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'osut-divertisment',
  storageBucket: 'osut-divertisment.appspot.com',
  messagingSenderId: '219304656262',
  appId: '1:219304656262:web:d55d4ec98fff1de0bc0007'
};

const validEnvironments = [
  'localhost',
  '127.0.0.1',
  'osut-divertisment-testing.web.app',
  'osut-divertisment-testing.firebaseapp.com"'
];
const isDevelopmentEnvironment = validEnvironments.includes(window.location.hostname);

const app = isDevelopmentEnvironment
  ? initializeApp(firebaseConfigDev)
  : initializeApp(firebaseConfigProd);

export const db = getDatabase();
export const firestore = getFirestore(app);
export const auth = getAuth(app);

const currEnvironment = isDevelopmentEnvironment
  ? environmentType.development
  : environmentType.production;

export { currEnvironment };
