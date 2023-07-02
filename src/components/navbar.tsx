import { useEffect, useState } from "react";
import type { FC } from "react";
import { DarkThemeToggle, Navbar, Dropdown } from "flowbite-react";
import Avatar from "../components/avatar";
import jwt_decode from "jwt-decode";

const ExampleNavbar: FC = function () {
  const [countdown, setCountdown] = useState("00:00:00:00");

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Add any additional logout logic here]
    window.location.href = "/authentication/sign-in";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds

        const timer = setInterval(() => {
          const remainingTime = Math.max(0, expirationTime - Date.now());
          const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
          const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
          const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
          const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000).toString().padStart(2, "0");

          setCountdown(`${days}:${hours}:${minutes}:${seconds}`);

          if (remainingTime <= 0) {
            clearInterval(timer);
            localStorage.removeItem("token");
            window.location.href = "/authentication/sign-in";
          }
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      } catch (error) {
        // Error decoding token
        console.error("Error decoding token:", error);
      }
    }
    return;
  }, []);

  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <img alt="" src="/images/logo.svg" className="mr-3 h-6 sm:h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Flowbite
              </span>
            </Navbar.Brand>
            {countdown !== "00:00:00:00" && (
              <span className="text-sm ml-2 text-gray-500 dark:text-gray-200">
                Token Expiration: {countdown}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <DarkThemeToggle />

            <Dropdown
              label={
                <Avatar
                  src="/images/avatar.jpg"
                  alt="Avatar"
                  size={8}
                  rounded
                />
              }
            >
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
