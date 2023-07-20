const registrationbButtonEl = document.getElementById("submit-button");
const groupInputEl = document.getElementById("name");
const passwordInputEl = document.getElementById("password");

registrationbButtonEl.addEventListener("click", () => {
  const group = groupInputEl.value;
  const password = passwordInputEl.value;
  const user = {
    group: group,
    password: password,
  };
  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        window.location.href = "/index.html";
      } else {
        alert("Login failed");
      }
    });
});
