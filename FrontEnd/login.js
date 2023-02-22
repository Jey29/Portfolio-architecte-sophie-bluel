/////////////////Authentification de l'utilisateur///////////////////////

// Récupération des éléments du formulaire
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const errorMessage = document.getElementById("error-message");

// Gestion de la soumission du formulaire
form.addEventListener("submit", handleFormSubmit);
emailInput.addEventListener("keydown", handleEnterKey);
passwordInput.addEventListener("keydown", handleEnterKey);

function handleFormSubmit(event) {
  // Bloquer la gestion du clic par défaut
  event.preventDefault();

  // Récupération des valeurs saisies dans les champs
  const email = emailInput.value;
  const password = passwordInput.value;
  console.log(email);
  console.log(password);
  // Envoi de la requête POST à l'API
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        //session est la réponse contenant l'userId et le token
        response.json().then((session) => {
          //enregistrement de session dans le localStorage
          localStorage.setItem("session", JSON.stringify(session));
          // Enregistrement du statut de connexion dans une session
          startSession();
          window.location.href = "index.html";
        });
      } else {
        errorMessage.textContent = "La connexion a échoué";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      errorMessage.textContent = "La connexion a échoué";
    });
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    handleFormSubmit(event);
  }
}
// // Fonction pour démarrer une session
function startSession() {
  sessionStorage.setItem("isConnected", true);
}
// // Fonction pour vérifier le statut de la session
// function checkSession() {
//   if (sessionStorage.getItem("isConnected") === "true") {
//     // Utilisateur connecté, afficher le bouton "modifier"
//     document.getElementById("modifyButton").style.display = "block";
//   } else {
//     // Utilisateur non connecté, cacher le bouton "modifier"
//     document.getElementById("modifyButton").style.display = "none";
//   }
// }
// // Vérifier le statut de la session lors du chargement de la page
// window.addEventListener("load", function () {
//   checkSession();
// });
