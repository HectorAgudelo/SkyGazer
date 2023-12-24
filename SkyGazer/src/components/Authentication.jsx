import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { mapAuthCodeToMessage } from "./../lib/authCodeMapping";

function Auth() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isRegister, setIsRegister] = useState(true);

  async function register() {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, pw);
      if (response.user.uid) {
        toast(
          "Your account has been successfully created! Login to continue to the application."
        );
        setIsRegister(false);
      } else {
        auth.signOut();
      }
    } catch (err) {
      toast(mapAuthCodeToMessage(err.code));
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  function switchSignIn(value) {
    if (value === "Register") {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="flex flex-col w-1/2 md:w-1/3 pb-5 rounded bg-gray-100">
        <div className="flex mb-3">
          <button
            className="w-1/2 p-3"
            style={
              isRegister
                ? {
                    fontWeight: "bold",
                    backgroundColor: "rgb(243 244 246)",
                  }
                : { backgroundColor: "rgb(209 213 219" }
            }
            value="Register"
            onClick={e => switchSignIn(e.target.value)}
          >
            Register
          </button>
          <button
            className="w-1/2 p-3"
            style={
              isRegister
                ? { backgroundColor: "rgb(209 213 219" }
                : {
                    fontWeight: "bold",
                    backgroundColor: "rgb(243 244 246)",
                  }
            }
            value="Login"
            onClick={e => switchSignIn(e.target.value)}
          >
            Login
          </button>
        </div>
        {isRegister && (
          <div className="flex flex-col">
            <div className="mx-5 pt-2 pb-2">[LOGO] SkyGazer</div>
            <label className="mx-5 pt-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              placeholder="Email..."
              onChange={e => setEmail(e.target.value)}
              className="mx-5 p-2 bg-gray-100 rounded border border-gray-300"
            />
            <label className="mx-5 pt-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password..."
              onChange={e => setPw(e.target.value)}
              className="mx-5 p-2 bg-gray-100 rounded border border-gray-300"
            />
            <label className="mx-5 pt-2" htmlFor="password">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password..."
              className="mx-5 p-2 bg-gray-100 rounded border border-gray-300"
            />
            <button
              className="mx-5 mt-6 p-2 rounded bg-gray-200 hover:bg-gray-300 border border-gray-400"
              onClick={register}
            >
              Register
            </button>
          </div>
        )}
        {!isRegister && (
          <div className="flex flex-col">
            <div className="mx-5 pt-2 pb-2">[LOGO] SkyGazer</div>
            <label className="mx-5 pt-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              placeholder="Email..."
              onChange={e => setEmail(e.target.value)}
              className="mx-5 p-2 bg-gray-100 rounded border border-gray-300"
            />
            <label className="mx-5 pt-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password..."
              onChange={e => setPw(e.target.value)}
              className="mx-5 p-2 bg-gray-100 rounded border border-gray-300"
            />
            <button className="mx-5 mt-6 p-2 rounded bg-gray-200 hover:bg-gray-300 border border-gray-400">
              Login
            </button>
          </div>
        )}
        {/* <button className="my-4 p-2 rounded bg-gray-300" onClick={logout}>
          Logout
        </button> */}
        <button
          className="mx-5 mt-4 p-2 rounded bg-gray-400 hover:bg-gray-500"
          onClick={signInWithGoogle}
        >
          Login with Google Account
        </button>
      </div>
    </div>
  );
}
export default Auth;
