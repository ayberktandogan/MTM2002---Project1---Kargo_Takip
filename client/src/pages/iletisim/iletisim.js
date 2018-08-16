import React from "react";
import { Container, Row, Col } from "mdbreact";

import classes from "./iletisim.css";

const iletisim = () => {
  document.title = "LOSSKargo İletişim";

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md="9" className={classes.kart}>
            <h1>İletişim</h1>
            <p>07:00 - 18:00 saatleri arasında hizmetinizdeyiz.</p>
            <h6>0555 555 55 55</h6>
          </Col>
          <Col md="3" className={classes.image + " img-fluid"}>
            <span>PLACEHOLDER</span>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default iletisim;
