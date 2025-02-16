import { Fragment } from "react";
import MovieList from "../components/movie/MovieList";


const HomePage = () => {
	return (
		<Fragment>
		
			<section className="movies-layout page-container pb-10 text-white">
				<h2 className="capitalize  mb-5 text-3xl font-bold">Now play</h2>
				<MovieList></MovieList>
			</section>

			<section className="movies-layout page-container pb-10 text-white">
				<h2 className="capitalize  mb-5 text-3xl font-bold">Top rated</h2>
				<MovieList type="top_rated"></MovieList>
			</section>

			<section className="movies-layout page-container pb-10 text-white">
				<h2 className="capitalize  mb-5 text-3xl font-bold">Trending</h2>
				<MovieList type="popular"></MovieList>
			</section>
		</Fragment>
	);
};

export default HomePage;
