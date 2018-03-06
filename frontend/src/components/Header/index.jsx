// @flow
import React from "react";
import styles from "./Header.css";

type Props = {
    title: number
};

const Header = (props: Props) => {
	const { title } = props;
	return <h1 className={styles.header}>{title}</h1>;
};

export default Header;
