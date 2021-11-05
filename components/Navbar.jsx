import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

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
          <Link href="/api/auth/login">
            <a className="rounded bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 flex items-center">
              Log in
            </a>
          </Link>
        ) : (
          <div>
            <Link href="/api/auth/logout">
              <a className="rounded  bg-blue-500 hover:bg-blue-600  text-white py-1 px-2 flex items-center ">
                Logout
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
