import React from "react";
import { withScorm } from "react-scorm-provider";

const Props = (props) => {
	function saveScorm() {
		let strScorm = {
			menu: avatarImg, 
			paginaInicial: apelidoTxt
		};

		strScorm = JSON.stringify(strScorm);
		strScorm = strScorm.split('"').join("!");

		//var strScorm = avatarImg + '|' + apelidoTxt + '|' + questaoInicial + '|' + arrPassos + '|' + arrBadges + '|' + totalPontos;
		if (parent.lms) {
			parent.lms.suspend_data.set(strScorm);
		} else {
			$.cookie("cmi.suspend_data", strScorm, { expires: date }); }

		if(lastPasso) {
			console.log('Enter')
			if (parent.lms) {
				parent.lms.lesson_status.set("completed");
			} else {
				$.cookie("cmi.core.lesson_status", "completed", { expires: date }); }
		}
	}

	function loadScorm() {
		if (parent.lms){
			//user = parent.lms.user.get();
			if(parent.lms.suspend_data.get() != "null"){
				console.log("data from scorm");
				dados = parent.lms.suspend_data.get();
			}
		} else {
			if($.cookie("cmi.suspend_data") != "") {
				console.log("data from cookie");
				dados = $.cookie("cmi.suspend_data");
			}
		}

		if(dados != null && dados != undefined && dados != 'undefined' && dados != '') { 
			console.log('Dados: ' + dados); 

			str = dados.split("!").join('"');
			splitData = JSON.parse(str);

			avatarImg = splitData.avatar;
			apelidoTxt = splitData.nome;
			numTentativas = Number(splitData.tentativas);
			//questaoInicial = Number(splitData.questao);
			arrPassos = splitData.passos;
			arrBadges = splitData.badge;

			if($.isNumeric(splitData.pontos))
				totalPontos = Number(splitData.pontos);
			else 
				totalPontos = Number(0);

			/*splitData = dados.split('|');
			avatarImg = splitData[0];
			apelidoTxt = splitData[1];

			questaoInicial = Number(splitData[2]);

			arrPassos = splitData[3].split(',');
			arrBadges = splitData[4].split(',');

			if($.isNumeric(splitData[5]))
				totalPontos = Number(splitData[5]);
			else 
				totalPontos = Number(0); */

			$('.avatar').addClass('avatar' + avatarImg);
			$('.apelido').html(apelidoTxt);
			dataLoaded = true;
			liberaIntro = true;
		}
	}
  
    return (
        <div>
            <p>Welcome, {props.sco.learnerName}!</p>
            <p>Your course status is currently: {props.sco.completionStatus}</p>
            <p>Click the button below to complete the course!</p>
            <button onClick={() => props.sco.setStatus("completed")}>
                Mark me complete!
            </button>
        </div>
    );
};

const LoadScorm = withScorm()(Props);
export default LoadScorm;