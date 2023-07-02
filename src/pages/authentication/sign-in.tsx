/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";

const SignInPage = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post("http://127.0.0.1:8080/login", {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      // Redirect to another page
      window.location.href = "/";
    } catch (error) {
      alert("Invalid credentials");
      // Handle error or display error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <img
          alt="Flowbite logo"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-12"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Flowbite
        </span>
      </div>
      <Card
        horizontal
        // imgSrc="/images/authentication/login.jpg"
        // imgAlt=""
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to platform
        </h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your username</Label>
            <TextInput
              id="username"
              name="username"
              placeholder="name@company.com"
              type="text"
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <a
              href="#"
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              Lost Password?
            </a>
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto">
              Login to your account
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <a href="#" className="text-primary-600 dark:text-primary-300">
              Create account
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
