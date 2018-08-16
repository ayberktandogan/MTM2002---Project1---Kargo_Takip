import React, {Component} from "react";
import {
    Navbar,
    NavbarNav,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink
} from "mdbreact";
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logoutUser} from "../actions/authActions"


import classes from "./header.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false
        };
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    onLogoutClick(th) {
        th.preventDefault()
        this.props.logoutUser()
        this.props.history.push('/')
    }

    render() {
        let login

        const {isAuthenticated, user} = this.props.auth

        if (!isAuthenticated) {
            login = <React.Fragment>
                <NavItem>
                    <NavLink to="/kayit-ol">
                        Kayıt Ol
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/giris-yap">
                        Giriş Yap
                    </NavLink>
                </NavItem>
            </React.Fragment>
        }

        if (isAuthenticated) {
            login = <React.Fragment>
                <NavItem>
                    <span className={classes.link}>{user.name}</span>
                </NavItem>
                <NavItem>
                    <span className={classes.link} onClick={(th) => this.onLogoutClick(th)}>Çıkış yap</span>
                </NavItem>
            </React.Fragment>
        }

        return (
            <Navbar color="brown" dark expand="md" fixed="top" scrolling>
                <Link to="/" style={{color: "white"}}>
                    <strong className={classes.brand}>LOSSKargo</strong>
                </Link>
                {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick}/>}
                <Collapse isOpen={this.state.collapse} navbar>
                    <NavbarNav left>
                        <NavItem>
                            <NavLink to="/" exact activeClassName={classes.active}>
                                Ana sayfa
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/hakkimizda" exact activeClassName={classes.active}>
                                Hakkımızda
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/iletisim" exact activeClassName={classes.active}>
                                İletişim
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                to="/hizmetlerimiz"
                                exact
                                activeClassName={classes.active}
                            >
                                Hizmetlerimiz
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/kargo/kargo-takip" activeClassName={classes.active}>
                                Kargo takip
                            </NavLink>
                        </NavItem>
                        {isAuthenticated ?
                            <React.Fragment>
                                <NavItem>
                                    <NavLink exact to="/kargo/kargo-liste" activeClassName={classes.active}>Kargo Liste
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink exact to="/kargo/kargo-ekle" activeClassName={classes.active}>Kargo Ekle
                                    </NavLink>
                                </NavItem>
                            </React.Fragment> : null}
                    </NavbarNav>
                    <NavbarNav right>
                        {login}
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
