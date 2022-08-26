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

function Page2() {
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
      <Header hideOnScroll setTemaCor={setTemaCor} pageAtual={2} className="" />
      <Wrapper>
        <TituloTextos sectionTitle="Títulos e textos" />
        <Title typeH="1" className="" content={<Fragment>Page 2</Fragment>} />
        <hr />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
        <TituloTextos sectionTitle="Títulos e textos" />
      </Wrapper>

      <Footer fixed className="" />
    </Fragment>
  );
}

export default Page2;
