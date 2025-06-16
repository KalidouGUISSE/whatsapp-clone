import { createElement } from './componant.js'
import { section1 } from './sousElements/section1.js'
import { section2 } from './sousElements/section2.js'
import { section3 } from './sousElements/section3.js'
import { pageConnexion } from './sousElements/pageDeConnexion.js'


export let pageCharger = [];


export function charger( x = false) {
    if (x) {
        pageCharger = [
            section1,
            section2,
            section3
        ]
    } else {
        pageCharger = [
            pageConnexion
        ]
    }
}

charger()

export const container = createElement('div',{
        id : "container" ,
        class : "bg-[#161717] w-5/6 h-5/6 fji "
    },pageCharger)
