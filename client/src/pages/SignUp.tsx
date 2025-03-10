import "../styles/SignUp.css";
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth.js';
import { useState } from "react";
const SignUp = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	// const navigate = useNavigate();
	const [addUser] = useMutation(ADD_USER);

	const handleChange = (e:any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e:any) => {
		e.preventDefault();
		try {
			const { data } = await addUser({
				variables: { input: { ...formData} },
			});
			// localStorage.setItem("token", data.signup.token);
		Auth.login(data.addUser.token);
			// navigate("/home");
		} catch (err) {
			console.error("Signup error:", err);
		}
	};

	return (
		<div id="signUp">
			<div>
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
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
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};



export default SignUp;
