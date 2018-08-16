import React from 'react'
import { Col, Container, Row, Footer } from 'mdbreact';
import { Link } from 'react-router-dom'

import classes from './footer.css'


const footer = () => {
    return(
        <Footer color="brown" className="font-small pt-4 mt-4">
                <Container className="text-left">
                    <Row>
                    <Col sm="6">
                        <h5 className="title">LOSSKargo</h5>
                        <p>İsmimizin aksine kargolarınızı kaybetmiyoruz.</p>
                    </Col>
                    <Col sm="6">
                        <h5 className="title">Linkler</h5>
                        <ul>
                        <li className="list-unstyled"><Link to="/">Ana sayfa</Link></li>
                        <li className="list-unstyled"><Link to="/hakkimizda">Hakkımızda</Link></li>
                        <li className="list-unstyled"><Link to="/iletisim">İletişim</Link></li>
                        <li className="list-unstyled"><Link to="/hizmetlerimiz">Hizmetlerimiz</Link></li>
                        <li className="list-unstyled"><Link to="/kargo/kargo-takip">Kargo Takip</Link></li>
                        </ul>
                    </Col>
                    </Row>
                </Container>
                <div className="footer-copyright text-center py-3">
                    <Container fluid>
                    <span className={classes["footer-text"]}>&copy; {(new Date().getFullYear())} Copyright: LOSSKargo</span>
                    </Container>
                </div>
            </Footer>
    )
}

export default footer