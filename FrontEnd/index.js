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
            console.log(document.querySelector(`.gallery`));
            figureASupprimerGallery.remove();
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

////////////////////LOGIN faire apparaitre les éléments///////////////
function showAdminModeElements() {
  const adminModeElements = document.querySelectorAll("#adminMode");
  adminModeElements.forEach((element) => {
    element.style.display = "flex";
  });
}

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
btnValider.addEventListener("click", function () {
  const form = document.querySelector("form");
  const formData = new FormData();
  const inputFile = document.getElementById("input-file");
  const file = inputFile.files[0];
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
        console.log("🚀 ~ file: index.js:249 ~ .then ~ data:", data);
        const projet = document.createElement("div");
        projet.classList.add("projet");
        projet.innerHTML = `
          <img src="${data.imageUrl}" alt="${data.title}">
          <figcaption>${data.title}</figcaption>
        `;
        const gallery = document.querySelector(".gallery");
        gallery.appendChild(projet);
      })
      .catch((error) => console.error("Erreur:", error));
  } else {
    alert("Veuillez remplir tous les champs et ajouter une image");
  }
});
