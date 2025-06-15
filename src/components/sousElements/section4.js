import { createElement,createDivRontPourIcon } from '../componant.js'



// Bouton retour
const btnRetour = createElement('button', {
    class: 'mr-4 text-white hover:text-gray-300',
    onclick: () => {
      // Logique pour retourner à la liste des conversations
        document.getElementById('section4').classList.add('hidden');
      // Afficher la section précédente
    }
}, '× infos du groupe')

// Bouton infos (optionnel)
const btnInfo =   createElement('button', {
    class: 'ml-2 text-gray-400 hover:text-white',
    onclick: () => {
      // Logique pour afficher les infos du groupe
    }
}, '⋮')


const sac1 = createElement('div', { class : 'flex justify-between w-full'},[
    btnRetour,
    btnInfo
])

const lst = createElement('div', {},[

])

// Section des membres
const membresGroupes = createElement('div', {
        id: 'membresGroupes',
        class: 'border-t border-gray-700'
    }, [
        // Header des membres
        createElement('div', {
        class: 'flex items-center justify-between p-4 border-b border-gray-700'
        }, [
        createElement('span', {
            class: 'text-gray-300 font-medium'
        }, '7 membres'),
        createElement('button', {
            class: 'text-gray-400 hover:text-white',
            onclick: () => {
            // Logique pour rechercher dans les membres
            }
        }, '🔍')
        ]),

        // Actions rapides
        createElement('div', {
        class: 'px-4 py-2 space-y-2'
        }, [
            // Ajouter un membre
            createElement('div', {
                id: 'addMembre',
                class: 'flex items-center space-x-3 text-gray-300 cursor-pointer hover:bg-gray-800 p-2 rounded',
                onclick: () => {
                // Logique pour ajouter un membre
                }
            }, [
                createElement('div', {
                class: 'w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center'
                }, '+'),
                createElement('span', {}, 'Ajouter un membre')
            ]),

            // Inviter via lien
            createElement('div', {
                class: 'flex items-center space-x-3 text-gray-300 cursor-pointer hover:bg-gray-800 p-2 rounded',
                onclick: () => {
                // Logique pour inviter via lien
                }
            }, [
                createElement('div', {
                class: 'w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center'
                }, '🔗'),
                createElement('span', {}, 'Inviter à rejoindre le groupe via un lien')
            ])
        ]),

        // Liste des membres
        createElement('div', {
        id: 'maListeMembres',
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

            // Sheikh Ibrahim (admin)
            listerMembres() ,

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
            ])
        ])
    ])



