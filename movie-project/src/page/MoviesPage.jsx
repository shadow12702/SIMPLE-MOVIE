import { useEffect, useState } from "react";
import MovieCard from "../components/movie/MovieCard";
import { fetcher } from "../config";
import useSWR from "swr";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;
const MoviesPage = () => {
	const [nextPage, setNextPage] = useState(1);
	const [filter, setFilter] = useState("");
	const filterDebounce = useDebounce(filter, 500);
	const [url, setUrl] = useState(
		`https://api.themoviedb.org/3/movie/popular?api_key=f934394b528a0727846db6099da96f4e&page=${nextPage}`
	);
	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};
	const { data, error } = useSWR(url, fetcher);
	const loading = !data && !error;
	useEffect(() => {
		if (filterDebounce) {
			setUrl(
				`https://api.themoviedb.org/3/search/movie?api_key=f934394b528a0727846db6099da96f4e&query=${filterDebounce}&page=${nextPage}`
			);
		} else {
			setUrl(
				`https://api.themoviedb.org/3/movie/popular?api_key=f934394b528a0727846db6099da96f4e&page=${nextPage}`
			);
		}
	}, [filterDebounce, nextPage]);
	/////////
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	///////////////////////////////////////////////////////////
	useEffect(() => {
		if (!data || !data.total_results) return;
		setPageCount(Math.ceil(data.total_results / itemsPerPage));
	}, [data, itemOffset]);
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.total_results;
		setItemOffset(newOffset);
		setNextPage(event.selected + 1);
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (!data) return null;
	const movies = data?.results || [];

	return (
		<div className="py-5 px-20">
			<div className="flex page-container mb-10 ">
				<div className="flex-1 ">
					<input
						type="text"
						className="w-full p-4 text-white bg-slate-800 outline-none"
						placeholder="search to here"
						onChange={handleFilterChange}
					/>
				</div>
				<button className="p-4 bg-primary text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</button>
			</div>

			{loading && (
				<div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
			)}

			<div className="grid grid-cols-4 gap-10 mb-10 ">
				{!loading &&
					movies.length > 0 &&
					movies.map((item) => (
						<MovieCard key={item.id} item={item}></MovieCard>
					))}
			</div>

			<div className="mt-10">
				<ReactPaginate
					breakLabel="..."
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="< previous"
					renderOnZeroPageCount={null}
					className="pagination"
				/>
			</div>

			<div className="flex items-center justify-center gap-5 hidden">
				<span
					className="cursor-pointer"
					onClick={() => setNextPage(nextPage - 1)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
						/>
					</svg>
				</span>

				<span className="cursor-pointer inline-block p-1 bg-white text-slate-900">
					1
				</span>
				<span
					className="cursor-pointer"
					onClick={() => setNextPage(nextPage + 1)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</span>
			</div>
		</div>
	);
};

export default MoviesPage;
