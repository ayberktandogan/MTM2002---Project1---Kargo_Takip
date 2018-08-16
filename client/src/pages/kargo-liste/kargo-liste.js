import React, { Component } from "react";
import { Container, Row, Col } from "mdbreact";
import axios from "axios";
import { connect } from "react-redux";

import classes from "./kargo-liste.css";

class kargoListe extends Component {
  constructor() {
    super();

    this.state = {
      liste: null,
      loading: true,
      error: {}
    };
  }

  getList() {
    axios
      .get("/api/kargo/kargo-liste")
      .then(res => this.setState({ liste: res.data, loading: false }))
      .catch(err => this.setState({ error: err.response }));
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.getList()
  }

  componentWillUnmount(){
    clearInterval(this.getList.bind(this));
  }

  clickHandler(id) {
    this.props.history.push("/kargo/kargo-takip/" + id);
  }

  deleteHandler(item, id) {
    axios
      .delete("/api/kargo/kargo-sil/" + id)
      .catch(err => console.log(err));
    const data = this.state.liste.filter(i => i !== item);
    this.setState({ liste: data });
  }

  render() {
    let page;

    if (this.state.loading) {
      return (
        <div className={classes["lds-css"]}>
          <div
            style={{ width: "100%", height: "100%" }}
            className={classes["lds-bars"]}
          >
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    }
    let { liste } = this.state;
    if (!this.state.loading) {
      page = liste.map(comp => {
        const id = comp._id;

        return (
          <React.Fragment key={id}>
            <div className={classes.kart}>
              <div
                className="btn btn-danger mr-2"
                onClick={() => this.deleteHandler(comp, id)}
              >
                x Sil
              </div>
              <div
                className={classes["kart-ic"]}
                onClick={() => this.clickHandler(id)}
              >
                <div className={classes.isim}>
                  <h4>İsim: </h4>
                  {comp.isim} {comp.soyisim}
                </div>
                <div className={classes.barkod}>
                  <h4>Barkod: </h4>
                  {comp.barkod}
                </div>
                <div className={classes.adres}>
                  <h4>Adres: </h4>
                  {comp.adres}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      });
    }

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col md="12">
              <Row className="mx-0">{page}</Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(kargoListe);
