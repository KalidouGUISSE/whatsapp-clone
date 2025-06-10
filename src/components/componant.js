export function createElement(tag, props = {}, content = "") {
    if (typeof tag !== "string") return null;
    // Gestion de v-if
    if ('vIf' in props && !props.vIf) return null;

    // Gestion de v-for (retourne un fragment)
    if ('vFor' in props) {
        const fragment = document.createDocumentFragment();
        const { each, render } = props.vFor;
        
        // console.log(render)
        each.forEach((item) => {
            const child = render(item );
            if (child instanceof Node) {
                fragment.appendChild(child);
            }
        });
        // prompt('edno')
        let newContent = [fragment,content];
        // newContent.push(fragment)
        content = newContent;
        console.log(content)
    }

    const el = document.createElement(tag);

    for (const key in props) {
        const value = props[key];

        // Classes
        if (key === "class" || key === "className") {
            el.className = Array.isArray(value) ? value.join(" ") : value;
        }

        // Événements
        else if (key.startsWith("on") && typeof value === "function") {
            const eventName = key.slice(2).toLowerCase();
            el.addEventListener(eventName, value);
        }

        // v-show => toggle `display: none`
        else if (key === "vShow") {
            el.style.display = value ? "" : "none";
        }

        // vIf et vFor 
        else if (key === "vIf" || key === "vFor") {
            continue;
        }

        // :attr => dynamic binding
        else if (key.startsWith(":")) {
            const realAttr = key.slice(1);
            el.setAttribute(realAttr, value);
        }

        // style objet
        else if (key === "style" && typeof value === "object") {
            Object.assign(el.style, value);
        }

        // Attribut HTML classique
        else {
            el.setAttribute(key, value);
        }
    }

    // Contenu : string | Node | array
    if (Array.isArray(content)) {
        content.forEach(item => {
            if (typeof item === "string") {
                el.appendChild(document.createTextNode(item));
            } else if (item instanceof Node) {
                el.appendChild(item);
            }
        });
    } else if (typeof content === "string") {
        el.textContent = content;
    } else if (content instanceof Node) {
        el.appendChild(content);
    }

    // Méthodes pour chaînage
    el.addElement = function (tag, props = {}, content = "") {
        const newEl = createElement(tag, props, content);
        this.appendChild(newEl);
        return this;
    };
    el.addNode = function (node) {
        this.appendChild(node);
        return this;
    };

    return el;
}



export function createDivRontPourIcon (){
    return createElement ('div', {
        class :"text-white div-ront-pour-icon fji cursor-pointer"
    })
}




//pour l'estocker dans une variable
function validateElement () {
    return{
        _isString : false,
        _isObjet : false,
        _isTable : false,
        _isFunction : false,
        _isNode : false,
        isString(el){
            this._isString = (typeof el === 'string'); return this;
        },
        isObjet (el){
            this._isObjet = typeof el === 'object'; return this;
        },
        isFunction(el){
            this._isFunction = typeof el === 'function'; return this;
        },
        isTable (el){
            this._isTable = Array.isArray(el); return this;
        },
        isNode(el){
            this._isNode = (el instanceof Node) ; return this;
        },
    }
}
const test = validateElement()

function controlleValue (tag,props,ctn){
    test.isString(ctn).isTable(ctn).isNode(ctn);
    if(test._isString && test._isTable && test._isNode) return console.log(`${ctn} Le contenu doit etre une chaine ou un tableau ou un noeud`);
    test.isString(tag).isObjet(props)
    if(!test._isString) return console.log(`${tag} doit etre une chaine`)
    if(!test._isObjet) return console.log(`${tag} doit etre un objet`)
}






// Fonction utilitaire pour afficher les messages
export function afficherMessageAlert(type, texte, parant = createElement('div') ,duree = 3000) {

    // Supprimer message existant
    const ancien = parant.querySelector('.message-temp');
    if (ancien) ancien.remove();
    
    // Styles selon le type
    const styles = {
        success: ' message-temp bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 rounded flex items-center',
        error: ' message-temp bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded flex items-center',
        warning: ' message-temp bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-4 rounded flex items-center'
    };
    
    const icones = { success: '✓', error: '✗', warning: '⚠' };
    
    // Créer message
    const message = createElement('div', { class: styles[type] });
    message.innerHTML = `<span class="mr-2 font-bold">${icones[type]}</span><span>${texte}</span>`;
    
    parant.insertBefore(message, parant.firstChild);
    
    // Suppression automatique
    setTimeout(() => {
        if (parant.contains(message)) message.remove();
    }, duree);
}





export function dagayeKhar (numero){
    numero.addEventListener('keydown', (e) => {
        const allowedKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab',
            'Home', 'End'
        ];
        
        // Autoriser les touches spéciales et les chiffres
        if (
            allowedKeys.includes(e.key) ||
            /^[0-9\s\-\+\(\)]$/.test(e.key)
        ) {
            return;
        }
        e.preventDefault();
    });
}








