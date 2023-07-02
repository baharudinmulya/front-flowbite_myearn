// // import React from "react";
// import { Route, useNavigate } from "react-router-dom";
// import { isAuthenticated } from "./auth";

// const ProtectedRoute = ({ path, element }) => {
//   const navigate = useNavigate();

//   // Check if the user is authenticated
//   if (!isAuthenticated()) {
//     // User is not authenticated, redirect to login
//     navigate("/authentication/sign-in", { replace: true });
//     return null;
//   }

//   // User is authenticated, render the component
//   return <Route path={path} element={element} />;
// };

// export default ProtectedRoute;
