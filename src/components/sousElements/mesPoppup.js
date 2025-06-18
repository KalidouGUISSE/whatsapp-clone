import { createElement, createDivRontPourIcon } from '../componant.js'

// Popup menu principal style WhatsApp Dark
export const popupMenu = createElement('div', {
    id: 'popupMenu',
    class: 'absolute top-16 right-4 bg-[#2A2F32] shadow-2xl rounded-lg p-1 text-white hidden z-50 border border-[#3B4045] min-w-[200px] backdrop-blur-sm'
}, [
    createElement('div', { 
        id: 'nouveauContact', 
        class: 'flex items-center gap-3 hover:bg-[#3B4045] p-3 cursor-pointer transition-all duration-150' 
    }, [
        createElement('span', { class: 'text-[#00A884] text-lg' }, '👤'),
        createElement('span', { class: 'text-[#E9EDEF] text-sm' }, 'Nouveau contact')
    ]),
    createElement('div', { 
        id: 'nouveauGroupe', 
        class: 'flex items-center gap-3 hover:bg-[#3B4045] p-3 cursor-pointer transition-all duration-150' 
    }, [
        createElement('span', { class: 'text-[#00A884] text-lg' }, '👥'),
        createElement('span', { class: 'text-[#E9EDEF] text-sm' }, 'Nouveau groupe')
    ]),
    createElement('div', { class: 'h-px bg-[#3B4045] mx-2 my-1' }),
    createElement('div', { 
        class: 'flex items-center gap-3 hover:bg-[#3B4045] p-3 cursor-pointer transition-all duration-150' 
    }, [
        createElement('span', { class: 'text-[#00A884] text-lg' }, '⚙️'),
        createElement('span', { class: 'text-[#E9EDEF] text-sm' }, 'Paramètres')
    ])
]);

// Formulaire de contact style WhatsApp Dark
export const popupFormulaire = createElement('div', {
    id: 'popupFormulaire',
    class: 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden z-50'
}, [
    createElement('div', {
        class: 'bg-[#2A2F32] rounded-lg p-6 w-[90%] max-w-md shadow-2xl border border-[#3B4045]'
    }, [
        // Header WhatsApp style
        createElement('div', {
            class: 'flex justify-between items-center mb-6 pb-4 border-b border-[#3B4045]'
        }, [
            createElement('h3', {
                class: 'text-lg font-medium text-[#E9EDEF]'
            }, 'Nouveau contact'),
            createElement('button', {
                class: 'text-[#8696A0] hover:text-[#E9EDEF] text-2xl transition-colors duration-150 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3B4045]',
                onclick: () => document.getElementById('popupFormulaire').classList.add('hidden')
            }, '×')
        ]),
        
        // Formulaire
        createElement('form', { 
            class: 'space-y-4',
            onsubmit: (e) => e.preventDefault()
        }, [
            // Champ Nom
            createElement('div', { class: 'space-y-2' }, [
                createElement('input', {
                    id: 'inputNomContact',
                    type: 'text',
                    placeholder: 'Nom',
                    class: 'w-full p-3 bg-[#1E2428] border border-[#3B4045] rounded-lg text-[#E9EDEF] placeholder-[#8696A0] focus:border-[#00A884] focus:outline-none transition-colors duration-150'
                })
            ]),
            
            // Champ Prénom
            createElement('div', { class: 'space-y-2' }, [
                createElement('input', {
                    id: 'inputPrenom',
                    type: 'text',
                    placeholder: 'Prénom',
                    class: 'w-full p-3 bg-[#1E2428] border border-[#3B4045] rounded-lg text-[#E9EDEF] placeholder-[#8696A0] focus:border-[#00A884] focus:outline-none transition-colors duration-150'
                })
            ]),
            
            // Champ Numéro
            createElement('div', { class: 'space-y-2' }, [
                createElement('input', {
                    id: 'number',
                    type: 'tel',
                    placeholder: 'Numéro de téléphone',
                    class: 'w-full p-3 bg-[#1E2428] border border-[#3B4045] rounded-lg text-[#E9EDEF] placeholder-[#8696A0] focus:border-[#00A884] focus:outline-none transition-colors duration-150'
                })
            ]),
            
            // Boutons
            createElement('div', {
                class: 'flex gap-3 pt-4'
            }, [
                createElement('button', {
                    type: 'button',
                    class: 'flex-1 bg-[#3B4045] text-[#E9EDEF] py-3 px-4 rounded-lg hover:bg-[#4A5055] transition-colors duration-150 text-sm font-medium',
                    onclick: () => document.getElementById('popupFormulaire').classList.add('hidden')
                }, 'ANNULER'),
                createElement('button', {
                    id: 'btnAjouter',
                    type: 'button',
                    class: 'flex-1 bg-[#00A884] text-[#111B21] py-3 px-4 rounded-lg hover:bg-[#06C755] transition-colors duration-150 text-sm font-medium'
                }, 'AJOUTER')
            ])
        ])
    ])
]);

