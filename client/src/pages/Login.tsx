import "../styles/Login.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth.js";
import { useContext,useState } from "react";
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
		<div id="login">
			<div>
				<h2>Login</h2>
				<form onSubmit={handleSubmit} className="mt-4">
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<button
						type="submit"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
	

export default Login;
