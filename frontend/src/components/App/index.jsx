import React from "react";
import { Route, Switch } from "react-router-dom";

import MainPage from "@/containers/Main";
import ResultPage from "@/containers/Sub";

import "./App.css";

export const MAIN_PAGE_ROUTE = "/";
export const SUB_PAGE_ROUTE = "/sub";

const App = () => {
	const renderPageMain = () => <MainPage />;
	const renderResultPage = () => <ResultPage />;
	return (
		<Switch>
			<Route exact path={MAIN_PAGE_ROUTE} component={renderPageMain} />
			<Route exact path={SUB_PAGE_ROUTE} component={renderResultPage} />
		</Switch>
	);
};

export default App;
