const Validator = require('validator');
const isEmpty = require('./is-empty');
const isTcKimlik = require('./tckimlik')

function isNumber(input)
{
    return (input - 0) == input && (''+input).trim().length > 0;
}

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.isim = !isEmpty(data.isim) ? data.isim : '';
  data.soyisim = !isEmpty(data.soyisim) ? data.soyisim : '';
  data.barkod = !isEmpty(data.barkod) ? data.barkod : ''
  data.tckimlik = !isEmpty(data.tckimlik) ? data.tckimlik : '';
  data.adres = !isEmpty(data.adres) ? data.adres : '';
  data.kilo = !isEmpty(data.kilo) ? data.kilo : '';
  data.telefon = !isEmpty(data.telefon) ? data.telefon : '';

  if (!Validator.isLength(data.isim, { min: 2, max: 30 })) {
    errors.isim = 'İsminiz 2 ile 30 karakter uzunlukta olmalı';
  }

  if (Validator.isEmpty(data.isim)) {
    errors.isim = 'İsminizi yazmanız zorunludur';
  }

  if (Validator.isEmpty(data.soyisim)) {
    errors.soyisim = 'Soyisminizi yazmanız zorunludur';
  }

  if (!Validator.isLength(data.soyisim, { min: 2, max: 30 })) {
    errors.soyisim = 'Soyisminizi yazmanız gerekiyor';
  }

  if (Validator.isEmpty(data.barkod)) {
    errors.barkod = "Barkodu yazmanız gerekiyor"
  }

  if (!Validator.isLength(data.tckimlik, { min: 11, max: 11 })) {
    errors.tckimlik = 'Kimlik numaranızın 11 karakter olması gerekiyor';
  }

  if(!isTcKimlik(data.tckimlik)) {
    errors.tckimlik = 'Kimlik numarası geçersiz'
  }

  if (Validator.isEmpty(data.tckimlik)) {
    errors.tckimlik = 'Kimlik numaranızı yazmanız gerekiyor';
  }

  if (Validator.isEmpty(data.adres)) {
    errors.adres = 'Adresi yazmanız gerekiyor';
  }

  if (Validator.isEmpty(data.telefon)) {
    errors.adres = 'Telefonu yazmanız gerekiyor';
  }

  if (!isNumber(data.telefon)) {
      errors.telefon = 'Telefon numarasında harf olmaması gerekiyor'
  }

  if (!Validator.isLength(data.telefon, { min: 11, max: 30 })) {
    errors.telefon = 'Telefon numarası en az 11 karakter, en fazla 30 karakter olmalıdır';
  }

  if (Validator.isEmpty(data.kilo)) {
    errors.kilo = 'Kiloyu yazmanız gerekiyor';
  }

  if (!isNumber(data.kilo)) {
    errors.kilo = 'Kiloda harf olmaması lazım';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
