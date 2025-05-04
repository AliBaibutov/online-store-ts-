import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVxKjpIVHj95srZ1u2hdCkRyLOq5cRN0U",
  authDomain: "online-store-e4021.firebaseapp.com",
  databaseURL:
    "https://online-store-e4021-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "online-store-e4021",
  storageBucket: "online-store-e4021.firebasestorage.app",
  messagingSenderId: "607290280344",
  appId: "1:607290280344:web:e987afa9ce313bf0f343ed",
};

// Инициализация Firebase
let app: FirebaseApp;

try {
  app = getApp(); // Если Firebase уже инициализирован
} catch (e) {
  console.log((e as Error).message);

  app = initializeApp(firebaseConfig); // Иначе инициализируем
}

// Получаем экземпляр базы данных
export const db: Database = getDatabase(app);
