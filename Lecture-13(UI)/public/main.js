const userContainer = document.getElementById('user-container');

async function getUser() {
  /*
      axios.get("http://localhost:3000/user"); : axios will send the "get" req to API path "http://locahost:3000/user"
      res.data.user; : this will store the object send by the API
  */
  let res = await axios.get("http://localhost:3000/user");
  let user = res.data.user;
  const h1 = document.createElement("h1");
  h1.innerText = `Name : ${user.name}`;
  userContainer.innerHTML = `<p>${user.branch}</p> <p>${user.age}</p>`
  // userContainer.append(h1);
  userContainer.prepend(h1);
}

getUser();