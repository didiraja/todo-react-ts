import { useState } from "react";
import "./App.css";

function App() {
  // type A = { a: number }
  // type B = { b: string }
  // type AandB = A & B

  type Todo = Readonly<{
    id: number;
    text: string;
    done: boolean;
  }>;

  type CompletedTodo = Todo & {
    done: true;
  };

  const todo: Todo[] = [
    { id: 1, text: "First Todo", done: false },
    { id: 2, text: "Second Todo", done: false },
  ];

  const [todos, setTodos] = useState<Todo[]>(todo);

  function toggleTodo(todoItem: Todo): void {
    const updatedData: Todo[] = todos.map((item) => {
      if (todoItem.id === item.id)
        return {
          ...todoItem,
          done: !todoItem.done,
        };

      return item;
    });

    setTodos(() => updatedData);

    return;
  }

  function completeAll(): void {
    const allTrue: CompletedTodo[] = todos.map((item) => {
      return {
        ...item,
        done: true,
      };
    });

    setTodos(() => allTrue);

    return;
  }

  return (
    <div className="App">
      <ul>
        {todos
          ? todos.map((item) => {
              return (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onClick={() => toggleTodo(item)}
                    readOnly
                  />
                  <label>{item.text}</label>
                </li>
              );
            })
          : null}

        <button onClick={() => completeAll()}>Mark all as completed</button>
      </ul>
    </div>
  );
}

export default App;
