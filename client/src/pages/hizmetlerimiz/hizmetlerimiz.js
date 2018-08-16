import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImage,
  CardBody,
  CardText,
  CardTitle
} from "mdbreact";

import resim1 from '../../img/1.jpg'
import resim2 from '../../img/2.jpg'
import resim3 from '../../img/3.jpg'

const hizmetlerimiz = () => {
document.title = "LOSSKargo Hizmetler"

  return (
    <Container>
      <Row className="justify-content-center">
        <h2 className="col-12 text-center">Yurtiçi Hizmetler</h2>
        <Col md="4" className="mb-2">
          <Card>
            <CardImage
              className="img-fluid"
              src={resim1}
            />
            <CardBody>
              <CardTitle>Yurtiçi Standart</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="4" className="mb-2">
          <Card>
            <CardImage
              className="img-fluid"
              src={resim2}
            />
            <CardBody>
              <CardTitle>Yurtiçi VIP Ekspres</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="4" className="mb-2">
          <Card>
            <CardImage
              className="img-fluid"
              src={resim3}
            />
            <CardBody>
              <CardTitle>Büyük Eşyalar</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <h2 className="col-12 text-center">Yurtdışı Hizmetler</h2>
        <Col md="4" className="mb-2">
          <Card>
            <CardImage
              className="img-fluid"
              src={resim1}
            />
            <CardBody>
              <CardTitle>Yurtdışı Ekspres</CardTitle>
              <CardText>
                Yurtdışı Ekspres kargo taşıma hizmetimiz vardır.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default hizmetlerimiz;
