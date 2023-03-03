let projets;

// Récupération du projet depuis le fichier JSON
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    projets = data;
    genererProjets(projets);
    genererModal(projets);
  })
  .catch((error) => console.error(error));

// Fonction qui génère la galerie de projets
function genererProjets(projets) {
  // Récupération de l'élément du DOM qui accueillera la galerie
  const sectionGallery = document.querySelector(".gallery");
  for (let i = 0; i < projets.length; i++) {
    const article = projets[i];
    // Création d’une balise dédiée à un projet
    const projetElement = document.createElement("figure");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    imageElement.src = projets[i].imageUrl;
    imageElement.crossOrigin = "anonymous";
    // On créé l'élément title.
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = article.title;

    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);

    // On rattache la balise projetElement à la sectionGallery
    sectionGallery.appendChild(projetElement);
  }
}

// Fonction qui génère la modale
function genererModal(projets) {
  // Récupération de l'élément du DOM qui accueillera la modale
  const sectionModal = document.querySelector(".gallery-modal");
  for (let i = 0; i < projets.length; i++) {
    // Création d’une balise dédiée à un projet
    const projetElement = document.createElement("figure");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    imageElement.src = projets[i].imageUrl;
    imageElement.crossOrigin = "anonymous";
    // On créé l'élément du bouton poubelle
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener("click", () => {
      supprimerProjet(projets[i].id);
      sectionModal.removeChild(projetElement);
      const projetGallery = document.getElementById(`gallery-${projets[i].id}`);
      projetGallery.remove();
    });

    projetElement.appendChild(imageElement);
    projetElement.appendChild(deleteButton);

    // On rattache la balise projetElement à la sectionModal
    sectionModal.appendChild(projetElement);
  }
}

// Fonction pour supprimer un projet
function supprimerProjet(id) {
  fetch(`https://mon-api.com/projets/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du projet");
      }
      // Supprimer le projet de la modale
      const projetElement = document.getElementById(`projet-${id}`);
      projetElement.remove();
      // Supprimer le projet de la gallery
      const projetGallery = document.getElementById(`gallery-${id}`);
      projetGallery.remove();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Fonction pour supprimer la liste des projets dans la galerie
function supprimerListe() {
  document.querySelector(".gallery").innerHTML = "";
}

// Fonction pour supprimer la liste des projets dans la modale
function supprimerListeModal() {
  document.querySelector(".gallery-modal").innerHTML = "";
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
      const bouton = document.createElement("button");
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
// // Fonction pour démarrer une session
// function startSession() {
//   sessionStorage.setItem("isConnected", true);
// }

// // Fonction pour vérifier le statut de la session
// function checkSession() {
//   const element = document.getElementById("nav_modify");
//   const element1 = document.getElementById("modify");
//   if (sessionStorage.getItem("isConnected") === "true") {
//     // Utilisateur connecté, afficher l'élément
//     element.style.display = "block";
//     element1.style.display = "block";
//   } else {
//     // Utilisateur non connecté, cacher l'élément
//     element.style.display = "none";
//     element1.style.display = "none";
//   }
// }

// // Vérifier le statut de la session lors du chargement de la page
// window.addEventListener("load", function () {
//   checkSession();
// });
