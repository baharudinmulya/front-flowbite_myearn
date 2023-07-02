import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Flowbite } from "flowbite-react";

import { isAuthenticated } from "./auth/auth";
import "./index.css";
import theme from "./flowbite-theme";
const KepemilikanPage = React.lazy(() => import("./pages/kepemilikan/kepemilikan"));

// Lazy-loaded page components
const DashboardPage = React.lazy(() => import("./pages/dashboard"));
const AkunPage = React.lazy(() => import("./pages/akun/akun"));
const SignInPage = React.lazy(() => import("./pages/authentication/sign-in"));
const SignUpPage = React.lazy(() => import("./pages/authentication/sign-up"));
const EcommerceProductsPage = React.lazy(() =>
  import("./pages/e-commerce/products")
);
const UserListPage = React.lazy(() => import("./pages/users/list"));

// Set a timeout to call isAuthenticated after 1 second
setTimeout(() => {
  if (!isAuthenticated()) {
    // Token expired, redirect to sign-in
    localStorage.removeItem("token");
    const currentUrl = window.location.pathname;
    const loginUrl = "/authentication/sign-in";

    if (currentUrl !== loginUrl) {
      window.location.href = loginUrl;
    }
  }
}, 1000);

const App = () => {
  return (
    <StrictMode>
      <Flowbite theme={{ theme }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated() ? (
                  <DashboardPage />
                ) : (
                  <Navigate to="/authentication/sign-in" replace />
                )
              }
            />
            <Route
              path="/authentication/sign-in"
              element={<SignInPage />}
            />
            <Route
              path="/authentication/sign-up"
              element={isAuthenticated() ? (<SignUpPage />):(<Navigate to="/authentication/sign-in" replace />)}
            />
            <Route
              path="/transaksi"
              element={isAuthenticated() ? (<EcommerceProductsPage />):(<Navigate to="/authentication/sign-in" replace />)}
            />
            <Route
              path="/akun"
              element={isAuthenticated() ? (<AkunPage />):(<Navigate to="/authentication/sign-in" replace />)}
            />
            <Route
              path="/kepemilikan"
              element={isAuthenticated() ? (<KepemilikanPage />):(<Navigate to="/authentication/sign-in" replace />)}
            />
            <Route path="/users/list" element={isAuthenticated() ? (<UserListPage />):(<Navigate to="/authentication/sign-in" replace />)} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </StrictMode>
  );
};

const LazyApp = () => (
  <Suspense fallback=
  {
    
  <div>Loading...</div>
  
  }>
    <App />
  </Suspense>
);

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

ReactDOM.render(<LazyApp />, container);
