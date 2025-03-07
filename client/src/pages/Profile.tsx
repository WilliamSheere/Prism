import { useContext, useEffect, Fragment } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Profile.css";

const formatUnixToDate = (unixTimestamp: number) => {
	const timestamp =
		unixTimestamp > 9999999999 ? unixTimestamp / 1000 : unixTimestamp;

	return new Date(timestamp * 1000).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
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
							<div>{formatUnixToDate(post.createdAt)}</div>
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
