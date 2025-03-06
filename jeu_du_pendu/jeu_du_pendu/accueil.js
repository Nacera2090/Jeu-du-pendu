const divRoot = document.getElementById("root");

// Créer le titre
const hMainTitle = document.createElement("h1");
hMainTitle.innerText = "Jeu du pendu";
document.body.style.color = "white";
document.body.style.textAlign = "center";
divRoot.appendChild(hMainTitle);

// Créer un conteneur pour les boutons
const buttonsContainer = document.createElement("div");
buttonsContainer.id = "buttons-container"; // ID pour la mise en forme CSS
divRoot.appendChild(buttonsContainer);

// Fonction pour créer une image-bouton
function createImageButton(id, imgSrc, onClick) {
    const button = document.createElement("img");
    button.id = id;
    button.src = imgSrc;
    button.className = "image-level-button";
    button.onclick = onClick;

    buttonsContainer.appendChild(button);
}

function startGame(level) {
    // Redirige vers page2.html avec le niveau comme paramètre
    window.open( "../page2/page2.html?level=" + level, "_self"); 
}

// Créer les images-boutons pour chaque niveau
createImageButton("level1", "../images/level1.png", () => startGame(1));
createImageButton("level2", "../images/level2.png", () => startGame(2));
createImageButton("level3", "../images/level3.png", () => startGame(3));
