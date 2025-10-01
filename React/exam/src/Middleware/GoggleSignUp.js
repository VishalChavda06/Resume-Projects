import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider as GProvider } from "firebase/auth"; 
import { auth, googleProvider } from "../Firebase/firebase";

export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;

    // Correct way to get the credential & token
    const credential = GProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log("Google Token:", token);
  } catch (error) {
    console.error("Google Sign-Up Error:", error);
  }
};