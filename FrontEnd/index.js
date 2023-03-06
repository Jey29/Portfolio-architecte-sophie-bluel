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
    let projetElement = document.createElement("figure");
    // On crée l’élément img.
    let imageElement = document.createElement("img");
    imageElement.src = projets[i].imageUrl;
    imageElement.crossOrigin = "anonymous";
    // On créé l'élément title.
    let titleElement = document.createElement("figcaption");
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
    const article = projets[i];
    let figureModale = document.createElement("figure");
    figureModale.classList.add("figureEdit");
    let contenairImg = document.createElement("div");
    contenairImg.classList.add("containerImg");
    let imgModale = document.createElement("img");
    imgModale.src = article.imageUrl;
    imgModale.crossOrigin = "anonymous";
    const editImg = document.createElement("figcaption");
    editImg.innerText = "éditer";
    //Ajout des icones et de leurs fonds
    const containerIconTrash = document.createElement("div");
    containerIconTrash.classList.add("containerIconTrash");
    containerIconTrash.setAttribute("data-id", article.id);
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa", "fa-trash-can");
    const containerIconCross = document.createElement("div");
    containerIconCross.classList.add("containerIconCross");
    const crossIcon = document.createElement("i");
    crossIcon.classList.add("fa", "fa-up-down-left-right");
    crossIcon.crossOrigin = "anonymous";
    figureModale.appendChild(contenairImg);
    contenairImg.appendChild(containerIconTrash);
    contenairImg.appendChild(containerIconCross);
    containerIconTrash.appendChild(trashIcon);
    containerIconCross.appendChild(crossIcon);
    contenairImg.append(imgModale);
    figureModale.append(editImg);
    // On rattache la balise figureModale à la sectionModal
    sectionModal.appendChild(figureModale);

    containerIconTrash.addEventListener("click", function (event) {
      event.preventDefault();
      const id = this.getAttribute("data-id"); // Récupération de l'identifiant de l'article
      fetch(`http://localhost:5678/api/works/${id}`, {
        // Utilisation de l'identifiant dans l'URL
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("L'image a bien été supprimée");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'image :", error);
        });
    });
  }
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

// Fonction pour supprimer la liste des projets dans la galerie
function supprimerListe() {
  document.querySelector(".gallery").innerHTML = "";
}

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

////////////////////LOGIN faire apparaitre les éléments///////////////
function showAdminModeElements() {
  const adminModeElements = document.querySelectorAll("#adminMode");
  adminModeElements.forEach((element) => {
    element.style.display = "flex";
  });
}
// Vérifiez si l'utilisateur est connecté
const token = sessionStorage.getItem("token");
if (token) {
  showAdminModeElements();
}

/////////////////////////Ajout Projet/////////////////////////////
