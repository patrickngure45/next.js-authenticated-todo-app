import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className="flex justify-between items-center p-4 sm:text-sm ">
      <div className="div">
        {user && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={user.picture}
              alt={user.name}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <h6 style={{ color: 'gray' }}>{user.name}</h6>
          </div>
        )}
      </div>
      <div className="flex">
        {!user ? (
          <a
            href="/api/auth/login"
            className="rounded bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 flex items-center"
          >
            Log in
          </a>
        ) : (
          <div>
            <a
              href="/api/auth/logout"
              className="rounded  bg-blue-500 hover:bg-blue-600  text-white py-1 px-2 flex items-center "
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
