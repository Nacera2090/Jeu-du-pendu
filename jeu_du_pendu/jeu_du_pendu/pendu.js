const divRoot = document.getElementById("root");

/////////////////////////////////////////////////////////////

// Récupération du niveau de difficulté à partir de l'URL
let level = "level" + window.location.search.split("=").pop(); // Exemple de niveau : "levelFacile" si URL = "?niveau=Facile"
 
// Vérifie si le niveau est correct en affichant `level` et les mots correspondants
// console.log("level:", level, motATrouver[level]);

// Fonction pour sélectionner un mot aléatoire en fonction du niveau de difficulté
function selectionnerMot(level) {
    const motsDuLevel = motATrouver[level]; // Accède à la liste des mots pour le niveau donné
    return motsDuLevel[Math.floor(Math.random() * motsDuLevel.length)]; // Sélectionne un mot au hasard
}

//on mets `level` pour utiliser le niveau obtenu depuis l'URL
const motSelectionne = selectionnerMot(level);

// console.log("Mot sélectionné:", motSelectionne);

/////////////////////////////////////////////////////////////

// Initialisation des variables pour gérer les erreurs permises et commises
let erreursAutorisees = 10;
let erreursCommises = 0;

function initialisation() {


    const lettresMot = [];
    let motCache = [];

    // Divise `motSelectionne` en lettres individuelles et les ajoute à `lettresMot` et `motCache`
    const mot = motSelectionne.split(""); // utilisation de `motSelectionne` plutôt que `motATrouver`

    // Efface tout contenu précédent dans `divRoot`
    divRoot.innerHTML = "";

    // Crée un conteneur pour le mot afin de le positionner correctement
    const motContainer = document.createElement("div");
    motContainer.id = "mot-container";
    divRoot.appendChild(motContainer);

    // Crée un élément <span> pour chaque lettre du mot caché
    for (let i = 0; i < mot.length; i++) {
        lettresMot.push(mot[i]); // Ajoute chaque lettre dans `lettresMot`
        motCache.push("_"); // Ajoute un underscore pour chaque lettre dans `motCache`

        const span = document.createElement("span");
        span.textContent = "_"; // Remplir chaque span avec un underscore
        span.classList.add("span");

        motContainer.appendChild(span); // Ajoute chaque span à `motContainer` au lieu de `divRoot`
    }

    // Affiche le mot caché initial sous forme d'underscores dans la console
    // console.log("Mot caché :", motCache.join(" "));

    return { lettresMot, motCache };
}

// Appel de la fonction d'initialisation pour créer les listes de lettres et le mot caché
const { lettresMot, motCache } = initialisation();



/////////////////////////////////////////////////////


// Fonction pour gérer la mise à jour du mot caché en fonction des lettres devinées
function mettreAJourMotCache(lettre) {

    let lettreTrouvee = false;

    if(partieTerminee) return; // ignore les frappe si la partie est terminée

    // Sélectionner tous les spans dans le conteneur motContainer
    const spans = document.querySelectorAll("#mot-container span");

    for (let i = 0; i < motSelectionne.length; i++) {
        // Comparer la lettre du mot avec la lettre devinée
        if (motSelectionne[i].toUpperCase() === lettre) {
            motCache[i] = lettre; // Remplace le trait par la lettre trouvée
            lettreTrouvee = true;

            // Mettre à jour le texte du span correspondant à la lettre trouvée
            spans[i].textContent = lettre;
        }
    }

    // Si la lettre n'est pas trouvée, on incrémente `erreursCommises`
    if (!lettreTrouvee) {
        erreursCommises++;
        // console.log("Nombre d'erreurs :", erreursCommises);
        score(`Nombre d'erreurs : ${erreursCommises}`);
        updateImage(erreursCommises); //appel pour mettre a jour l'image en fonction des erreurs

    }

    // Vérifie si le mot a été entièrement trouvé
    if (!motCache.includes("_")) {
        // console.log("Bravo ! Vous avez trouvé le mot :", motSelectionne);
        afficherMessage("YOU WIN!");
        desactiverClavier();
        // partieTerminee = true;
    }

    // Vérifie si le nombre d'erreurs atteint la limite autorisée
    if (erreursCommises >= erreursAutorisees) {
        // console.log("Désolé, vous avez perdu. Le mot était :", motSelectionne);
        afficherMessage(`YOU LOSE ! Le mot etait : ${motSelectionne}`);
        desactiverClavier();
        // partieTerminee = true;

    }
}

let partieTerminee = false;

// Fonction pour afficher un message de fin de jeu
function afficherMessage(message) {
    // Si la partie est déjà terminée, ne rien faire
    if (partieTerminee) return;

    // Créer un élément div pour afficher le message
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.style.textAlign = "center";
    messageDiv.style.color = "red";
    messageDiv.style.fontSize = "20px";  
    messageDiv.style.fontWeight = "bold"; 
    messageDiv.style.backgroundColor = "white"; 

    // Vérifier si le conteneur message-container existe
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        // Vider le contenu précédent du message-container
        messageContainer.innerHTML = "";
        
        // Ajouter le message au conteneur
        messageContainer.appendChild(messageDiv);
        partieTerminee = true; // Marquer la fin de la partie
    } else {
        console.error("Le conteneur message-container n'a pas été trouvé !");
    }
}




