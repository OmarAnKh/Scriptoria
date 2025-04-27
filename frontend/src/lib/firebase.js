import { initializeApp } from 'firebase/app';
import {
    getStorage,
    ref,
    uploadBytes,
    deleteObject,
    getDownloadURL
} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

/**
 * Upload a file to Firebase Storage under posts/{postId}/
 * @param {File} file
 * @param {string} postId
 * @returns {Promise<{url: string, path: string, fileName: string}>}
 */
export const uploadFile = async (file, postId) => {
    try {
        const fileName = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const path = `posts/${postId}/${fileName}`;
        const storageRef = ref(storage, path);

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        return { url, path, fileName };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

/**
 * Delete a file from Firebase Storage
 * @param {string} path
 */
export const deleteFile = async (path) => {
    try {
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

export { app, storage, firestore };
