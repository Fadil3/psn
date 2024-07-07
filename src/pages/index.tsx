import { useState } from "react";
import { useRouter } from "next/router";
import PageWrapper from "@/components/PageWrapper";
import Button from "@/components/Button";

export default function Login() {
  const router = useRouter();

  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    if (data.username === '' || data.password === '') {
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
              <label htmlFor="username" className="block">username</label>
              <input name="username" id="username" className="border px-4 py-2 w-full" onChange={handleChange} />
              {submitted && data.username === '' && <p className="text-red-500">username is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block">Password</label>
              <input type="password" name="password" id="password" className="border px-4 py-2 w-full" onChange={handleChange} />
              {submitted && data.password === '' && <p className="text-red-500">Password is required</p>}
            </div>
            <Button classnames="w-full">Login</Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
