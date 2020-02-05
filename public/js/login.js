/* eslint-disable */

const form = document.querySelector('#form');
const url = `http://localhost:3000/api/v1/users/login`;

const login = async (email, password) => {
  const data = { email, password };

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

const { email, password } = form;
form.addEventListener('submit', e => {
  e.preventDefault();
  login(email.value, password.value);
});
