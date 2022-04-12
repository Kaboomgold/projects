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

let colorized_scripts = [];

AjaxHandler.Ajax_JSON_Request(`${ajax_loc}get-script-files.php`, json_scripts => {
    const scripts = JSON.parse(json_scripts);

    scripts.forEach(script => {
        AjaxHandler.Ajax_JSON_Request(`${ajax_loc}get-colorized-script-html.php`, colorized_script => {
            colorized_scripts.push(colorized_script);
        }, { script_name: script });
    });
});