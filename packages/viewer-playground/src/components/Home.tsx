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
			<product-viewer modelUrl="https://storage.googleapis.com/lils-prod-corgis-permalinks/1002274076-standard.glb" />
		</div>
	);
}

export default Home;
