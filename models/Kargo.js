const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KargoIslemSchema = new Schema({
    data: {
        type: String,
        required: true
    },
    islemYeri : {
        type: String,
        required: true
    },
    tarih: {
        type: Date,
        default: Date.now
    }
})

const KargoSchema = new Schema({
    sehir: {
        type: String,
        required: true 
    },
    ulke: {
        type: String,
        required: true
    },
    adres: {
        type: String,
        required: true
    },
    isim: {
        type: String,
        required: true
    },
    soyisim: {
        type: String,
        required: true
    },
    barkod: {
        type: String,
        required: true
    },
    telefon: {
        type: String,
        required: true
    },
    tarih: {
        type: Date,
        default: Date.now
    },
    tckimlik: {
        type: String,
        required: true
    },
    kilo: {
        type: String,
        required: true
    },
    islemler: {
        type: [KargoIslemSchema]
    }
})

module.exports = Kargo = mongoose.model('Kargos', KargoSchema)