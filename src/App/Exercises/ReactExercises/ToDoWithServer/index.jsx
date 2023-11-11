import { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';
import { GreenCheck } from '../../../Components/Icons/GreenCheck';
import { TrashCan } from '../../../Components/Icons/TrashCan';
import { BlackCheck } from '../../../Components/Icons/BlackCheck';
import { Form } from './Form';

export const Exercise = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //DELETE
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteErrorId, setDeleteErrorId] = useState(null);

  // MARK AS DONE
  const [markLoading, setMarkLoading] = useState(false);
  const [markErrorId, setMarkErrorId] = useState(null);

  const [redirectToForm, setRedirectToForm] = useState(false);

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

  const markAsDone = async (id) => {
    setMarkLoading(true);
    try {
      const request = await fetch(
        `http://localhost:3333/api/todo/${id}/markAsDone`,
        {
          method: 'PUT',
        }
      );
      if (!request.ok) {
        throw new Error('Failled delete');
      }

      const data = await request.json();

      getTodos((prevState) =>
        prevState.map((todo) => {
          if (todo.id === id) return data;

          return todo;
        })
      );
    } catch (e) {
      setMarkErrorId(id);
    } finally {
      setMarkLoading(false);
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

  const handleOnClick = () => {
    setRedirectToForm(true);
  };
  if (redirectToForm) {
    return <Form />;
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
            // Przekształć datę na odpowiedni format
            const createdAtDateTime = new Date(todo.createdAt).toLocaleString();
            const doneDateTime = new Date(todo.doneDate).toLocaleString();

            const listItemStyle = {
              backgroundColor: todo.isDone ? '#C8CBD1' : 'white',
              color: todo.isDone ? '#6B7280' : 'black',
            };

            return (
              <li
                className="todo_listwrapper"
                key={todo.id}
                style={listItemStyle}
              >
                <div className="todo_wrapper">
                  <div className="todo_title">{todo.title}</div>
                  <div className="todo_author">{todo.author}</div>
                  <div className="todo_author">{createdAtDateTime}</div>
                  <div className="todo_note">{todo.note}</div>
                </div>
                <div className="todo_icons">
                  <div className="todo_nobutton1">
                    {!todo.isDone ? (
                      <button
                        className="todo_nobutton"
                        onClick={() => markAsDone(todo.id)}
                      >
                        <BlackCheck />
                      </button>
                    ) : null}
                    {!deleteLoading ? (
                      <button
                        className="todo_nobutton"
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
                  </div>
                  {todo.isDone ? <GreenCheck /> : ''}
                  {todo.isDone ? (
                    <div className="todo_author">{doneDateTime}</div>
                  ) : (
                    ''
                  )}
                </div>
              </li>
            );
          })}
      </div>
      <div className="todo_buttonright">
        <button className="todo_buttontoform" onClick={handleOnClick}>
          DODAJ
        </button>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};
