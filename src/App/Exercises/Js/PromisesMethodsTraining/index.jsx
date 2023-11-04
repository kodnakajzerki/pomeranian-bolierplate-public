const fetchDataFast = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve({ id: 1, time: 300 });
    }, 300)
  );
const fetchDataLong = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve({ id: 2, time: 700 });
    }, 700)
  );
const fetchDataError = () =>
  new Promise((_, reject) =>
    setTimeout(() => {
      reject(new Error('Błąd pobierania danych'));
    }, 500)
  );

export const Exercise = () => {
  return <div>Metody w Promise- ćwiczenia </div>;
};
