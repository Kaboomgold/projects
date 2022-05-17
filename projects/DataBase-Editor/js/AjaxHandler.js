export default class AjaxHandler {
    static makeRequest(file, key, data, onLoad = null, reloadPageOnDone = false) {
        const xhttp = new XMLHttpRequest();
        let newData = '';

        if (Array.isArray(data)) {
            newData = JSON.stringify(data);
        } else {
            newData = data;
        }

        if (onLoad != null) {
            xhttp.onload = () => {
                onLoad(xhttp);
            }
        }

        xhttp.open("POST", `${file}`);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`${key}=${newData}`);
    }

    static LoadJSON(fileLoc, isDone) {
        const xhttp = new XMLHttpRequest();

        xhttp.open('GET', fileLoc);
        xhttp.onload = () => {
            isDone(JSON.parse(xhttp.responseText));
        };
        xhttp.send(null);
    }
}