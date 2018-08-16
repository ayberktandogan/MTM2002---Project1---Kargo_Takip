import React, { Component } from "react";
import {
  Col,
  Row,
  Carousel,
  Input,
  CarouselCaption,
  CarouselInner,
  CarouselItem,
  View,
  Mask,
  Container
} from "mdbreact";
import { Link } from 'react-router-dom'

import classes from "./index.css";

class Index extends Component {
  constructor() {
    super();

    this.state = {
      kargoId: ""
    };
  }

  handleSubmit(th) {
    th.preventDefault();

    const id = this.state.kargoId;
    this.props.history.push("/kargo/kargo-takip/" + id);
  }

  handleChange(th) {
    this.setState({ kargoId: th.target.value });
  }

  render() {
    document.title = "LOSSKargo Ana sayfa";

    return (
      <React.Fragment>
        <Container className={classes.container}>
          <Row>
            <Col md="9">
              <Carousel
                activeItem={1}
                length={3}
                showControls={true}
                showIndicators={false}
                className="z-depth-1"
              >
                <CarouselInner>
                  <CarouselItem itemId="1">
                    <View>
                      <img
                        className="d-block w-100"
                        src="https://ak4.picdn.net/shutterstock/videos/3633284/thumb/1.jpg"
                        alt="Third slide"
                      />
                      <Mask overlay="black-slight" />
                    </View>
                    <CarouselCaption>
                      <h3 className="h3-responsive">Güvenli taşıyoruz</h3>
                      <p>Bize güvenin</p>
                    </CarouselCaption>
                  </CarouselItem>
                </CarouselInner>
                <CarouselInner>
                  <CarouselItem itemId="2">
                    <View>
                      <img
                        className="d-block w-100"
                        src="https://previews.123rf.com/images/soleg/soleg1501/soleg150100218/35914327-white-truck-on-road-cargo-transportation.jpg"
                        alt="Third slide"
                      />
                      <Mask overlay="black-slight" />
                    </View>
                    <CarouselCaption>
                      <h3 className="h3-responsive">Hızlı taşıyoruz</h3>
                      <p>24 saat içinde programımızla kargolarınız ertesi gün yerinde</p>
                    </CarouselCaption>
                  </CarouselItem>
                </CarouselInner>
                <CarouselInner>
                  <CarouselItem itemId="3">
                    <View>
                      <img
                        className="d-block w-100"
                        src="https://previews.123rf.com/images/ake1150/ake11501501/ake1150150100077/35479325-cargo-train-platform-with-freight-train-container-at-depot.jpg"
                        alt="Third slide"
                      />
                      <Mask overlay="black-slight" />
                    </View>
                    <CarouselCaption>
                      <h3 className="h3-responsive">2018'in en yenilikçi kargosu</h3>
                      <p>Bu ödülü bize layık gördüğünüz için teşekkürler</p>
                    </CarouselCaption>
                  </CarouselItem>
                </CarouselInner>
              </Carousel>
            </Col>
            <Col md="3">
              <Row>
                <Col md="12" className="mx-0" className={classes.kart}>
                  <h4 className={classes.header}>Kargo sorgula</h4>
                  <form onSubmit={th => this.handleSubmit(th)}>
                    <Input
                      type="text"
                      label="Kargo numarası"
                      value={this.state.kargoId}
                      onChange={th => this.handleChange(th)}
                    />
                  </form>
                </Col>
                <Col md="12" className="mx-0" className={classes.kart}>
                  <h4 className={classes.header}>Önemli Linkler</h4>
                  <Link to="/kargo/kargo-takip">Kargo Takip</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Index;