// Popup pour options de contact
export const popupPourContact = createElement('div', {
    id: 'popupPourContact',
    class: 'absolute top-16 right-4 bg-[#2A2F32] shadow-2xl rounded-lg p-1 hidden z-50 border border-[#3B4045] min-w-[160px]'
}, [
    createElement('div', {
        class: 'px-3 py-2 text-xs text-[#8696A0] border-b border-[#3B4045]'
    }, 'OPTIONS'),
    createElement('div', {
        id: 'supprimer',
        class: 'flex items-center gap-3 text-[#E9EDEF] p-3 hover:bg-[#3B4045] cursor-pointer transition-all duration-150'
    }, [
        createElement('span', { class: 'text-[#F15C6D] text-lg' }, '🗑️'),
        createElement('span', { class: 'text-sm' }, 'Supprimer')
    ])
]);

// Formulaire de groupe style WhatsApp Dark
export const popupFormGroupe = createElement('div', {
    id: 'popupFormGroupe',
    class: 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden z-50'
}, [
    createElement('div', {
        class: 'bg-[#2A2F32] rounded-lg p-6 w-[90%] max-w-md shadow-2xl border border-[#3B4045]'
    }, [
        // Header
        createElement('div', {
            class: 'flex justify-between items-center mb-6 pb-4 border-b border-[#3B4045]'
        }, [
            createElement('h3', {
                class: 'text-lg font-medium text-[#E9EDEF]'
            }, 'Nouveau groupe'),
            createElement('button', {
                class: 'text-[#8696A0] hover:text-[#E9EDEF] text-2xl transition-colors duration-150 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3B4045]',
                onclick: () => document.getElementById('popupFormGroupe').classList.add('hidden')
            }, '×')
        ]),
        
        // Image du groupe
        createElement('div', {
            class: 'flex justify-center mb-6'
        }, [
            createElement('div', {
                class: 'w-20 h-20 bg-[#3B4045] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#4A5055] transition-colors duration-150'
            }, [
                createElement('span', { class: 'text-[#8696A0] text-2xl' }, '📷'),
            ])
        ]),
        
        // Formulaire
        createElement('form', { 
            class: 'space-y-4',
            onsubmit: (e) => e.preventDefault()
        }, [
            // Champ Nom du groupe
            createElement('div', { class: 'space-y-2' }, [
                createElement('input', {
                    id: 'inputNomGroupe',
                    type: 'text',
                    placeholder: 'Nom du groupe',
                    class: 'w-full p-3 bg-[#1E2428] border border-[#3B4045] rounded-lg text-[#E9EDEF] placeholder-[#8696A0] focus:border-[#00A884] focus:outline-none transition-colors duration-150'
                })
            ]),
            
            // Champ Description
            createElement('div', { class: 'space-y-2' }, [
                createElement('input', {
                    id: 'inputDescriptionGroupe',
                    type: 'text',
                    placeholder: 'Description du groupe (optionnel)',
                    class: 'w-full p-3 bg-[#1E2428] border border-[#3B4045] rounded-lg text-[#E9EDEF] placeholder-[#8696A0] focus:border-[#00A884] focus:outline-none transition-colors duration-150'
                })
            ]),
            
            // Boutons
            createElement('div', {
                class: 'flex gap-3 pt-4'
            }, [
                createElement('button', {
                    type: 'button',
                    class: 'flex-1 bg-[#3B4045] text-[#E9EDEF] py-3 px-4 rounded-lg hover:bg-[#4A5055] transition-colors duration-150 text-sm font-medium',
                    onclick: () => document.getElementById('popupFormGroupe').classList.add('hidden')
                }, 'ANNULER'),
                createElement('button', {
                    id: 'btnAddGroupe',
                    type: 'button',
                    class: 'flex-1 bg-[#00A884] text-[#111B21] py-3 px-4 rounded-lg hover:bg-[#06C755] transition-colors duration-150 text-sm font-medium'
                }, 'CRÉER')
            ])
        ])
    ])
]);

