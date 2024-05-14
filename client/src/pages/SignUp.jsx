import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <section className="min-h-[60vh] mt-20">
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto">
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl dark:text-white">
            <span className="px-2 py-1 bg-[#0E7490] rounded-lg text-white">
              Blog
            </span>
            Hive
          </Link>
          <p className="text-sm mt-5">
            Sign up with your email and password or with Google
          </p>
        </div>

        <div className="flex-1 border p-5 rounded-md">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className="mt-1"
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                className="mt-1"
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="text"
                placeholder="Password"
                id="password"
                className="mt-1"
              />
            </div>

            <Button type="submit">Sign Up</Button>
          </form>
          <div className="mt-5 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-teal-600">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
