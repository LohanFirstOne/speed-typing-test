const $sect = document.querySelector("#sect");
const $dial = document.querySelector("dialog");
const $btn = document.querySelector("#subButton");
const $easy = document.querySelector("#easy");
const $medium = document.querySelector("#medium");
const $hard = document.querySelector("#hard");
const $diffic = document.querySelector("#diffic");

const EasyTab = ["chat","chien","pain","lait","eau","sucre","table","chaise","porte","mur","main","pied","tête","nez","yeux","bras","jambe","dos","ami","amie","père","mère","frère","sœur","jour","nuit","matin","soir","hier","demain","ici","là","oui","non","bien","mal","vite","lent","haut","bas","gros","petit","beau","laid","vrai","faux","bon","mauvais","chaud","froid","plein","vide","dur","mou","clair","sombre","neuf","vieux"];
const MediumTab = ["maison","voiture","ordinateur","clavier","écran","téléphone","fenêtre","cuisine","salon","chambre","bureau","travail","école","collège","université","professeur","élève","étudiant","exercice","question","réponse","solution","problème","histoire","géographie","science","nature","animal","plante","montagne","rivière","océan","forêt","prairie","désert","nuage","pluie","orage","vent","soleil","étoile","planète","galaxie","univers","énergie","force","vitesse","distance","volume","surface","température","pression","matière","atome","molécule","réaction","expérience","analyse","mesure","calcul"];
const HardTab = ["administration","organisationnelle","responsabilité","professionnel","développement","implémentation","international","communication","interprétation","collaboration","coordination","expérimentale","documentation","classification","transformation","optimisation","configuration","synchronisation","visualisation","représentation","identification","authentification","autorisation","infrastructure","architecture","algorithmique","programmation","compilation","interopérabilité","compatibilité","virtualisation","automatisation","orchestration","distribution","sauvegarde","restauration","supervision","monitoring","performance","scalabilité","résilience","tolérance","redondance","migration","intégration","déploiement","validation","vérification","évaluation","amélioration","innovation","technologique","scientifique","méthodologie","statistique","probabilité","modélisation","simulation","corrélation","causalité"];

let leTexte = "";
let nbTappe = 0;
let cEstParti = false;

function faireLeTexte(tab) {
  let mots = [];
  for (let i = 0; i < 15; i++) {
    mots.push(tab[Math.floor(Math.random() * tab.length)]);
  }
  return mots.join(" ");
}

function leTabActif() {
  if ($medium.checked) return MediumTab;
  if ($hard.checked) return HardTab;
  return EasyTab;
}

function afficher(typed) {
  $sect.innerHTML = "";

  for (let i = 0; i < leTexte.length; i++) {
    const span = document.createElement("span");
    span.textContent = leTexte[i];

    if (i < typed.length) {
      span.style.color = typed[i] === leTexte[i] ? "var(--Green500)" : "var(--Red500)";
    } else if (i === typed.length) {
      span.style.backgroundColor = "rgba(255,255,255,0.15)";
      span.style.borderRadius = "2px";
    }

    $sect.appendChild(span);
  }
}

function goGo() {
  leTexte = faireLeTexte(leTabActif());
  nbTappe = 0;
  cEstParti = true;

  $dial.close();
  $sect.className = "typing-test text-preset1-regular";
  afficher("");
  $sect.setAttribute("tabindex", "0");
  $sect.focus();
}

document.addEventListener("keydown", (e) => {
  if (!cEstParti) return;
  if (e.key === "Backspace") { e.preventDefault(); return; }
  if (e.key.length > 1) return;
  if (nbTappe >= leTexte.length) return;

  nbTappe++;
  const typed = leTexte.slice(0, nbTappe - 1) + e.key;
  afficher(typed);
});

$sect.addEventListener("click", () => { if (!cEstParti) goGo(); });
$btn.addEventListener("click", (e) => { e.preventDefault(); goGo(); });
$diffic.addEventListener("change", () => { if (cEstParti) goGo(); });