// React Elements/Hooks
import { Fragment } from "react/cjs/react.production.min";
import { useState, useEffect } from "react";

// Components
import Header from "../../components/header";
import Wrapper from "../../components/wrapper";
import Footer from "../../components/footer";

import Title from "../../components/texts/title";
import Quizzes from "./customComponents/quizz";

function Quizz() {
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
      <Header hideOnScroll setTemaCor={setTemaCor} className="" />
      <Wrapper>
        <Title typeH="1" className="" content={<Fragment>Quizz</Fragment>} />
        <hr />
        <Quizzes sectionTitle="Tipos de quizz" />
      </Wrapper>
      <Footer fixed className="" />
    </Fragment>
  );
}

export default Quizz;
