import React, {Component} from "react";
import {Container, Row, Col, Input, Button} from "mdbreact";
import axios from "axios";
import {connect} from 'react-redux'

import classes from "./kargo-takip.css";

class kargoTakip extends Component {
    constructor() {
        super();

        this.state = {
            kargoId: "",
            isSubmitted: false,
            isEditable: false,
            doesAdding: false,
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({kargoId: this.props.match.params.id});
        }
    }

    handleChange(th, type) {
        this.setState({[type]: th.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
            .get("/api/kargo/kargo-takip/" + this.state.kargoId)
            .then(res => {
                this.setState({...res.data, isSubmitted: true});
            })
            .catch(err =>
                this.setState({
                    error: err.data
                })
            );
    }

    handleClick() {
        this.setState({isEditable: !this.state.isEditable})
    }

    _handleClick() {
        const kargo = {
            isim: this.state.isim,
            soyisim: this.state.soyisim,
            barkod: this.state.barkod,
            telefon: this.state.telefon,
            tckimlik: this.state.tckimlik,
            ulke: this.state.ulke,
            sehir: this.state.sehir,
            adres: this.state.adres,
            kilo: this.state.kilo,
            tarih: this.state.tarih,
        }

        axios
            .put("/api/kargo/kargo-duzenle/" + this.state.kargoId, kargo)
            .then(res => {
                this.setState({isEditable: false})
            })
            .catch(err => console.log(err));
    }

    handleAdd() {
        this.setState({doesAdding: true})
    }

    handleIslemAdd() {
        const islem = {
            data: this.state.data,
            islemYeri: this.state.islemYeri
        }

        const islemler = this.state.islemler
        axios.post('/api/kargo/kargo-duzenle/' + this.state.kargoId + '/islem-ekle', islem)
            .then(this.setState({doesAdding: false, islemler:[...islemler, islem], data:'', islemYeri: ''}))
            .catch(err => console.log(err))
    }

    handleDelete(item) {
        axios.post('/api/kargo/kargo-duzenle/' + this.state.kargoId + '/islem-sil', item)
            .catch(err => console.log(err))
        const data = this.state.islemler.filter(i => i !== item)
        this.setState({islemler: data})
    }


    render() {
        let anaekran;
        let duzenle

        document.title = 'LOSSKargo Kargo Takip' + ' ' +  this.state.kargoId

        if (!this.state.isSubmitted) {
            anaekran = (
                <Col md="12">
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            value={this.state.kargoId}
                            type="text"
                            group
                            onChange={th => this.handleChange(th, "kargoId")}
                        />
                        <Button type="submit">Sorgula</Button>
                    </form>
                </Col>
            );
        }

        if(this.props.auth.isAuthenticated) {
          if(this.state.isEditable) {
              duzenle =
                 <button className="btn btn-danger" color="danger" onClick={() => this._handleClick()}>
              Kaydet
          </button>
          }
          if(!this.state.isEditable) {
            duzenle = <button className="btn btn-danger" color="danger" onClick={() => this.handleClick()}>
            Düzenle
        </button>
          }
        }
 
        if (this.state.isSubmitted) {
            anaekran = (
                <React.Fragment>
                    {this.state.isEditable ? (
                        <React.Fragment>
                            <Col md="12" className="text-center mb-4">
                                <h2>Kargo Takip Numarası: {this.state.kargoId}</h2>
                                {duzenle}
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>
                                        İsim:{" "}
                                        <Input
                                            onChange={th => this.handleChange(th, "isim")}
                                            required
                                            type="text"
                                            value={this.state.isim}
                                        />
                                    </h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>
                                        Soyisim:{" "}
                                        <Input
                                            required
                                            type="text"
                                            value={this.state.soyisim}
                                            onChange={th => this.handleChange(th, "soyisim")}
                                        />
                                    </h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>
                                        Barkod Numarası:{" "}
                                        <Input
                                            required
                                            type="text"
                                            value={this.state.barkod}
                                            onChange={th => this.handleChange(th, "barkod")}
                                        />
                                    </h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>
                                        Telefon:{" "}
                                        <Input
                                            required
                                            type="number"
                                            value={this.state.telefon}
                                            onChange={th => this.handleChange(th, "telefon")}
                                        />
                                    </h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>
                                        Kilo:{" "}
                                        <Input
                                            required
                                            type="number"
                                            value={this.state.kilo}
                                            onChange={th => this.handleChange(th, "kilo")}
                                        />
                                    </h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>
                                        TC Kimlik Numarası:{" "}
                                        <Input
                                            required
                                            type="number"
                                            value={this.state.tckimlik}
                                            onChange={th => this.handleChange(th, "tckimlik")}
                                        />
                                    </h5>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className={classes.kargo}>
                                    <h5>
                                        Adres:{" "}
                                        <Input
                                            required
                                            type="text"
                                            value={this.state.adres}
                                            onChange={th => this.handleChange(th, "adres")}
                                        />
                                    </h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>
                                        Ülke:{" "}
                                        <Input
                                            required
                                            type="text"
                                            value={this.state.ulke}
                                            onChange={th => this.handleChange(th, "ulke")}
                                        />
                                    </h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>
                                        Şehir:{" "}
                                        <Input
                                            required
                                            type="text"
                                            value={this.state.sehir}
                                            onChange={th => this.handleChange(th, "sehir")}
                                        />
                                    </h5>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className={classes.kargo}>
                                    <h4>Kargo Hareketleri:</h4>
                                    <div className={classes.data}><h3>İşlem</h3></div>
                                    <div className={classes.islemYeri}><h3>İşlem yeri</h3></div>
                                    {this.state.isEditable ?
                                        <React.Fragment><p className={classes.warning}>Burada yaptığınız değişiklikler anında kaydedilecektir. (Boş yollanan işlemler kaydedilmeyecektir.)</p></React.Fragment> : null}
                                    {this.state.islemler.map((dt) => {
                                        const itemId = dt._id
                                        return (
                                            <div className={classes["data-container"]} key={itemId}>
                                                <div className={classes.data}>{dt.data}</div>
                                                <div className={classes.islemYeri}>{dt.islemYeri}</div>
                                                <div className={classes.sil} onClick={() => {
                                                    this.handleDelete(dt)
                                                }}>x</div>
                                            </div>
                                        )
                                    })} 
                                    <div>
                                      <div className={classes.data}><Input label="İşlemi yazın" required value={this.state.data} onChange={th => this.handleChange(th, 'data')}/></div>
                                      <div className={classes.islemYeri}><Input label="İşlem yerini yazın" required value={this.state.islemYeri} onChange={th => this.handleChange(th, 'islemYeri')}/></div>
                                      <div onClick={(th) => this.handleIslemAdd(th)} className={classes.ekle}>+</div>
                                      </div>
                                </div>
                            </Col>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Col md="12" className="text-center mb-4">
                                <h2>Kargo Takip Numarası: {this.state.kargoId}</h2>
                                {duzenle}
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>İsim: {this.state.isim}</h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>Soyisim: {this.state.soyisim}</h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>Barkod Numarası: {this.state.barkod}</h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>Telefon: {this.state.telefon}</h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>Kilo: {this.state.kilo}</h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>TC Kimlik Numarası: {this.state.tckimlik}</h5>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className={classes.kargo}>
                                    <h5>Adres: {this.state.adres}</h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>Ülke: {this.state.ulke}</h5>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className={classes.kargo}>
                                    <h5>Şehir: {this.state.sehir}</h5>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className={classes.kargo}>
                                    <h4>Kargo Hareketleri:</h4>
                                    <div className={classes["data-kapali"]}><h3>İşlem</h3></div>
                                    <div className={classes["islemYeri-kapali"]}><h3>İşlem yeri</h3></div>
                                    {this.state.islemler.map((dt, index) => {
                                        return (
                                            <div className={classes["data-container"]} key={dt._id}>
                                                <div className={classes["data-kapali"]}>{dt.data}</div>
                                                <div className={classes["islemYeri-kapali"]}>{dt.islemYeri}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Col>
                        </React.Fragment>
                    )}
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12" className={classes.kart + ' text-center'}>
                            <h1>Kargo Takip Ekranı</h1>
                            <Row className="mx-0">
                                {anaekran}
                            </Row>
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

export default connect(mapStateToProps)(kargoTakip);