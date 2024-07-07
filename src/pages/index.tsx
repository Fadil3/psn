import { useState } from "react";
import { useRouter } from "next/router";
import PageWrapper from "@/components/PageWrapper";

export default function Login() {
  const router = useRouter();

  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    if (data.email === '' || data.password === '') {
      return false;
    }
    return true;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm()) {
      // set user to local storage
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/dashboard');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <PageWrapper>
      <div className="flex items-center justify-center h-screen">
        <div className="w-[400px] bg-white p-4 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Login Page</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block">Email</label>
              <input type="email" name="email" id="email" className="border px-4 py-2 w-full" onChange={handleChange} />
              {submitted && data.email === '' && <p className="text-red-500">Email is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block">Password</label>
              <input type="password" name="password" id="password" className="border px-4 py-2 w-full" onChange={handleChange} />
              {submitted && data.password === '' && <p className="text-red-500">Password is required</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
