// if (Math.random() < 0.5) { ... } else { ... }
// dodajmy nowy div na wyświetlanie błędu
// po kliknięciu w button 'załaduj detale użytkownika' wyczyśćmy także aktualny błąd
// zmodyfukujemy loadUserDetails w taki sposób aby z 50% prawdopodobieństwem rejectowała promisa z błędem
// treść błędy: 'bład server: nieudane wyszukiwanie dla userId: xxx' użyjmy klasy Error
// w funkcji loadAllUserData przechwycyć błąd i wyświetlić
// przetestować aż do uzyskania błędu (możemu skrócić czas timeoutów na czas testów)

import { useState } from 'react';

export const ApiSimulation = () => {
  const [userData, setUserData] = useState(null);
  const [errorText, setErrorText] = useState(null);

  function loadUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, name: 'John Doe' });
      }, 500);
    });
  }

  function loadUserDetails(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shot = Math.random();
        if (shot < 0.5) {
          resolve({ id: userId, age: 30, country: 'Poland' });
        } else {
          const err = `Nieudane wyszukanie dla UserId: ${userId}`;
          reject(err);
        }
        console.log(shot, 'wylosowano taką liczbę');
      }, 500);
    });
  }

  function loadAllUserDAta() {
    loadUser()
      .then((result) => {
        return loadUserDetails(result.id);
      })
      .then((result) => {
        setUserData(result);
        setErrorText(null);
      })
      .catch((err) => {
        setUserData(null);
        setErrorText(err);
      });
  }

  function clickHandler() {
    setUserData(null);
    setErrorText(null);
    loadAllUserDAta();
  }

  return (
    <div>
      <p>Zadanie Api Simulation</p>
      <button onClick={clickHandler}>Załaduj Dane Użytkownika</button>
      {userData ? (
        <ul>
          <li>id: {userData.id}</li>
          <li>age: {userData.age}</li>
          <li>country: {userData.country}</li>
        </ul>
      ) : (
        <p>{errorText}</p>
      )}
    </div>
  );
};