// const btn = document.getElementById('fuyantBtn');
// let isRight = true;

// btn.addEventListener('mouseenter', bouger);

function bouger() {
    const nom = document.getElementById('nom').value.trim();
    const numero = document.getElementById('numero').value.trim();

    if (!nom || !numero) {
        // Si au moins un champ est vide, on déplace le bouton
        if (isRight) {
            btn.style.transform = 'translateX(100%)'; // va à droite
        } else {
            btn.style.transform = 'translateX(-180%)'; // va à gauche
        }
        isRight = !isRight;
    } else {
        // Si les champs sont remplis, on remet le bouton au centre
        btn.style.transform = 'translateX(0)';
    }
}






export function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    
    // Remove existing classes
    messageDiv.className = 'mt-6 p-3 rounded-lg text-center text-sm font-medium transition-all duration-300';
    
    // Add type-specific classes
    switch(type) {
        case 'success':
            messageDiv.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-200');
            break;
        case 'error':
            messageDiv.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-200');
            break;
        case 'info':
            messageDiv.classList.add('bg-yellow-100', 'text-yellow-800', 'border', 'border-yellow-200');
            break;
    }
    
    // Show with animation
    setTimeout(() => {
        messageDiv.classList.remove('opacity-0', 'translate-y-2');
        messageDiv.classList.add('opacity-100', 'translate-y-0');
    }, 10);
}










































































// //pour l'estocker dans une variable
// function validateElement () {
//     return{
//         _isString : false,
//         _isObjet : false,
//         _isTable : false,
//         _isFunction : false,
//         _isNode : false,
//         isString(el){
//             this._isString = (typeof el === 'string'); return this;
//         },
//         isObjet (el){
//             this._isObjet = typeof el === 'object'; return this;
//         },
//         isFunction(el){
//             this._isFunction = typeof el === 'function'; return this;
//         },
//         isTable (el){
//             this._isTable = Array.isArray(el); return this;
//         },
//         isNode(el){
//             this._isNode = (el instanceof Node) ; return this;
//         },
//     }
// }
// const test = validateElement()

// function controlleValue (tag,props,ctn){
//     test.isString(ctn).isTable(ctn).isNode(ctn);
//     if(test._isString && test._isTable && test._isNode) return console.log(`${ctn} Le contenu doit etre une chaine ou un tableau ou un noeud`);
//     test.isString(tag).isObjet(props)
//     if(!test._isString) return console.log(`${tag} doit etre une chaine`)
//     if(!test._isObjet) return console.log(`${tag} doit etre un objet`)
// }

// // Pour les attribute
// function isVforInProps(props){
//     if ('vFor' in props) {
//         const fragment = document.createDocumentFragment();
//         const { each , render} = props.vFor;

//         each.forEach((item) => {
//             const child = render(item)
//             if (child instanceof Node) {
//                 fragment.appendChild(child);
//             }
//         });
//         return fragment;
//     }
// }
// function addPropriete(element,props){
//     if ('vIf' in props && !props.vIf) return null;

//     for (const key in props) {
//         const value = props[key];
//         test.isTable(value).isObjet(value).isString(value).isFunction(value)

//         if(test._isString && (element.setAttribute(key,value), true)) continue;
//         if(test._isObjet && key === 'style' && (Object.assign(element.style , value), true)) continue;
//         if(test._isTable && key === 'class' && (element.setAttribute(key,value.join(' ')), true)) continue;
//         if(test._isFunction && key.startsWith('on') ) element.addEventListener(key.slice(2).toLowerCase(),value)
//         if(key === 'vShow') element.style.display = value ? '' : 'none';
//     }
// }

// function addContainer(element, content, _isString = false, _isNode = false) {
//     _isString ? element.appendChild(document.createTextNode(content)) : _isNode ? element.appendChild(content) : null;
// }
// function addContainer2(element,ctn){
//     test.isString(ctn).isNode(ctn).isTable(ctn);
//     test._isString ? addContainer(element,ctn,test._isString) : test._isNode ? addContainer(element,ctn,false,test._isNode) : null
//     if (test._isTable) {
//         ctn.forEach (el => {
//             test.isNode(el).isString(el)
//             addContainer(element,el,test._isString,test._isNode)
//         })
//     }
// }


// // ============= Mon createElement ======================
// export function createElement (tag,props = {},ctn=''){
//     // Validation des valeurs
//     controlleValue (tag,props,ctn);

//     // Gestion du vFor
//     const newContent = isVforInProps(props)
//     ctn = [newContent,ctn];

//     const element = document.createElement(tag)
//     addPropriete(element,props)
//     addContainer2(element,ctn);

//     //Méthodes pour chaînage
//     element.addElement = function (tag, props = {}, content = "") {
//         const newEl = createElement(tag, props, content);
//         this.appendChild(newEl);
//         return this;
//     };
//     element.addNode = function (node) {
//         this.appendChild(node);
//         return this;
//     };
//     return element;

// }




