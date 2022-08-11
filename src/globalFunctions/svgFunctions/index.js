function svgFunctions(params) {
  return {
    ["handle1"]: function (params) {
      alert("crie uma função aqui");
    },
    ["clickButtonShowOneItem"]: function (botaoAtivoNum) {
      const { botoes, setAtivo } = params;
      const botoesClone = [...botoes];
      botoesClone.forEach((ativo, index) => {
        if (botaoAtivoNum === index) {
          botoesClone[index].check = true;
          botoesClone[index].isAtivo = true;
        } else {
          botoesClone[index].isAtivo = false;
        }
      });
      setAtivo(botoesClone);
    },
    ["clickButtonShow"]: function (botaoAtivoNum) {
      const { botoes, setAtivo } = params;
      const botoesClone = [...botoes];
      botoesClone[botaoAtivoNum].check = true;
      botoesClone[botaoAtivoNum].isAtivo = true;
      setAtivo(botoesClone);
    },
  };
}

export default svgFunctions;