// Fonction pour désactiver le clavier
function desactiverClavier() {
    // Sélectionner tous les boutons à l'intérieur de la div avec l'ID "clavier"
    const buttons = document.querySelectorAll("#clavier button");

    // Désactiver chaque bouton en itérant sur la liste de boutons
    buttons.forEach(button => {
        // button.disabled = true; // Désactive chaque bouton
    });
}

function score(score){

    if (document.getElementById("score")){


        const scoreDiv = document.getElementById("score");
        scoreDiv.textContent = score;
       

    }else{

        const scoreDiv = document.createElement("div");
        scoreDiv.style.textAlign = "center";
        scoreDiv.style.color = "red";
        scoreDiv.textContent = score;
        scoreDiv.id = "score";
        divRoot.appendChild(scoreDiv);
    } 
    
    
}


function clavier() {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const clavierGauche = document.getElementById("clavier-gauche");
    const clavierDroit = document.getElementById("clavier-droit");

    // Séparer l'alphabet en deux : première moitié pour clavier-gauche, seconde pour clavier-droit
    const alphabetGauche = alphabet.slice(0, 13);
    const alphabetDroit = alphabet.slice(13);

    // Fonction pour créer les boutons de clavier dans un conteneur
    function creerBoutons(clavierDiv, lettres) {

        lettres.forEach(lettre => {
            const button = document.createElement("button");

            button.innerText = lettre;
            button.value = lettre;

            button.addEventListener('click', (e) => {

                const lettreChoisie = e.currentTarget.value;
                // console.log("Lettre cliquée :", lettreChoisie);
                mettreAJourMotCache(lettreChoisie); // Mettre à jour le mot caché
                button.disabled = true; // Désactiver le bouton après le clic
                button.classList.add("lettreclique");

            });

            clavierDiv.appendChild(button);
        });
    }

    // Créer les boutons pour chaque partie du clavier
    creerBoutons(clavierGauche, alphabetGauche);
    creerBoutons(clavierDroit, alphabetDroit);
}

clavier(); // Appel pour initialiser le clavier


const accueil = document.getElementById("accueil");
accueil.className = "button-accueil";
accueil.textContent = "ACCUEIL";
 
// Ajoutez l'écouteur d'événement correctement
accueil.addEventListener("click", retourAccueil);
 
function retourAccueil() {
    // Redirige vers page1.html avec le niveau comme paramètre
    window.open("../page1/page1.html", "_self");
}

 
const restart = document.getElementById("restart");
restart.className = "button-restart";
restart.textContent = "RESTART";
 
restart.addEventListener("click", reStartGame);
 
function reStartGame() {
    // Recharge la page actuelle pour recommencer une partie
    window.location.reload();
}


// const Img = document.getElementById("img");
 
// Tableau des sources des images
const imageSources = [

    "../images/boxeurs/bxt1.png",  // 1 erreur
    "../images/boxeurs/bxt2.png",  // 2 erreurs
    "../images/boxeurs/bxt3.png",  // 3 erreurs
    "../images/boxeurs/bxt4.png",  // 4 erreurs
    "../images/boxeurs/bxt5.png",  // 5 erreurs
    "../images/boxeurs/bxt6.png",  // 6 erreurs
    "../images/boxeurs/bxt7.png",  // 7 erreurs
    "../images/boxeurs/bxt2.png",  // 8 erreurs
    "../images/boxeurs/bxt9.png",  // 9 erreurs
    "../images/boxeurs/bxtFIN.png",  // 10 erreurs
];

const soundSources = [

    "../audio/battlemood.ogg", // 1 erreur
    "../audio/fight.ogg", // 2 erreurs
    "../audio/you_lose.ogg",  // 3 erreurs
    "../audio/fight.ogg",  // 4 erreurs
    "../audio/killhim9.ogg",  // 5 erreurs
    "../audio/loser.ogg",  // 6 erreurs
    "../audio/fight.ogg",  // 7 erreurs
    "../audio/killhim9.ogg",  // 8 erreurs
    "../audio/you_lose.ogg",  // 9 erreurs
    "../audio/10gameover.ogg",  // 10 erreurs
    
];

 
// Fonction de mise à jour de l'image en fonction des erreurs commises
function updateImage(erreursCommises) {

    const image = document.querySelector("#console img");
   
 
    // Vérifier que le nombre d'erreurs est dans la plage valide
    if (erreursCommises >= 0 && erreursCommises <= 10) {

        image.src = imageSources[erreursCommises -1];

        const sound = new Audio(soundSources[erreursCommises-1]);
        sound.play();


    }

    // else {

    //     console.log("Nombre d'erreurs non pris en charge :", erreursCommises);

    // }
 
    // console.log("Nouvelle source de l'image :", image.src); // Débogage
}



// ../audio/streetfighter.mp3

// Fonction pour démarrer la musique
function startBackgroundMusic() {
    const audio = new Audio("../audio/streetfighter.mp3"); 
    audio.loop = true; 
    audio.volume = 0.5;  
    audio.play();
}

// Fonction pour gérer le premier clic et lancer la musique
function musicOnFirstClick() {
    startBackgroundMusic();
    document.removeEventListener("click", musicOnFirstClick);
}

// Ajout de l'événement click sur la page entière pour démarrer la musique
document.addEventListener("click", musicOnFirstClick);



