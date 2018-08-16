import React, {Component} from "react";
import {Input, Button, Container, Row, Col} from "mdbreact";
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'

import classes from "./kayit.css";

class Kayit extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            success: false,
            errors: {}
        };
    }

    handleChange(th, cs) {
        if (cs === "email")
            this.setState({
                email: th.target.value
            });
        if (cs === "name")
            this.setState({
                name: th.target.value
            });
        if (cs === "password")
            this.setState({
                password: th.target.value
            });
        if (cs === "password2")
            this.setState({
                password2: th.target.value
            });
    }

    handleSubmit(e) {
        e.preventDefault()

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(user, this.props.history)
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    render() {
        document.title = "Kayıt Ol - LOSSKargo";

        const { errors } = this.state

        return (
            <React.Fragment>
                <div
                    className={classes.geri}
                    onClick={() => this.props.history.goBack()}
                >
                    ◀ Geri dön
                </div>
                <div
                    className={classes.container + " z-depth-1 justify-content-center"}
                >
                    <Container className={classes["alt-container"]}>
                        <Row className="justify-content-center">
                            <Col md="10">
                                <form onSubmit={th => this.handleSubmit(th)}>
                                    <p className="h5 text-center mb-4">Kayıt ol</p>
                                    <div className="grey-text">
                                        <Input
                                            label="Emailinizi yazın"
                                            value={this.state.email}
                                            group
                                            type="email"
                                            onChange={th => this.handleChange(th, "email")}
                                        />
                                        {errors.email ? <small className={classes.error}>{errors.email}</small> : null}
                                        <Input
                                            label="İsminizi yazın"
                                            group
                                            type="text"
                                            onChange={th => this.handleChange(th, "name")}
                                        />
                                        {errors.name ? <small className={classes.error}>{errors.name}</small> : null}
                                        <Input
                                            label="Şifrenizi yazın"
                                            group
                                            type="password"
                                            onChange={th => this.handleChange(th, "password")}
                                        />
                                        {errors.password ? <small className={classes.error}>{errors.password}</small> : null}
                                        <Input
                                            label="Şifrenizi tekrar yazın"
                                            group
                                            type="password"
                                            onChange={th => this.handleChange(th, "password2")}
                                        />
                                        {errors.password2 ? <small className={classes.error}>{errors.password2}</small> : null}
                                    </div>
                                    <div className="text-center">
                                        <Button type="submit" color="primary">
                                            Kayıt ol
                                        </Button>
                                        <Button onClick={() => this.props.history.push('/giris-yap')}>
                                            Hesabınız var mı?
                                        </Button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

Kayit.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Kayit));
