import './styles/style.css'
import {container , charger, pageCharger} from  './components/element.js'
import { createElement, afficherMessageAlert ,dagayeKhar} from './components/componant.js'
import { formSection } from './components/sousElements/pageDeConnexion.js'
import { section2 ,contact } from './components/sousElements/section2.js'
import { popupFormGroupe, popupFormulaire } from './components/sousElements/mesPoppup.js'
import { chargerUsers } from './components/ui.js'
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
            }
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
            // Bouton : Liste des membres
            const btnListeMembres = createElement('button', {
                class: 'absolute top-2 left-3 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600',
                onclick: () => afficherListeMembres(contactActif)
            }, 'Liste des membres');

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
            popup.addNode(closeBtn).addNode(btnListeMembres).addNode(titre).addNode(liste);


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





    async function afficherListeMembres(contactActif) {
        if (!contactActif.membres || contactActif.membres.length === 0) {
            alert("Aucun membre dans ce groupe.");
            return;
        }
    
        try {
            const allUsers = await chargerUsers(); // récupère tous les users
            const membres = allUsers.filter(user => contactActif.membres.includes(user.id));
    
            // Crée une popup simple
            const popupMembres = createElement('div', {
                class: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
            });
    
            const contenu = createElement('div', {
                class: 'bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative flex flex-col gap-2'
            });
    
            const titre = createElement('h3', {
                class: 'text-lg font-bold mb-2 text-center'
            }, 'Membres du Groupe');
    
            const btnFermer = createElement('button', {
                class: 'absolute top-2 right-3 text-xl text-red-500 hover:text-red-700',
                onclick: () => popupMembres.remove()
            }, '×');
    
            contenu.appendChild(titre);
            contenu.appendChild(btnFermer);
    
            membres.forEach(m => {
                const div = createElement('div', {
                    class: 'border rounded px-3 py-2 text-sm bg-gray-50'
                }, `${m.Prenom} ${m.Nom} (${m.numero})`);
                contenu.appendChild(div);
            });
    
            popupMembres.appendChild(contenu);
            document.body.appendChild(popupMembres);
    
            membres.forEach(m => {
                const estAdmin = contactActif.Admin?.includes(m.id);
            
                const div = createElement('div', {
                    class: 'border rounded px-3 py-2 text-sm bg-gray-50 flex justify-between items-center'
                });
            
                const texte = createElement('span', {}, `${m.Prenom} ${m.Nom} (${m.numero})`);
            
                const btnAdmin = createElement('button', {
                    class: `text-xs px-2 py-1 rounded ${
                        estAdmin ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`,
                    onclick: async () => {
                        // Initialise le tableau Admin si vide
                        if (!Array.isArray(contactActif.Admin)) {
                            contactActif.Admin = [];
                        }
            
                        if (estAdmin) {
                            // Supprimer l'admin
                            contactActif.Admin = contactActif.Admin.filter(id => id !== m.id);
                        } else {
                            // Ajouter comme admin
                            contactActif.Admin.push(m.id);
                        }
            
                        // Sauvegarde dans localStorage
                        localStorage.setItem('contactActif', JSON.stringify(contactActif));
            
                        // Mise à jour sur JSON Server
                        try {
                            const reponse = await fetch(`${url}/users/${contactActif.id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ Admin: contactActif.Admin })
                            });
            
                            if (reponse.ok) {
                                alert(`Admin ${estAdmin ? 'retiré' : 'ajouté'} avec succès.`);
                                afficherListeMembres(contactActif); // Recharger pour voir l’état mis à jour
                            } else {
                                alert('Erreur lors de la mise à jour.');
                            }
                        } catch (err) {
                            console.error('Erreur JSON Server :', err);
                        }
                    }
                }, estAdmin ? 'Retirer admin' : 'Définir admin');
            
                div.appendChild(texte);
                div.appendChild(btnAdmin);
                contenu.appendChild(div);
            });
            

        } catch (err) {
            console.error('Erreur lors de la récupération des membres :', err);
            alert('Impossible de charger les membres.');
        }

    }
    






}















