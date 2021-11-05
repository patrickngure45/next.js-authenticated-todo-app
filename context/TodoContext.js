import { createContext } from 'react';
import { useState } from 'react';

const TodosContext = createContext();
const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch('/api/getTodos');
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (error) {
      console.log(error);
    }
  };
  const addTodo = async (description) => {
    try {
      const res = await fetch('/api/createTodo', {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: { 'content-type': 'application/json' },
      });
      const newTodo = await res.json();
      setTodos((prev) => {
        return [newTodo, ...prev];
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateTodo = async (updatedTodo) => {
    try {
      const res = await fetch('/api/updateTodo', {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: { 'content-type': 'application/json' },
      });
      await res.json();
      setTodos((prev) => {
        const existingTodos = [...prev];
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (id) => {
    try {
      await fetch('/api/deleteTodo', {
        method: 'Delete',
        body: JSON.stringify({ id }),
        headers: { 'content-type': 'application/json' },
      });

      setTodos((prev) => {
        return prev.filter((todo) => todo.id !== id);
      });
    } catch (error) {}
  };
  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
export { TodosProvider, TodosContext };
