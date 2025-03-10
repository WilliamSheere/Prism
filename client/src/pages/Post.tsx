import "../styles/Post.css";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Post = () => {
	const { user } = useContext(AuthContext);
	const [addPost] = useMutation(ADD_POST);
	const [postText, setPostText] = useState("");
	const [tags, setTags] = useState("");
	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		await addPost({
			variables: { username: user?.username, postText: postText, tags: tags.split(" ") },
		});
	};
	useEffect(() => {
		console.log(user);
	}, [user]);
	const handleChange = (e: any) => {
		if (e.target.name === "postText") {
			setPostText(e.target.value);
		}
		if (e.target.name === "tags") {
			setTags(e.target.value);
		}
	};

	return (
		<>
			<div className="createPostContainer">
				<form onSubmit={handleFormSubmit}>
					<h2>Create a Post</h2>
					<label htmlFor="postText">Description:</label>
					<textarea
						id="postText"
						name="postText"
						rows={3}
						onChange={handleChange}
					/>
					<label htmlFor="tags">Tags:</label>
					<input
						id="tags"
						name="tags"
						onChange={handleChange}
					/>

					<button type="submit">Submit</button>
				</form>
			</div>
		</>
	);
};

export default Post;
