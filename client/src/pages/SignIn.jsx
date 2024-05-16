import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  SignInFailure,
  SignInStart,
  SignInSuccess,
} from "../redux/user/UserSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(SignInFailure("Please fill out all fields"));
    }
    try {
      dispatch(SignInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(SignInFailure(data.message));
      }

      if (res.ok) {
        dispatch(SignInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(SignInFailure(error.message));
    }
  };

  return (
    <section className="min-h-[51vh] mt-20 mb-12">
      <div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto">
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl dark:text-white">
            <span className="px-2 py-1 bg-[#0E7490] rounded-lg text-white">
              Blog
            </span>
            Hive
          </Link>
          <p className="text-sm mt-5">
            Sign in with your email and password or with Google
          </p>
        </div>

        <div className="flex-1 border p-5 rounded-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                className="mt-1"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                className="mt-1"
                onChange={handleChange}
              />
            </div>

            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <OAuth />
          </form>
          <div className="mt-5 flex gap-2 text-sm">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-teal-600">
              Sign Up
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignIn;
