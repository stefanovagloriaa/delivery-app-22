import { html } from '../node_modules/lit-html/lit-html.js';

import { setupNavigation } from '../app.js';
import { register } from '../api/data.js';

const registerTemplate = (registerUser) => html`
<form @submit=${registerUser} method="post">
  <div class="container">
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter email.." name="email" id="email">

    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter username.." name="username" id="username">

    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter password.." name="password" id="password">

    <label for="rePass"><b>Repeat password</b></label>
    <input type="password" placeholder="Repeat your password.." name="rePass" id="rePass">

    <button type="submit">Register</button>
    <p>Have an account? <a href="/login">Sign in</a></p>
  </div>
</form>
`;

export async function registerPage(ctx) {
  const registerForm = registerTemplate(registerUser);

  ctx.render(registerForm, ctx.container);

  async function registerUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email && username && password && rePass) {

      await register(email, username, password);
      console.log('DONE');

      setupNavigation();
      ctx.page.redirect('/');
    }
  }
};

