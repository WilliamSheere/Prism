import "../styles/Landing.css";
import Banner from "../assets/banner.jpg";

const Landing = () => {
	return <div id="landing">
		<img id="banner" src={Banner} alt="prism banner"/>
		<div id="bannerText">
		<h1>Prism</h1>
		<h3>this is the slogan</h3>
		</div>
	</div>;
};

export default Landing;
