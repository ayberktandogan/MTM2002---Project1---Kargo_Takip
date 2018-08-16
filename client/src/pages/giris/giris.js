import React, {Component} from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from "../../actions/authActions";
import {Input, Button, Container, Row, Col} from "mdbreact";

import classes from "./giris.css";

class Giris extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    handleChange(th, type) {
        if(type==='email') {
            this.setState({email: th.target.value})
        }
        if(type==='password') {
            this.setState({password: th.target.value})
        }
    }

    handleSubmit(th) {
        th.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData)
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    render() {
        document.title = "Giriş Yap - LOSSKargo"
        const {errors} = this.state

        return (
            <React.Fragment>
                <div className={classes.geri} onClick={() => this.props.history.goBack()}>◀ Geri dön</div>
                <div
                    className={classes.container + " z-depth-1 justify-content-center"}
                >
                    <Container className={classes["alt-container"]}>
                        <Row className="justify-content-center">
                            <Col md="10">
                                <form onSubmit={th => this.handleSubmit(th)}>
                                    <p className="h5 text-center mb-4">Giriş Yap</p>
                                    <div className="grey-text">
                                        <Input
                                            label="Emailinizi yazın"
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={th => this.handleChange(th, 'email')}
                                        />
                                        {errors.email ? <small className={classes.error}>{errors.email}</small> : null}
                                        <Input
                                            label="Şifrenizi yazın"
                                            group
                                            type="password"
                                            validate
                                            onChange={th => this.handleChange(th, 'password')}
                                        />
                                        {errors.password ? <small className={classes.error}>{errors.password}</small> : null}
                                    </div>
                                    <div className="text-center">
                                        <Button type="submit" color="primary">Giriş Yap</Button>
                                        <Button onClick={() => this.props.history.push('/kayit-ol')}>
                                            Hesabınız yok mu?
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

Giris.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Giris);
