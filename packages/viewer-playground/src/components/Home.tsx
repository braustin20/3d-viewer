import React, { ReactElement } from "react";
//import { useDispatch } from "react-redux";
//import { delayedShowLoadingOverlay, showLoadingOverlay } from "../store/loadingOverlay/loadingOverlayActions";
import "@braustin20/product-viewer";

function Home(): ReactElement {
	//const dispatch = useDispatch();

	// const handleShowLoading = () => {
	// 	dispatch(showLoadingOverlay(true, "Loading something!"));
	// };

	// const handleDelayedShowLoading = () => {
	// 	dispatch(delayedShowLoadingOverlay(1000, "Loading something!"));
	// };

	return (
		<div className="App">
			<div style={{ width: "100%" }}>
				<product-viewer />
			</div>
		</div>
	);
}

export default Home;
