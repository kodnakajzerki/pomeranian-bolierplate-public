import { useState } from 'react';

function loadUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'John Doe' });
    }, 2000);
  });
}

// na podstawie ww funkcji stworzyć podobną funkcję loadUserDetails(userId)
// loadUserDetails(userId) zwraca promise z { id: userId, age: 30, country: "Poland" }
// (zwrócić uwagę na parametr id)
// stwórzmy funkcję loadAllUserData(), która wywyła loadUSer, a następnie loadUserDetails
// pamiętajmy o przekazaniu id do loadAllUserData() z rezultatatów loadUser (name pomijamy)
// następnie dodajmy button 'załaduj detale użytkownika'
// dodajemy też miejsce na wyświetlanie danych użytkownika (id, age, country)
// po naciśnięciu w przycisk załadowac dane z loadAllUserData i wyświetlić aktualnie
// załadowanego usera
// po kliknięciu w button 'załaduj detale użytkownika' wyczyść aktualnie załadowanego
// użytkowanika (w oczekiwaniu na kolejnego)

const loadUserDetails = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: userId, age: 30, country: 'Poland' });
    }, 2000);
  });
};

export const FakeDataPromise = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const loadAllUserData = () => {
    setUser(null);
    setUserDetails(null);

    loadUser()
      .then((userData) => {
        setUser(userData);
        return loadUserDetails(userData.id);
      })
      .then((userDetails) => {
        setUserDetails(userDetails);
      });
  };

  const handleLoadData = () => loadAllUserData();

  return (
    <div>
      <button onClick={handleLoadData}>Załaduj detail użytkownika</button>
      {user && userDetails && (
        <div>
          <div>{userDetails.id}</div>
          <div>{user.name}</div>
          <div>{userDetails.age}</div>
          <div>{userDetails.country}</div>
        </div>
      )}
    </div>
  );
};
