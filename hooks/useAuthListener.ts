import { useEffect } from "react";
import { onAuthStateChanged, getIdToken, getIdTokenResult } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../services/firebase";
import { logout, setLoading, setRole, setUser } from "../redux/features/authSlice";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || null,
        }));
    
        // Token’ı force refresh et
        const tokenResult = await getIdTokenResult(user, true);
    
        dispatch(setRole(tokenResult.claims?.role ? String(tokenResult.claims.role) : "user"));
      } else {
        dispatch(logout());
      }
      dispatch(setLoading(false));
    });
    

    return () => unsubscribe();
  }, []);
};
