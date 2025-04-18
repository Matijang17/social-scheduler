import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const adminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
};

const adminApp = getApps().length === 0 ? initializeApp(adminConfig) : getApps()[0];
const adminAuth = getAuth(adminApp);
const adminFirestore = getFirestore(adminApp);

export const verifyIdToken = (token) => {
  return adminAuth.verifyIdToken(token);
};

export const getAdminFirestore = () => {
  return adminFirestore;
};