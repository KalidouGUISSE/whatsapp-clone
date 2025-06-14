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
