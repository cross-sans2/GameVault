loading_screen = document.getElementById('loading-screen')
function goto(nodeId) {
    const nodes = document.getElementsByTagName('loc')
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].style.display = "none"; // Hide all nodes
    }
    const targetNode = document.getElementById(nodeId);
    if (targetNode) {
        targetNode.style.display = "block"; // Show the target node
        window["nodepos"] = nodeId
    } else {
        alert(`node "${nodeId}" not found, reseting to last known position`)
        goto(window["nodepos"])
    }
}

function password(code, act) {
    const enteredPassword = prompt("Enter password:", "");
    if (enteredPassword === code) {
        new Function(act)()
    } else {
        alert("Wrong password. Access denied.");
    }
}
function doact(act){
    new Function(act)
}


function link(node)
{
    node.innerHTML = node.innerHTML.replace(
        /\[\[(.*)\|(.*)\]\]/
        ,
        `<button onclick="goto('$2')">$1</button>`
    )
    node.innerHTML = node.innerHTML.replace(
        /\[\>(.*)\|(.*)\<\]/
        ,
        `<button onclick=doact('$2')>$1</button>`
    )
    node.innerHTML = node.innerHTML.replace(
        /\[\:(.*)\|(.*),(.*)\:\]/
        ,
        `<button onclick=password('$2','$3')>$1</button>`
    ).replaceAll("\n",'<br>')
}
locations = document.getElementsByTagName('loc')
function load(){
    for(l of locations){
        l.style.display = 'none'
        link(l)
    }
    goto("main")
    loading_screen.style.display = 'none'
}
load()
