import "../styles/Dashboard.css";

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
			</section>
		</div>
	);
};

export default Dashboard;
