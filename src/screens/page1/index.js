// React Elements/Hooks
import { Fragment } from "react/cjs/react.production.min";
import { useState, useEffect, useContext } from "react";

// Components
import Header from "../../components/header";
import Wrapper from "../../components/wrapper";
import Footer from "../../components/footer";
import TituloTextos from "./customComponents/titulosTextos";
import Title from "../../components/texts/title";
import ProgressPage from "../../components/progressPage";
import BotoesNavegacao from "./customComponents/botoesNavegacao";
import LoadPage from "../../components/loadPage";

function Page1() {
  const [temaCor, setTemaCor] = useState("custom"); //seta a cor do tema no body. Passar uma classe aqui caso queira iniciar com um tema

  useEffect(() => {
    if (temaCor) {
      document.body.classList.value.search("ios") !== -1
        ? (document.body.className = "ios")
        : (document.body.className = "");

      document.body.classList.add(temaCor);
    }
  }, [temaCor]);

  return (
    <LoadPage>
      <ProgressPage className="textBar d-none" />
      <Header hideOnScroll setTemaCor={setTemaCor} pageAtual={1} className="" />
      <Wrapper>
        <Title typeH="1" className="" content={<Fragment>Page 1</Fragment>} />
      </Wrapper>

      <Footer fixed className="" />
    </LoadPage>
  );
}

export default Page1;
