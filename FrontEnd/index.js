let projets;
// Récupération du projet depuis le fichier JSON
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    projets = data;
    genererProjets(projets);
  })
  .catch((error) => console.error(error));

// let article;
// Fonction qui génère toute la page web
function genererProjets(projets) {
  // Récupération de l'élément du DOM qui accueillera la gallery
  const sectionGallery = document.querySelector(".gallery");
  for (let i = 0; i < projets.length; i++) {
    var article = projets[i];
    // Création d’une balise dédiée à un projet
    const projetElement = document.createElement("figure");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    imageElement.src = projets[i].imageUrl;
    imageElement.crossOrigin = "anonymous";
    // const corsImageModified = new Image();
    // corsImageModified.crossOrigin = "Anonymous";
    // corsImageModified.src = projets[i].imageUrl + "?not-from-cache-please";
    // imageElement.src = "assets/images/abajour-tahina.png";
    // on créé l'élément title.
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = article.title;

    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);

    // On rattache la balise article au body
    sectionGallery.appendChild(projetElement);
  }
}
function supprimerListe() {
  document.querySelector(".gallery").innerHTML = "";
}

//////////////////////////les filtres//////////////////////////

const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function () {
  supprimerListe();
  genererProjets(projets);
});

const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function () {
  const objetsFiltrees = projets.filter(function (article) {
    return article.category.name === "Objets";
  });
  supprimerListe();
  genererProjets(objetsFiltrees);
});

const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function () {
  const appartementsFiltrees = projets.filter(function (article) {
    return article.category.name === "Appartements";
  });
  supprimerListe();
  genererProjets(appartementsFiltrees);
});

const boutonHotelRestaurants = document.querySelector(".btn-hotel-restaurant");
boutonHotelRestaurants.addEventListener("click", function () {
  const hotelRestaurantsFiltrees = projets.filter(function (article) {
    return article.category.name === "Hotels & restaurants";
  });
  supprimerListe();
  genererProjets(hotelRestaurantsFiltrees);
});

/////////////////Authentification de l'utilisateur///////////////////////

// Récupération des éléments du formulaire
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const errorMessage = document.getElementById("error-message");

// Définition des informations email/mot de passe correctes
const correctEmail = "sophie.bluel@test.tld";
const correctPassword = "S0phie";

// Gestion de la soumission du formulaire
form.addEventListener("submit", handleFormSubmit);
emailInput.addEventListener("keydown", handleEnterKey);
passwordInput.addEventListener("keydown", handleEnterKey);

function handleFormSubmit(event) {
  event.preventDefault();

  // Récupération des valeurs saisies dans les champs
  const email = emailInput.value;
  const password = passwordInput.value;

  // Vérification des informations utilisateur/mot de passe
  if (email === correctEmail && password === correctPassword) {
    // Envoi de la requête POST à l'API
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(correctEmail, correctPassword),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "index.html";
        } else {
          errorMessage.textContent = "La connexion a échoué";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorMessage.textContent = "La connexion a échoué";
      });
  } else {
    errorMessage.textContent =
      "Informations utilisateur/mot de passe incorrectes";
  }
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    handleFormSubmit(event);
  }
}
