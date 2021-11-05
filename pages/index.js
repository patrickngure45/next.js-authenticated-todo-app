import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Todo from '../components/Todo';
import { minifyRecords, table } from './api/utils/Airtable';
import { TodosContext } from '../context/TodoContext';
import { useContext, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import { useUser } from '@auth0/nextjs-auth0';

export default function Home({ initialTodos }) {
  const { user } = useUser();
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);
  return (
    <div>
      <Head>
        <title>Todo app</title>
        <meta name="description" content="todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <h1 className="text-xl text-center mb-4 sm:text-sm">My Todo</h1>
        {user && (
          <>
            <TodoForm />
            <ul>
              {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            </ul>
          </>
        )}
        {!user && <p className="pl-4">Login to access Todos</p>}
      </main>
    </div>
  );
}
export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res);
  let todos = [];
  try {
    if (session?.user) {
      todos = await table
        .select({
          filterByFormula: `userId= '${session.user.sub}'`,
        })
        .firstPage();
    }

    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        err: 'Something went wrong',
      },
    };
  }
}
