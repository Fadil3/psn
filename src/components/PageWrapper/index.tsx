import { useEffect } from "react";

export default function PageWrapper({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const user = localStorage.getItem('user');
    const path = window.location.pathname;
    console.log('path', path);
    if (!user) {
      if (path !== '/')
        window.location.href = '/';
    } else {
      window.location.href = '/dashboard';
    }
  }, []);
  return (
    <div className="container mx-auto px-4">
      {children}
    </div>
  );
}

