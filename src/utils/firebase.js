import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyBoxA6x-yfp3vfzj7WfoFiB57Phrgmkn5k",
  authDomain: "kidsbazaar-4e106.firebaseapp.com",
  projectId: "kidsbazaar-4e106",
  storageBucket: "kidsbazaar-4e106.firebasestorage.app",
  messagingSenderId: "911621178682",
  appId: "1:911621178682:web:6748c35835b69594447c03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Site key (Google reCAPTCHA console se)
const site_key = "6LfSlaUsAAAAAJkJ39iKK-IVJGw69mPxoy17ACtq";

// Initialize App Check (only on client side)
let appCheck = null;
if (typeof window !== 'undefined') {
  // Localhost ke liye debug mode
//   if (window.location.hostname === "localhost") {
//     self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
//     console.log("🔧 Debug mode enabled for localhost");
//   }
  
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(site_key),
    isTokenAutoRefreshEnabled: true
  });
  
  console.log("✅ Firebase App Check initialized");
}

export { app, appCheck };