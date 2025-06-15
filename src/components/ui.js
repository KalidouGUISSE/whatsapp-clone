import { contact } from "./sousElements/section2.js";

import { createElement } from "./componant.js";
// import { contact } from "./sousElements/contact.js";
import { section2 } from "./sousElements/section2.js";

const url = "http://localhost:4025"
// const url = "https://whatsapp-back-djjl.onrender.com"






// chargerUsers(afficherContacts)
export async function chargerUsers(callback = afficherContacts) {
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


export async function listerMembres() {
    const contactActif = JSON.parse(localStorage.getItem('contactActif'));
    const listeMembre = document.querySelector('#listeMembreGroupe');

    // ➜  Si ce n’est pas un groupe, on retourne simplement une chaîne vide
    if (!contactActif || !contactActif.groupe) {
        if (listeMembre) {
            listeMembre.innerHTML = ''; // Vide le contenu précédent
        }
        return ""
    };

    // Récupère tous les utilisateurs et isole ceux qui sont membres du groupe
    const allUsers  = await chargerUsers();
    const membres   = allUsers.filter(u => contactActif.membres?.includes(u.id));

    // Conteneur final
    const container = createElement("div", { class: "flex flex-col" });

    membres.forEach(user => {
        // supporte :  Admin = ["1","2"]  ‑‑ou‑‑  Admin = "1"
        const estAdmin = Array.isArray(contactActif.Admin)
            ? contactActif.Admin.includes(user.id)
            : contactActif.Admin === user.id;

        const initials = `${(user.Prenom?.[0] || "").toUpperCase()}${(user.Nom?.[0] || "").toUpperCase()}`;

        const ligne = createElement("div", {
            class: "flex items-center justify-between p-4 hover:bg-gray-800"
        }, [

            /* --- bloc avatar + nom --- */
            createElement("div", { class: "flex items-center space-x-3" }, [

                // Avatar
                createElement("div", {
                    class: "w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-semibold overflow-hidden"
                }, user.image
                    ? createElement("img", {
                        src: user.image,
                        alt: `${user.Prenom} ${user.Nom}`,
                        class: "w-full h-full object-cover"
                    })
                    : createElement("span", {}, initials)
                ),

                // Texte
                createElement("div", {}, [
                    createElement("div", { class: "text-white font-medium" }, `${user.Prenom} ${user.Nom}`),
                    createElement("div", { class: "text-gray-500 text-xs" }, `(${user.numero})`)
                ])
            ]),

            /* --- bouton admin / retirer --- */
            createElement("button", {
                class: `text-xs px-2 py-1 rounded ${
                    estAdmin ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`,
                onclick: async () => {
                    // Normalise Admin en tableau
                    if (!Array.isArray(contactActif.Admin)) {
                        contactActif.Admin = contactActif.Admin ? [contactActif.Admin] : [];
                    }

                    if (estAdmin) {
                        contactActif.Admin = contactActif.Admin.filter(id => id !== user.id);
                    } else {
                        contactActif.Admin.push(user.id);
                    }

                    localStorage.setItem("contactActif", JSON.stringify(contactActif));

                    try {
                        const res = await fetch(`${url}/users/${contactActif.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ Admin: contactActif.Admin })
                        });
                        if (!res.ok) throw new Error("HTTP " + res.status);
                    } catch (e) {
                        alert("Erreur lors de la mise à jour du serveur JSON : " + e.message);
                    }

                    // Rafraîchit l’affichage
                    const parent = ligne.parentNode;
                    parent.replaceChild(await listerMembres(), parent);
                }
            }, estAdmin ? "Retirer admin" : "Définir admin")
        ]);

        container.addNode(ligne);
    });
    if (listeMembre) {
        listeMembre.innerHTML = ''; // Vide le contenu précédent
        listeMembre.appendChild(container); // Ajoute la nouvelle liste
    }
    return container;
}







// export async function afficherListeMembres(contactActif) {
//     if (!contactActif.membres || contactActif.membres.length === 0) {
//         alert("Aucun membre dans ce groupe.");
//         return;
//     }

//     try {
//         const allUsers = await chargerUsers(); // récupère tous les users
//         const membres = allUsers.filter(user => contactActif.membres.includes(user.id));

//         // Crée une popup simple
//         const popupMembres = createElement('div', {
//             class: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
//         });

//         const contenu = createElement('div', {
//             class: 'bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative flex flex-col gap-2'
//         });

//         const titre = createElement('h3', {
//             class: 'text-lg font-bold mb-2 text-center'
//         }, 'Membres du Groupe');

//         const btnFermer = createElement('button', {
//             class: 'absolute top-2 right-3 text-xl text-red-500 hover:text-red-700',
//             onclick: () => popupMembres.remove()
//         }, '×');

//         contenu.appendChild(titre);
//         contenu.appendChild(btnFermer);

//         // membres.forEach(m => {
//         //     const div = createElement('div', {
//         //         class: 'border rounded px-3 py-2 text-sm bg-gray-50'
//         //     }, `${m.Prenom} ${m.Nom} (${m.numero})`);
//         //     contenu.appendChild(div);
//         // });

//         popupMembres.appendChild(contenu);
//         document.body.appendChild(popupMembres);

//         membres.forEach(m => {
//             const estAdmin = contactActif.Admin?.includes(m.id);
        
//             const div = createElement('div', {
//                 class: 'border rounded px-3 py-2 text-sm bg-gray-50 flex justify-between items-center'
//             });
//             const texte = createElement('span', {}, `${m.Prenom} ${m.Nom} (${m.numero})`);
            
//             const texte2 = listerMembres(m);

        
//             const btnAdmin = createElement('button', {
//                 class: `text-xs px-2 py-1 rounded ${
//                     estAdmin ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
//                 }`,
//                 onclick: async () => {
//                     // Initialise le tableau Admin si vide
//                     if (!Array.isArray(contactActif.Admin)) {
//                         contactActif.Admin = [];
//                     }
        
//                     if (estAdmin) {
//                         // Supprimer l'admin
//                         contactActif.Admin = contactActif.Admin.filter(id => id !== m.id);
//                     } else {
//                         // Ajouter comme admin
//                         contactActif.Admin.push(m.id);
//                     }
        
//                     // Sauvegarde dans localStorage
//                     localStorage.setItem('contactActif', JSON.stringify(contactActif));
        
//                     // Mise à jour sur JSON Server
//                     try {
//                         const reponse = await fetch(`${url}/users/${contactActif.id}`, {
//                             method: 'PATCH',
//                             headers: { 'Content-Type': 'application/json' },
//                             body: JSON.stringify({ Admin: contactActif.Admin })
//                         });
        
//                         if (reponse.ok) {
//                             alert(`Admin ${estAdmin ? 'retiré' : 'ajouté'} avec succès.`);
//                             afficherListeMembres(contactActif); // Recharger pour voir l’état mis à jour
//                         } else {
//                             alert('Erreur lors de la mise à jour.');
//                         }
//                     } catch (err) {
//                         console.error('Erreur JSON Server :', err);
//                     }
//                 }
//             }, estAdmin ? 'Retirer admin' : 'Définir admin');
        
//             // div.appendChild(texte);
//             // div.appendChild(texte1);
//             div.appendChild(texte2);

//             // div.appendChild(btnAdmin);
//             contenu.appendChild(div);
//         });

//     } catch (err) {
//         console.error('Erreur lors de la récupération des membres :', err);
//         alert('Impossible de charger les membres.');
//     }

// }
