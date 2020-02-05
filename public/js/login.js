/* eslint-disable */
import axios from 'axios';

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
      alert('Login in successfully');

      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
