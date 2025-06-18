// import { contact } from "./sousElements/section2.js";

import { createElement } from "./componant.js";
// import { contact } from "./sousElements/contact.js";
import { section2 } from "./sousElements/section2.js";
import { afficherMessageAlert } from "./componant.js"
// const url = "http://localhost:4025"
const url = "https://whatsapp-back-djjl.onrender.com"




export function contact(contact){
    const photoContact = createElement('div',{
        // class: ' h-16 w-16 rounded-full border border-gray-300 bg-[url(/profile2.png)] bg-cover bg-center bg-no-repeat'
    },[
        createElement('img', {
            src: contact.image,
            alt: 'Avatar',
            class: 'h-16 w-16 rounded-full border border-gray-300 object-cover'
        })
    ])

    let d2 = null;
    if (contact.Prenom && contact.Nom) {
        d2 = createElement('div',{
            class: ' w-64 h-16 flex flex-col justify-around '
        },[
            createElement('div',{},contact.Prenom + ' ' +contact.Nom),
            createElement('div',{},contact.numero)
        ]);

    } else {
        d2 = createElement('div',{
            class: ' w-64 h-16 flex flex-col justify-around '
        },[
            createElement('div',{},'' +contact.Nom),
            // createElement('div',{},contact.numero)
        ]);
    }


    const date = createElement('div',{
        class: ' w-1/5 h-16 flex flex-col justify-around fji'
    },[
        createElement('div',{class: ' '},contact.heurNotif),
        createElement('div',{
            class: 'h-6 w-8 rounded-full bg-green-600 fji'
        },contact.nomLue)
    ])

    return createElement('div',{
        id: 'id_'+contact.id,
        class : "text-white p-2 rounded-lg h-24 flex items-center cursor-pointer hover:bg-[#292A2A] ",
        onclick: (event) => menuCotacte(contact)
    },[
        photoContact,
        d2,
        date,
    ])
}
function menuCotacte(contact) {
    const popup = document.querySelector('#popupPourContact');
    popup.classList.remove('hidden');

    alert(`Contact: ${contact.Prenom} ${contact.Nom} id_${contact.id}`);
    localStorage.setItem('contactActif',JSON.stringify(contact));
    // console.log('Contact actif:', localStorage.getItem('contactActif'));



    localStorage.setItem('messageEnCours',JSON.stringify(contact.messages))
    const contactActif = JSON.parse(localStorage.getItem('contactActif'));
    console.log('Contact actif:', contactActif);



    // Mettre à jour de la section 3
    const image = document.querySelector('#image');
    const nomPrenom = document.querySelector('#nomPrenom');
    image.src = '/profile2.png'; // Remplacez par l'URL de l'image souhaitée
    nomPrenom.textContent = contact.Nom; // Remplacez par le nom et prénom souhaités


    //??
    listerMembres();

    const supprimer = document.querySelector('#supprimer');
    if (supprimer) {
        // Pour éviter d'attacher plusieurs fois le même event listener :
        supprimer.replaceWith(supprimer.cloneNode(true)); // clone et remplace
        const nouveauSupprimer = document.querySelector('#supprimer');

        nouveauSupprimer.addEventListener('click', () => {
            // alert('Supprimer contact');
            const mesContacts = document.querySelector('#mesContacts');
            afficherMessageAlert('error',` ${contact.Nom}  Supprimer `,mesContacts)

            // Supprimer du DOM
            const contactElement = document.querySelector(`#id_${contact.id}`);
            if (contactElement) {
                contactElement.remove();
            }

            // Supprimer de JSON Server
            fetch(`https://whatsapp-back-djjl.onrender.com/users/${contact.id}`, {
                method: 'DELETE'
            })
            .then(() => {
                console.log(`Contact avec ID ${contact.id} supprimé du serveur.`);
            })
            .catch(err => {
                console.error('Erreur de suppression côté serveur :', err);
            });

            // Cacher le popup
            popup.classList.add('hidden');
        });
    }
    nnn()




}
    function nnn(){
        const contactActif = JSON.parse(localStorage.getItem('contactActif'));
        console.log('Contact actif:', contactActif);
        const mesSMStoUsers = JSON.parse(localStorage.getItem('mesSMStoUsers'))
        const userJSON = localStorage.getItem('userConnecte');
        const utilisateur = JSON.parse(userJSON); // conversion JSON → objet
        fetch ('https://whatsapp-back-djjl.onrender.com/twoSMSUsers')
        .then( r => r.json())
        .then( r => {
            const messagesDuContact = r.filter(
                sms => ((sms.idAuteur === contactActif.id || sms.idRecepteur === contactActif.id) && (sms.idAuteur === utilisateur.id || sms.idRecepteur === utilisateur.id))
            )
            const mesSMS = document.querySelector('#mesSMS');
            mesSMS.innerHTML = '';
            let sms= null;
            messagesDuContact.forEach(element => {
                sms = smsEvoie((element.idAuteur === contactActif.id), ` ${element.text} `,element);
                mesSMS.appendChild(sms);
            });
        })

    }


