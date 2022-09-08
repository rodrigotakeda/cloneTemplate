import GlobalState from "../../../contexts/globalState";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { withScorm } from "react-scorm-provider";

const Props = (props) => {
	const isScorm = props.sco.apiConnected;
	const [load, setLoad] = useState(false);
	const { menuPages, setMenuPages } = useContext(GlobalState);
	const { startPage, setStartPage } = useContext(GlobalState);

	useEffect(() => {
		if (props.sco && isScorm && !load) {
			if (props.sco.suspendData.menu) { setMenuPages(props.sco.suspendData.menu); }
			if (props.sco.suspendData.paginaInicial) { setStartPage(props.sco.suspendData.paginaInicial); }
			setLoad(true)
		} else if (!load) {
			const strData = window.sessionStorage.getItem('cmi.suspend_data');
			let splitData = JSON.parse(strData);
			
			if (splitData !== null) { 
				setMenuPages(splitData.menu);

				if (splitData.menu !== 0) {
					let newCounter = Number(0);
					splitData.menu.forEach(obj => { if (obj === 1) newCounter++; })
					if (newCounter > splitData.paginaInicial) {
					setStartPage(newCounter);
					} else {
					setStartPage(splitData.paginaInicial);    
					}
				}
			}

			setLoad(true)
		}

		if (load) { }
	}, [isScorm, load, startPage, menuPages]);
  
    return (
        <Fragment></Fragment>
    );
};

const LoadScorm = withScorm()(Props);
export default LoadScorm;