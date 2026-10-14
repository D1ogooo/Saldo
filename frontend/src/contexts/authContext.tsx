import React, { useState, useEffect, useContext, createContext } from "react";
import { api } from "../services/api";
import { ContextType } from "../../../frontend/@types/AuthTypes";

const AuthContext = createContext({} as ContextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
	const [role, setRole] = useState("");
	const [data, setData] = useState({});

	useEffect(() => {
	 const user = localStorage.getItem("@Financas:user");
	 const token = localStorage.getItem("@Financas:token");

	 if (user && token) {
	   setData({ user: JSON.parse(user), token });
	   api.defaults.headers.authorization = `Bearer ${token}`;
	 }
	}, []);

	async function signin({ email, password }: { email: string; password: string }) {
		try {
			const res = await api.post("/users/session", { email, password });
			const { user, token } = res.data;

			localStorage.setItem("@Financas:user", JSON.stringify(user));
			localStorage.setItem("@Financas:token", token);
			api.defaults.headers.authorization = `Bearer ${token}`;
			setData({ user, token });
		} catch (error) {
			alert("Usuário ou senha inválidos");
			return;
		}
	}

	async function signup({ name, email, password }: { name: string; email: string; password: string }) {
		try {
			await api.post("/users/create", {
				name,
				email,
				password,
			});
		} catch (error) {
			alert(error);
		}
	}

	async function loggout() {
		localStorage.removeItem("@Financas:user");
		localStorage.removeItem("@Financas:token");
		api.defaults.headers.authorization = "";
		setData({});
	}

	return (
		<AuthContext.Provider
			value={{ role, user: data.user, signin, signup, loggout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };