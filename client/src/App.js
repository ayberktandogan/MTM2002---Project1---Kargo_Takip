import React, {Component} from "react";
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";


import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser} from "./actions/authActions";
import {Provider} from 'react-redux'
import store from './store'

import Wrapper from "./hoc/wrapper";
import Index from "./pages/index";
import Hakkimizda from "./pages/hakkimizda/hakkimizda";
import Hizmetlerimiz from "./pages/hizmetlerimiz/hizmetlerimiz";
import Iletisim from "./pages/iletisim/iletisim";
import KargoTakip from "./pages/kargo-takip/kargo-takip";
import Kayit from "./pages/kayit/kayit";
import Giris from "./pages/giris/giris";
import KargoEkle from "./pages/kargo-ekle/kargo-ekle";
import KargoListe from './pages/kargo-liste/kargo-liste'

import "./App.css";

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded))
    
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = '/';
  }
}

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <Switch>
                        <Route exact path="/kayit-ol" component={Kayit}/>
                        <Route exact path="/giris-yap" component={Giris}/>
                        <Wrapper>
                            <Route
                                exact
                                path="/"
                                component={Index}/>
                            <Route exact path="/hizmetlerimiz" component={Hizmetlerimiz}/>
                            <Route exact path="/iletisim" component={Iletisim}/>
                            <Route exact path="/kargo/kargo-takip" component={KargoTakip}/>
                            <Route exact path="/kargo/kargo-takip/:id" component={KargoTakip}/>
                            <Route exact path="/hakkimizda" component={Hakkimizda}/>
                            <Route exact path="/kargo/kargo-ekle" component={KargoEkle} />
                            <Route exact path="/kargo/kargo-liste" component={KargoListe} />
                        </Wrapper>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
