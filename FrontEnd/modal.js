// Récupération de la modal
const modal = document.getElementById("modal1");

// Récupération du bouton "Modifier"
const modifyBtn = document.getElementById("modify");

// Récupération du bouton de fermeture de la modal
const closeModalBtn = document.querySelector(".js-modal-close");

// Fonction pour ouvrir la modal
const openModal = () => {
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  closeModalBtn.addEventListener("click", closeModal);
  window.addEventListener("keydown", onKeyDown);
};

// Fonction pour fermer la modal
const closeModal = () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  closeModalBtn.removeEventListener("click", closeModal);
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("click", onClickOutside);
};

// Fonction pour gérer l'événement de touche appuyée
const onKeyDown = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

// Fonction pour gérer l'événement de clic à l'extérieur de la modal
const onClickOutside = (event) => {
  if (!modal.contains(event.target)) {
    closeModal();
  }
};
console.log(onClickOutside);
// Ajout d'un écouteur d'événement de clic sur le bouton "Modifier"
modifyBtn.addEventListener("click", openModal);

// let projets;
// // Fonction qui génère toute la page web
// function genererProjets(projets) {
//   // Récupération de l'élément du DOM qui accueillera la gallery
//   const sectionGallery = document.querySelector(".gallery");
//   for (let i = 0; i < projets.length; i++) {
//     const article = projets[i];
//     // Création d’une balise dédiée à un projet
//     const projetElement = document.createElement("figure");
//     // On crée l’élément img.
//     const imageElement = document.createElement("img");
//     imageElement.src = projets[i].imageUrl;
//     imageElement.crossOrigin = "anonymous";

//     projetElement.appendChild(imageElement);

//     // On rattache la balise article au body
//     sectionGallery.appendChild(projetElement);
//   }
// }
// function supprimerListe() {
//   document.querySelector(".gallery").innerHTML = "";
// }
