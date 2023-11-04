import { useEffect, useState } from 'react';

const simplePromise = new Promise((resolve, reject) => {
  resolve('I am resolved');
});

console.log(simplePromise, 'simplePromise');

export const UseEffectAndPromise = () => {
  const [text, setText] = useState('I am text');

  useEffect(() => {
    simplePromise.then((data) => {
      setText(data);
    });
  }, []);
  return <div>{text}</div>;
};
