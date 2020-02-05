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

    console.info(res.data);
  } catch (err) {
    console.log(err.response.data);
  }
};

const { email, password } = form;
form.addEventListener('submit', e => {
  e.preventDefault();
  login(email.value, password.value);
});
