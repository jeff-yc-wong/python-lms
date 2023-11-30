import "./Login.css";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import GoogleButton from "../../components/GoogleButton/GoogleButton";

function LoginPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const passwordRef = useRef(null);
  const [userType, setUserType] = useState("");

  const handleEmailLogin = (e) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("signed in");
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("in auth state changed function", user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // if (userType === "") {
  //   return (
  //     <div id="login" className="container">
  //       <div className="row h-100 justify-content-center align-items-center">
  //         <div className="col text-light">Student</div>
  //         <div className="col text-light">Instructor</div>
  //       </div>
  //     </div>
  //   );
  // }

  if (user) {
    return <Navigate to="/home" replace={true}></Navigate>;
  }

  return (
    <div id="login" className="container">
      <div className="row h-100 justify-content-center align-items-center">
        {/* <div className="col"></div> */}
        <div className="col">
          <div className="row">
            <h1 className="mb-5 text-light text-center fw-bold">Python LMS</h1>
          </div>
          <div className="row">
            <h3 className="text-light fw-bold">Sign In</h3>
            <div className="text-light">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="emailHelp"
                  required
                  placeholder="Enter email"
                />
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              </div>
              <div className="mb-0">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  ref={passwordRef}
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <div className="mt-2 form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={togglePasswordVisibility}
                  />
                  <label htmlFor="togglePasswordVisibility">
                    Show Password
                  </label>
                </div>
              </div>
              <button
                className="btn btn-light float-end"
                onClick={handleEmailLogin}
              >
                Login
              </button>
            </div>
          </div>
          <div id="seperator" className="text-center">
            ---------------------- or ----------------------
          </div>
          <div className="m-4 row justify-content-center">
            <GoogleButton onClick={handleGoogleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
