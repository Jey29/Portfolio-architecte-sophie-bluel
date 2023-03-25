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

    // On définit l'attribut "id" pour chaque balise projetElement
    projetElement.setAttribute("id", article.id);

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
    const trashIcon = document.createElement("img");
    trashIcon.classList.add("icon");
    trashIcon.src = "/FrontEnd/assets/icons/poubelle.png";

    const containerIconCross = document.createElement("div");
    containerIconCross.classList.add("containerIconCross");
    containerIconCross.classList.add("hide");
    const crossIcon = document.createElement("img");
    crossIcon.classList.add("icon");
    crossIcon.src = "/FrontEnd/assets/icons/croix.png";
    figureModale.appendChild(contenairImg);
    contenairImg.appendChild(containerIconTrash);
    contenairImg.appendChild(containerIconCross);
    containerIconTrash.appendChild(trashIcon);
    containerIconCross.appendChild(crossIcon);
    contenairImg.append(imgModale);
    figureModale.append(editImg);

    // Récupération de l'élément containerIconCross pour chaque figure modale
    const containerIconCrossList = figureModale.querySelectorAll(
      ".containerIconCross"
    );

    // Ajout d'un écouteur d'événement pour chaque figure modale
    figureModale.addEventListener("mouseenter", () => {
      // Affichage de containerIconCross
      containerIconCrossList.forEach((containerIconCross) => {
        containerIconCross.classList.remove("hide");
      });
    });

    figureModale.addEventListener("mouseleave", () => {
      // Masquage de containerIconCross
      containerIconCrossList.forEach((containerIconCross) => {
        containerIconCross.classList.add("hide");
      });
    });
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
            console.log("Le projet a bien été supprimé");
            // Supprimer la figure correspondante dans la modale
            const figureASupprimerModale = document.querySelector(
              `.figureEdit [data-id="${id}"]`
            ).parentNode.parentNode;
            figureASupprimerModale.remove();
            // Supprimer la figure correspondante dans la galerie
            const figureASupprimerGallery = document.querySelector(
              `.gallery figure[id="${id}"]`
            );
            if (figureASupprimerGallery) {
              console.log("La figure de la galerie a été trouvée");
              figureASupprimerGallery.remove();
            } else {
              console.log("La figure de la galerie n'a pas été trouvée");
            }
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du projet :", error);
        });
    });
  }
}

//////////////////////////les filtres//////////////////////////
const divFilters = document.querySelector("#filters");

// Fonction pour supprimer la liste des projets dans la galerie
function supprimerListe() {
  document.querySelector(".gallery").innerHTML = "";
}

// Vérifiez si l'utilisateur est connecté
const token = sessionStorage.getItem("token");
if (token) {
  // Si l'utilisateur est connecté, supprimez les boutons de filtre
  divFilters.style.display = "none";
  // Affichez les éléments du mode administrateur
  showAdminModeElements();
  // Vérifiez si le bouton "Tous" existe et masquez-le si nécessaire
  const boutonTous = document.querySelector("#filters");
  if (boutonTous) {
    boutonTous.style.display = "none";
  }
} else {
  // Ajoutez le bouton "Tous" après avoir généré les boutons de filtre
  const boutonTous = document.createElement("button");
  boutonTous.innerHTML = "Tous";
  boutonTous.id = "filters";
  boutonTous.classList.add("bouton-style");
  divFilters.appendChild(boutonTous);

  boutonTous.addEventListener("click", function () {
    supprimerListe();
    genererProjets(projets);
  });
  // Si l'utilisateur n'est pas connecté, génère les boutons de filtre
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
}

////////////////////LOGIN faire apparaitre/masquer les éléments///////////////
function showAdminModeElements() {
  const adminModeElements = document.querySelectorAll("#adminMode");
  adminModeElements.forEach((element) => {
    element.style.display = "flex";
  });
}
function hideAdminModeElements() {
  const adminModeElements = document.querySelectorAll("#adminMode");
  adminModeElements.forEach((element) => {
    element.style.display = "none";
  });
}

/////////////////// LOGIN/LOGOUT ////////////////////////////////
// variable globale définie pour stocker l'état de connexion de l'utilisateur
let isLoggedIn = false;

