// /////////////////Authentification de l'utilisateur///////////////////////

// // Récupération des éléments du formulaire
// const form = document.getElementById("login-form");
// const emailInput = document.getElementById("email-input");
// const passwordInput = document.getElementById("password-input");
// const errorMessage = document.getElementById("error-message");

// // Gestion de la soumission du formulaire
// form.addEventListener("submit", handleFormSubmit);
// emailInput.addEventListener("keydown", handleEnterKey);
// passwordInput.addEventListener("keydown", handleEnterKey);

// function handleFormSubmit(event) {
//   // Bloquer la gestion du clic par défaut
//   event.preventDefault();

//   // Récupération des valeurs saisies dans les champs
//   const email = emailInput.value;
//   const password = passwordInput.value;
//   console.log(email);
//   console.log(password);
//   // Envoi de la requête POST à l'API
//   fetch("http://localhost:5678/api/users/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         //session est la réponse contenant l'userId et le token
//         response.json().then((session) => {
//           //enregistrement de session dans le localStorage
//           localStorage.setItem("session", JSON.stringify(session));
//           // Enregistrement du statut de connexion dans une session
//           startSession();
//           window.location.href = "index.html";
//         });
//       } else {
//         errorMessage.textContent = "La connexion a échoué";
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       errorMessage.textContent = "La connexion a échoué";
//     });
// }

// function handleEnterKey(event) {
//   if (event.key === "Enter") {
//     handleFormSubmit(event);
//   }
// }
// // // Fonction pour démarrer une session
// function startSession() {
//   sessionStorage.setItem("isConnected", true);
// }

const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  });

  const data = await response.json();
  const token = data.token;

  if (token) {
    // Stockez le jeton d'accès dans le stockage local du navigateur
    sessionStorage.setItem("token", token);

    // Redirigez l'utilisateur vers la page index.html
    window.location.href = "index.html";

    // Recherchez les éléments avec l'id "adminMode" dans la page index.html
    const adminModeElements = document.querySelectorAll("#adminMode");

    // Affichez les éléments avec la classe "adminMode"
    adminModeElements.forEach((element) => {
      element.style.display = "flex";
    });
  } else {
    // Affichez un message d'erreur si la connexion a échoué
    alert("Erreur dans l’identifiant ou le mot de passe");
  }
});
