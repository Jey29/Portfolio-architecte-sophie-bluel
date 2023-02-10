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

const divFilters = document.querySelector("#filters");

const boutonTous = document.createElement("button");
boutonTous.innerHTML = "Tous";
boutonTous.id = "filters";
boutonTous.classList.add("bouton-style");
divFilters.appendChild(boutonTous);

boutonTous.addEventListener("click", function () {
  supprimerListe();
  genererProjets(projets);
});

fetch("http://localhost:5678/api/categories")
  .then((response) => {
    return response.json();
  })
  .then((categories) => {
    categories.forEach((category) => {
      const bouton = document.createElement("bouton");
      //donner le style aux boutons créés
      bouton.classList.add("bouton-style");
      bouton.textContent = category.name;

      bouton.addEventListener("click", function () {
        const filteredProjects = projets.filter(function (projet) {
          return projet.category.name === category.name;
        });
        supprimerListe();
        genererProjets(filteredProjects);
      });
      divFilters.appendChild(bouton);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/////////////////////////////affichage session conneté///////////////////
// Fonction pour démarrer une session
function startSession() {
  sessionStorage.setItem("isConnected", true);
}

// Fonction pour vérifier le statut de la session
function checkSession() {
  var element = document.getElementById("nav_modify");
  if (sessionStorage.getItem("isConnected") === "true") {
    // Utilisateur connecté, afficher l'élément
    element.style.display = "block";
  } else {
    // Utilisateur non connecté, cacher l'élément
    element.style.display = "none";
  }
}

// Vérifier le statut de la session lors du chargement de la page
window.addEventListener("load", function () {
  checkSession();
});

// recuperer session dans le localStorage, valeur id + token ok
// Sur la page principale afficher les éléments supplémentaires quand la connexion est établie
// clic modifier: ouverture modale
