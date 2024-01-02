import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { mapAuthCodeToMessage } from "./../lib/authCodeMapping";

const PW_MISMATCH_ERROR_MSG = "Passwords do not match";
const PW_LENGTH_ERROR_MSG = "Passwords need to be longer than 6 characters";
const MIN_PW_LENGTH = 6;

function Auth() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const [showNoValidEmail, setShowNoValidEmail] = useState(false);
  const [showPwError, setShowPwError] = useState(false);
  const [pwError, setPwError] = useState("default");
  const [showInvalidCredential, setShowInvalidCredential] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  function validateEmail(e) {
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setShowNoValidEmail(false);
      setEmail(e.target.value);
    } else {
      setShowNoValidEmail(true);
    }
  }

  function checkPw(e) {
    setPw(e.target.value);
    if (e.target.value.length < MIN_PW_LENGTH) {
      setShowPwError(true);
      setPwError(PW_LENGTH_ERROR_MSG);
    } else {
      if (confirmPw !== "") {
        if (e.target.value === confirmPw) {
          setShowPwError(false);
        } else {
          setShowPwError(true);
          setPwError(PW_MISMATCH_ERROR_MSG);
        }
      }
    }
  }

  function checkConfirmPw(e) {
    setConfirmPw(e.target.value);
    if (pw !== "") {
      if (e.target.value === pw) {
        setShowPwError(false);
      } else {
        setShowPwError(true);
        setPwError(PW_MISMATCH_ERROR_MSG);
      }
    }
  }

  function handleResetPw() {
    navigate(`/reset`);
  }

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

  async function login() {
    try {
      const response = await signInWithEmailAndPassword(auth, email, pw);
      if (response.user.uid) {
        toast(`Welcome back ${response.user.email}`);
        navigate(`/`, {
          state: {},
        });
      }
    } catch (err) {
      toast(mapAuthCodeToMessage(err.code));
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      toast(mapAuthCodeToMessage(err.code));
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
      setEmail("");
      setPw("");
      setConfirmPw("");
    } else {
      setIsRegister(false);
      setEmail("");
      setPw("");
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
                    textDecoration: "underline",
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
                    textDecoration: "underline",
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
            <div className="mx-5 mb-3 pt-2 pb-2">[LOGO] SkyGazer</div>
            <label className="mx-5 pt-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              placeholder="Email..."
              onBlur={e => validateEmail(e)}
              className="mx-5 p-2 bg-gray-100 rounded border border-gray-300"
            />
            <div
              className={
                "mx-5 text-xs text-red-500 " +
                (showNoValidEmail ? "opacity-100" : "opacity-0")
              }
            >
              Invalid email provided
            </div>
            <label className="mx-5 pt-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password..."
              onBlur={e => checkPw(e)}
              className="mx-5 mb-4 p-2 bg-gray-100 rounded border border-gray-300"
            />
            <label className="mx-5 pt-2" htmlFor="password">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password..."
              className="mx-5 p-2 bg-gray-100 rounded border border-gray-300"
              onBlur={e => checkConfirmPw(e)}
            />
            <div
              className={
                "mx-5 text-xs text-red-500 " +
                (showPwError ? "opacity-100" : "opacity-0")
              }
            >
              {pwError}
            </div>
            <button
              className={
                "mx-5 mt-16 p-2 rounded " +
                (showNoValidEmail ||
                showPwError ||
                email === "" ||
                pw === "" ||
                confirmPw === ""
                  ? "text-gray-400 bg-gray-200"
                  : "text-white bg-blue-400 hover:bg-blue-500 border font-bold")
              }
              type="submit"
              disabled={
                showNoValidEmail ||
                showPwError ||
                email === "" ||
                pw === "" ||
                confirmPw === ""
              }
              onClick={register}
            >
              Register
            </button>
          </div>
        )}
        {!isRegister && (
          <div className="flex flex-col">
            <div className="mx-5 mb-3 pt-2 pb-2">[LOGO] SkyGazer</div>
            <label className="mx-5 pt-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              placeholder="Email..."
              onBlur={e => validateEmail(e)}
              className="mx-5 p-2 bg-gray-100 rounded border border-gray-300"
            />
            <div
              className={
                "mx-5 text-xs text-red-500 " +
                (showNoValidEmail ? "opacity-100" : "opacity-0")
              }
            >
              Invalid email provided
            </div>
            <label className="mx-5 pt-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password..."
              onChange={e => setPw(e.target.value)}
              className="mx-5 p-2 bg-gray-100 rounded border border-gray-300"
            />
            <div
              className={
                "mx-5 text-xs text-red-500 " +
                (showInvalidCredential ? "opacity-100" : "opacity-0")
              }
            >
              Invalid credentials provided
            </div>
            <button
              className={
                "mx-5 mt-16 p-2 rounded " +
                (showNoValidEmail || email === "" || pw === ""
                  ? "text-gray-400 bg-gray-200"
                  : "text-white bg-blue-400 hover:bg-blue-500 border font-bold")
              }
              type="submit"
              disabled={showNoValidEmail || email === "" || pw === ""}
              onClick={login}
            >
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
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Login with your Google account
        </button>
        {!isRegister && (
          <div className="flex">
            <p
              className="mx-5 mt-3 text-sm text-blue-600 hover:underline hover:cursor-pointer"
              onClick={handleResetPw}
            >
              Forgot Password?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Auth;
