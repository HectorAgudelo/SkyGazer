import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { mapAuthCodeToMessage } from "./../lib/authCodeMapping";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [showNoValidEmail, setShowNoValidEmail] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  async function sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  function validateEmail(e) {
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setShowNoValidEmail(false);
      setEmail(e.target.value);
    } else {
      setShowNoValidEmail(true);
    }
  }

  async function handleResetPw(e) {
    e.preventDefault();
    try {
      auth.signOut();
      await sendPasswordResetEmail(auth, email);
      toast(
        `Password reset instructions have been sent to ${email}. Navigating back to login page in 5 seconds.`
      );
      await sleep(5000);
      navigate("/login");
    } catch (err) {
      console.log(err.code);
      toast(mapAuthCodeToMessage(err.code));
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="flex flex-col w-1/2 md:w-1/3 pb-5 rounded bg-gray-100">
        <div className="flex mb-3"></div>
        <div className="flex flex-col">
          <div className="mx-5 mb-3 pt-2 pb-2">[LOGO] SkyGazer</div>
          <label className="mx-5 pt-2" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            placeholder="Email..."
            onBlur={validateEmail}
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
          <button
            className={
              "mx-5 mt-16 p-2 rounded " +
              (showNoValidEmail || email === ""
                ? "text-gray-400 bg-gray-200"
                : "text-white bg-blue-400 hover:bg-blue-500 border font-bold")
            }
            type="submit"
            disabled={showNoValidEmail || email === ""}
            onClick={e => handleResetPw(e)}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
