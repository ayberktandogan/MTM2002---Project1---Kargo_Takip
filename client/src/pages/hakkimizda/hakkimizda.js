import React from 'react'
import { Container, Row, Col } from 'mdbreact'

import classes from './hakkimizda.css'

const hakkimizda = () => {
    const yazi1 = "\"Söz Verdiğimiz Gibi\" sloganından hareketle dünyanın her yerine gönderi yapabilen ilk Türk kargo şirketi LOSSKargo; 1982 yılından bu yana ülkemizi hızlı, kaliteli, güvenilir ve teknolojik kargo hizmeti kavramıyla tanıştırdı. 1997 yılından bu yana Uluslararası Taşıma Birlikleri Federasyonu'nun (FIATA) da üyesi olan LOSSKargo, günümüzde 17 Bölge Müdürlüğü, 33 Aktarma Merkezi, 880’den fazla şubesi, 15.000’den fazla çalışanı ve 4000’in üzerinde araç filosu ile Türkiye'nin 81 ilinde ve Kuzey Kıbrıs Türk Cumhuriyeti'nde öncü kargo şirketi olma özelliğini sürdürmektedir. Kurulduğu günden bu yana yatırımlarına hiç ara vermeden devam eden LOSSKargo, yurtiçi taşımacılık alanında sunduğu öncü hizmetlerin yanında, uluslararası taşımacılıkta da önemli adımlar attı. 2003 yılından bu yana Avrupa’nın en büyük kargo şirketlerinden biri olan çözüm ortağı Geopost ile birlikte LOSSKargo, müşterilerinin uluslararası gönderilerini dünyada 230 noktaya, bir başka deyişle dünyanın her yerine taşımaktadır. LOSSKargo, müşterilerine sunduğu kaliteli hizmetlerin sonucunda 1999 yılında TS EN ISO 9002 Kalite Sistem Belgesi'ni; 2003 yılında da TS EN ISO 9001:2000 Kalite Sistem Belgesi'ni alan ilk kargo şirketi olmuştur. 2010 yılında TSE ve IQNet'ten TS EN ISO 9001:2008 Belgesini almıştır. Sektöründeki lider konumunu, nitelikli insan kaynağı, müşteri odaklı hizmet ve analitik yönetim felsefesi ile birleştiren LOSSKargo, eğitimli kadrosu, yaygın şube ağı ve güçlü IT alt yapısı ile birlikte sektöründe Türkiye'ye yol göstermeye, \"Söz Verdiği Gibi\" devam etmektedir."

    document.title = "LOSSKargo Hakkımızda"

    return(
        <React.Fragment>
            <Container>
                <Row>
                    <Col md="12" className={classes.kart}>
                        <h1 className={classes.header}>LossKargo Tarihçesi</h1>
                    </Col>
                    <Col md="12" className={classes.kart}>
                        <p>{yazi1}</p>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default hakkimizda