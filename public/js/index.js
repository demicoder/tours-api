/* eslint-disable */
import '@babel/polyfill';

import { login, logout } from './login';

// DOM Elements
const loginForm = document.querySelector('#form');
const logoutBtn = document.querySelector('.nav__el--logout');

// Delegation

// Login
if (loginForm) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const { email, password } = loginForm;
    login(email.value, password.value);
  });
}

// Logout
console.log(logoutBtn);
if (logoutBtn) logoutBtn.addEventListener('click', logout);
