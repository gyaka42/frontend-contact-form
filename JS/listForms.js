const username = "emrehrmn";
const password = "onecvlandingapi";

const yetkisiz = document.getElementById("yetkisiz");
const yetkili = document.getElementById("yetkili");

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");

const loginError = document.getElementById("loginError");
const toTopBtn = document.getElementById("toTopBtn");

let isLogin = false;

if (isLogin === false) {
  yetkisiz.style.display = "flex";
  yetkili.style.display = "none";
} else {
  yetkisiz.style.display = "none";
  yetkili.style.display = "block";
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (usernameInput.value == "") {
    loginError.innerText = "Kullanici Adi bos birakilamaz";
    usernameInput.focus();
    setTimeout(() => {
      loginError.innerText = "";
    }, 2000);
    return;
  }
  if (passwordInput.value == "") {
    loginError.innerText = "Sifre bos birakilamaz";
    passwordInput.focus();
    setTimeout(() => {
      loginError.innerText = "";
    }, 2000);
    return;
  }
  if (usernameInput.value !== username || passwordInput.value !== password) {
    loginError.innerText = "Kullanici adi yada sifre yanlis";
    setTimeout(() => {
      loginError.innerText = "";
    }, 2000);
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
            ><a href="mailto:${forms[i].email}?subject=Email konuyu deniyorum"
              >${forms[i].email}</a
            ></span
          >
        </div>
        <div class="formRow">
          <span class="formLabel">Tarih :</span>
          <span>${new Date(forms[i].date).toDateString()}</span>
        </div>
      </div>
      <div class="formRight">
        <div>
          <span class="formLabel"> Mesaj :</span>
        </div>
        <p class="formMessage">
        ${forms[i].message}
        </p>
        div
      </div>
    `;
    yetkili.appendChild(form);
  }
};

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
