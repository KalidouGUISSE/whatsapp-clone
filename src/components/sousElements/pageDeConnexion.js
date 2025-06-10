import { createElement ,createDivRontPourIcon} from '../componant.js'


const headerSection = createElement('div', {
    class: 'text-center mb-8'
}, [
    createElement('h1', {
        class: 'text-3xl font-bold text-white mb-2'
    }, 'WhatsApp'),
    createElement('p', {
        class: 'text-white/80 text-sm'
    }, 'Connectez-vous avec votre numéro')
]);

const ChampNom = createElement('div', {
    class: 'space-y-2'
}, [
    createElement('label', {
        class: 'block text-sm font-semibold text-gray-700'
    }, 'Votre Nom'),
    createElement('input', {
        id: 'inputNom',
        type: 'text',
        placeholder: 'Kalidou GUISSE',
        value: "guisse",
        class: 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-whatsapp focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white',
        // required: true
    })
])

const btnSeConecter = createElement('button', {
    id: 'btnSeConecter',
    type: 'submit',
    class: 'w-full bg-green-500 from-whatsapp to-whatsapp-dark text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 fji space-x-2'
}, [
    createElement('span', {class: 'text-black'}, 'Se connecter'),
    createElement('svg', {
        class: 'w-5 h-5',
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24'
    }, [
        createElement('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M13 7l5 5m0 0l-5 5m5-5H6'
        })
    ])
])

const champNumero = createElement('div', {
    class: 'space-y-2'
}, [
    createElement('label', {
        class: 'block text-sm font-semibold text-gray-700'
    }, 'Numéro de téléphone'),
    createElement('div', {
        class: 'relative'
    }, [
        createElement('div', {
            class: 'absolute inset-y-0 left-0 flex items-center pointer-events-none'
        }),
        createElement('input', {
            id: 'numero',
            type: 'tel',
            value: "784458786",
            placeholder: '77-445-87-86',
            class: 'w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-whatsapp focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white',
            required: true
        })
    ])
])

const footerSection = createElement('div', {
    class: 'text-center mt-6'
}, [
    createElement('p', {
        class: 'text-white/60 text-xs'
    }, 'En vous connectant, vous acceptez nos conditions d\'utilisation'),
    createElement('div', {
        class: 'flex justify-center space-x-4 mt-4'
    }, [
        createElement('button', {
            class: 'text-white/80 hover:text-white text-sm underline transition-colors duration-200'
        }, 'Aide'),
        createElement('span', {
            class: 'text-white/40'
        }, '•'),
        createElement('button', {
            class: 'text-white/80 hover:text-white text-sm underline transition-colors duration-200'
        }, 'Confidentialité')
    ])
]);


export const formSection = createElement('div', {
    class: 'bg-white rounded-2xl shadow-2xl p-8 space-y-6'
}, [
    ChampNom,
    champNumero,
    btnSeConecter,
])


export const pageConnexion = createElement('div',{
    id: ' pageConnexiontag ',
    class: " w-full max-w-md mx-auto",
    // vIf: false
    // vShow:true
},[
    headerSection,
    formSection,
])
