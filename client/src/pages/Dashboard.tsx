import "../styles/Dashboard.css";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import { useEffect, useState, Fragment } from "react";
import CommentForm from "../components/CommentForm";

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
	// const postData: any = data?.posts || null;
	const [allPosts, setAllPosts] = useState([]);
	const [trendingPosts, setTrendingPosts] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [filteredPosts, setFilteredPosts] = useState([]);

	useEffect(() => {
		if (loading || !data.posts) {
			return;
		}
		setAllPosts(data.posts);
		const oneWeekAgo = Date.now() - 1 * 24 * 60 * 60 * 1000;
		setTrendingPosts(
			data.posts.filter((post: any) => Number(post.createdAt) >= oneWeekAgo)
		);
	}, [loading, data]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	const handleChange = (e: any) => {
		setSearchValue(e.target.value);
	};
	
	useEffect(() => {
		setFilteredPosts(
			allPosts.filter((element: any) => element.tags.includes(searchValue))
		);
	}, [searchValue, allPosts]);

	return (
		<div className="dashboardPage">
			<div className="dashboardTop">
				<section className="trendingSection">
					<div className="trendingContainer">
						<h2>Trending</h2>
						{trendingPosts.length > 0 ? (
							trendingPosts.map((post: any) => (
								<Fragment key={post._id}>
									<div className="trendingPost">
										<div>{post.username}</div>
										<div>{formatUnixToDate(post.createdAt)}</div>
										<div className="postText">{post.postText}</div>
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
					<label htmlFor="search">Search:</label>
					<input
						type="text"
						id="search"
						onChange={handleChange}
						value={searchValue}
					/>

					<NavLink to="/post">Create Post</NavLink>
				</section>
			</div>
			<section>
				{filteredPosts.length > 0 ? (
					filteredPosts.map((post: any) => (
						<Fragment key={post._id}>
							<div key={post._id} className="trendingPost">
								<div>{post.username}</div>
								<div>{formatUnixToDate(post.createdAt)}</div>
								<div className="postText">{post.postText}</div>
								{post.comments.length > 0 &&
									post.comments.map((comment: any) => (
										<div className="commentPost" key={comment._id}>
											<div>{comment.username}</div>
											<div>{formatUnixToDate(comment.createdAt)}</div>
											<div className="commentText">{comment.commentText}</div>
										</div>
									))}
								<CommentForm postId={post._id} />
							</div>
						</Fragment>
					))
				) : (
					<></>
				)}
			</section>
		</div>
	);
};

export default Dashboard;
