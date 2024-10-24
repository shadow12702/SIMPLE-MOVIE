import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import { fetcher } from "../../config";
import useSWR from "swr";
import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
//https://api.themoviedb.org/3/movie/now_playing?api_key=f934394b528a0727846db6099da96f4e

//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1

const MovieList = ({ type = "now_playing" }) => {
	// const [movies, setMovies] = useState([]);
	
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${type}?api_key=f934394b528a0727846db6099da96f4e `,
		fetcher
	);

	// useEffect(() => {
	// 	if (data && data.results) setMovies(data.results);
	// }, [data]);
	// console.log(movies);

	const movies = data?.results || [];
	

	return (
		<div>
			<div className="movie-list">
				<Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
					{movies.length > 0 &&
						movies.map((item) => (
							<SwiperSlide key={item.id}>
								<MovieCard item={item}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};
MovieList.propTypes = {
	// type: PropTypes.shape({}),
	type: PropTypes.string
};
export default MovieList;
