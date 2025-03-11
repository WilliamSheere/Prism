import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";

const CommentForm = ({ postId }: { postId: any }) => {
	const [addComment] = useMutation(ADD_COMMENT);
	const [comment, setComment] = useState("");
	const handleChange = (e: any) => {
		setComment(e.target.value);
	};
	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		try {
			await addComment({
				variables: {
					postId: postId,
					commentText: comment,
				},
			});
			// window.location.href = "/Dashboard";
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form onSubmit={handleFormSubmit}>
			<input type="text" onChange={handleChange} />
			<button type="submit">Comment</button>
		</form>
	);
};

export default CommentForm;
