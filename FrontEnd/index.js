// Récupération du projet depuis le fichier JSON
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => genererProjets(data))
  .catch((error) => console.error(error));

// Fonction qui génère toute la page web
function genererProjets(projets) {
  // Récupération de l'élément du DOM qui accueillera la gallery
  const sectionGallery = document.querySelector(".gallery");
  for (let i = 0; i < projets.length; i++) {
    const article = projets[i];
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

// const boutonTous = document.querySelector(".btn-tous");
// boutonTous.addEventListener("click", function () {});

const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function () {
  const objetsFiltrees = article.name(function (name) {
    return article.name === "Objets";
  });
  console.log(objetsFiltrees);
});

const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function () {
  const appartementsFiltrees = article.name(function (name) {
    return article.name === "Appartements";
  });
  console.log(appartementsFiltrees);
});

const boutonHotelRestaurants = document.querySelector(".btn-hotel-restaurant");
boutonHotelRestaurants.addEventListener("click", function () {
  const hotelRestaurantsFiltrees = article.name(function (name) {
    return article.name === "Hotels & restaurants";
  });
  console.log(hotelRestaurantsFiltrees);
});
