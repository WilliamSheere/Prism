import "../styles/Dashboard.css";
import { NavLink } from "react-router-dom";
const Dashboard = () => {
	return (
		<div className="dashboardPage">
			<section className="trendingSection">
				<div className="trendingContainer">
					<h2>Trending</h2>
				</div>

			</section>
			<section>
				<div className="dashboardOptions">
					<label htmlFor="Search">Search</label>
					<input type="text" />
				</div>
				<NavLink to ="/post">Create Post</NavLink>
			</section>
		</div>
	);
};

export default Dashboard;
