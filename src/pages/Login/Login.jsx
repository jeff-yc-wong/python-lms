import { GoogleLogin, googleLogout } from "@react-oauth/google";
import "./Login.css";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function LoginPage() {
  const [user, setUser] = useState(null);
  const responseMessage = (response) => {
    console.log(response);
    setUser(response.credential);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const logout = () => {
    console.log("logging out");
    googleLogout();
  };

  return user == null ? (
    <div
      id="login"
      className="container-fluid d-flex fill-height justify-content-center align-items-center"
    >
      <div className="row">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
    </div>
  ) : (
    <Navigate to="/home" replace={true} state={{ user: user }}></Navigate>
  );
}

export default LoginPage;
