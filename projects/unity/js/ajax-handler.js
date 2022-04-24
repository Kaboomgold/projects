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

export { AjaxHandler }