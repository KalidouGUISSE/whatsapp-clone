import { createElement ,createDivRontPourIcon} from '../componant.js'



const parentDivRontPourIcon1 = createElement('div',{
    class: "fji flex-col h-64 gap-1 "
    },[
    createDivRontPourIcon ().addElement('i',{class:"fa-solid fa-message"}),
    createDivRontPourIcon ().addElement('i',{class:"fas fa-paper-plane"}),
    createDivRontPourIcon ().addElement('i',{class:"fa-solid fa-comment-dots"}),
    createDivRontPourIcon ().addElement('i',{class:"fa-solid fa-people-group"}),
])

const parentDivRontPourIcon2 = createElement('div',{
        class: "  h-full flex flex-col fji justify-between"
    },[
        createElement('div',{class:"div-sec1-2"},[createDivRontPourIcon().addElement('i',{class:"fa-solid fa-toolbox"}) ,createDivRontPourIcon().addElement('i',{class:"fa-solid fa-volume-high"}) ]),
        createElement('div',{class:"div-sec1-2"},[createDivRontPourIcon().addElement('i',{class:""}).addElement('i',{class:"fa-solid fa-gear"}) , createDivRontPourIcon() ])
    ])


export const section1 = createElement('section',{
        class: "bg-[#1D1F1F] w-24 h-full flex flex-col gap-5 justify-between"
    },[
        parentDivRontPourIcon1,
        parentDivRontPourIcon2
    ])

