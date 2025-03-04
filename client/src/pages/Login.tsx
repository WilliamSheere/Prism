import "../styles/Login.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth.js";
import { useContext, useEffect,useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

const Login = () => {
	const { setIsLoggedIn } = useContext(AuthContext);
	const [formData, setFormData] = useState({ email: "", password: "" });
	
	const [login] = useMutation(LOGIN_USER);

	const handleChange = (e:any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e:any) => {
		e.preventDefault();
		try {
			const { data } = await login({
				variables: { ...formData },
			});

			Auth.login(data.login.token);
			setIsLoggedIn(true)
		} catch (err) {
			console.error("Login error:", err);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold text-center">Login</h2>
				<form onSubmit={handleSubmit} className="mt-4">
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 mb-3 border rounded"
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						className="w-full p-2 mb-3 border rounded"
						required
					/>
					<button
						type="submit"
						className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
	

export default Login;
