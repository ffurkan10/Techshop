import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";

export const UseCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      // onAuthStateChanged metodunu kullanarak, mevcut giriş yapmış olan kullanıcıyı takip etmek için bir state
      setUser(user); // kullanıcı giriş yapmış ise, state'e giriş yapmış olan kullanıcı bilgileri atanır.
    });
  }, []);

  return user;
};

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    // oturum durumunun değiştiğinde state'i güncellemeyi amaçlar.
    return onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // !!user işleminin sonucu, user değişkeninin null veya undefined değilse true, değilse false olmalı
    });
  }, []);

  return isLoggedIn;
};
