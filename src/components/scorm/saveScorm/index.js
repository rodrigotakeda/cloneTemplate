import GlobalState from "../../../contexts/globalState";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { withScorm } from "react-scorm-provider";

const Props = (props) => {
	const isScorm = props.sco.apiConnected;

	const [strScorm, setStrScorm] = useState({});
	const [suspendData, setSuspendData] = useState({});

	const { menuPages } = useContext(GlobalState);
	const { startPage } = useContext(GlobalState);
	
	useEffect(() => {
		setSuspendData({ "menu": menuPages, "paginaInicial": startPage })
	}, [startPage, menuPages])

	useEffect(() => {
		setStrScorm({
			"menu": suspendData.menu, 
			"paginaInicial": suspendData.paginaInicial
		})
	}, [suspendData])

	useEffect(() => {
		// console.log('Scorm: ', strScorm)
		if(isScorm) {
			props.sco.setSuspendData('dataCurso', JSON.stringify(strScorm));
		} else {
			window.sessionStorage.setItem('cmi.suspend_data', JSON.stringify(strScorm)); }
	}, [strScorm])

    return (
       <Fragment></Fragment>
    );
};

const SaveScorm = withScorm()(Props);
export default SaveScorm;