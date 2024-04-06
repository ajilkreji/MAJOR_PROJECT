import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyCJqNRbeZUmQCvVcv9-uzcyGaMMPS5gU_g",
    authDomain: "studentlogin-ebusconcession.firebaseapp.com",
    projectId: "studentlogin-ebusconcession",
    storageBucket: "studentlogin-ebusconcession.appspot.com",
    messagingSenderId: "968579756551",
    appId: "1:968579756551:web:02ed0979c8735a6b4d30a2",
    measurementId: "G-J52YDZJ1G3"
};

  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

