import { createElement,createDivRontPourIcon } from '../componant.js'
import { section4 } from './section4.js';
import { chargerUsers,listerMembres } from '../ui.js';

const d1 = createElement('div',{
    class: ' h-16 w-16 rounded-full  '
},[
    createElement('img', {
        id: 'image',
        src: '/profile2.png',
        alt: 'Avatar',
        class: 'h-16 w-16 rounded-full border border-gray-300 object-cover'
    })
])
const d2 = createElement('div',{
    id: 'nomPrenom',
    class: ' w-4/5 h-16flex flex-col justify-around'
},[
    createElement('div',{},'Prenom Nom'),
    createElement('div',{},'dure')
])
const d3 = createElement('div',{
    class: ' w-32  h-16 fji flex-end'
},[
    createDivRontPourIcon ().addElement('i',{class:"fa-solid fa-magnifying-glass"}),
    createDivRontPourIcon ().addElement('i',{class:"fa-solid fa-ellipsis-vertical"}),
])
const seadbar = createElement('div',{
    class : "text-white h-20 flex items-center cursor-pointer flex gap-2",
    onclick: (e) => xxx()
},[
    d1,
    d2,
    d3
])




export function smsEvoie(x=true,sms){
    if (!x) {
        return createElement('div',{
            class: 'w-1/3 bg-gray-500/30 h-24 rounded-lg mt-1 text-white p-3'
        },[sms])
    }
    return createElement('div',{
        class: 'w-1/3 bg-[#144D37]/80 h-24 ml-auto rounded-lg mt-2 text-white p-3'
    },[sms])
}

const mesSMS = createElement('div',{
    id: 'mesSMS',
},[
    createElement('div',{
    class: 'w-full h-24 flex justify-center items-center text-gray-500'
}, 'Aucun message'),
])

const zoneMessage = createElement('div',{
    id: 'zoneMessage',
    class: 'h-4/5 flex-1 flex-col overflow-scroll bg-[url(/image.png)]  bg-center  ',
},[
    mesSMS
])



const dr = createElement('div',{
    class: 'fji'
},[
    createDivRontPourIcon().addElement('i',{ class: "fa-solid fa-plus"}),
    createDivRontPourIcon().addElement('i',{class: "fa-regular fa-face-smile-wink"}),
])

const input = createElement('input',{
    class: 'w-5/6 h-12 focus:outline-none bg-transparent text-gray-400 placeholder-gray-400 shadow-sm transition duration-200 ease-in-out',
    placeholder: 'Entrez votre texte ici...',
})

const dl = createElement('div',{ class: 'fji'},[
    createDivRontPourIcon().addElement('i',{class: "fa-solid fa-microphone-lines"}),
    createDivRontPourIcon ().addElement('i',{class:"fas fa-paper-plane"}),

])

const pourEnvoi = createElement('div',{
    class: 'w-full bg-[#242626] flex justify-around rounded-full '
},[
    dr,
    input,
    dl
])



const s31 = createElement('div',{
    class: 'w-full h-full flex flex-col'
},[
    seadbar,
    zoneMessage,
    pourEnvoi,
])

export const section3 = createElement('section',{
    class:" w-full h-full justify-around p-3 flex"
},[
    s31,section4
])


























