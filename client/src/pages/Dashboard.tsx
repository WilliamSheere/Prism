import "../styles/Dashboard.css";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import { useEffect, useState, Fragment } from "react";

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
const Dashboard = () => {
	const { loading, data } = useQuery(QUERY_POSTS);
	const postData: any = data?.posts || null;
	const [allPosts, setAllPosts] = useState([]);

	useEffect(() => {
		if (loading || !postData) {
			return;
		}
		const oneWeekAgo = Date.now() - 1 * 24 * 60 * 60 * 1000;
		setAllPosts(
			postData.filter((post: any) => Number(post.createdAt) >= oneWeekAgo)
		);
	}, [loading]);

	useEffect(() => {
		console.log(allPosts);
		// const oneWeekAgo = Date.now() - 1 * 24 * 60 * 60 * 1000;

		// const recentPosts = allPosts.filter(
		// 	(post:any) => Number(post.createdAt) >= oneWeekAgo
		// );
		// console.log(recentPosts)
	}, [allPosts]);

	return (
		<div className="dashboardPage">
			<section className="trendingSection">
				<div className="trendingContainer">
					<h2>Trending</h2>
					{allPosts.length > 0 ? (
									allPosts.map((post:any) => (
										<Fragment key={post._id}>
											<div className="trendingPost">
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
				</div>
			</section>
				<section className="dashboardOptions">
					<label htmlFor="Search">Search:</label>
					<input type="text" />
				
				<NavLink to="/post">Create Post</NavLink>
				</section>
		</div>
	);
};

export default Dashboard;
