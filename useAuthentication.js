// utils/useAuthentication.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useAuthentication() {
  const [user, setUser] = useState(null); // Use null for initial state
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false); // Set isLoading to false once auth state is determined
    });

    return unsubscribeFromAuthStatusChanged; // Ensure to return unsubscribe function properly
  }, []);

  return { user, isLoading }; // Return both user and isLoading
}