const ll = createElement('div', {
        id:'listeMembreGroupe',
        class: 'max-h-80 overflow-y-auto'
        }, [
            // Vous (créateur)
            createElement('div', {
                class: 'flex items-center justify-between p-4 hover:bg-gray-800'
            }, [
                createElement('div', {
                class: 'flex items-center space-x-3'
                }, [
                createElement('div', {
                    class: 'w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold'
                }, '🌟'),
                createElement('div', {}, [
                    createElement('div', {
                    class: 'text-white font-medium'
                    }, 'Vous'),
                    createElement('div', {
                    class: 'text-gray-400 text-sm'
                    }, 'Ne peut pas parler, WhatsApp uniquement'),
                    createElement('div', {
                    class: 'text-gray-500 text-xs'
                    }, '+221 78 445 87 86')
                ])
                ]),
                createElement('span', {
                class: 'text-teal-400 text-xs bg-teal-900 px-2 py-1 rounded'
                }, 'Admin du groupe')
            ]),

            // Adama Sow (admin)
            createElement('div', {
                class: 'flex items-center justify-between p-4 hover:bg-gray-800'
            }, [
                createElement('div', {
                class: 'flex items-center space-x-3'
                }, [
                createElement('div', {
                    class: 'w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold overflow-hidden'
                }, [
                    createElement('img', {
                    src: '', // URL de l'avatar
                    alt: 'Adama Sow',
                    class: 'w-full h-full object-cover hidden'
                    }),
                    createElement('span', {}, 'AS')
                ]),
                createElement('div', {}, [
                    createElement('div', {
                    class: 'text-white font-medium'
                    }, 'Adama Sow Mou Aboul Abass'),
                    createElement('div', {
                    class: 'text-gray-400 text-sm'
                    }, 'من لم يقل مرقيةُ الذكميان أشعاعة شاعث فى الأردان')
                ])
                ]),
                createElement('span', {
                class: 'text-teal-400 text-xs bg-teal-900 px-2 py-1 rounded'
                }, 'Admin du groupe')
            ]),

            // Bint AAA (admin)
            createElement('div', {
                class: 'flex items-center justify-between p-4 hover:bg-gray-800'
            }, [
                createElement('div', {
                class: 'flex items-center space-x-3'
                }, [
                createElement('div', {
                    class: 'w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold overflow-hidden'
                }, [
                    createElement('img', {
                    src: '', // URL de l'avatar
                    alt: 'Bint AAA',
                    class: 'w-full h-full object-cover hidden'
                    }),
                    createElement('span', {}, 'BA')
                ]),
                createElement('div', {}, [
                    createElement('div', {
                    class: 'text-white font-medium flex items-center'
                    }, [
                    'Bint AAA',
                    createElement('span', {
                        class: 'ml-1'
                    }, '💙🤲')
                    ])
                ])
                ]),
                createElement('span', {
                class: 'text-teal-400 text-xs bg-teal-900 px-2 py-1 rounded'
                }, 'Admin du groupe')
            ]),

            // Aissa Sall Bouge (membre)
            createElement('div', {
                class: 'flex items-center justify-between p-4 hover:bg-gray-800'
            }, [
                createElement('div', {
                class: 'flex items-center space-x-3'
                }, [
                createElement('div', {
                    class: 'w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold overflow-hidden'
                }, [
                    createElement('img', {
                    src: '', // URL de l'avatar
                    alt: 'Aissa Sall',
                    class: 'w-full h-full object-cover hidden'
                    }),
                    createElement('span', {}, 'AS')
                ]),
                createElement('div', {}, [
                    createElement('div', {
                    class: 'text-white font-medium'
                    }, 'Aissa Sall Bouge'),
                    createElement('div', {
                    class: 'text-gray-400 text-sm flex items-center'
                    }, [
                    'Allah ',
                    createElement('span', {}, '🤲')
                    ])
                ])
                ])
            ]),
        ])

function xxx(){
    const contactActif = JSON.parse(localStorage.getItem('contactActif')) ?? [];
    console.log('Contact actif:', contactActif);
    const section4 =  document.querySelector('#section4');
    section4.classList.toggle('hidden');

    lesMembresGroupes() 

}

function lesMembresGroupes() {
    const maListeMembres = document.querySelector('#maListeMembres');
    const listeMembre = document.querySelector('#listeMembreGroupe');
    if (listeMembre) {
        listeMembre.classList.remove('hidden');
        listerMembres();
    }
    if( maListeMembres) {
        maListeMembres.innerHTML = '';
        maListeMembres.appendChild(ll);
        console.log('maListeMembres');
    }
}


