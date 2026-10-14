import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { LoggedRoutes } from "./logged.routes";
import { AuthRoutes } from "./auth.routes";

export function Router() {
//   const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  let user = false

  return(
   <BrowserRouter>{
     user ? <LoggedRoutes /> : <AuthRoutes />
    }</BrowserRouter>
  );
}