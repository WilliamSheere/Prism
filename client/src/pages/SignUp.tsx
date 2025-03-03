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
		<div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold text-center">Sign Up</h2>
				<form onSubmit={handleSubmit} className="mt-4">
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={formData.username}
						onChange={handleChange}
						className="w-full p-2 mb-3 border rounded"
						required
					/>
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
						className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
					>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};



export default SignUp;
