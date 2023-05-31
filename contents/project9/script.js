window['inv'] = []
loading_screen = document.getElementById('loading-screen')
function goto(nodeId) {
    const nodes = document.getElementsByTagName('loc')
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].style.display = "none"; // Hide all nodes
    }
    const targetNode = document.getElementById(nodeId);
    if (targetNode) {
        targetNode.style.display = "block"; // Show the target node
        prev = window['nodepos']
        window["nodepos"] = nodeId
    } else {
        alert(`node "${nodeId}" not found, reseting to last known position`)
        goto(window["nodepos"])
    }
}
function give(item)
{
    inv.push(item)
}


function password(text) {
    var texts = text.split(',')[0]
    var textf = text.split(',')[1]
    var code = text.split(',')[2]
    var act = text.split(',')[3]
    const enteredPassword = prompt(texts, "");
    if (enteredPassword === code) {
        new Function(act)()
    } else {
        alert(textf);
    }
}
function doact(act){
    new Function(act)
}


function link(node)
{
    node.innerHTML = node.innerHTML.replaceAll(
        /\[\[(.*)\|(.*)\]\]/g
        ,
        `<button onclick="goto('$2')">$1</button>`
    ).replaceAll(
        /\[&gt;(.*)\|(.*)&lt;\]/g
        ,
        `<button onclick="doact($2)">$1</button>`
    ).replaceAll(
        /\[\:(.*?)\|(.*?)\:\]/g
        ,
        `<button onclick="password(\`$2\`)">$1</button>`
    ).replaceAll("\n",'<br>')
    console.log(node.innerHTML)
}
ui = document.getElementById('ui')
ui.innerHTML = ui.innerHTML.replace(
    /\[\[(.*)\|(.*)\]\]/
    ,
    `<button onclick="goto('$2')">$1</button>`
).replace(
    /\[&gt;(.*)\|(.*)&lt;\]/
    ,
    `<button onclick="doact($2)">$1</button>`
).replace(
    /\[\:(.*?)\|(.*?)\:\]/
    ,
    `<button onclick="password(\`$2\`)">$1</button>`
).replaceAll("\n", '<br>')
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
