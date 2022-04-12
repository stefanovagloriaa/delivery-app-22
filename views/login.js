import { html } from '../node_modules/lit-html/lit-html.js';

import { setupNavigation } from '../app.js';
import { login } from '../api/data.js';

const loginTemplate = (loginUser) => html`
<form @submit=${loginUser} method="post">
  <div class="container">
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter your username.." name="username" id="username">
    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter your password.." name="password" id="password">
    <button type="submit">Log In</button>
  </div>
</form>
`;

export async function loginPage(ctx) {
  const loginResult = loginTemplate(loginUser);

  ctx.render(loginResult, ctx.container);

  async function loginUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username && password) {
      console.log(username, password);

      await login(username, password);

      setupNavigation();
      ctx.page.redirect('/');
    }
  }
};

