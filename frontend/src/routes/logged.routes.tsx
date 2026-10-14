import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/Notfound";

export function LoggedRoutes() {
	return (
		<Routes>
		 <Route index element={<Home />} />
		 <Route path="*" element={<NotFound />} />
		</Routes>
	);
}