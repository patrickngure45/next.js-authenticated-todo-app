import { TodosContext } from '../context/TodoContext';
import { useContext } from 'react';
const Todo = ({ todo }) => {
  const { id } = todo;
  const { updateTodo, deleteTodo } = useContext(TodosContext);
  const handleCompleted = () => {
    const updateFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo = {
      id: todo.id,
      fields: updateFields,
    };
    updateTodo(updatedTodo);
  };
  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4 ">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={todo.fields.completed}
        className="mr-2 form-checkbox h-5 w-5"
        onChange={handleCompleted}
      />
      <p
        className={`flex-1 text-gray-800 ${
          todo.fields.completed ? 'line-through' : ''
        }`}
      >
        {todo?.fields.description}
      </p>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => deleteTodo(id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Todo;
