import { html } from '../node_modules/lit-html/lit-html.js';

import { getUserById, updateUserProfile } from '../api/data.js';

const profileTemplate = (user, updateProfile) => html`
  <form @submit=${updateProfile} id="userProfile">
    <div class="container">
      <img id="profileImage" src="../static/pictures/defaultProfilePicture.jpg" alt="No profile picture">
      <div>
        <label for="username"><b>Username</b></label>
        <br>
        <input type="text" id="username" name="username" value=${user.username}>
      </div>
      <div>
        <label for="email"><b>Email</b></label>
        <br>
        <input type="text" id="email" name="email" value=${user.email}>
      </div>
      <div>
        <label for="address"><b>Address</b></label>
        <br>
        <input type="text" id="address" name="address" value=${user.address}>
      </div>
      <button>Save changes</button>
    </div>
  </form>
`;

export async function profilePage(ctx) {

  const sessionToken = sessionStorage.getItem('sessionToken');
  console.log(sessionToken);
  const currentUser = await getUserById(sessionToken);

  ctx.render(profileTemplate(currentUser, updateProfile), ctx.container);

  async function updateProfile(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const [username, email, address] = [formData.get('username'), formData.get('email'), formData.get('address')];

    console.log(username, email, address);
    const response = await updateUserProfile({
      "username": username,
      "email": email,
      "address": address,
    }, sessionStorage.getItem('userId'));

    ctx.page.redirect('/');
  }
}