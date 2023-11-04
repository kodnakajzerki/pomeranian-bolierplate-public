//zadanie
//dodajmy diva na napis
// napisać useEffect'a oraz stworzyć Promise'a, który zostanie
// spełniony i wyświetli nam "I'm resolved :)"
// użyjmy useState do zapisanie odpowiedzi z promisa.

import { useEffect, useState } from 'react';
import { UseEffectAndPromise } from './UseEffectAndPromise';
import { FakeDataPromise } from './FakeDataPromise';
import { ApiSimulation } from './ApiSimulation';

export const Exercise = () => {
  const [resolvedData, setResolvedData] = useState(null);

  useEffect(() => {
    // Tworzymy obietnicę (Promise)
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("I'm resolved :)");
      }, 2000); // Symulujemy asynchroniczną operację, która zajmuje 2 sekundy
    });

    // Obsługujemy rozwiązanie promisa i zapisujemy wynik za pomocą useState
    myPromise.then((data) => {
      setResolvedData(data);
    });

    // Opcjonalnie można obsłużyć odrzucenie promisa
    // myPromise.catch((error) => {
    //   console.error("Promise rejected:", error);
    // });
  }, []);

  return (
    <div>
      {resolvedData ? <p>{resolvedData}</p> : <p>Loading...</p>}
      <UseEffectAndPromise />
      <FakeDataPromise />
      <ApiSimulation />
    </div>
  );
};

export default Exercise;
