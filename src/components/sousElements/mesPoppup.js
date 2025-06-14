import { createElement,createDivRontPourIcon } from '../componant.js'


export const popupMenu = createElement('div', {
    id: 'popupMenu',
    class: 'absolute top-16 right-4 bg-white shadow-lg rounded-lg p-2 text-black hidden z-50 '
}, [
    createElement('div', { id: 'nouveauContact' , class: 'hover:bg-gray-200 p-2 cursor-pointer' }, 'Nouveau contact'),
    createElement('div', { id: 'nouveauGroupe', class: 'hover:bg-gray-200 p-2 cursor-pointer' }, 'Nouveau groupe'),
    createElement('div', { class: 'hover:bg-gray-200 p-2 cursor-pointer' }, 'Paramètres')
]);

export const popupFormulaire = createElement('div',{
    id:'popupFormulaire',
    class: ' absolute top-16 right-4 bg-white shadow-lg rounded-lg p-2 hidden'
},[
    createElement('div', { class: 'text-black' }, 'Formulaire de contact'),
    createElement('form', { class: 'text-black' }, [
        createElement('input', {
            id: 'inputNomContact',
            type: 'text',
            placeholder: 'Nom',
            // value: 'sdf',
            class: 'w-full mb-2 p-1 border rounded'
        }),
        createElement('input', {
            id: 'inputPrenom',
            type: 'text',
            placeholder: 'Prénom',
            class: 'w-full mb-2 p-1 border rounded'
        }),
        createElement('input', {
            id: 'number',
            type: 'text',
            placeholder: 'numéro de téléphone',
            class: 'w-full mb-2 p-1 border rounded'
        }),
        createElement('button', {
            id: 'btnAjouter',
            type: 'button',
            class: 'bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        }, 'Ajouter')
    ])
])

export const popupPourContact = createElement('div',{
    id: 'popupPourContact',
    class: 'absolute top-16 right-4 bg-white shadow-lg rounded-lg p-2 hidden z-50'
},[
    createElement('div', { class: 'text-black' }, 'Options'),
    createElement('div',{ id:'addAdmin', class: 'text-black p-2 hover:text-green-500 cursor-pointer'},'Ajouter un Admin'),
    createElement('div',{ id:'addMembre', class: 'text-black p-2 hover:text-green-500 cursor-pointer'},'Ajouter un Menbre'),
    createElement('div',{ id:'supprimer', class: 'text-black p-2 hover:text-red-500 cursor-pointer'},'Supprimer'),
    // createElement('div',{ id:'addMembre', class: 'text-black p-2 hover:text-red-500 cursor-pointer'},'Ajouter un membre'),
    // createElement('div',{ id:'modifier', class: 'text-black p-2 hover:text-red-500 cursor-pointer'},'Modifier'),
])

export const popupFormGroupe = createElement('div',{
    id: 'popupFormGroupe',
    class: ' absolute top-16 right-4 bg-white shadow-lg rounded-lg p-2 hidden'
},[
    createElement('div', { class: 'text-black' }, 'Formulaire du groupe'),
    createElement('form', { class: 'text-black' }, [
        createElement('input', {
            id: 'inputNomGroupe',
            type: 'text',
            placeholder: 'Nom du groupe',
            // value: 'sdf',
            class: 'w-full mb-2 p-1 border rounded'
        }),
        createElement('input', {
            id: '',
            type: 'text',
            placeholder: 'Sous titre du groupe',
            class: 'w-full mb-2 p-1 border rounded'
        }),
        createElement('button', {
            id: 'btnAddGroupe',
            type: 'button',
            class: 'bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        }, 'Creer Groupe')
    ])
])


export const listeMembre = createElement('div',{
    id:'listeMembre',
    class: 'text-black absolute top-16 right-4 bg-white shadow-lg rounded-lg p-2 hidden'
},[
    createElement('div', { class: 'text-black' }, 'Selectionner un membre'),

])