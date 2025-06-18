import { createElement,createDivRontPourIcon,afficherMessageAlert } from '../componant.js'
import { popupMenu, popupFormulaire, popupPourContact,popupFormGroupe ,listeMembre} from './mesPoppup.js';
import { chargerUsers,listerMembres } from '../ui.js';
// import {  } from './section3.js';
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


