import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDZC7ud9gpzF5xD-pnO_H8R4qwCRvrv-kc",
  authDomain: "auth-development-af655.firebaseapp.com",
  projectId: "auth-development-af655",
  storageBucket: "auth-development-af655.appspot.com",
  messagingSenderId: "713068950149",
  appId: "1:713068950149:web:aa76c8abc9d72a10deefec"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const auth = getAuth(app)
