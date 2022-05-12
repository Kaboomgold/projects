export default function Utils() {

    this.createElm = (obj) => {
        let element;

        if (obj != null) {
            if (obj.name != null)
                element = document.createElement(obj.name);
            else
                element = document.createElement("div");

            if (obj.id != null) {
                if (obj.id[0] == "#")
                    element.id = obj.id.replace("#", "");
                else
                    element.id = obj.id;
            }

            if (obj.class != null) {
                if (obj.class[0] == ".")
                    element.className = obj.class.replace(".", "");
                else
                    element.className = obj.class;
            }

            if (obj.text != null) element.append(document.createTextNode(obj.text));
            if (obj.spellcheck != null) element.spellcheck = obj.spellcheck;
            if (obj.selected != null) element.selected = obj.selected;
            if (obj.isdroppable != null) element.setAttribute("isdroppable", obj.isdroppable);
            if (obj.type != null) element.type = obj.type;
            if (obj.value != null) element.value = obj.value;
            if (obj.placeholder != null) element.placeholder = obj.placeholder;
        }
        else {
            element = document.createElement("div");
        }

        return element;
    }

    this.OpenCloseToggle = (element) => {
        let state = element.className;

        if (state == "closed")
            element.className = "open";
        else
            element.className = "closed";
    }

    this.toggleDisplay = (element) => {
        (element.style.display == "block") ?
            element.style.display = "none" : element.style.display = "block";
    }

    this.getIndexOfProp = (obj, prop) => {
        let i = 0;
        for (const property in obj) {
            if (property == prop) {
                return i;
                break;
            }
            i++;
        }
    }

    this.CTJV = (stylingProperty) => {
        let newString = stylingProperty.split("-");
        let anotherString = newString[0];

        for (var i = 0; i < newString.length; i++) {
            if (i == 0) continue;
            anotherString += newString[i][0].toUpperCase() + newString[i].slice(1);
        }

        return anotherString;
    }

    this.bodyScanner = (exceptionArray) => {
        const elementScanner = document.createElement('div');
        const bodyChildren = Array.from(document.body.children);

        let body = "";
        let skip = false;

        for (let i = 0; i < bodyChildren.length; i++) {
            skip = false;

            for (let x = 0; x < exceptionArray.length; x++) {
                if (bodyChildren[i] == exceptionArray[x])
                    skip = true;
            }

            if (skip) continue;
            document.body.append(elementScanner);
            elementScanner.append(bodyChildren[i]);
            body += elementScanner.innerHTML;
            document.body.append(bodyChildren[i]);
            elementScanner.remove();
        }

        return body;
    }

    this.removeBodyElements = (exceptionArray) => {

        const bodyChildren = Array.from(document.body.children);
        let skip = false;

        for (let i = 0; i < bodyChildren.length; i++) {
            skip = false;

            for (let x = 0; x < exceptionArray.length; x++) {
                if (bodyChildren[i] == exceptionArray[x])
                    skip = true;
            }

            if (skip) continue;
            bodyChildren[i].remove();
        }
    }

    this.createIframe = (bodyHTML, scale = 0.05) => {
        const iframeWrapper = document.createElement('div');
        const iframe = document.createElement('iframe');

        const page = `
            <html>
                <head>
                    <title>Simpel Page</title>
                </head>
                <body>
                    ${bodyHTML}
                </body>
            </html>
            `;

        iframe.setAttribute('src', `data:text/html,${page.replace(/\n/g, "")}`);

        iframe.style.cssText = `
            position: absolute;
            width: 1920px;
            height: 900px;
            border: 1px solid black;
            transform: scale(${scale}, ${scale});
            transform-origin: top left;
        `;
        iframeWrapper.append(iframe);

        iframeWrapper.style.cssText = `
            width: ${(1920 * scale)}px;
            height: ${(900 * scale)}px;
            position: relative;
            margin: 3px;
        `;

        iframeWrapper.setAttribute('class', 'iframe-wrapper');

        return iframeWrapper;
    }

    this.localStorageSize = () => {
        const byteCount = (string) => (encodeURI(string).split(/%..|./).length - 1);

        const LSK = localStorage;
        let byteSize = 0;
        if (LSK != null) {
            const keys = Object.keys(localStorage);

            keys.forEach(key => {
                byteSize += byteCount(key);
                byteSize += byteCount(localStorage[key]);
            });

            return byteSize;
        }

    };

}