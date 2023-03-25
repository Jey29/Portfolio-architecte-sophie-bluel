function rafraichirModal() {
  const sectionModal = document.querySelector(".gallery-modal");

  // Supprimer tous les éléments existants de la modal
  sectionModal.innerHTML = "";

  fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((projets) => {
      genererModal(projets);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des projets :", error);
    });
}

//ouverture de la modale
const openModale = document.querySelector(".modifButton");

openModale.addEventListener("click", function (event) {
  event.preventDefault();
  const modaleModeElements = document.querySelectorAll("#modal1");
  modaleModeElements.forEach((element) => {
    element.style.display = "flex";
  });
  rafraichirModal();
});
//fermeture de la modale par la croix
const closeModale = document.querySelector(".fa-xmark");
closeModale.addEventListener("click", function (event) {
  event.preventDefault();
  const modaleCloseElements = document.querySelectorAll("#modal1", "#modal2");
  modaleCloseElements.forEach((element) => {
    element.style.display = "none";
  });
});
// Fermeture des modales par clic en dehors
const modalElements = document.querySelectorAll(".modale");
modalElements.forEach((modalElement) => {
  modalElement.addEventListener("click", function (event) {
    if (event.target === modalElement) {
      modalElement.style.display = "none";
    }
  });
});
//Fonction pour faire en sorte que le clic sur le modal ne le ferme pas
const stopPropagation = function (event) {
  event.stopPropagation();
};

// Fonction pour retourner sur modal1
const icon = document.querySelector(".fa-arrow-left");
icon.addEventListener("click", function () {
  const modal1 = document.querySelector("#modal1");
  const modal2 = document.querySelector("#modal2");
  modal2.style.display = "none";
  modal1.style.display = "flex";
});

// Bouton Ajout photo, ouverture modale 2
document.querySelector(".bouton-ajout").addEventListener("click", function () {
  const modaleModeElements = document.querySelectorAll("#modal2");
  modaleModeElements.forEach((element) => {
    element.style.display = "flex";
  });

  // Fermeture de la modale 1
  const modaleCloseElements = document.querySelectorAll("#modal1");
  modaleCloseElements.forEach((element) => {
    element.style.display = "none";
  });
});
