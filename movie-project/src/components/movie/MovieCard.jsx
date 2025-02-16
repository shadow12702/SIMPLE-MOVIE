import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
	const { title, release_date, vote_average, poster_path, id } = item;
	const navigate = useNavigate();
	return (
		<div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 select-none h-full">
			<img
				src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
				alt=""
				className="w-full h-[250px] object-cover rounded-lg mb-5"
			/>
			<div className="flex flex-col flex-1">
				<h3 className=" font-bold mb-3  text-2xl text-white">{title} </h3>
				<div className="flex items-center justify-between text-sm opacity-50 mb-10">
					<span>{new Date(release_date).getFullYear()}</span>
					<span>{vote_average}</span>
				</div>
				<button onClick={() => navigate(`/movies/${id}`)} className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto">
					Watch now
				</button>
			</div>
		</div>
	);
};
MovieCard.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		vote_average: PropTypes.number,
		release_date: PropTypes.string,
		poster_path: PropTypes.string,
		id: PropTypes.number,
	}),
};

export default MovieCard;
