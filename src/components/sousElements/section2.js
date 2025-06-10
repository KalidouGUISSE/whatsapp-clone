import { createElement,createDivRontPourIcon } from '../componant.js'

const popupMenu = createElement('div', {
    id: 'popupMenu',
    class: 'absolute top-16 right-4 bg-white shadow-lg rounded-lg p-2 text-black hidden z-50'
}, [
    createElement('div', { id: 'nouveauContact' , class: 'hover:bg-gray-200 p-2 cursor-pointer' }, 'Nouveau groupe'),
    createElement('div', { class: 'hover:bg-gray-200 p-2 cursor-pointer' }, 'Nouveau contact'),
    createElement('div', { class: 'hover:bg-gray-200 p-2 cursor-pointer' }, 'Paramètres')
]);

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
        popupMenu
    ])

const div2Enfant1 = createElement('div',{
    class : "bg--500 h-1/3 flex flex-col justify-end "
},[
    createElement('input',{
        class : 'w-full h-12 rounded-full pl-4'
    })
])

const div3Enfant1 =  createElement('div',{
    class : "bg--500 h-1/3 w-full flex items-center text-white"
},[
    createElement('div',{class:'s2DivEnfant3'}, 'Toutes' ),
    createElement('div',{class:'s2DivEnfant3'}, 'Nom lue' ),
    createElement('div',{class:'s2DivEnfant3'}, 'Favory' ),
    createElement('div',{class:'s2DivEnfant3'}, 'Groupes' ),
])

const enfant1 = createElement('div',{
    class : "border-b-2 h-1/4 w-full "
},[
    div1Enfant1,
    div2Enfant1,
    div3Enfant1
])





// const mesContacts = createElement('div', {
//         class: 'border h-3/4'
//     }, Array.from({ length: 6 }, contact));

export const section2 = createElement('section',{
    class : " bg--500 w-2/5 h-full pl-3 pr-3 border"
},[
    enfant1
])




// Menu popup caché au départ


// document.body.appendChild(popupMenu);










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
    const d2 = createElement('div',{
        class: ' w-64 h-16 flex flex-col justify-around '
    },[
        createElement('div',{},contact.Prenom + ' ' +contact.Nom),
        createElement('div',{},contact.dure)
    ]);

    const date = createElement('div',{
        class: ' w-1/5 h-16 flex flex-col justify-around fji'
    },[
        createElement('div',{class: ' '},contact.heurNotif),
        createElement('div',{
            class: 'h-6 w-8 rounded-full bg-green-600 fji'
        },contact.nomLue)
    ])

    return createElement('div',{
        class : "border mt-2 text-white p-2 rounded-lg h-24 flex items-center cursor-pointer hover:bg-gray-500"
    },[
        photoContact,
        d2,
        date
    ])
}
