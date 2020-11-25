const API_URL = "http://localhost:3000/login";

const toSubmit = (event) => {
  event.preventDefault();
};

// const emailInput = (event) => {
//   console.log(event.target.value);
//   const email = event.target.value;
// };

// const passwordInput = (event) => {
//   console.log(event.target.value);
//   const password = event.target.value;
// };

const checkUser = (e) => {
  //   e.preventDefault();
  const email = document.querySelector("#inputEmail1").value;
  console.log(email);
  const password = document.querySelector("#inputPassword1").value;
  console.log(password);
  const userMessage = document.getElementById("userValidation");

  //   let data = new FormData();
  //   data.append("email", email);
  //   data.append("password", password);
  const data = {
    email: email,
    password: password,
  };
  console.log(data);

  fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // console.log(response.statusText);
      return response.json();
    })
    .then((data) => {
      console.log(data.status);
      if (data.status == "valid") {
        userMessage.style.color = "green";
        userMessage.innerText = "You have successfully logged in!!";
      } else {
        userMessage.style.color = "red";
        userMessage.innerText = "Wrong email/password";
      }
    });
};
