import { Button } from "@material-ui/core";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import logo from "../logo.svg";
import { delayedShowLoadingOverlay, showLoadingOverlay } from "../store/loadingOverlay/loadingOverlayActions";

function Home(): ReactElement {
	const dispatch = useDispatch();

	const handleShowLoading = () => {
		dispatch(showLoadingOverlay(true, "Loading something!"));
	};

	const handleDelayedShowLoading = () => {
		dispatch(delayedShowLoadingOverlay(1000, "Loading something!"));
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					React-template built successfully! <br />
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<Button color="primary" variant="contained" onClick={handleShowLoading}>
					Show Loading Overlay
				</Button>
				<br />
				<Button color="primary" variant="contained" onClick={handleDelayedShowLoading}>
					Show Loading Overlay In 1 second
				</Button>
			</header>
		</div>
	);
}

export default Home;
