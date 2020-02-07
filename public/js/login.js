/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alerts';

const PORT = 3000;

const BASE_URL = `http://localhost:${PORT}/api/v1/users`;

export const login = async (email, password) => {
  const data = { email, password };

  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/login`,
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

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/logout`
    });

    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'An error occured while logging out.');
  }
};
