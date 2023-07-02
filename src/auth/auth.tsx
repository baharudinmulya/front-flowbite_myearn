import jwt_decode from "jwt-decode";

export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken: any = jwt_decode(token);

      // Check token expiration
      const currentTime: number = Math.floor(Date.now() / 1000); // Get current time in seconds

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token has expired
        return false;
      }

      // Token is valid
      return true;
    } catch (error) {
      // Error decoding token
      console.error("Error decoding token:", error);
    }
  }

  // No token found or error decoding token
  return false;
}

let alertShown = false;

setInterval(() => {
  isAuthenticated();
  if (!isAuthenticated()) {
    // Token expired, redirect to sign-in
    localStorage.removeItem("token");
    const currentUrl = window.location.pathname;
    const loginUrl = "/authentication/sign-in";

    if (currentUrl !== loginUrl && !alertShown) {
      alert("Durasi Login habis");
      alertShown = true;
      window.location.href = loginUrl;
    }
  }
}, 1000); // Change the interval as needed

