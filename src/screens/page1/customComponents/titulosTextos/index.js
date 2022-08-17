// React Elements/Hooks
import { Fragment } from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../../components/texts/title";
import BlocoTitulos from "./blocoTitulos";
import BlocoTextos from "./blocoTextos";
import BlocoListas from "./blocoListas";

function TituloTextos(props) {
  return (
    <section data-secao={props.sectionTitle}>
      <Container>
        <Row className="">
          <Col xs="12">
            <Title
              typeH="2"
              className="titleDivisor"
              content={<Fragment>{props.sectionTitle}</Fragment>}
            />
            <hr />
          </Col>
        </Row>
        <Row className="">
          <BlocoTitulos />
        </Row>

        <Row className="">
          <Col xs="12">
            <BlocoTextos />
          </Col>
        </Row>

        <Row className="">
          <BlocoListas />
        </Row>
      </Container>

      <hr/><br/>
    </section>
  );
}

export default TituloTextos;
