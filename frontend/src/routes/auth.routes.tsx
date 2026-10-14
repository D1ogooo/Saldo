import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/Notfound";
import { SignIn } from "../pages/(Auth)/signin";
import { SignUp } from "../pages/(Auth)/signup";

export function AuthRoutes() {
	return (
		<Routes>
		 <Route index element={<SignIn />} />
         <Route path="/signup" element={<SignUp />} />
		 <Route path="*" element={<NotFound />} />
		</Routes>
	);
}