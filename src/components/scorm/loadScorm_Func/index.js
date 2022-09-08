function loadScorm_Func(props) {
	const isScorm = props.apiConnected;
	let startPage = Number(0);
	let menuPages = [];

	if (props && isScorm) {
		// if (props.sco.suspendData.menu) { setMenuPages(props.sco.suspendData.menu); }
		// if (props.sco.suspendData.paginaInicial) { setStartPage(props.sco.suspendData.paginaInicial); }
	} else {
		const strData = window.sessionStorage.getItem('cmi.suspend_data');
		let data = JSON.parse(strData);
		
		if (data !== null) { 
			if (data.menu !== 0) {
				let newCounter = Number(0);
				data.menu.forEach(obj => { if (obj === 1) newCounter++; })
				if (newCounter > data.paginaInicial) {
					// setStartPage(newCounter);
				} else {
					// setStartPage(splitData.paginaInicial);    
				}
			}
		} else {
			data = {
				"menu": menuPages,
				"paginaInicial": startPage
			}
		}

		return { data }
	}
}

export default loadScorm_Func;