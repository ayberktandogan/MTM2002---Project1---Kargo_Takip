const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const isEmpty = require('../../validation/is-empty')

const validateKargoInput = require("../../validation/kargo");

//Load Kargo model
const Kargo = require("../../models/Kargo");

// @route   GET api/kargo/kargo-ekle
// @desc    Adds kargo-ekle route
// @access  Private
router.post("/kargo-ekle", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateKargoInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Kargo.findOne({ barkod: req.body.barkod }).then(user => {
    if (user) {
      errors.kargo = 'Kargo zaten ekli';
      return res.status(400).json(errors);
    } else {
  const yeniKargo = new Kargo({
    isim: req.body.isim,
    soyisim: req.body.soyisim,
    barkod: 'LK' + req.body.barkod,
    telefon: req.body.telefon,
    tckimlik: req.body.tckimlik,
    ulke: req.body.ulke,
    sehir: req.body.sehir,
    adres: req.body.adres,
    kilo: req.body.kilo
  });

  yeniKargo
    .save()
    .then(kargo => res.json(kargo))
    .catch(err => console.log(err));
    }})})

// @route   GET api/kargo/kargo-takip
// @desc    GET kargo-takip route
// @access  Public
router.get("/kargo-takip/:id", (req, res) => {
  let errors;

  Kargo.findById(req.params.id)
    .then(kargo => {
      if (!kargo) {
        return console.log("yok");
      } else {
        res.json({
          isim: kargo.isim,
          soyisim: kargo.soyisim,
          barkod: kargo.barkod,
          telefon: kargo.telefon,
          tckimlik: kargo.tckimlik,
          ulke: kargo.ulke,
          sehir: kargo.sehir,
          adres: kargo.adres,
          kilo: kargo.kilo,
          tarih: kargo.tarih,
          islemler: kargo.islemler
        });
      }
    })
    .catch(err => console.log(err));
});

// @route   GET api/kargo/kargo-liste
// @desc    GET kargo-liste route
// @access  Private
router.get("/kargo-liste", passport.authenticate('jwt', { session: false }), (req, res) => {
  Kargo.find({}, function(err, kargos) {
    if(err) res.send(err)
    res.send(kargos);  
  });
}); 

// @route   DELETE api/kargo/kargo-sil/:id
// @desc    DELETE kargo-sil/:id rotute
// @access  Private
router.delete('/kargo-sil/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Kargo.findByIdAndRemove(req.params.id, (err, resp) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(resp);
  })
})

// @route   PUT api/kargo/kargo-duzenle
// @desc    PUT kargo-düzenle route
// @access  Private
router.put("/kargo-duzenle/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors;

  const guncelKargo = {
    isim: req.body.isim,
    soyisim: req.body.soyisim,
    barkod: req.body.barkod,
    telefon: req.body.telefon,
    tckimlik: req.body.tckimlik,
    ulke: req.body.ulke,
    sehir: req.body.sehir,
    adres: req.body.adres,
    kilo: req.body.kilo
  };

  Kargo.findByIdAndUpdate(req.params.id, guncelKargo, {new: true}, (err, resp) => {
      if (err) return res.status(500).send(err)
      return res.send(resp)
  })
});

// @route   POST api/kargo/kargo-duzenle/:id/islem-ekle
// @desc    POST kargo-duzenle/:id/islem-ekle route
// @access  Private
router.post('/kargo-duzenle/:id/islem-ekle', passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors

  if(isEmpty(req.body.data)) {
    errors.data = 'Data girmeniz lazım'
    res.status(500).json(errors)
  }

  if(isEmpty(req.body.islemYeri)) {
    errors.data = 'İşlem yeri girmeniz lazım'
    res.status(500).json(errors)
  }

  const islem = {
    data: req.body.data,
    islemYeri: req.body.islemYeri
  }
  Kargo.findByIdAndUpdate(req.params.id, {$push: {islemler: req.body}}, {safe: true, upsert: true}, (err,resp) => {
    if (err) return res.status(500).send(err)
    res.status(200)
  })
})

// @route   POST api/kargo/kargo-duzenle/:id/islem-sil
// @desc    POST kargo-duzenle/:id/islem-ekle route
// @access  Private
router.post('/kargo-duzenle/:id/islem-sil/', passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors
  
  Kargo.findByIdAndUpdate(req.params.id, {$pull: {islemler:req.body}}, {safe: true}, (err,resp) => {
    if (err) return res.status(500).send(err)
    res.status(200)
  })
})

module.exports = router;
