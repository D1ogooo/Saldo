export interface AuthData {
    user: {
        id: string;
        email: string;
    };
    token: string;
}

export interface AuthProviderType {
	children: React.ReactNode;
}

export interface LoginType {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface RegisterType {
	name: string;
	email: string;
	password: string;
}

export interface ContextType extends Pick<AuthData, "user"> {
    session: (data: LoginType) => Promise<void>;
    registro: (data: RegisterType) => Promise<void>;
    loggout: () => void;
}