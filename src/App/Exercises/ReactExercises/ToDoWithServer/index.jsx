import { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';
import { GreenCheck } from '../../../Components/Icons/GreenCheck';
import { TrashCan } from '../../../Components/Icons/TrashCan';

export const Exercise = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteErrorId, setDeleteErrorId] = useState(null);

  const getTodos = async () => {
    setLoading(true);
    setError(false);
    try {
      const request = await fetch('http://localhost:3333/api/todo');
      if (!request.ok) {
        throw new Error('API');
      }
      const data = await request.json();

      setData(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const request = await fetch(`http://localhost:3333/api/todo/${id}`, {
        method: 'DELETE',
      });
      if (!request.ok) {
        throw new Error('Failled delete');
      }
      getTodos((prevState) => prevState.filter((todo) => todo.id !== id));
    } catch (e) {
      setDeleteErrorId(id);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return <div>Ładowanie danych...</div>;
  }

  if (error) {
    return (
      <div className="todo_2">
        Przepraszamy. Nie udało się pobrać listy zadań.
        <button onClick={getTodos} className="todo_button">
          ODŚWIEŻ WIDOK
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3>TODO</h3>
      <div>
        <div className="todo_1">
          Tutaj znajdziesz listę swoich zadań
          <button className="todo_button1">+</button>
        </div>

        {data.length > 0 &&
          data.map((todo) => {
            return (
              <li className="todo_wrapper" key={todo.id}>
                <div className="todo_title">{todo.title}</div>
                <div className="todo_author">{todo.author}</div>
                <div className="todo_author">{todo.createdAt}</div>
                <div className="todo_note">
                  {todo.note}
                  {todo.isDone ? <GreenCheck /> : ''}
                </div>
                {!deleteLoading ? (
                  <button
                    className="todo_trashcan"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <TrashCan />
                  </button>
                ) : (
                  <div>USUWANIE</div>
                )}
                {deleteErrorId === todo.id ? (
                  <div>Nie udało się usunąć</div>
                ) : (
                  ''
                )}
              </li>
            );
          })}
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};
