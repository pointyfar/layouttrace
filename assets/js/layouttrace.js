/** 
 * Converts list of nodes into a tree of nodes
 * 
 * @param {array} list - list of nodes in the form of 
 *              [ "baseof", "head.html", "/head.html", "foo", "/foo", "/baseof", "sib", "/sib" ]
 * 
 * @return {Object}
 * {
 *  tree: {},   // node
 *  r: [],      // remainder; should be [] at the end if single tree
 * }
 * 
 */
function treetrace(list) {
            
    if(list[0][0] == "/") {
        console.warn("Cannot begin with closing tag:", list[0])
    } else {
        let obj = { node: list[0], children: [] }
        
        // remainder of the list
        let r = list.slice(1); 

        while ((r.length > 0) && (r[0][0] != "/")) {
            let res = treetrace(r);
            obj.children.push(res['tree']);
            r = res.r
        }
        
        if (r.length == 0) {
            console.warn("unexpected end of list", r);
        } else if ( (r[0]) != ("/"+obj['node']) ) {
            console.warn("missing closing tag:", r[0]);
        } else {
            r = r.slice(1);
        }

        return {tree: obj, r: r}
    }
    

}

/**
 * Makes sure the nodes have one root node <tree>
 * 
 * @param {Array} list 
 * @returns {Array} The input list wrapped in <tree> </tree>
 */
function treewrap(list) {
    list.unshift("tree")
    list.push("/tree")
    return list
}

/**
 * 
 * @param {Array} list - list of nodes in the form of 
 *              [ "baseof", "head.html", "/head.html", "foo", "/foo", "/baseof", "sib", "/sib" ]
 * @returns root node
 */
function layouttrace(list){
    let result = (treetrace(treewrap(list)))['tree'];
    return result
}