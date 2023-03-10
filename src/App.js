import React from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	BrowserRouter,
	Routes,
	Route,
	RouterProvider,
} from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Selectplan from "./pages/Selectplan";
import Addons from "./pages/Addons";
import Summary from "./pages/Summary";
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route basename="/multi-step-form-react">
			<Route exact path="/multi-step-form-react" element={<Mainpage />} />
			<Route
				path="/multi-step-form-react/select"
				element={<Selectplan />}
			/>
			<Route path="/multi-step-form-react/addons" element={<Addons />} />
			<Route
				path="/multi-step-form-react/summary"
				element={<Summary />}
			/>
		</Route>
	)
);
export default function App() {
	return (
		<main className="container">
			<div className="cardWrapper">
				<RouterProvider router={router} />
			</div>
		</main>
	);
}
