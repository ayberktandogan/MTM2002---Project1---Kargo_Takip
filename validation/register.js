const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'İsminiz 2 ile 30 karakter uzunlukta olmalı';
  }

  if (!Validator.isEmpty(data.name)) {
    errors.name = 'İsminizi yazmanız zorunludur';
  }

  if (!Validator.isEmpty(data.email)) {
    errors.email = 'Emailinizi yazmanız zorunludur';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email geçersiz';
  }

  if (!Validator.isEmpty(data.password)) {
    errors.password = 'Şifre yazmanız gerekiyor';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Şifreniz en az 6 karakter, en fazla 30 karakter olmalıdır';
  }

  if (!Validator.isEmpty(data.password2)) {
    errors.password2 = 'Şifrenizi tekrar yazmanız gerekiyor';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Şifreleriniz eşleşmiyor';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
