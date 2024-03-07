import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, email, password) => {
    try {
      setError(null);
      setIsLoading(true);

      let res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      console.log("data", data);
      localStorage.setItem("user", JSON.stringify(data));
      if (res.ok) dispatch({ type: "LOGIN", payload: data });
      if (!res.ok) {
        console.log("error", data.error);
        setError(data.error);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, isLoading, signup };
};

export default useSignup;
