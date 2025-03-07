import { useContext, useEffect, Fragment } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
	const { posts } = useContext(AuthContext);

	useEffect(() => {
		console.log(posts);
	}, [posts]);

	return (
		<>
			{posts.length > 0 ? (
				posts.map((post) => (
					<Fragment key={post._id}>
						<div className="postContainer">
							<div>{post.username}</div>
                            <div>{post.createdAt}</div>
							<div>{post.postText}</div>
						</div>
					</Fragment>
				))
			) : (
				<>
					<div>No posts to show...</div>
				</>
			)}
		</>
	);
};

export default Profile;
