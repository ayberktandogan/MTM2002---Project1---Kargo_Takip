import React, {Component} from "react";
import {Input, Container, Row, Col, Button} from "mdbreact";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";
import axios from "axios";
import {connect} from 'react-redux'

import classes from './kargo-ekle.css'

class kargoEkle extends Component {
    constructor() {
        super();

        this.state = {
            isim: "",
            soyisim: "",
            barkod: '',
            kargo: '',
            telefon: "",
            tckimlik: "",
            ulke: "",
            sehir: "",
            adres: "",
            kilo: "",
            errors: {}
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(val, type) {
        this.setState({[type]: val});
    }

    handleChange(val, type) {
        this.setState({[type]: val.target.value});
    }

    handleSubmit(th) {
        th.preventDefault();

        const kargo = {
            isim: this.state.isim,
            soyisim: this.state.soyisim,
            kargo: this.state.kargo,
            barkod: this.state.barkod,
            telefon: this.state.telefon,
            tckimlik: this.state.tckimlik,
            ulke: this.state.ulke,
            sehir: this.state.sehir,
            adres: this.state.adres,
            kilo: this.state.kilo
        };

        axios
            .post("/api/kargo/kargo-ekle", kargo)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.props.history.push("/kargo/kargo-takip/" + res.data._id);
                }
            })
            .catch(err => this.setState({errors: err.response.data}))
    }

    componentDidMount() {
        document.getElementsByName('rcrs-country')[0].setAttribute('class', 'custom-select')
        document.getElementsByName('rcrs-region')[0].setAttribute('class', 'custom-select')
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    render() {

        const {errors} = this.state;

        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col md="12">
                            <form onSubmit={th => this.handleSubmit(th)}>
                                <Row>
                                    {this.state.errors.kargo ? <Col md="12" className={classes.warning}>{this.state.errors.kargo}</Col> : null }
                                    <Col md="6">
                                        <Input
                                            label="İsim"
                                            required
                                            value={this.state.isim}
                                            onChange={th => this.handleChange(th, "isim")}
                                            type="text"
                                        />
                                        {errors.isim ? <small className={classes.error}>{errors.isim}</small> : null}
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            label="Soyisim"
                                            required
                                            value={this.state.soyisim}
                                            onChange={th => this.handleChange(th, "soyisim")}
                                            type="text"
                                        />
                                        {errors.soyisim ? <small className={classes.error}>{errors.soyisim}</small> : null}
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            label="Barkod numarası"
                                            required
                                            value={this.state.barkod}
                                            onChange={th => this.handleChange(th, "barkod")}
                                            type="text"
                                        />
                                        {errors.barkod ? <small className={classes.error}>{errors.barkod}</small> : null}
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            label="Telefon"
                                            required
                                            value={this.state.telefon}
                                            onChange={th => this.handleChange(th, "telefon")}
                                            type="number"
                                        />
                                        {errors.telefon ? <small className={classes.error}>{errors.telefon}</small> : null}
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            label="Kilo"
                                            required
                                            value={this.state.kilo}
                                            onChange={th => this.handleChange(th, "kilo")}
                                            type="number"
                                        />
                                        {errors.kilo ? <small className={classes.error}>{errors.kilo}</small> : null}
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            label="TC Kimlik"
                                            required
                                            value={this.state.tckimlik}
                                            onChange={th => this.handleChange(th, "tckimlik")}
                                            type="number"
                                        />
                                        {errors.tckimlik ? <small className={classes.error}>{errors.tckimlik}</small> : null}
                                    </Col>    
                                    <Col md="6">
                                        <Input
                                            label="Adres"
                                            required
                                            value={this.state.adres}
                                            onChange={th => this.handleChange(th, "adres")}
                                            type="text"
                                        />
                                        {errors.adres ? <small className={classes.error}>{errors.adres}</small> : null}
                                    </Col>
                                    <Col md="6">
                                        <CountryDropdown
                                            value={this.state.ulke}
                                            className="custom-select"
                                            onChange={val => this.handleSelect(val, "ulke")}
                                        />
                                        {errors.ulke ? <small className={classes.error}>{errors.ulke}</small> : null}
                                    </Col>
                                    <Col md="6">
                                        <RegionDropdown
                                            country={this.state.ulke}
                                            value={this.state.sehir}
                                            onChange={val => this.handleSelect(val, "sehir")}
                                        />
                                        {errors.sehir ? <small className={classes.error}>{errors.sehir}</small> : null}
                                    </Col>
                                    <Button type="submit">Gönder</Button>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(kargoEkle);
