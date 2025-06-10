import './styles/style.css'
import {container , charger, pageCharger} from  './components/element.js'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
import { createElement, afficherMessageAlert ,dagayeKhar} from './components/componant.js'
import { formSection } from './components/sousElements/pageDeConnexion.js'
import { contact,section2 } from './components/sousElements/section2.js'

document.querySelector('body').appendChild(container)


function misAjours() {
    container.innerHTML = "";
    pageCharger.forEach(section => container.appendChild(section));
}


const btnSeConecter = document.querySelector('#btnSeConecter');
const numero = document.querySelector('#numero');

const inputNom = document.querySelector('#inputNom')

if (btnSeConecter) {
    btnSeConecter.addEventListener('click', () => {
        if (numero.value === '784458786' && inputNom.value ==='guisse') {
            afficherMessageAlert('success','connexion reusie chargement en cours....',formSection)

            setTimeout(() => {
                
                charger(true);
                misAjours();
            }, 1000);

        } else if (numero.value === '' || inputNom.value ==='') {
            afficherMessageAlert('error','Les champs sont obligatoire',formSection)
        } else {
            afficherMessageAlert('error','identifient incorect',formSection)
        }
        
    });
}



// const contacts = [
//     {
//         id: "1",
//         Nom: "GUISSE",
//         Prenom: "Kalidou",
//         nomLue: '12',
//         heurNotif : '17:23',
//         dure:'dure',
//     },
//     {
//         id: "2",
//         Nom: "Fall",
//         Prenom: "Ibou",
//         nomLue: '1',
//         heurNotif : '17:23',
//         dure:'dure',
//     },
//     {
//         id: "3",
//         Nom: "Mbaye",
//         Prenom: "Fatou",
//         nomLue: '4',
//         heurNotif : '17:23',
//         dure:'dure',
//     }
// ]




const contacts = [];

// Charger les utilisateurs depuis l'API JSON Server
fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        // On remplit le tableau contacts avec les utilisateurs reçus
        contacts.push(...data);
        console.log("Utilisateurs chargés :", contacts);

        afficherContacts(); // fonction que tu dois créer
    })
    .catch(error => {
        console.error("Erreur de chargement des utilisateurs :", error);
        alert('Erreur de chargement des utilisateurs')
    });


function afficherContacts(){
    const c = contacts.length
    for (let i = 0; i < c ; i++ ){
        contacts.push(contact( contacts[i] ))
    }
    const mesContacts = createElement('div', {
        class: ' h-3/4 overflow-scroll'
    }, contacts);

    section2.appendChild(mesContacts)
}


const s2Icon3points = document.querySelector('#s2Icon3points').parentElement.parentElement;
// const grandParent = s2Icon3points.parentElement.parentElement;

if (s2Icon3points) {
    s2Icon3points.addEventListener('click', () => {
        const popupMenu = document.getElementById('popupMenu');
        popupMenu.classList.toggle('hidden');
    });
}
console.log(s2Icon3points);


const nouveauContact = document.querySelector('#nouveauContact');
if (nouveauContact) {
    nouveauContact.addEventListener('click', () => {
        alerter('nouveau contact');
    });
}