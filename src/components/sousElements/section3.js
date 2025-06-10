import { createElement,createDivRontPourIcon } from '../componant.js'



const d1 = createElement('div',{
    class: ' h-16 w-16 rounded-full border '
},[
    createElement('img', {
        src: '/profile2.png',
        alt: 'Avatar',
        class: 'h-16 w-16 rounded-full border border-gray-300 object-cover'
    })
])
const d2 = createElement('div',{
    class: ' w-4/5 border h-16 bg-red-300 flex flex-col justify-around'
},[
    createElement('div',{},'Prenom Nom'),
    createElement('div',{},'dure')
])
const d3 = createElement('div',{
    class: ' w-32 border h-16 bg-red-300 fji flex-end'
},[
    createDivRontPourIcon ().addElement('i',{class:"fa-solid fa-magnifying-glass"}),
    createDivRontPourIcon ().addElement('i',{class:"fa-solid fa-ellipsis-vertical"}),
])
const seadbar = createElement('div',{
    class : " h-24 flex items-center cursor-pointer flex gap-2"
},[
    d1,
    d2,
    d3
])




function smsEvoie(x=true,sms){
    if (x) {
        return createElement('div',{
            class: 'w-1/3 bg-gray-700 h-24 rounded-lg mt-1 text-white p-3'
        },[sms])
    }
    return createElement('div',{
        class: 'w-1/3 bg-green-700 h-24 ml-auto rounded-lg mt-2 text-white p-3'
    },[sms])
}

const zoneMessage = createElement('div',{
    class: 'h-4/5 flex-1 flex-col overflow-scroll',
},[
    smsEvoie(true,'Messsage envoyer') ,
    smsEvoie(false,'Messsage recue') ,
    smsEvoie(true,'Messsage envoyer') ,
    smsEvoie(false,'Messsage recue') ,
    smsEvoie(true,'Messsage envoyer') ,
    smsEvoie(true,'Messsage envoyer') ,
    smsEvoie(false,'Messsage recue') ,
    smsEvoie(true,'Messsage envoyer') ,
    smsEvoie(false,'Messsage recue') ,
    smsEvoie(false,'Messsage recue') ,
    smsEvoie(true,'Messsage envoyer') ,
    smsEvoie(false,'Messsage recue') ,
])
























const dr = createElement('div',{
    class: 'fji'
},[
    createDivRontPourIcon().addElement('i',{ class: "fa-solid fa-plus"}),
    createDivRontPourIcon().addElement('i',{class: "fa-regular fa-face-smile-wink"}),
])

const input = createElement('input',{
    class: 'w-5/6 h-12 '
})

const dl = createElement('div',{ class: 'fji'},[
    createDivRontPourIcon().addElement('i',{class: "fa-solid fa-microphone-lines"}),
    createDivRontPourIcon ().addElement('i',{class:"fas fa-paper-plane"}),

])

const pourEnvoi = createElement('div',{
    class: 'w-full bg-gray-300 flex justify-around rounded-full '
},[
    dr,
    input,
    dl
])


export const section3 = createElement('section',{
    class:" w-full h-full justify-around p-3 "
},[
    seadbar,
    zoneMessage,
    pourEnvoi
])