import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import { QUERY_POSTS } from "../utils/queries";

const CommentForm = ({ postId }: { postId: any }) => {
	const [addComment] = useMutation(ADD_COMMENT, {
		refetchQueries: [{ query: QUERY_POSTS }],
	});
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
		<form onSubmit={handleFormSubmit} id="commentForm">
			<input type="text" onChange={handleChange} />
			<button type="submit">Send</button>
		</form>
	);
};

export default CommentForm;
