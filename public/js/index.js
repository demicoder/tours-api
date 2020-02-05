/* eslint-disable */
import '@babel/polyfill';

import { login } from './login';

// DOM Elements
const loginForm = document.querySelector('#form');

// Delegation
if (loginForm) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const { email, password } = loginForm;
    login(email.value, password.value);
  });
}