// chargerUsers(afficherContacts)
export async function chargerUsers(callback = afficherContacts) {
    try {
        const response = await fetch(url+'/users')
        const data = await response.json()
        localStorage.setItem('contacts', JSON.stringify(data))



        // const aAfficher = data.filter(
        //     utilisateur.id !==
        // )

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
        // console.log('utilisateur:ttyvguhbj ',contacts.id)
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














const URL_SMS = "https://whatsapp-back-djjl.onrender.com/twoSMSUsers"

// const URL_SMS = 'http://localhost:4025/twoSMSUsers'; // Change this if your endpoint differs

export function smsEvoie(x, sms, messageData) {
    const messageId = messageData.id ;

    const messageDiv = createElement('div', {
        class: `relative group ${x ? 'ml-auto w-1/3' : 'w-1/3'} ${messageData.epingle? 'bg-yellow-700/80' : ''}`,
        id: messageId
    }, [
        createElement('div', {
            class: `${x ? 'bg-[#144D37]/80 ml-auto' : 'bg-gray-500/30'} h-24 rounded-lg mt-2 text-white p-3 cursor-pointer relative`,
            oncontextmenu: (e) => {
                e.preventDefault();
                showMenu(e, messageId, sms, messageData);
            }
        }, [
            sms,
            createElement('div', {
                class: 'absolute -top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 rounded-full px-2 py-1 text-xs flex items-center space-x-1',
            }, [
                createElement('button', {
                class: 'hover:bg-gray-600 rounded px-1',
                onclick: (e) => showMenu(e, messageId, sms, messageData)
                }, '^'),
            ]),
            createElement('div', {
                class: `absolute bottom-1 ${x ? 'right-2' : 'left-2'} text-xs text-gray-400`
            }, messageData?.date ? new Date(messageData.date).toLocaleTimeString() : '14:39')
        ])
    ]);

    return messageDiv;
}

function showMenu(e, messageId, smsText, messageData) {
  closeMenus();
  const menu = createElement('div', {
    class: 'context-menu fixed bg-[#2a2a2a] rounded-lg shadow-lg py-1 z-50 text-sm border border-gray-600',
    style: { left: `${e.clientX}px`, top: `${e.clientY}px` }
  }, [
    menuItem('ℹ️', 'Infos du message', () => alert(`Contenu: ${smsText}`)),
    menuItem('↩️', 'Modifier', () => modifierMessage(messageId, smsText, messageData)),
    menuItem('📌', 'Épingler', () => epinglerMessage(messageId)),
    menuItem('⭐', 'Marquer important', () => marquerImportant(messageId)),
    menuItem('🗑️', 'Supprimer', () => supprimerMessage(messageId, messageData))
  ]);

  document.body.appendChild(menu);
  setTimeout(() => document.addEventListener('click', closeMenus), 100);
}

function menuItem(icon, text, onClick, textClass = 'text-gray-300') {
  return createElement('div', {
    class: `px-3 py-2 hover:bg-gray-700 cursor-pointer flex items-center ${textClass}`,
    onclick: () => {
      onClick();
      closeMenus();
    }
  }, [
    createElement('span', { class: 'mr-2' }, icon),
    text
  ]);
}

function closeMenus() {
  document.querySelectorAll('.context-menu').forEach(menu => menu.remove());
  document.removeEventListener('click', closeMenus);
}

function modifierMessage(messageId, oldText, messageData) {
  const nouveauTexte = prompt('Modifier le message :', oldText);
  if (nouveauTexte !== null) {
    const messageDiv = document.getElementById(messageId);
    const msgBubble = messageDiv?.querySelector('div');
    if (msgBubble) msgBubble.childNodes[0].textContent = nouveauTexte;

    if (messageData?.id) {
      fetch(`${URL_SMS}/${messageData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: nouveauTexte })
      }).then(r => r.ok && console.log('Message modifié.'));
    }
  }
}

function epinglerMessage(messageId) {
    const el = document.getElementById(messageId);
    if (el) el.classList.toggle('ring-2');
  
    // On récupère l'objet message d'abord pour connaître son état actuel
    fetch(`${URL_SMS}/${messageId}`)
      .then(response => response.json())
      .then(message => {
        // Inverser l'état de l'épingle
        const nouvelEtatEpingle = !message.epingle;
  
        // On met à jour uniquement le champ "epingle"
        return fetch(`${URL_SMS}/${messageId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ epingle: nouvelEtatEpingle })
        });
      })
      .then(r => r.ok && console.log('Champ "epingle" mis à jour.'))
      .catch(err => console.error('Erreur lors de l\'épinglage', err));
  }
  

function marquerImportant(messageId) {
  const el = document.getElementById(messageId);
  if (el) el.classList.toggle('bg-yellow-800');
}

function supprimerMessage(messageId, messageData) {
    console.log('messageData',messageId)
    
    console.log('messageData',messageData.id)
    const el = document.getElementById(messageId);
    if (el) el.remove();

      fetch(`${URL_SMS}/${messageData.id}`, {
        method: 'DELETE'
      }).then(r => r.ok && console.log('Message supprimé.'));

}