const loginLogoutLink = document.querySelector("#login-logout");

// Vérification si l'utilisateur est déjà connecté
if (token) {
  isLoggedIn = true;
  loginLogoutLink.textContent = "logout";
  showAdminModeElements();
}

// Ajoutez un écouteur d'événement au lien "login/logout"
loginLogoutLink.addEventListener("click", (event) => {
  // Empêche la redirection par défaut
  event.preventDefault();

  // Si l'utilisateur est connecté, déconnectez-le
  if (isLoggedIn) {
    sessionStorage.removeItem("token");
    isLoggedIn = false;
    loginLogoutLink.textContent = "login";
    hideAdminModeElements();
    // Rafraîchir la page index.html
    window.location.href = "index.html";
  } else {
    // Sinon, redirigez l'utilisateur vers la page de connexion
    window.location.href = "login.html";
  }
});

/////////////////////////Ajout Projet/////////////////////////////
const boutonAjout = document.getElementById("Ajout");
const inputPhoto = document.getElementById("input-file");
const blocAjout = document.querySelector(".blocAjout");

boutonAjout.addEventListener("click", function () {
  inputPhoto.click();
});

inputPhoto.addEventListener("change", function () {
  const image = document.createElement("img");
  image.src = URL.createObjectURL(this.files[0]);
  image.onload = function () {
    URL.revokeObjectURL(this.src);
  };

  // Ajout de la classe "hidden" à tous les éléments à cacher, sauf à l'élément "img"
  const elementsAInvisible = blocAjout.querySelectorAll(":scope > *:not(img)");
  elementsAInvisible.forEach(function (element) {
    element.classList.add("hidden");
  });

  blocAjout.appendChild(image);
});

// Récupère l'élément select
const selectElement = document.getElementById("Catégorie");

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const optionElement = document.createElement("option");
      optionElement.value = category.name;
      optionElement.textContent = category.name;
      optionElement.dataset.id = category.id;
      selectElement.appendChild(optionElement);
    });
  })
  .catch((error) => console.error("Error:", error));

const btnValider = document.querySelector(".btn-valider");
// // Récupérer les éléments à surveiller
// const inputTitre = document.querySelector("[name=Titre]");
// const inputCategorie = document.getElementById("Catégorie");
// // Fonction de mise à jour de la couleur du bouton
// function updateButtonColor() {
//   if (inputTitre.value && inputCategorie.value && inputPhoto.value) {
//     btnValider.style.backgroundColor = "#1D6154";
//   } else {
//     btnValider.style.backgroundColor = "";
//   }
// }

// // Ajouter un écouteur d'événement "input" à chaque champ
// inputTitre.addEventListener("input", updateButtonColor);
// inputCategorie.addEventListener("input", updateButtonColor);
// inputPhoto.addEventListener("input", updateButtonColor);

btnValider.addEventListener("click", function () {
  const form = document.querySelector("form");
  const formData = new FormData();
  const file = inputPhoto.files[0];
  const blob = new Blob([file], { type: file.type }); // convertir l'image en binary
  formData.append("image", blob, file.name);
  formData.append("title", form.querySelector("[name=Titre]").value);
  formData.append(
    "category",
    selectElement.options[selectElement.selectedIndex].dataset.id
  );
  if (
    formData.get("title") &&
    formData.get("category") &&
    formData.get("image")
  ) {
    fetch("http://localhost:5678/api/works", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const projet = document.createElement("figure");
        const imageElement = document.createElement("img");
        const titleElement = document.createElement("figcaption");

        // Récupération de l'ID retourné par l'API
        const newProjectId = data.id;

        imageElement.src = data.imageUrl;
        imageElement.crossOrigin = "anonymous";
        titleElement.innerText = data.title;

        projet.appendChild(imageElement);
        projet.appendChild(titleElement);

        // Ajout de l'ID retourné par l'API à l'élément du projet
        projet.setAttribute("id", newProjectId);

        const gallery = document.querySelector(".gallery");
        gallery.appendChild(projet);

        document.getElementById("modal2").style.display = "none";
      })
      .catch((error) => console.error("Erreur:", error));
  } else {
    alert("Veuillez remplir tous les champs et ajouter une image");
  }
});
