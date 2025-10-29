import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXJxdi54-LtU2AEZT7dxzjO_xuHgfIJo8",
  authDomain: "chat-app-908c1.firebaseapp.com",
  projectId: "chat-app-908c1",
  storageBucket: "chat-app-908c1.firebasestorage.app",
  messagingSenderId: "441868655557",
  appId: "1:441868655557:web:ecd53da8f0682af48149ac"
};

let app;
export function initializeFirebase() {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  return app;
}

export function getDb() {
  const appInstance = app || (getApps().length ? getApp() : null);
  if (!appInstance) return null;
  return getFirestore(appInstance);
}