export const section4 = createElement('section', {
        id: 'section4',
        class: 'w-full h-full overflow-scroll bg-[#1a1a1a] text-white flex flex-col hidden'
    }, [
    // Header avec photo de profil et infos du groupe
    createElement('div', {
      class: 'flex flex-col min-h-80 items-center p-4 border-b border-gray-700 gap-4',
    //   style: { height: '320px' }
    }, [
      sac1,
      // Photo de profil du groupe
      createElement('div', {
        class: 'w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center mr-3 overflow-hidden'
      }, [
        createElement('img', {
          src: '', // URL de l'image du groupe
          alt: 'Photo de groupe',
          class: 'w-full h-full object-cover',
          style: 'display: none' // Caché par défaut, affiché si image disponible
        }),
        // Initiales ou icône par défaut
        createElement('span', {
          class: 'text-white font-semibold text-lg'
        }, 'AA')
      ]),
      
      // Informations du groupe
      createElement('div', {
        class: 'flex-1'
      }, [
        createElement('h3', {
          class: 'font-semibold text-lg leading-tight'
        }, 'Ahbaabou Aboul Abass At\'Tidjany ❤️🤲'),
        createElement('p', {
          class: 'text-gray-400 text-sm'
        }, 'Groupe • 7 membres')
      ]),
    ]),
    
    // Section médias, liens et documents
    createElement('div', {
      class: 'border-t border-gray-700 p-4'
    }, [
      createElement('div', {
        class: 'flex items-center justify-between mb-3'
      }, [
        createElement('span', {
          class: 'text-gray-300 flex items-center'
        }, [
          createElement('span', {
            class: 'mr-2'
          }, '📎'),
          'Médias, liens et documents'
        ]),
        createElement('span', {
          class: 'text-gray-500 text-sm'
        }, '45')
      ]),
      
      // Aperçu des médias
      createElement('div', {
        class: 'flex space-x-2 overflow-x-auto'
      }, [
        createElement('div', {
          class: 'w-16 h-16 bg-orange-500 rounded flex-shrink-0 flex items-center justify-center'
        }, '🎵'),
        createElement('div', {
          class: 'w-16 h-16 bg-purple-500 rounded flex-shrink-0'
        }),
        createElement('div', {
          class: 'w-16 h-16 bg-blue-500 rounded flex-shrink-0'
        }),
        createElement('div', {
          class: 'w-16 h-16 bg-green-500 rounded flex-shrink-0'
        })
      ])
    ]),
    
    // Options du groupe
    createElement('div', {
      class: 'border-t border-gray-700 p-4 space-y-4'
    }, [
      // Messages importants
      createElement('div', {
        class: 'flex items-center space-x-3 text-gray-300'
      }, [
        createElement('span', {}, '⭐'),
        createElement('span', {}, 'Messages importants')
      ]),
      
      // Mode silencieux
      createElement('div', {
        class: 'flex items-center justify-between'
      }, [
        createElement('div', {
          class: 'flex items-center space-x-3 text-gray-300'
        }, [
          createElement('span', {}, '🔇'),
          createElement('span', {}, 'Mode silencieux')
        ]),
        createElement('div', {
          class: 'w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer',
          onclick: function() {
            // Toggle du mode silencieux
            this.classList.toggle('bg-teal-500');
            const toggle = this.querySelector('.toggle-dot');
            toggle.classList.toggle('translate-x-6');
          }
        }, [
          createElement('div', {
            class: 'toggle-dot w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200'
          })
        ])
      ]),
      
      // Chiffrement
      createElement('div', {
        class: 'flex items-start space-x-3 text-gray-300'
      }, [
        createElement('span', {}, '🔒'),
        createElement('div', {}, [
          createElement('div', {}, 'Chiffrement'),
          createElement('p', {
            class: 'text-xs text-gray-500 mt-1'
          }, 'Les messages sont chiffrés de bout en bout. Cliquez pour plus d\'informations.')
        ])
      ]),
      
      // Messages éphémères
      createElement('div', {
        class: 'flex items-center justify-between'
      }, [
        createElement('div', {
          class: 'flex items-center space-x-3 text-gray-300'
        }, [
          createElement('span', {}, '⏱️'),
          createElement('span', {}, 'Messages éphémères')
        ]),
        createElement('span', {
          class: 'text-gray-500 text-sm'
        }, 'Non')
      ]),
  
      // Confidentialité avancée
      createElement('div', {
        class: 'flex items-center justify-between'
      }, [
        createElement('div', {
          class: 'flex items-center space-x-3 text-gray-300'
        }, [
          createElement('span', {}, '🛡️'),
          createElement('span', {}, 'Confidentialité avancée de la discussion')
        ]),
        createElement('span', {
          class: 'text-gray-500 text-sm'
        }, 'Désactivée')
      ]),
  
      // Autorisations du groupe
      createElement('div', {
        class: 'flex items-center space-x-3 text-gray-300 cursor-pointer hover:bg-gray-800 p-2 rounded',
        onclick: () => {
          // Logique pour ouvrir les autorisations
        }
      }, [
        createElement('span', {}, '⚙️'),
        createElement('span', {}, 'Autorisations du groupe')
      ])
    ]),

    membresGroupes
]);

// const contactActif = JSON.parse(localStorage.getItem('contactActif'));
// console.log('Section 4:');
// console.log('Contact actif:', contactActif);
// const allUsers = await chargerUsers(); // récupère tous les users
// const membres = allUsers.filter(user => contactActif.membres.includes(user.id))??[];
// console.log('membres:', membres);


function listerMembres() {
    

    return createElement('div', {
        class: 'flex items-center justify-between p-4 hover:bg-gray-800'
    }, [
        createElement('div', {
        class: 'flex items-center space-x-3'
        }, [
        createElement('div', {
            class: 'w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-semibold overflow-hidden'
        }, [
            createElement('img', {
            src: '', // URL de l'avatar
            alt: 'Sheikh Ibrahim',
            class: 'w-full h-full object-cover hidden'
            }),
            createElement('span', {}, 'SI')
        ]),
        createElement('div', {}, [
            createElement('div', {
            class: 'text-white font-medium'
            }, '~ Sheikh Ibrahim'),
            createElement('div', {
            class: 'text-gray-400 text-sm'
            }, 'AHMAD LIGHT OF HUMANITY 🌍💚'),
            createElement('div', {
            class: 'text-gray-500 text-xs'
            }, '+221 78 751 17 17')
        ])
        ]),
        createElement('span', {
        class: 'text-teal-400 text-xs bg-teal-900 px-2 py-1 rounded'
        }, 'Admin du groupe')
    ])
}