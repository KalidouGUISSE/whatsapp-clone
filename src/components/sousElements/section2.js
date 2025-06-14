import { createElement,createDivRontPourIcon,afficherMessageAlert } from '../componant.js'
import { popupMenu, popupFormulaire, popupPourContact,popupFormGroupe ,listeMembre} from './mesPoppup.js';
import { chargerUsers } from '../ui.js';
const div1Enfant1 = createElement('div',{
        class : "relative bg--500 h-1/3 justify-between fji text-white"
    },[
        createElement('div',{},'Whatshapp'),
        createElement('div',{ class : "flex gap-1"},[
            createDivRontPourIcon ().addElement('i',{class:"fa-solid fa-folder-plus"}),
            createDivRontPourIcon ().addElement('i',{
                id: 's2Icon3points',
                class:"fa-solid fa-ellipsis-vertical",
            }),
        ]),
        popupMenu,
        popupFormulaire,
        popupPourContact,
        popupFormGroupe,
        listeMembre,
    ])

const div2Enfant1 = createElement('div',{
    class : "bg--500 h-1/3 flex flex-col justify-end "
},[
    createElement('input',{
        class: 'w--full h-12 rounded-full pl-4 focus:outline-none bg-[#242626] text-gray-400 placeholder-gray-400 shadow-sm transition duration-200 ease-in-out',
        placeholder: 'Rechercher',
    })
])

const div3Enfant1 =  createElement('div',{
    class : "bg--500 h-1/3 w-full flex items-center text-white gap-2"
},[
    createElement('div',{class:'s2DivEnfant3'}, 'Toutes' ),
    createElement('div',{class:'s2DivEnfant3'}, 'Nom lue' ),
    createElement('div',{class:'s2DivEnfant3'}, 'Favory' ),
    createElement('div',{class:'s2DivEnfant3'}, 'Groupes' ),
])

const enfant1 = createElement('div',{
    class : " h-1/4 w-full "
},[
    div1Enfant1,
    div2Enfant1,
    div3Enfant1
])





// const mesContacts = createElement('div', {
//         class: 'border h-3/4'
//     }, Array.from({ length: 6 }, contact));

export const section2 = createElement('section',{
    class : " w-2/5 h-full pl-3 pr-3 border border-gray-300/30 "
},[
    enfant1
])





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
            createElement('div',{},contact.numero)
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
        class : "text-white p-2 rounded-lg h-24 flex items-center cursor-pointer hover:bg-[#292A2A] ",
        id: 'id_'+contact.id,
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
    
    const contactActif = JSON.parse(localStorage.getItem('contactActif'));
    console.log('Contact actif:', contactActif);

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
            fetch(`http://localhost:4025/users/${contact.id}`, {
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


    // const addMembre = document.querySelector('#addMembre');

    // if (addMembre) {
    //     addMembre.addEventListener('click', async () => {
    //         const popupPourContact = document.querySelector('#popupPourContact');
    //         popupPourContact?.classList.add('hidden');

    //         if (!contact.groupe) {
    //             afficherMessageAlert('warning', 'Creer un groupe pour ajouter un membre', enfant1);
    //             return;
    //         }
    //         // Supprime le popup s’il existe déjà
    //         document.querySelector('#popupListeContacts')?.remove();

    //         // Créer le fond du popup
    //         const overlay = createElement('div', {
    //             id: 'popupListeContacts',
    //             class: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    //         });

    //         // Contenu du popup
    //         const popup = createElement('div', {
    //             class: 'bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative'
    //         });

    //         // Bouton de fermeture
    //         const closeBtn = createElement('button', {
    //             class: 'absolute top-2 right-3 text-xl text-red-500 hover:text-red-700',
    //             onclick: () => overlay.remove()
    //         }, '×');

    //         // Titre
    //         const titre = createElement('h2', {
    //             class: 'text-xl font-semibold mb-4 text-center'
    //         }, 'Liste des Contacts');

    //         // Conteneur des contacts
    //         const liste = createElement('div', {
    //             class: 'flex flex-col gap-2 max-h-[300px] overflow-y-auto'
    //         });

    //         // Charger les utilisateurs
    //         const contacts = await chargerUsers();

    //         contacts.forEach(user => {
    //             const item = createElement('div', {
    //                 class: 'border rounded p-3 hover:bg-gray-100 cursor-pointer flex flex-col'
    //             }, [
    //                 createElement('span', { class: 'font-bold' }, `${user.Prenom} ${user.Nom}`),
    //                 createElement('span', { class: 'text-sm text-gray-600' }, user.numero)
    //             ]);

    //             liste.appendChild(item);
    //         });

    //         // Ajouter les éléments dans le popup
    //         popup.addNode(closeBtn).addNode(titre).addNode(liste);
    //         overlay.appendChild(popup);

    //         // Afficher le popup
    //         document.body.appendChild(overlay);
    //     });
    // }
}




document.addEventListener('click', (event) => {
    const target = event.target;

    const isIcon3points = target.closest('#s2Icon3points');
    const isNouveauContact = target.closest('#nouveauContact');
    const isContact = target.closest('[id^="id_"]'); // Détecte un élément contact

    // Cacher le popupPourContact uniquement si on n'a pas cliqué sur un contact
    if (!isContact && !popupPourContact.contains(target)) {
        popupPourContact.classList.add('hidden');
    }

    if (isNouveauContact) {
        popupFormulaire.classList.toggle('hidden');
        popupMenu.classList.add('hidden'); 
    } else if (!popupFormulaire.contains(target)) {
        popupFormulaire.classList.add('hidden');
    }

    const isNouveauGroupe = target.closest('#nouveauGroupe');
    if(isNouveauGroupe ) {
        popupFormGroupe.classList.remove('hidden');
        popupMenu.classList.add('hidden'); 
    }
    else if (!popupFormGroupe.contains(target)) {
        popupFormGroupe.classList.add('hidden');
    }

});


