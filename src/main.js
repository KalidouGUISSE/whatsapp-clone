import './styles/style.css'
import {container , charger, pageCharger} from  './components/element.js'
import { createElement, afficherMessageAlert ,dagayeKhar} from './components/componant.js'
import { formSection } from './components/sousElements/pageDeConnexion.js'
import { section2 ,contact } from './components/sousElements/section2.js'
// import { contact } from './components/ui.js'

const url = "https://whatsapp-back-djjl.onrender.com"

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



function chargerUsers() {
    // Charger les utilisateurs depuis l'API JSON Server
    fetch('http://localhost:4025/users')
    // fetch( url+'/users')
        .then(response => response.json())
        .then(data => {
            // On remplit le tableau contacts avec les utilisateurs reçus
            const contacts = [];
            contacts.push(...data);
            afficherContacts(contacts);
        })
        .catch(error => {
            console.error("Erreur de chargement des utilisateurs :", error);
            alert('Erreur de chargement des utilisateurs depuis ')
        });

}

chargerUsers() 


const afficherContacts = (contacts) => {
    if (document.querySelector('#mesContacts')) {
        document.querySelector('#mesContacts').remove();
    }
    const c = contacts.length
    const domContacts = [];

    for (let i = 0; i < c ; i++ ){
        domContacts.push(contact( contacts[i] ))
    }
    const mesContacts = createElement('div', {
        id:'mesContacts',
        class: ' h-3/4 overflow-scroll'
    }, domContacts);

    section2.appendChild(mesContacts)
}


const s2Icon3points = document.querySelector('#s2Icon3points').parentElement.parentElement;
// const grandParent = s2Icon3points.parentElement.parentElement;

if (s2Icon3points) {
    s2Icon3points.addEventListener('click', () => {
        const popupMenu = document.getElementById('popupMenu');
        popupMenu.classList.toggle('hidden');
        // popupMenu.classList.remove('hidden');
    });
}
console.log(s2Icon3points);


const nouveauContact = document.querySelector('#nouveauContact');
if (nouveauContact) {
    nouveauContact.addEventListener('click', () => {
        // alert('nouveau contact');
    });
}
console.log(nouveauContact);







// Ajouter contact
// setTimeout(() => {
const inputNumber = document.querySelector('#number');
dagayeKhar(inputNumber)

const btnAjouter = document.querySelector('#btnAjouter');
if (btnAjouter) {
    btnAjouter.addEventListener('click', () => {

        const inputNomContact = document.querySelector('#inputNomContact').value;
        const inputPrenom = document.querySelector('#inputPrenom').value;

        console.log('ok');
        console.log(inputNomContact , inputPrenom, inputNumber.value);
        if (inputNomContact && inputPrenom && inputNumber.value) {
            const newContact = {
                id: Date.now()+'',
                Nom: inputNomContact,
                Prenom: inputPrenom,
                dure: 'dure',
                heurNotif: '17:23',
                nomLue: '0',
                image: '/profile2.png', 
                numero: inputNumber.value,
                messages : []
            };

             // Envoi POST à JSON Server
            fetch('http://localhost:4025/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Contact ajouté avec succès :', data);

                // Ajout visuel dans le DOM
                const contactElement = contact(data); // data contient maintenant l’ID généré
                const mesContacts = document.querySelector('#mesContacts');
                mesContacts.appendChild(contactElement);
                document.querySelector('#popupFormulaire').classList.add('hidden');
                afficherMessageAlert('success','Contact ajouté avec succès',mesContacts)

                // Réinitialiser les champs
                document.querySelector('#inputNomContact').value = '';
                document.querySelector('#inputPrenom').value = '';
                document.querySelector('#number').value = '';
            })
            .catch(error => {
                console.error('Erreur lors de l’ajout du contact :', error);
                alert('Erreur lors de l’ajout du contact.');
            });

        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
}
// }, 0);








const nouveauGroupe = document.querySelector('#nouveauGroupe');
if (nouveauGroupe){
    nouveauGroupe.addEventListener('click', () => {
        const popupFormGroupe = document.querySelector('#popupFormGroupe');
        document.querySelector('#popupMenu').classList.add('hidden'); 
        popupFormGroupe.classList.remove('hidden');
    });
}

const btnAddGroupe = document.querySelector('#btnAddGroupe');
if (btnAddGroupe) {
    btnAddGroupe.addEventListener('click', () => {
        alert('Ajouter un groupe');
        const inputNomGroupe = document.querySelector('#inputNomGroupe').value;
        if (inputNomGroupe) {
            const newGroupe = {
                id: Date.now().toString(),
                Nom: inputNomGroupe,
                image: '/profile2.png',
                membres: [],
                Admin: 'guisse', // Tu peux remplacer ça par un utilisateur connecté par ex.
                messages: []
            };
        
            // Envoi POST vers JSON Server
            fetch('http://localhost:4025/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newGroupe)
            })
            .then(response => response.json())
            .then(data => {
                console.log('✅ Groupe ajouté avec succès :', data);
        
                // Ajout visuel dans le DOM (si tu as une fonction groupe(data), comme pour contact)
                const groupeElement = contact(data); // data contient maintenant l’ID généré
                document.querySelector('#mesContacts').appendChild(groupeElement);


                // Réinitialiser le champ du formulaire
                document.querySelector('#inputNomGroupe').value = '';
                document.querySelector('#popupFormGroupe').classList.add('hidden');
                afficherMessageAlert('success','Groupe ajouté avec succès',document.querySelector('#mesContacts'));
            })
            .catch(error => {
                console.error('❌ Erreur lors de l’ajout du groupe :', error);
                alert('Erreur lors de l’ajout du groupe.');
            });
        
        } else {
            alert('Veuillez entrer un nom de groupe.');
        }
    });
}
