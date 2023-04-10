// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDHY-jxEAWSFju85H159Vtiih1Xx914RZo',
  authDomain: 'smartbuys-88b18.firebaseapp.com',
  projectId: 'smartbuys-88b18',
  storageBucket: 'smartbuys-88b18.appspot.com',
  messagingSenderId: '346710178809',
  appId: '1:346710178809:web:8b239d2a64035c0dfedb28',
  measurementId: 'G-B8XB7TME8P',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
