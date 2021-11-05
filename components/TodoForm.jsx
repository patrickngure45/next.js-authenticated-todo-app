import { useState, useContext } from 'react';
import { TodosContext } from '../context/TodoContext';

const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodosContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo('');
  };
  return (
    <form className="form my-6">
      <div className="flex flex-col text-sm mb-2 ">
        <label htmlFor="todo" className="font-bold mb-2 text-gray-800 pl-4">
          Add Todo
        </label>
        <input
          type="text"
          name="todo"
          id="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Todo ..."
          className="border-gray-200 p-2 border rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
      >
        submit
      </button>
    </form>
  );
};

export default TodoForm;
