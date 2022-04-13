class AjaxHandler {

    static Ajax_JSON_Request($fileLoc, $callback = null, $data = null,  $method = 'POST') {
        const xhttp = new XMLHttpRequest();

        xhttp.onload = () => {
            if($callback != null) {
                $callback(xhttp.responseText);
            }
        }

        xhttp.open($method, $fileLoc);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send(`ajax_data=${JSON.stringify($data)}`);
    }

}

const ajax_loc = './php/ajax/';
const scriptsList = document.querySelector('.script-list');

generateScripts();

function generateScripts() {
    const listItems = [...scriptsList.children];

    listItems.forEach(listItem => {
        listItem.addEventListener('click', e => {
            getColorizedScript(listItem.textContent, colorized_script => {
                addColorizedScript(colorized_script);
            });

            toggleItemInItems(listItems, listItem);
        });
    });
}

function toggleItemInItems(items, item, className = 'active') {
    items.forEach(item => {
        item.classList.remove('active');
    })

    item.classList.add('active');
}

function getColorizedScript(script_name, callback) {
    AjaxHandler.Ajax_JSON_Request(`${ajax_loc}get-colorized-script-html.php`, colorized_script => {
        callback(colorized_script);
    }, { script_name: script_name });
}

function addColorizedScript(colorized_script) {
    document.querySelector('.scripts .script').innerHTML = colorized_script;
}