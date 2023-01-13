const username = "emrehrmn";
const password = "onecvlandingapi";

const yetkisiz = document.getElementById("yetkisiz");
const yetkili = document.getElementById("yetkili");

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");

const loginError = document.getElementById("loginError");

let isLogin = false;

if (isLogin === false) {
  yetkisiz.style.display = "block";
  yetkili.style.display = "none";
} else {
  yetkisiz.style.display = "none";
  yetkili.style.display = "block";
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (usernameInput.value !== username && passwordInput.value !== password) {
    loginError.innerText = "Kullanici adi yada sifre yanlis";
    return;
  }
  yetkisiz.style.display = "none";
  fetch("http://localhost:3004/get-forms", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameInput.value,
      pass: passwordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      yetkili.style.display = "block";
      console.log(data);
      renderForms(data.forms);
    })
    .catch((err) => {
      console.log(err);
    });
});

const renderForms = (forms = []) => {
  for (let i = 0; i < forms.length; i++) {
    const form = document.createElement("div");
    form.classList.add("formContainer");
    form.innerHTML = `
    <div class="formLeft">
        <div id="firstRow" class="formRow">
          <span class="formLabel"
            >Adi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</span
          >
          <span>${forms[i].name}</span>
        </div>
        <div class="formRow">
          <span class="formLabel">Soyadi :</span>
          <span>${forms[i].surname}</span>
        </div>
        <div class="formRow">
          <span class="formLabel">Email&nbsp;&nbsp; :</span>
          <span
            ><a href="mailto:${forms[i].email}"
              >${forms[i].email}</a
            ></span
          >
        </div>
      </div>
      <div class="formRight">
        <div>
          <span class="formLabel"> Mesaj :</span>
        </div>
        <p class="formMessage">
        ${forms[i].message}
        </p>
      </div>
    `;
    yetkili.appendChild(form);
  }
};
