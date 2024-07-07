import { useEffect, useState } from "react";
import Button from "../Button";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{
    username: string;
  } | null>(null);


  useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(user ? JSON.parse(user) : null);
    const path = window.location.pathname;
    if (!user) {
      if (path !== '/')
        window.location.href = '/';
    } else {
      if (path === '/')
        window.location.href = '/dashboard';
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  return (
    <main className="container mx-auto p-4">
      {user &&
        <header className="mb-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div>
              <span className="mr-4">{user?.username}</span>
              <Button color="bg-red-500" onClick={logout}>Logout</Button>
            </div>
          </nav>
        </header>
      }
      {children}
    </main>
  );
}

