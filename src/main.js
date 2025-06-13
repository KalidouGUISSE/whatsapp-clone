import './styles/style.css'
import {container , charger, pageCharger} from  './components/element.js'
import { createElement, afficherMessageAlert ,dagayeKhar} from './components/componant.js'
import { formSection } from './components/sousElements/pageDeConnexion.js'
import { section2 ,contact } from './components/sousElements/section2.js'
import { popupFormGroupe, popupFormulaire } from './components/sousElements/mesPoppup.js'
// import { contact } from './components/ui.js'

const url = "https://whatsapp-back-djjl.onrender.com"

document.querySelector('body').appendChild(container)
let contacts = [];
const tabUserConnecte = []; // tableau vide


function misAjours() {
    container.innerHTML = "";
    pageCharger.forEach(section => container.appendChild(section));
}


const btnSeConecter = document.querySelector('#btnSeConecter');
const numero = document.querySelector('#numero');

const inputNom = document.querySelector('#inputNom')

if (btnSeConecter) {
    btnSeConecter.addEventListener('click', async () => {
        const numeroInput = numero.value.trim().replace(/\s+/g, '');
        const nomInput = inputNom.value.trim().toLowerCase();
    
        if (numeroInput === '' || nomInput === '') {
            afficherMessageAlert('error', 'Les champs sont obligatoires', formSection);
            return;
        }
    
        const contacts = await chargerUsers(); // attend que les données soient chargées
    
        const utilisateurTrouve = contacts.find(user => {
            const numeroUser = user.numero.replace(/\s+/g, '');
            const nomUser = user.Nom.toLowerCase();
    
            return numeroUser === numeroInput && nomUser === nomInput;
        });
    
        if (utilisateurTrouve) {
            afficherMessageAlert('success', 'Connexion réussie, chargement en cours....', formSection);
    
            // Optionnel : enregistrer l’utilisateur connecté
            localStorage.setItem('userConnecte', JSON.stringify(utilisateurTrouve));
            console.log('Utilisateur connecté :', localStorage.getItem('userConnecte'));
            
            // Récupérer l'utilisateur et le stocker dans un tableau
            const userJSON = localStorage.getItem('userConnecte');
            const utilisateur = JSON.parse(userJSON); // conversion JSON → objet

            tabUserConnecte.push(utilisateur); // ajouter l'utilisateur au tableau

            console.log('Utilisateur connecté :', tabUserConnecte[0].id);

            setTimeout(() => {
                charger(true);
                misAjours();
                troisPoints();
            }, 1000);
        } else {
            afficherMessageAlert('error', 'Identifiant incorrect', formSection);
        }
    });
    
}

// chargerUsers(afficherContacts)
async function chargerUsers(callback = afficherContacts) {
    try {
        const response = await fetch(url+'/users')
        const data = await response.json()
        localStorage.setItem('contacts', JSON.stringify(data))
        callback(data)
        return data
    } catch (error) {
        console.error("Erreur de chargement des utilisateurs :", error)
        alert('Erreur de chargement des utilisateurs')
        return []
    }
}











function afficherContacts(contacts,page = section2) {
    if (document.querySelector('#mesContacts')) {
        document.querySelector('#mesContacts').innerHTML = '';
        document.querySelector('#mesContacts').remove();
    }
    const c = contacts.length
    const domContacts = [];

    for (let i = 0; i < c ; i++ ){
        domContacts.push(contact( contacts[i] ))
    }
    const mesContacts = createElement('div', {
        id:'mesContacts',
        class: 'h-3/4 overflow-scroll'
    }, domContacts);

    page.appendChild(mesContacts)
}


// Fonction pour afficher le menu contextuel des trois points
// a enlever apres
// troisPoints() 

function troisPoints() {
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
                fetch(url+'/users', {
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

    const nouveauContact = document.querySelector('#nouveauContact');
    if (nouveauContact) {
        nouveauContact.addEventListener('click', () => {
            // alert('nouveau contact');
        });
    }
    console.log(nouveauContact); 

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
                    groupe: true,
                    Nom: inputNomGroupe,
                    image: '/profile2.png',
                    membres: [],
                    Admin: tabUserConnecte[0].id, // Tu peux remplacer ça par un utilisateur connecté par ex.
                    messages: []
                };
            console.log('Groupe à ajouter :', newGroupe);
            
                // Envoi POST vers JSON Server
                fetch(url+'/users', {
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

    
    // const addAdmin = document.querySelector('#addAdmin');
    // if (addAdmin) {
    //     addAdmin.addEventListener('click', () => {
    //         const popupPourContact = document.querySelector('#popupPourContact');
    //         popupPourContact.classList.add('hidden');
    //         // const popupFormulaire = document.querySelector('#popupFormulaire');
    //         alert('Ajouter un Admin');
    //         console.log(popupFormulaire);
    //             const listeMembre = document.querySelector('#listeMembre');
    //             if (listeMembre){
    //                 listeMembre.classList.toggle('hidden');
    //                 listeMembre.addElement('div',{},'qere')
    //                 // afficherContacts(contacts,listeMembre)
    //                 // chargerUsers(afficherContacts)
    //                 document.getElementById('popupMenu').classList.add('hidden'); 
    //             }

    //             alert('Admin');
    //     // afficherMessageAlert('info','Ajouter un Admin',popupFormulaire)
    //     });
    // }

    const addAdmin = document.querySelector('#addAdmin');

if (addAdmin) {
    addAdmin.addEventListener('click', async () => {
        const popupPourContact = document.querySelector('#popupPourContact');
        popupPourContact?.classList.add('hidden');

        alert('Ajouter un Admin');

        const listeMembre = document.querySelector('#listeMembre');
        if (listeMembre) {
            listeMembre.classList.toggle('hidden');

            // Vider l'ancienne liste si nécessaire
            listeMembre.innerHTML = '';

            try {
                const response = await fetch(url+'/users');
                const users = await response.json();

                // Filtrer les utilisateurs qui ont groupe: true
                const membresGroupe = users.filter(user => user.groupe === true);

                // Ajouter chaque membre à la listeMembre
                membresGroupe.forEach(user => {
                    const div = document.createElement('div');
                    div.classList.add('membre-item', 'p-2', 'border-b', 'hover:bg-gray-100');
                    div.innerHTML = `
                        <strong>${user.Prenom} ${user.Nom}</strong> - ${user.numero}
                    `;
                    listeMembre.appendChild(div);
                });

                // Fermer le menu si ouvert
                document.getElementById('popupMenu')?.classList.add('hidden');
            } catch (error) {
                console.error('Erreur de chargement des membres :', error);
                alert('Impossible de charger les membres du groupe');
            }

            alert('Admin');
        }
    });
}

}
















