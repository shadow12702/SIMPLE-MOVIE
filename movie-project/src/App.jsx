import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import HomePage from "./page/HomePage";
import Banner from "./components/banner/Banner";
import MoviesPage from "./page/MoviesPage";
import MoviesDetails from "./page/MoviesDetails";


function App() {
	return (
		<Fragment>
			<Routes>
				<Route element={<Main></Main>}>
					<Route
						path="/"
						element={
							<>
								<Banner></Banner>
								<HomePage></HomePage>
							</>
						}></Route>
					<Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
					<Route path="/movies/:moviesId" element={<MoviesDetails></MoviesDetails>}></Route>
				</Route>
			</Routes>
		</Fragment>
	);
}

export default App;
