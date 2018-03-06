// @flow
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "@/components/Header";
import { someActionCreator } from "@/actions";
import type { Payload } from "@/types/MainTypes/Action";

type Props = {
    someActionCreator: (payload: Payload) => void,
    app: {
        number: number
    }
};
class PageMain extends Component<Props> {
	componentDidMount() {
		this.props.someActionCreator({ number: 234 });
	}

	render() {
		const { app: { number } } = this.props;
		return <Header title={number} />;
	}
}

const mapStateToProps = (state: Props) => ({ app: state.app });
const mapDispatchToProps = (dispatch: *) =>
	bindActionCreators(
		{
			someActionCreator
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(PageMain);
