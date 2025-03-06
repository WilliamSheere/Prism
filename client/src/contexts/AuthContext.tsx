import {
	createContext,
	useState,
	Dispatch,
	SetStateAction,
	ReactNode,
	useEffect,
} from "react";
// import Auth from '../utils/auth.js';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

interface User {
	id: string;
	username: string;
	email: string;
}

interface AuthContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
	user: User | null;
}

// Create the context with an initial undefined value
export const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	setIsLoggedIn: () => {},
	user: null,
} as AuthContextType);

// The AuthProvider component manages the isLoggedIn state for the application.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	// Define a state variable 'isLoggedIn' with an initial value of false.
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { loading, data } = useQuery(QUERY_ME);
	const [user, setUser] = useState(null);
	const userData: any = data?.me || null;
	useEffect(() => {
		console.log("useEffect");
		if (loading || !userData) {
			return;
		}
		setUser(userData);
		console.log(userData);
		setIsLoggedIn(true);
	}, [loading]);

	// Provide the isLoggedIn state and functions to the context.
	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
			{children}
		</AuthContext.Provider>
	);
};
