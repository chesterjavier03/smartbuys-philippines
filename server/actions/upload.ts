import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, StringFormat, uploadBytes, uploadString } from 'firebase/storage';

const clientCredentials = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};


export const uploadToFirestore = async (email: string, image: string) => {
  try {
    const app = !getApps().length ? initializeApp(clientCredentials) : getApp();
    const storage = getStorage(app);
  
    if (!image) { return { error: 'Please add image file' } };

    const storageRef = ref(storage, `${email}/avatar`);
    const newMetadata = { contentType: 'image/png' }
    const uploadTask = await uploadString(storageRef, image, StringFormat.DATA_URL, newMetadata);
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    if (!downloadUrl) { return { error: 'There was some error while uploading the file.' } };

    return downloadUrl;

  } catch (error) {
    console.log('ERROR: ', error);
    return { error: 'Something went wrong..' };
    
  }
}