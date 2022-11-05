import { useState } from "react";
import "./App.css";

function App() {
  // type A = { a: number }
  // type B = { b: string }
  // type AandB = A & B

  type Place = "home" | "work" | { custom: string };

  type Todo = Readonly<{
    id: number;
    text: string;
    done: boolean;
    place?: Place;
  }>;

  type CompletedTodo = Todo & {
    done: true;
  };

  const todo: Todo[] = [
    {
      id: 1,
      text: "Do laundry",
      done: false,
      place: "home",
    },
    {
      id: 2,
      text: "Email boss",
      done: false,
      place: "work",
    },
    {
      id: 3,
      text: "Go to gym",
      done: false,
      place: { custom: "Gym" },
    },
    {
      id: 4,
      text: "Buy milk",
      done: false,
      place: { custom: "Supermarket" },
    },
    { id: 5, text: "Read a book", done: false },
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

  // (): <return>
  function placeToString(label: Place): string {
    if (label === "home") return "🏠 Home";

    if (label === "work") return "💼 Work";

    return `📍 ${label.custom}`;
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
                  {item.place ? (
                    <span className="place"> {placeToString(item.place)} </span>
                  ) : null}
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
