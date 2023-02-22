let projets;

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    projets = data;
    genererProjetsGallery(projets);
    genererProjetsGalleryModal(projets);
  })
  .catch((error) => console.error(error));

function genererProjetsGallery(projets) {
  const sectionGallery = document.querySelector(".gallery");
  for (let i = 0; i < projets.length; i++) {
    const projetElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = projets[i].imageUrl;
    imageElement.crossOrigin = "anonymous";

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = projets[i].title;

    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);

    sectionGallery.appendChild(projetElement);
  }
}

function genererProjetsGalleryModal(projets) {
  const sectionModal = document.querySelector(".gallery-modal");
  for (let i = 0; i < projets.length; i++) {
    const projetElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = projets[i].imageUrl;
    imageElement.crossOrigin = "anonymous";

    projetElement.appendChild(imageElement);

    sectionModal.appendChild(projetElement);
  }
}

function supprimerListe() {
  document.querySelector(".gallery").innerHTML = "";
  document.querySelector(".gallery-modal").innerHTML = "";
}

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    genererProjets(data);
  })
  .catch((error) => console.error(error));

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

/////////////////////////////affichage session connectée///////////////////
// Fonction pour démarrer une session
function startSession() {
  sessionStorage.setItem("isConnected", true);
}

// Fonction pour vérifier le statut de la session
function checkSession() {
  const element = document.getElementById("nav_modify");
  const element1 = document.getElementById("modify");
  if (sessionStorage.getItem("isConnected") === "true") {
    // Utilisateur connecté, afficher l'élément
    element.style.display = "block";
    element1.style.display = "block";
  } else {
    // Utilisateur non connecté, cacher l'élément
    element.style.display = "none";
    element1.style.display = "none";
  }
}

// Vérifier le statut de la session lors du chargement de la page
window.addEventListener("load", function () {
  checkSession();
});
