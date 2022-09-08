function loadScorm_Func(props) {
	const isScorm = props.apiConnected;
	let startPage = Number(0);
	let menuPages = [];
	
	console.log('Props: ', props);
	// console.log('LS_Scorm: ', isScorm);

	if (props && isScorm) {
		const strData = props.suspendData.dataCurso;
		console.log('Load Data: ', strData);

		let data = JSON.parse(strData);
		
		if (data !== null) { 
			if (data.menu !== 0) {
				let newCounter = Number(0);
				data.menu.forEach(obj => { if (obj === 1) newCounter++; })
				
				if (newCounter > data.paginaInicial) {
					data.paginaInicial = newCounter;
				}
			}
		} else {
			data = {
				"menu": menuPages,
				"paginaInicial": startPage
			}
		}

		return { data }
	} else {
		// console.log('Load Data SS');

		const strData = window.sessionStorage.getItem('cmi.suspend_data');
		let data = JSON.parse(strData);
		
		if (data !== null) { 
			if (data.menu !== 0) {
				let newCounter = Number(0);
				data.menu.forEach(obj => { if (obj === 1) newCounter++; })
				
				if (newCounter > data.paginaInicial) {
					data.paginaInicial = newCounter;
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