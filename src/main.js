import './styles/style.css'
import {container , charger, pageCharger} from  './components/element.js'
import { createElement, afficherMessageAlert ,dagayeKhar} from './components/componant.js'
import { formSection } from './components/sousElements/pageDeConnexion.js'
import { section2 ,contact } from './components/sousElements/section2.js'
import { popupFormGroupe, popupFormulaire } from './components/sousElements/mesPoppup.js'
import { chargerUsers,smsEvoie } from './components/ui.js'
// import { contact } from './components/ui.js'

const url = "http://localhost:4025"
// const url = "https://whatsapp-back-djjl.onrender.com"

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
            console.log('oiuytd');
            
            console.log('Utilisateur connecté :', localStorage.getItem('userConnecte'));
            
            // Récupérer l'utilisateur et le stocker dans un tableau
            const userJSON = localStorage.getItem('userConnecte');
            const utilisateur = JSON.parse(userJSON); // conversion JSON → objet

            tabUserConnecte.push(utilisateur); // ajouter l'utilisateur au tableau
            console.log('oiuytd');

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













// Fonction pour afficher le menu contextuel des trois points
// a enlever apres
// troisPoints() 
// chargerUsers()

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

                // Envoi POST à JSON Server http://localhost:4025
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

    const addAdmin = document.querySelector('#addAdmin');
    if (addAdmin) {
        addAdmin.addEventListener('click', async () => {
            const popupPourContact = document.querySelector('#popupPourContact');
            popupPourContact?.classList.add('hidden');


            // const listeMembre = document.querySelector('#listeMembre');
            // if (listeMembre) {
            //     listeMembre.classList.toggle('hidden');

            //     // Vider l'ancienne liste si nécessaire
            //     listeMembre.innerHTML = '';

            //     try {
            //         const response = await fetch(url+'/users');
            //         const users = await response.json();

            //         // Filtrer les utilisateurs qui ont groupe: true
            //         const membresGroupe = users.filter(user => user.groupe === true);

            //         // Ajouter chaque membre à la listeMembre
            //         membresGroupe.forEach(user => {
            //             const div = document.createElement('div');
            //             div.classList.add('membre-item', 'p-2', 'border-b', 'hover:bg-gray-100');
            //             div.innerHTML = `
            //                 <strong>${user.Prenom} ${user.Nom}</strong> - ${user.numero}
            //             `;
            //             listeMembre.appendChild(div);
            //         });

            //         // Fermer le menu si ouvert
            //         document.getElementById('popupMenu')?.classList.add('hidden');
            //     } catch (error) {
            //         console.error('Erreur de chargement des membres :', error);
            //         alert('Impossible de charger les membres du groupe');
            //     }
            // }
        });
    }

    const addMembre = document.querySelector('#addMembre');
    if (addMembre) {
        addMembre.addEventListener('click', async () => {
            const contactActif = JSON.parse(localStorage.getItem('contactActif'));
            console.log('Contact actif:', contactActif);
            if (contactActif && contactActif.groupe) {
            // Supprime le popup s’il existe déjà
            document.querySelector('#popupListeContacts')?.remove();

            // Créer le fond du popup
            const overlay = createElement('div', {
                id: 'popupListeContacts',
                class: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
            });

            // Contenu du popup
            const popup = createElement('div', {
                class: 'bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative'
            });

            // Bouton de fermeture
            const closeBtn = createElement('button', {
                class: 'absolute top-2 right-3 text-xl text-red-500 hover:text-red-700',
                onclick: () => overlay.remove()
            }, '×');
            // Titre
            const titre = createElement('h2', {
                class: 'text-xl font-semibold mb-4 text-center'
            }, 'Liste des Contacts');

            // Conteneur des contacts
            const liste = createElement('div', {
                class: 'flex flex-col gap-2 max-h-[300px] overflow-y-auto'
            });

            // Charger les utilisateurs
            const contacts = await chargerUsers();

            // On filtre pour ne garder que les contacts qui NE sont PAS des groupes
            const utilisateursSimples = contacts.filter(user => !user.groupe);
            
            const checkboxes = []; // Pour stocker les checkbox avec leur user

            utilisateursSimples.forEach(user => {
                const checkbox = createElement('input', {
                    type: 'checkbox',
                    class: 'mr-2'
                });
            
                checkboxes.push({ user, checkbox });
            
                const item = createElement('div', {
                    class: 'border rounded p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3'
                }, [
                    checkbox,
                    createElement('div', { class: 'flex flex-col' }, [
                        createElement('span', { class: 'font-bold' }, `${user.Prenom} ${user.Nom}`),
                        createElement('span', { class: 'text-sm text-gray-600' }, user.numero)
                    ])
                ]);
            
                liste.appendChild(item);
            });
            
            // Ajouter les éléments dans le popup
            popup.addNode(closeBtn).addNode(titre).addNode(liste);


            const boutonAjouter = createElement('button', {
                class: 'mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 block mx-auto',
                onclick: async () => {
                    const membresChoisis = checkboxes
                        .filter(({ checkbox }) => checkbox.checked)
                        .map(({ user }) => user.id);
                
                    if (membresChoisis.length === 0) {
                        alert('Veuillez sélectionner au moins un contact.');
                        return;
                    }
                
                    // Initialiser le tableau si nécessaire
                    if (!Array.isArray(contactActif.membres)) {
                        contactActif.membres = [];
                    }
                
                    // Ajouter uniquement les membres non existants
                    membresChoisis.forEach(id => {
                        if (!contactActif.membres.includes(id)) {
                            contactActif.membres.push(id);
                        }
                    });
                
                    // Sauvegarder la mise à jour localement
                    localStorage.setItem('contactActif', JSON.stringify(contactActif));
                
                    // Envoyer la mise à jour à JSON Server
                    try {
                        const reponse = await fetch(`${url}/users/${contactActif.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ membres: contactActif.membres })
                        });
                
                        if (reponse.ok) {
                            alert('Membres ajoutés au groupe avec succès.');
                            overlay.remove(); // Fermer le popup
                        } else {
                            alert('Erreur lors de la mise à jour du groupe.');
                        }
                    } catch (err) {
                        console.error('Erreur JSON Server :', err);
                        alert("Impossible de contacter le serveur. Vérifie qu'il tourne bien.");
                    }
                }
                
            }, '+ Ajouter');
            
            popup.appendChild(boutonAjouter);
            


            overlay.appendChild(popup);

            // Afficher le popup
            document.body.appendChild(overlay);
                
            } else {
                afficherMessageAlert('error', 'Veuillez sélectionner un groupe pour ajouter des membres.', document.querySelector('#mesContacts'));
            }

        });
    }



    const envoyerSMS = document.getElementById('envoyerSMS');
    envoyerSMS.parentElement.addEventListener('click', async () => {

        //pour eviter d'ajouter un message dans le dernier contacte reste qui reste dans le localstorage`
        const aucunMessage = document.querySelector('#aucunMessage');
        if (aucunMessage) {
            return
        }

        const inputMessage = document.querySelector('#inputMessage');
        const message = inputMessage.value.trim();
        inputMessage.value = ''

        if (message === '') {
            // afficherMessageAlert('error', 'Le message ne peut pas être vide', document.querySelector('#section3'));
            return;
        }

        const contactActif = JSON.parse(localStorage.getItem('contactActif'));
        // const messageEnCours = JSON.parse(localStorage.getItem('messageEnCours'))
        const messageEnCours = contactActif.messages;
        const nouveauMessage = {
            id: Date.now().toString(),
            text: message,
            idAuteur: tabUserConnecte[0].id, 
            date: new Date().toISOString(),
            lu: false 
        };

        const zoneMessage = document.querySelector('#zoneMessage')
        
        zoneMessage.appendChild(smsEvoie(true,nouveauMessage.text))
        setTimeout(() => {
            zoneMessage.appendChild(smsEvoie(false,'message recue '))
        }, 2000);

        // fetch(url+'/users/'+tabUserConnecte[0].id)
        //     .then(r => r.json())
        //     .then(r => console.log(r))
        // 1. Récupérer les messages existants de contactActif
        const userId = contactActif.id;

        try {
            const response = await fetch(`${url}/users/${userId}`);
            const user = await response.json();

            // 2. Ajouter le nouveau message à la liste
            const nouveauxMessages = user.messages || [];
            nouveauxMessages.push(nouveauMessage);

            // 3. PATCH vers JSON Server pour mettre à jour les messages
            const res = await fetch(`${url}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: nouveauxMessages })
            });

            if (res.ok) {
                console.log('Message enregistré avec succès dans db.json');
            } else {
                console.error('Erreur lors de l’enregistrement du message');
            }
        } catch (err) {
            console.error('Erreur réseau :', err);
        }



    })






















}















