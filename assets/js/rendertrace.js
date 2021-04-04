/**
 * 
 * @param {Object} tree - Takes a tree from the result of layouttrace
 * @param {string} elid - The wrapper (div) element id
 */
function rendertrace(tree, elid) {
    let el = document.getElementById(elid);
    
    let ul = makeul(tree, (elid + "_ul"), 0)
    el.appendChild(ul)

}

/**
 * Creates an unordered list item element
 * @param {Object} t - A node from layouttrace
 * @returns a ul element
 */
function makeul(t){
    let ul = document.createElement('ul');

    if ((t['children']) && (t['children'].length > 0)) {
        for( let i in t['children']) {
            let li = makeli(t['children'][i]);
            ul.appendChild(li)
        }
    }
    return ul;
}

/**
 * Creates a list item element
 * 
 * @param {Object} c A node from layouttrace
 * @returns a li element
 */
function makeli(c){
    let li = document.createElement('li');
        li.textContent = c['node'];
        
        if(c['children'] && (c['children'].length > 0)) {
            let ul = makeul(c)
            li.appendChild(ul)
        }

    return li
}