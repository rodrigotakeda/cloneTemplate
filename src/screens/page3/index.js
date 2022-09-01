// React Elements/Hooks
import { Fragment } from "react/cjs/react.production.min";
import { useState, useEffect } from "react";

// Components
import Header from "../../components/header";
import Wrapper from "../../components/wrapper";
import Footer from "../../components/footer";
import TituloTextos from "./customComponents/titulosTextos";
import Title from "../../components/texts/title";
import ProgressPage from "../../components/progressPage";
import BotoesNavegacao from "./customComponents/botoesNavegacao";

function Page3() {
  const [temaCor, setTemaCor] = useState("custom"); //seta a cor do tema no body. Passar uma classe aqui caso queira iniciar com um tema
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (temaCor) {
      document.body.classList.value.search("ios") !== -1
        ? (document.body.className = "ios")
        : (document.body.className = "");

      document.body.classList.add(temaCor);
    }
  }, [temaCor]);

  return (
    <Fragment>
      <ProgressPage className="textBar d-none" />
      <Header hideOnScroll setTemaCor={setTemaCor} pageAtual={3} className="" />
      <Wrapper>
        <TituloTextos sectionTitle="Page 3" />
        <Title typeH="1" className="" content={<Fragment>Page 3</Fragment>} />
        <hr />
        <TituloTextos sectionTitle="Page 3" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <BotoesNavegacao />
      </Wrapper>

      <Footer fixed className="" />
    </Fragment>
  );
}

export default Page3;
