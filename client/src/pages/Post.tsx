import "../styles/Post.css";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Post = () => {
	const { user } = useContext(AuthContext);
	const [addPost] = useMutation(ADD_POST);
	const [postText, setPostText] = useState("");
	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		await addPost({
			variables: { username: user?.username, postText: postText },
		});
	};
	useEffect(() => {
		console.log(user);
	}, [user]);
	const handleChange = (e: any) => {
		setPostText(e.target.value);
	};

	return (
		<>
			<div className="createPostContainer">
				<form onSubmit={handleFormSubmit}>
					<label htmlFor="postText">Create a Post</label>
					<textarea id="postText" rows={3} onChange={handleChange} />
					<button type="submit">Submit</button>
				</form>
			</div>
		</>
	);
};

export default Post;
