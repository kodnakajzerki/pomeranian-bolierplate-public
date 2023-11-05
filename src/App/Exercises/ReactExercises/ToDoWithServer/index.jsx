import { useEffect } from 'react';
import { useState } from 'react';

export const Exercise = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getTodos = async () => {
    try {
      const request = await fetch('http://localhost:3333/api/todo');
      const data = await request.json();

      setData(data);
    } catch {
      setError('Error');
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1>ToDo with server</h1>
      <div>
        <div>lista todos...</div>
        {data.length > 0 &&
          data.map((todo) => {
            return (
              <li key={todo.id}>
                <div>{todo.title}</div>
                <div>{todo.author}</div>
                <div>{todo.note}</div>
              </li>
            );
          })}
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};
