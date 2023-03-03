// Récupération de la modal
const modal = document.getElementById("modal1");

// Récupération du bouton "Modifier"
const modifyBtn = document.getElementById("modifButton");

// Récupération du bouton de fermeture de la modal
const closeModalBtn = document.querySelector(".js-modal-close");

// Fonction générique pour ouvrir une modal
const openModal = (modalEl) => {
  modalEl.style.display = null;
  modalEl.removeAttribute("aria-hidden");
  modalEl.setAttribute("aria-modal", "true");
  closeModalBtn.addEventListener("click", closeModal);
  window.addEventListener("keydown", onKeyDown);
};

// Fonction générique pour fermer une modal
const closeModal = (modalEl) => {
  modalEl.style.display = "none";
  modalEl.setAttribute("aria-hidden", "true");
  modalEl.removeAttribute("aria-modal");
  closeModalBtn.removeEventListener("click", closeModal);
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("click", onClickOutside);
};

// Fonction pour gérer l'événement de touche appuyée
const onKeyDown = (event) => {
  if (event.key === "Escape") {
    closeModal(modal);
    closeModal(newModal);
  }
};

// Fonction pour gérer l'événement de clic à l'extérieur de la modal
const onClickOutside = (event) => {
  if (!modal.contains(event.target)) {
    closeModal(modal);
    closeModal(newModal);
  }
};

// Ajout d'un écouteur d'événement de clic sur le bouton "Modifier"
modifyBtn.addEventListener("click", () => {
  openModal(modal);
});

// Récupération du bouton d'ajout et de la page modale actuelle
const addButton = document.querySelector(".bouton-ajout");

// Récupération de la nouvelle page modale
const newModal = document.querySelector("#modal2");

// Fonction qui sera appelée lorsque le bouton sera cliqué
function switchModal() {
  // Masquer la page modale actuelle
  closeModal(modal);

  // Afficher la nouvelle page modale
  openModal(newModal);
}

// Ajout de l'événement de clic au bouton
addButton.addEventListener("click", switchModal);