// Liste des membres style WhatsApp Dark
export const listeMembre = createElement('div', {
    id: 'listeMembre',
    class: 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden z-50'
}, [
    createElement('div', {
        class: 'bg-[#2A2F32] rounded-lg p-6 w-[90%] max-w-lg shadow-2xl max-h-[80vh] flex flex-col border border-[#3B4045]'
    }, [
        // Header
        createElement('div', {
            class: 'flex justify-between items-center mb-4 pb-4 border-b border-[#3B4045]'
        }, [
            createElement('h3', {
                class: 'text-lg font-medium text-[#E9EDEF]'
            }, 'Ajouter des participants'),
            createElement('button', {
                class: 'text-[#8696A0] hover:text-[#E9EDEF] text-2xl transition-colors duration-150 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3B4045]',
                onclick: () => document.getElementById('listeMembre').classList.add('hidden')
            }, '×')
        ]),
        
        // Barre de recherche
        createElement('div', {
            class: 'relative mb-4'
        }, [
            createElement('div', {
                class: 'absolute inset-y-0 left-3 flex items-center'
            }, [
                createElement('span', { class: 'text-[#8696A0] text-lg' }, '🔍')
            ]),
            createElement('input', {
                id: 'rechercherMembre',
                type: 'text',
                placeholder: 'Rechercher...',
                class: 'w-full p-3 pl-12 bg-[#1E2428] border border-[#3B4045] rounded-lg text-[#E9EDEF] placeholder-[#8696A0] focus:border-[#00A884] focus:outline-none transition-colors duration-150'
            })
        ]),
        
        // Zone de contenu scrollable
        createElement('div', {
            id: 'contenuMembres',
            class: 'flex-1 overflow-y-auto space-y-1 mb-4'
        }, [
            createElement('div', {
                class: 'text-center text-[#8696A0] py-8 text-sm'
            }, 'Chargement des contacts...')
        ]),
        
        // Footer avec boutons
        createElement('div', {
            class: 'flex gap-3 pt-4 border-t border-[#3B4045]'
        }, [
            createElement('button', {
                type: 'button',
                class: 'flex-1 bg-[#3B4045] text-[#E9EDEF] py-3 px-4 rounded-lg hover:bg-[#4A5055] transition-colors duration-150 text-sm font-medium',
                onclick: () => document.getElementById('listeMembre').classList.add('hidden')
            }, 'ANNULER'),
            createElement('button', {
                id: 'btnConfirmerSelection',
                type: 'button',
                class: 'flex-1 bg-[#00A884] text-[#111B21] py-3 px-4 rounded-lg hover:bg-[#06C755] transition-colors duration-150 text-sm font-medium'
            }, 'AJOUTER')
        ])
    ])
]);

// Fonction pour créer un élément de membre style WhatsApp Dark
export function creerElementMembre(contact, isSelected = false) {
    const initiales = contact.Nom.charAt(0).toUpperCase() + (contact.Prenom ? contact.Prenom.charAt(0).toUpperCase() : '');
    
    return createElement('div', {
        class: `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150 ${
            isSelected 
                ? 'bg-[#00A884]/20 border-l-4 border-[#00A884]' 
                : 'hover:bg-[#3B4045]'
        }`,
        onclick: function() {
            const isCurrentlySelected = this.classList.contains('bg-[#00A884]/20');
            if (isCurrentlySelected) {
                this.classList.remove('bg-[#00A884]/20', 'border-l-4', 'border-[#00A884]');
                this.classList.add('hover:bg-[#3B4045]');
            } else {
                this.classList.add('bg-[#00A884]/20', 'border-l-4', 'border-[#00A884]');
                this.classList.remove('hover:bg-[#3B4045]');
            }
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
        }
    }, [
        createElement('input', {
            type: 'checkbox',
            class: 'hidden',
            checked: isSelected
        }),
        createElement('div', {
            class: 'w-12 h-12 bg-[#00A884] rounded-full flex items-center justify-center text-[#111B21] font-medium text-sm flex-shrink-0'
        }, initiales),
        createElement('div', {
            class: 'flex-1 min-w-0'
        }, [
            createElement('div', {
                class: 'font-medium text-[#E9EDEF] truncate'
            }, `${contact.Prenom || ''} ${contact.Nom}`),
            createElement('div', {
                class: 'text-sm text-[#8696A0] truncate'
            }, contact.numero)
        ]),
        createElement('div', {
            class: `w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                isSelected 
                    ? 'bg-[#00A884] border-[#00A884]' 
                    : 'border-[#8696A0]'
            }`
        }, [
            isSelected ? createElement('span', { class: 'text-[#111B21] text-xs' }, '✓') : ''
        ])
    ]);
}