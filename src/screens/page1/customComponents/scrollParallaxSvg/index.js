// Css
import "./index.scss";

// React Elements/Hooks
import { useState, Fragment, useEffect } from "react";

// Components
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../../components/texts/title";
import SvgInterativo from "../../../../components/images/svgInterativo";

import { useParallax } from "react-scroll-parallax";
import SvgParallax from "../../../../components/images/svgParallax";

function ScrollParallaxSvg(props) {
  const gato = useParallax({ scale: [0, 1] });
  const pessoa = useParallax({ translateX: [0, 50] });
  const cadeira = useParallax({ translateX: [25, -25] });
  const nuvem1 = useParallax({ translateY: [80, -100] });
  const nuvem2 = useParallax({ translateX: [40, -25] });
  const nuvem3 = useParallax({ translateX: [-10, 30] });
  const planta = useParallax({ translateY: [-15, 40] });
  const grafismo1 = useParallax({ speed: -30 });
  const grafismo2 = useParallax({ speed: 30 });
  const grafismo3 = useParallax({ speed: -10 });
  const grafismo4 = useParallax({ speed: -20 });
  const grafismo5 = useParallax({ speed: -30 });
  const grafismo6 = useParallax({ speed: 20 });

  return (
    <section className="mb-3">
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
          <Col xs="12" className="relative">
            <SvgInterativo className="" svgName="Fundo" isParallaxSvg={true} />
            <SvgParallax svgName="Nuvem1" parallaxRef={nuvem1.ref} />
            <SvgParallax svgName="Nuvem2" parallaxRef={nuvem2.ref} />
            <SvgParallax svgName="Nuvem3" parallaxRef={nuvem3.ref} />
            <SvgParallax svgName="Grafismo1" parallaxRef={grafismo1.ref} />
            <SvgParallax svgName="Grafismo2" parallaxRef={grafismo2.ref} />
            <SvgParallax svgName="Grafismo3" parallaxRef={grafismo3.ref} />
            <SvgParallax svgName="Grafismo4" parallaxRef={grafismo4.ref} />
            <SvgParallax svgName="Grafismo5" parallaxRef={grafismo5.ref} />
            <SvgParallax svgName="Grafismo6" parallaxRef={grafismo6.ref} />
            <SvgParallax svgName="Gato" parallaxRef={gato.ref} />
            <SvgParallax svgName="Planta" parallaxRef={planta.ref} />
            <SvgParallax svgName="Cadeira" parallaxRef={cadeira.ref} />
            <SvgParallax svgName="Pessoa" parallaxRef={pessoa.ref} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ScrollParallaxSvg;
