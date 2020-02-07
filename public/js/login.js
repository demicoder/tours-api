/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alerts';

export const login = async (email, password) => {
  const data = { email, password };
  const url = `http://localhost:3000/api/v1/users/login`;

  try {
    const res = await axios({
      method: 'POST',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert(res.data.status, 'Successfully logged in');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
