import PageWrapper from "@/components/PageWrapper";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Create() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    body: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validateForm = () => {
    if (form.name === '' || form.email === '' || form.body === '') {
      return false;
    }
    if (!isValidEmail(form.email)) {
      setEmailError(true);
      return false;
    }
    return true;
  }



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm()) {
      // set user to local storage
      router.push('/dashboard');
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  return (
    <PageWrapper>
      <div className="flex items-center justify-center h-screen">
        <div className="w-[400px] bg-white p-4 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Create Comment</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block">Name</label>
              <input type="text" name="name" id="name" className="border px-4 py-2 w-full" onChange={handleChange} />
              {submitted && form.name === '' && <p className="text-red-500">Name is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block">Email</label>
              <input type="email" name="email" id="email" className="border px-4 py-2 w-full" onChange={handleChange} />
              {
                submitted && form.email === '' && <p className="text-red-500">Email is required</p>
              }
              {
                emailError && <p className="text-red-500">Email is invalid</p>
              }
            </div>
            <div className="mb-4">
              <label htmlFor="body" className="block">Body</label>
              <textarea name="body" id="body" className="border px-4 py-2 w-full" onChange={handleChange}></textarea>
              {submitted && form.body === '' && <p className="text-red-500">Body is required</p>}
            </div>
            <Button classnames="w-full">Create</Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  )

}