import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, keyApi } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
const MoviesDetails = () => {
	const { moviesId } = useParams();
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${moviesId}?api_key=${keyApi} `,
		fetcher
	);
	if (!data) return null;
	const { backdrop_path, poster_path, title, genres, overview } = data;
	return (
		<div className="py-10">
			<div className="w-full h-[600px] relative">
				<div className="absolute inset-0 bg-black bg-opacity-60"></div>
				<div
					className="w-full h-full bg-cover bg-no-repeat"
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
					}}></div>
			</div>
			<div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 ">
				<img
					src={`https://image.tmdb.org/t/p/original/${poster_path}`}
					alt=""
					className="w-full h-full object-cover rounded-xl"
				/>
			</div>
			<h1 className="text-center text-white text-3xl font-bold mb-10">
				{title}
			</h1>

			{genres.length > 0 && (
				<div className="flex items-center gap-x-5 mb-10 justify-center">
					{genres.map((item) => (
						<span
							className="py-2 px-4 border-primary text-primary border rounede"
							key={item.id}>
							{item.name}
						</span>
					))}
				</div>
			)}
			<p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
				{overview}
			</p>
			<MoviesCredits></MoviesCredits>
			<MovieVideos></MovieVideos>
			<MoviesSimilar></MoviesSimilar>
		</div>
	);
};

function MoviesCredits() {
	const { moviesId } = useParams();
	const { data } = useSWR(
		`
        https://api.themoviedb.org/3/movie/${moviesId}/credits?api_key=${keyApi} `,
		fetcher
	);

	if (!data) return null;
	const { cast } = data;
	if (!cast || cast.length <= 0) return null;
	return (
		<div className="py-10">
			<h2 className="text-center font-bold text-4xl mb-10">Cast</h2>
			<div className="grid grid-cols-4 gap-5">
				{cast.slice(0, 4).map((item) => (
					<div className="cast-item mx-5" key={item.id}>
						<img
							src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
							className="w-full h-[350] object-cover rounded-lg mb-3"
							alt=""
						/>
						<h3 className="text-2xl">{item.name}</h3>
					</div>
				))}
			</div>
		</div>
	);
}

function MovieVideos() {
	const { moviesId } = useParams();
	const { data } = useSWR(
		`
        https://api.themoviedb.org/3/movie/${moviesId}/videos?api_key=${keyApi} `,
		fetcher
	);
	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<>
			<h2 className="text-center font-bold text-4xl">Trailer</h2>
			<div className="py-10 max-w-[1080px]  mx-auto">
				{results.slice(0, 1).map((item) => (
					<div key={item.id} className="py-5">
						<iframe
							width="942"
							height="530"
							src={`https://www.youtube.com/embed/${item.key}`}
							title="Are These Prices Unfair?"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							className="w-full"></iframe>
					</div>
				))}
			</div>
		</>
	);
}

function MoviesSimilar() {
	const { moviesId } = useParams();
	const { data } = useSWR(
		`
        https://api.themoviedb.org/3/movie/${moviesId}/similar?api_key=${keyApi} `,
		fetcher
	);

	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<div className="py-10">
			<h2 className="text-3xl font-medium mb-10 text-center">Similar Movies</h2>
			<div className="movie-list">
				<Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
					{results.length > 0 &&
						results.map((item) => (
							<SwiperSlide key={item.id}>
								<MovieCard item={item}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
}

export default MoviesDetails;
