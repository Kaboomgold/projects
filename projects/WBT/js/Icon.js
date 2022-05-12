
/**
 * Icons created with pure html and css.*/
export const Icon = function () {

    this.create = {
        bin_icon: (settings) => {
            settings = checkAvailibleProps(settings);
            return new binIcon(settings);
        },
        cogwheel_icon: (settings) => {
            settings = checkAvailibleProps(settings);
            return new cogWheelIcon(settings);
        },
        save_icon: (settings) => {
            settings = checkAvailibleProps(settings);
            return new saveIcon(settings);
        },
        save_load_icon: (settings) => {
            settings = checkAvailibleProps(settings);
            return new saveLoadIcon(settings);
        }
    }

    let styles = [];

    function checkAvailibleProps(settings) {
        let newSettings = {};
        if (settings != null) {
            newSettings.width = (settings.width != null) ? settings.width : 17;
            newSettings.height = (settings.height != null) ? settings.height : 17;
            newSettings.position = (settings.position != null) ? settings.position : "none";
            newSettings.left = (settings.left != null) ? settings.left : 0;
            newSettings.top = (settings.top != null) ? settings.top : 0;
            newSettings.type = (settings.type != null) ? settings.type : "";
            newSettings.color1 = (settings.color1 != null) ? settings.color1 : "black";
            newSettings.color2 = (settings.color2 != null) ? settings.color2 : "lightgray";
            newSettings.hoverColor = (settings.hoverColor != null) ? settings.hoverColor : "white";
        }
        else {
            newSettings.width = 17;
            newSettings.height = 17;
            newSettings.position = "none";
            newSettings.left = 0;
            newSettings.top = 0;
            newSettings.type = "";
            newSettings.color1 = "black";
            newSettings.color2 = "lightgray";
            newSettings.hoverColor = "white";
        }

        return newSettings;
    }

    function createElm(obj) {
        let element;

        if (obj != null) {

            element = (obj.name != null) ? document.createElement(obj.name) : document.createElement("div");

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

            if (obj.type != null)
                element.type = obj.type;

            if (obj.text != null)
                element.append(document.createTextNode(obj.text));

            if (obj.spellcheck != null)
                element.spellcheck = obj.spellcheck;

            if (obj.selected != null)
                element.selected = obj.selected;

            if (obj.isdroppable != null) {
                element.setAttribute("isdroppable", obj.isdroppable);
            }
        }
        else {
            element = document.createElement("div");
        }

        return element;
    }

    function createIconStyling(style) {

        if (styles.includes(style)) return;

        styles.push(style);

        let styleTag = document.querySelector("style");

        if (styleTag != null) {
            styleTag.textContent += style;
        }
        else if (styleTag == null) {
            const stylingTags = createElm({ name: "style" });
            stylingTags.textContent += style;

            document.head.append(stylingTags);
        }
    }

    function binIcon(settings) {

        const classes = {
            bin_icon_class: "WBT-bin-icon",
            bin_icon_lid_class: "WBT-bin-icon-lid",
            bin_icon_base_class: "WBT-bin-icon-base",
            bin_icon_grating_left_class: "WBT-bin-icon-grating-left",
            bin_icon_grating_middle_class: "WBT-bin-icon-grating-middle",
            bin_icon_grating_right_class: "WBT-bin-icon-grating-right",
            bin_icon_sub_class: "WBT-bin-sub-icon",
            bin_icon_grate_class: "WBT-bin-icon-grate"
        }

        const binElm = createElm({ class: classes.bin_icon_class });
        const binElmLid = createElm({ class: classes.bin_icon_lid_class + " " + classes.bin_icon_sub_class });
        const binElmBase = createElm({ class: classes.bin_icon_base_class + " " + classes.bin_icon_sub_class });
        const binElmGrateL = createElm({ class: classes.bin_icon_grating_left_class + " " + classes.bin_icon_grate_class });
        const binElmGrateM = createElm({ class: classes.bin_icon_grating_middle_class + " " + classes.bin_icon_grate_class });
        const binElmGrateR = createElm({ class: classes.bin_icon_grating_right_class + " " + classes.bin_icon_grate_class });

        binElm.append(binElmLid, binElmBase);
        binElmBase.append(binElmGrateL, binElmGrateM, binElmGrateR);

        binElm.style.cssText += `
            height: ${settings.width}px;
            width: ${settings.height}px;
            position: ${settings.position};
            left: ${settings.left}px;
            top: ${settings.top}px
        `;

        binElmLid.style.cssText += `
            background-color: ${settings.color1};
        `;

        const style = `
            .${classes.bin_icon_class}:hover {
                cursor: pointer;
            }

            .${classes.bin_icon_class}:hover .${classes.bin_icon_grate_class} {
                background-color: white;
            }

            .${classes.bin_icon_class}:hover .${classes.bin_icon_lid_class} {
                transform: rotate(10deg) translate(0px, -1px);
            }

            .${classes.bin_icon_class}:active .${classes.bin_icon_lid_class} {
                transform: rotate(-10deg) translate(0px, -1px);
            }

            .${classes.bin_icon_lid_class} {
                height: 10%;
                width: 100%;
                background-color: ${settings.color1};
                clip-path: polygon(85% 100%, 15% 100%, 13% 0%, 87% 0%);
            }

            .${classes.bin_icon_base_class} {
                height: 80%;
                width: 100%;
                background-color: ${settings.color1};
                clip-path: polygon(83% 5%, 76% 95%, 74.5% 98.5%, 71% 100%, 29% 100%, 25.5% 98%,24% 94%, 17% 5%);
                position: relative;
            }

            .${classes.bin_icon_grate_class} {
                margin: 0px;
                width: 10%;
                height: 70%;
                top: 20%;
                background-color: lightgray;
                position: absolute;
                clip-path: polygon(50% 0%, 74% 1.5%, 100% 5%, 100% 95%, 76% 98.5%, 50% 100%, 24% 98.5%,0% 95%, 0% 5%, 24% 1.5%);
            }

            .${classes.bin_icon_grating_middle_class} {
                left: 45.5%;
            }

            .${classes.bin_icon_grating_left_class} {
                left: 29.5%;
                transform: rotate(-5deg);
            }

            .${classes.bin_icon_grating_right_class} {
                left: 61.5%;
                transform: rotate(5deg);
            }
            `;

        createIconStyling(style);

        return binElm;
    }

    function cogWheelIcon(settings) {

        const classes = {
            cogwheel_icon_class: "WBT-cogwheel-icon",
            cogwheel_center_icon_class: "WBT-cogwheel-center-icon"
        }

        const cogwheelElm = createElm({ class: classes.cogwheel_icon_class });
        const cogwheelCenter = createElm({ class: classes.cogwheel_center_icon_class });

        cogwheelElm.style.cssText = `
                width: ${settings.width}px;
                height: ${settings.height}px;
                position: ${settings.position};
                left: ${settings.left}px;
                top: ${settings.top}px;
                background-color: ${settings.color1};
        `;

        cogwheelCenter.style.cssText = `
            background-color: ${settings.color2};
        `;

        let style = `

            .${classes.cogwheel_icon_class} {
                clip-path: polygon(77% 88%, 88% 77%, 80% 69%, 84% 58%, 96% 58%, 96% 42%, 84% 42%, 79% 32%, 88% 23%, 77% 12%, 68% 21%, 58% 16%, 58% 4%, 42% 4%, 42% 16%, 32% 21%, 23% 12%, 12% 23%, 21% 32%, 16% 42%, 4% 43%, 4% 58%, 16% 58%, 21% 68%, 12% 77%, 23% 88%, 32% 80%, 42% 84%, 42% 96%, 58% 96%, 58% 84%, 69% 79%);
            }

            .${classes.cogwheel_icon_class}.opened {
                transform: rotate(-360deg);
                transition: transform 0.7s;
            }

            .${classes.cogwheel_icon_class}.closed {
                transform: rotate(0deg);
                transition: transform 0.7s;
            }

            .${classes.cogwheel_center_icon_class} {
                width: 100%;
                height: 100%;
                clip-path: polygon(59% 67%, 63% 64%, 66% 60%, 68% 55%, 69% 50%, 68% 45%, 66% 39%, 63% 36%, 59% 33%, 55% 31%, 49% 31%, 44% 32%, 39% 34%, 36% 37%, 33% 41%, 31% 46%, 31% 52%, 35% 62%, 38% 65%, 43% 68%, 48% 69%, 52% 69%, 56% 68%);
            }
            `;

        if (settings.type === "button") {
            style += `
                .${classes.cogwheel_icon_class}:hover {
                     cursor: pointer;   
                }
            `
        }

        createIconStyling(style);

        cogwheelElm.classList.add("closed");
        cogwheelElm.addEventListener("mousedown", () => {
            if (cogwheelElm.classList.contains("closed")) {
                cogwheelElm.classList.replace("closed", "opened");
            }
            else {
                cogwheelElm.classList.replace("opened", "closed");
            }
        });

        cogwheelElm.append(cogwheelCenter);

        return cogwheelElm;
    }

    function saveIcon(settings) {

        if (settings.position !== 'relative' || settings.position !== 'absolute') {
            settings.position = 'relative';
        }

        const classes = {
            save_icon_class: ".WBT-save-icon",
        }

        const saveIcon = createElm({ class: classes.save_icon_class });
        const div1 = createElm();
        const div2 = createElm();
        const div3 = createElm();

        saveIcon.style.cssText = `
            width: ${settings.width}px;
            height: ${settings.height}px;
            position: ${settings.position};
            left: ${settings.left};
            top: ${settings.top};
            background-color: ${settings.color1};
        `;

        let style = `
            /*save icon*/
            ${classes.save_icon_class} {
                clip-path: polygon(1% 13%, 2% 6.5%, 3.5% 3.5%, 6.5% 2% ,13% 1%, 
                70% 1%, 99% 22%, 
                99% 88%, 98% 93%, 96% 96%, 93% 98%, 86% 99%,
                17% 99%, 10% 98.5%, 5% 97%, 2% 93.5%, 1% 88%);
                transform: scale(1,1);
            }

            ${classes.save_icon_class} > div:first-child {
                background-color: white;
                height: 24%;
                width: 54%;
                border-radius: 5%;
                position: absolute;
                top: 5%;
                left: 13%;
            }

            ${classes.save_icon_class} > div:first-child > div {
                background-color: black;
                height: 70%;
                width: 15%;
                border-radius: 5%;
                position: absolute;
                top: 15%;
                left: 80%;
            }

            ${classes.save_icon_class} > div:last-child {
                background-color: white;
                height: 50%;
                width: 70%;
                border-radius: 5%;
                position: absolute;
                top: 45%;
                left: 15%;
            }
            
        `;

        if (settings.type == 'button') {

            style += `
                ${classes.save_icon_class}:hover {
                    cursor: pointer;
                    transform: scale(1.1, 1.1);
                }

                ${classes.save_icon_class}:active {
                    transform: scale(0.9, 0.9);
                }
            `;
        }
        
        createIconStyling(style);

        saveIcon.append(div1, div3);
        div1.append(div2);

        return saveIcon;
        
    }

    function saveLoadIcon(settings) {

        if (settings.position !== 'relative' || settings.position !== 'absolute') {
            settings.position = 'relative';
        }

        //classes
        const classes = {
            load_save_icon_class: '.WBT-load-save-icon',
            load_save_arrow: '.WBT-load-save-arrow'
        }

        //create elements 
        const div1 = createElm({ class: classes.load_save_icon_class });
        const div2 = createElm();
        const div3 = createElm();
        const div4 = createElm();
        const div5 = createElm({ class: classes.load_save_arrow });
        const div6 = createElm();

        //styling
        div1.style.cssText = `
            width: ${settings.width}px;
            height: ${settings.height}px;
            position: ${settings.position};
            left: ${settings.left}px;
            top: ${settings.top}px;
            background-color: ${settings.color1};
        `;

        let style = `
            ${classes.load_save_icon_class} {
                clip-path: polygon(1% 13%, 2% 6.5%, 3.5% 3.5%, 6.5% 2%,13% 1%, 70% 1%, 99% 22%, 99% 88%, 98% 93%,96% 96%, 93% 98%, 86% 99%, 17% 99%, 10% 98.5%, 5% 97%, 2% 93.5%, 1% 88%);
            }

            ${classes.load_save_icon_class} > div:first-child {
                background-color: white;
                height: 25%;
                width: 55%;
                border-radius: 5%;
                position: absolute;
                top: 5%;
                left: 13%;
            }

            ${classes.load_save_icon_class} > div:first-child > div {
                background-color: black;
                height: 70%;
                width: 15%;
                border-radius: 5%;
                position: absolute;
                top: 15%;
                left: 80%;
            }

            ${classes.load_save_icon_class} > div:nth-child(2) {
                position: absolute;
                left: 15%;
                top: 45%;
                width: 70%;
                height: 50%;
                background-color: white;
                border-radius: 5%;
            }

            ${classes.load_save_icon_class} ${classes.load_save_arrow} {
                position: absolute;
                clip-path: polygon(50% 99%, 1% 55%, 27% 55%, 27% 1%, 73% 1%, 73% 55%, 99% 55%);
                left: 20%;
                top: 35%;
                width: 60%;
                height: 60%;
                background-color: white;
            }

            ${classes.load_save_icon_class} ${classes.load_save_arrow} > div {
                position: absolute;
                clip-path: polygon(50% 99%, 1% 55%, 27% 55%, 27% 1%, 73% 1%, 73% 55%, 99% 55%);
                left: 10%;
                top: 8%;
                width: 80%;
                height: 88%;
                background-color: black;
            }
        `;

        if (settings.type == 'button') {

            style += `
                ${classes.load_save_icon_class}:hover {
                    cursor: pointer;
                    transform: scale(1.1, 1.1);
                }

                ${classes.load_save_icon_class}:active {
                    transform: scale(0.9, 0.9);
                }
            `;
        }

        createIconStyling(style);

        //heiarchy
        div1.append(div2, div4, div5);
        div2.append(div3);
        div5.append(div6);

        //retrun base element
        return div1;

    }
}
