import app from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    app.analytics();

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // Auth API
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  sendPasswordResetEmail = (email) => this.auth.sendPasswordResetEmail(email);

  verifyPasswordResetCode = (code) => this.auth.verifyPasswordResetCode(code);

  confirmPasswordReset = (code, newPassword) =>
    this.auth.confirmPasswordReset(code, newPassword);

  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  // Book API
  bookRef = (uid) => this.db.collection(`books/`).doc(uid);

  getBook = async (uid) => {
    const book = await this.bookRef(uid).get();
    return book.data();
  };
}
export default Firebase;
