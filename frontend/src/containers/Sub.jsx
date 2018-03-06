// @flow
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import noop from "lodash/noop";

import { someActionCreator } from "../actions/index";
import Header from "../components/Header";

const DEFAULT_PAGE_TITLE = "webpack";

type Props = {
	title: string,
	someActionCreator: Function
};

class PageMain extends Component<Props> {
	static defaultProps = {
		someActionCreator: noop
	};

	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		this.props.someActionCreator();
	}

	render() {
		const { title = DEFAULT_PAGE_TITLE } = this.props;

		return <Header> {title} </Header>;
	}
}

const mapStateToProps = state => ({ app: state.app });
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			someActionCreator
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(PageMain);
