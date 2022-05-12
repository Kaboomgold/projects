import Utils from './WBT-Utils.js';

window.onload = function () {

    (async () => {
        try {
            let module = await import('./Icon.js');
            const icon = new module.Icon();

            console.log('Icon object is imported.');
            WBTmenu(icon);
        } catch (e) {
            console.log(e);
            WBTmenu(null);
        }
    })()

    function WBTmenu(icon) {

        const utils = new Utils();

        const langLists = {
            lang: {
                nederlands: "nederlands",
                english: "english",
            },
            load: {
                nederlands: () => {
                    const e = menuElements;
                    e.languageBoxLabel.textContent = "Taal";
                    e.option_prepareren.textContent = "wis de pagina";
                    e.option_download.textContent = "downloaden";
                    e.option_opslaan.textContent = "opslaan";
                    e.option_settings.textContent = "instellingen";
                    e.optionsMenuHeader.textContent = "Opties";
                    e.descriptionHeader.textContent = "beschrijving";
                    e.menuColorSettingsHeader.textContent = "Menu kluer";
                    e.labelBackgroundColor.textContent = "Achtergrond kleur";
                    e.labelHandleColor.textContent = "Handvat kleur";
                    e.download_description.textContent = "Welken files wilt u downloaden?";
                    if (e.saveBtn.tagName == 'BUTTON') e.saveBtn.textContent = "opslaan";
                    if (e.deleteSaveBtn.tagName == 'BUTTON') e.deleteSaveBtn.textContent = "verwijder";
                    if (e.loadSaveBtn.tagName == 'BUTTON') e.loadSaveBtn.textContent = "laden";
                },
                english: () => {
                    const e = menuElements;
                    e.languageBoxLabel.textContent = "Language";
                    e.option_prepareren.textContent = "clear the page";
                    e.option_download.textContent = "download";
                    e.option_opslaan.textContent = "save";
                    e.option_settings.textContent = "settings";
                    e.optionsMenuHeader.textContent = "Options";
                    e.descriptionHeader.textContent = "description";
                    e.menuColorSettingsHeader.textContent = "Menu color";
                    e.labelBackgroundColor.textContent = "Background color";
                    e.labelHandleColor.textContent = "Handle color";
                    e.download_description.textContent = "Which files do you want to download?";
                    if (e.saveBtn.tagName.toLowerCase() == 'button') e.saveBtn.textContent = "save";
                    if (e.deleteSaveBtn.tagName == 'BUTTON') e.deleteSaveBtn.textContent = "delete";
                    if (e.loadSaveBtn.tagName == 'BUTTON') e.loadSaveBtn.textContent = "load";
                }
            }
        };

        const cssProp = {
            align_content: "align-content",
            align_items: "align-items",
            align_self: "align-self",
            animation: "animation",
            animation_delay: "animation-delay",
            animation_direction: "animation-direction",
            animation_duration: "animation-duration",
            animation_fill_mode: "animation-fill-mode",
            animation_iteration_count: "animation-iteration-count",
            animation_name: "animation-name",
            animation_play_state: "animation-play-state",
            animation_timing_function: "animation-timing-function",
            backface_visibility: "backface-visibility",
            background: "background",
            background_attachment: "background-attachment",
            background_clip: "background-clip",
            background_color: "background-color",
            background_image: "background-image",
            background_origin: "background-origin",
            background_position: "background-position",
            background_repeat: "background-repeat",
            background_size: "background-size",
            border: "border",
            border_bottom: "border-bottom",
            border_left: "border-left",
            border_top: "border-top",
            border_right: "border-right",
            box_shadow: "box-shadow",
            color: "color",
            height: "height",
            width: "width",
            margin: "margin",
            margin_top: "margin-top",
            margin_left: "margin-left",
            margin_right: "margin-right",
            margin_bottom: "margin-bottom",
            padding: "padding",
            padding_left: "padding-left",
            padding_top: "padding-top",
            padding_right: "padding-right",
            padding_bottom: "padding-bottom",
            text_align: "text-align",
            font_family: "font-family",
            transition: "transition",
            transition_timing_function: "transition-timing-function",
            transition_property: "transition-property",
            transition_duration: "transition-duration",
            transition_delay: "transition-delay",
            z_index: "z-index",
            word_wrap: "word-wrap",
            word_spacing: "word-spacing",
            word_break: "word-break",
            width: "width",
            white_space: "white-space",
            visibility: "visibility",
            vertical_align: "vertical-align",
            list_style_type: "list-style-type",
            position: "position",
            display: "display",
            flex_direction: "flex-direction"
        }

        const inputType = {
            checkbox: "checkbox",
            number: "number",
            color: "color",
            search: "search",
            select: "select",
            button: "button",
            date: "date",
            datetime_local: "datetime-local",
            email: "email",
            file: "file",
            hidden: "hidden",
            image: "image",
            month: "month",
            password: "password",
            radio: "radio",
            range: "range",
            reset: "reset",
            search: "search",
            submit: "submit",
            tel: "tel",
            text: "text",
            time: "time",
            url: "url",
            week: "week"
        }

        const id = {
            menu_id: "#WBT-menu",
            menuHandle_id: "#WBT-top-handle",
            optionsButton_id: "#WBT-options-button",
            optionsMenu_id: '#WBT-options-menu',
            optionsWrapper_id: "#WBT-options-menu-wrapper",
            optionsHeader_id: "#WBT-options-menu-header",
            elementsDisplay_id: "#WBT-elements-display",
            descriptionBox_id: "#WBT-description-box",
            descriptionHeader_id: "#WBT-description-header",
            stylingDisplay_id: "#WBT-styling-display",
            layer_id: "#WBT-layer",
            stylingHandle_id: "#WBT-styling-handle",
            stylingHeader_id: "#WBT-styling-header",
            menuWrapper_id: "#WBT-menu-wrapper",
            stylingWrapper_id: "#WBT-styling-wrapper",
            elementStyling_id: "#WBT-element-styling",
            settingsOptionLang_id: "#WBT-settings-option-lang",
            settingsOptionColor_id: "#WBT-settings-option-color",
            downloadOptions_id: "#WBT-option-download-options",
            infoBar_id: "#WBT-info-bar",
            deleteStylingElementBtn_id: "#WBT-delete-styling-element-btn",
            titleWrapper_id: "#WBT-settings-option-title"
        }

        const classes = {
            menuElement_class: ".WBT-menu-element",
            menuElementClone_class: ".WBT-menu-element-clone",
            menuElementHeader_class: ".WBT-menu-element-header",
            optionsMenuOption_class: ".WBT-options-menu-option",
            option_settings_subMenu_class: ".WBT-option_settings_subMenu_class",
            elementStylingElm_class: ".WBT-element-styling-elm",
            styleMenu_class: ".WBT-style-menu",
            styleMenuButton_class: ".WBT-style-menu-button",
            styleMenuStylingPanel_class: ".WBT-style-menu-styling-panel",
            styleMenuSettings_class: ".WBT-style-menu-settings",
            option_save_saveSlot_class: ".WBT-save-save-slot",
            options_save_selected_class: ".WBT-save-selected",
            options_save_buttonWrapper_class: ".WBT-save-buttonWrapper",
            options_save_selection_class: ".WBT-save-selection",
            super_wrapper_class: ".WBT-super-wrapper",
            style_menu_search_class: ".WBT-style-menu-search"
        }

        const iconCompHandler = {
            optionsButton: (icon != null) ? icon.create.cogwheel_icon({
                color2: "gray",
                height: 20,
                width: 20,
                position: "absolute",
                left: 10,
                top: 12,
                type: "button"
            }) : utils.createElm({ id: id.optionsButton_id, type: "button", class: "closed" }),
            binButton: (() => {
                const newIcon = (icon != null) ? icon.create.bin_icon({
                    height: 18,
                    width: 18,
                    top: 2,
                    left: 165,
                    position: "absolute"
                }) : utils.createElm({ id: id.deleteStylingElementBtn_id, type: 'button' });
                return newIcon;
            }),
            saveBtn: (icon != null) ? icon.create.save_icon({ type: 'button' }) : utils.createElm({ name: 'button', text: 'opslaan', type: 'button' }),
            deleteSaveBtn: (icon != null) ? icon.create.bin_icon() : utils.createElm({ name: 'button', text: 'verwijder', type: 'button' }),
            loadSaveBtn: (icon != null) ? icon.create.save_load_icon({ type: 'button' }) : utils.createElm({ name: 'button', text: 'laad', type: 'button' }),
        }

        let stylingMenus = [];
        let menuElements = {};
        let hoveredSubElement;

        createMenuElements();
        createMenuHierarchy();
        createMenuStyling();
        dragMenu();
        addListeners();
        createElements();
        grabElement();
        options();
        setDefault();

        function createMenuElements() {
            menuElements = {
                menu: utils.createElm({ id: id.menu_id }),
                menuHandle: utils.createElm({ id: id.menuHandle_id }),
                infoBar: utils.createElm({ name: 'p', id: id.infoBar_id, class: "closed" }),

                optionsButton: iconCompHandler.optionsButton,
                optionsWrapper: utils.createElm({ id: id.optionsWrapper_id, class: "closed" }),
                optionsMenu: utils.createElm({ id: id.optionsMenu_id }),
                optionsMenuHeader: utils.createElm({ name: "h1", text: "Opties", id: id.optionsHeader_id }),
                option_prepareren: utils.createElm({ class: classes.optionsMenuOption_class, text: "wis de pagina" }),

                option_download: utils.createElm({ class: classes.optionsMenuOption_class, text: "downloaden" }),
                option_download_subMenu: utils.createElm({ class: classes.option_settings_subMenu_class }),

                option_opslaan: utils.createElm({ class: classes.optionsMenuOption_class, text: "opslaan" }),
                option_opslaan_subMenu: utils.createElm({ class: classes.option_settings_subMenu_class }),

                option_settings: utils.createElm({ class: classes.optionsMenuOption_class, text: "instellingen" }),
                option_settings_subMenu: utils.createElm({ class: classes.option_settings_subMenu_class }),

                elementsDisplay: utils.createElm({ id: id.elementsDisplay_id }),
                descriptionHeader: utils.createElm({ name: "h1", text: "beschrijving", id: id.descriptionHeader_id }),
                descriptionBoxText: utils.createElm({ name: "p" }),
                descriptionBoxHeader: utils.createElm({ name: "h2" }),
                descriptionBox: utils.createElm({ id: id.descriptionBox_id }),
                stylingHeader: utils.createElm({ name: "h1", text: "STYLING", id: id.stylingHeader_id }),
                menuWrapper: utils.createElm({ id: id.menuWrapper_id }),

                stylingWrapper: utils.createElm({ id: id.stylingWrapper_id, class: "closed" }),
                stylingDisplay: utils.createElm({ id: id.stylingDisplay_id }),
                stylingHandle: utils.createElm({ id: id.stylingHandle_id }),

                elementStyling: utils.createElm({ id: id.elementStyling_id, class: "closed" })
            }
        }

        function createMenuHierarchy() {
            const e = menuElements;

            document.body.append(e.menu, e.infoBar);
            e.menu.append(e.menuWrapper, e.stylingWrapper, e.optionsWrapper);

            e.menuWrapper.append(e.menuHandle);
            e.menuHandle.append(e.optionsButton);
            e.optionsWrapper.append(e.optionsMenu);

            e.optionsMenu.append(e.optionsMenuHeader);
            e.optionsMenu.append(e.option_prepareren);

            e.optionsMenu.append(e.option_download);
            e.optionsMenu.append(e.option_download_subMenu);

            e.optionsMenu.append(e.option_opslaan);
            e.optionsMenu.append(e.option_opslaan_subMenu);
            e.optionsMenu.append(e.option_settings);
            e.optionsMenu.append(e.option_settings_subMenu);

            e.menuWrapper.append(e.elementsDisplay, e.descriptionHeader, e.descriptionBox);

            e.descriptionBox.append(e.descriptionBoxHeader);
            e.descriptionBox.append(e.descriptionBoxText);

            e.stylingWrapper.append(e.stylingDisplay);
            e.stylingDisplay.append(e.stylingHandle, e.elementStyling);
            e.stylingHandle.append(e.stylingHeader);

        }

        function createMenuStyling() {
            let stylingTags = (document.querySelector("style")) ?
                document.querySelector("style") : utils.createElm({ name: "style" });

            document.head.append(stylingTags);

            const optionsOpenCloseSpeed = 0.5;

            const menuStyling = `
                body, html { height: 100%; width: 100%; margin: 0px; padding: 0px; }

                ${id.infoBar_id} {
                    font-family: Arial;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    margin: 0px;
                    font-size: 20px;
                    background-color: rgba(180, 180, 180, 0.7);
                    width: 150px;
                    min-height: 10px;
                    text-align: center;
                    user-select: none;
                }

                ${id.infoBar_id}.closed {
                    opacity: 0;
                    transition: opacity 0.5s;
                }

                ${id.infoBar_id}.open {
                    opacity: 0.7;
                    transition: opacity 0.5s;
                }

                /*//MAIN MENU//*/
                ${id.menu_id} {
                    position: fixed;
                    left: 42%;
                    top: 20%;
                    font-family: arial;
                    z-index: 10000;
                }

                ${id.menu_id} > * {
                    user-select: none;
                }
                    
                ${id.menuWrapper_id} > h1 {
                    text-align: center;
                    margin: 5px 0px;
                    font-size: 130%;
                }
                    
                ${id.menuWrapper_id} {
                    width: 275px;
                    height: 300px;
                    border-radius: 25px;
                    background-color: lightgray;
                    border-bottom: 1px solid gray;
                    position: relative;
                    z-index: 2;
                }

                ${id.menuHandle_id} {
                    width: 100%;
                    height: 40px;
                    background-color: gray;
                    border-radius: 25px 25px 0px 0px;
                    text-align: center;
                    padding-top: 5px;
                    margin-bottom: 10px;
                }

                ${id.menuHandle_id}::after {
                    content: "MENU";
                    margin-top: 20px;
                    color: black;
                    font-weight: bold;
                    font-size: 160%;
                }

                ${id.elementsDisplay_id} {
                    margin-top: 10px;
                    height: 30%;
                    width: 90%;
                    background-color: white;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-evenly;
                    overflow: auto;
                    border: 1px solid gray;
                }

                ${classes.menuElement_class} {
                    width: 45%;
                    background-color: white;
                    border-radius: 5px;
                    margin-top: 5px;
                    box-shadow: 0px 0px 5px gray;
                    font-weight: bold;
                    text-align: center;
                    padding-top: 5.4px;
                    padding-bottom: 5.4px;
                }

                ${classes.menuElementHeader_class} {
                    width: 100%;
                    background-color: lightgray;
                    margin: 5px 0px 5px 0px;
                    font-weight: bold;
                    text-align: center;
                    font-size: 22px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    color: white;
                }

                ${classes.menuElementClone_class} {
                    position: absolute;
                    width: 75px;
                    padding: 25px 0px;
                    font-weight: bold;
                    box-shadow: 0px 0px 5px gray;
                    text-align: center;
                    border-radius: 100%;
                    z-index: 100;
                    background-color: white;
                }

                ${id.descriptionBox_id} {
                    height: 30%;
                    width: 90%;
                    background-color: white;
                    margin: 0 auto;
                    overflow: auto;
                }

                ${id.descriptionBox_id} > h2 {
                    margin: 0px;
                    text-align: center;
                }

                ${id.descriptionBox_id} > p {
                    margin: 0px;
                    padding: 5px;
                }
            `;
            const stylingMenuStyling = `
                /*//STYLING//*/
                ${id.stylingWrapper_id}{
                    height: 300px;
                    position: relative;
                    background-color: lightgray;
                    border-radius: 0px 0px 25px 25px;
                }                

                ${id.stylingWrapper_id}.closed {
                    transform: translate(0,-270px);
                    transition: transform 1s;
                }

                ${id.stylingWrapper_id}.open {
                    transform: translate(0, -20px);
                    transition: transform 1s;
                }
                    
                ${id.stylingDisplay_id} {
                    height: 100%;
                    width: 100%;
                    border-radius: 0px 0px 25px 25px;
                }
                    
                ${id.elementStyling_id}::-webkit-scrollbar {
                    width: 10px;
                    background-color: lightgray;
                }

                ${id.elementStyling_id}::-webkit-scrollbar-thumb {
                    background-color: gray;
                    margin: 2px;
                }

                ${id.elementStyling_id} {
                    height: 70%;
                    background-color: rgb(225, 225, 225);
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    overflow-y: scroll;
                    overflow-x: hidden;
                    position: absolute;
                    left: 7%;
                    top: 9.5%;
                    border-radius: 10px;
                }

                ${id.elementStyling_id}.open {
                    width: 160%;
                    transition: width 0.5s;
                }

                ${id.elementStyling_id}.closed {
                    width: 90%;
                    transition: width 0.5s;
                }

                ${classes.style_menu_search_class} {
                    display: flex;
                    justify-content: space-around;
                    margin: 10px 0px;
                }

                ${classes.style_menu_search_class} label {
                    padding-top: 2px;
                }

                ${classes.style_menu_search_class} input {
                    width: 100px;
                    height: 20px;
                }

                ${classes.elementStylingElm_class} {
                    height: 20px;
                    width: 200px;
                    margin-left: 10px;
                    border-bottom: 1px solid black;
                    padding-left: 10px;
                    position: relative;
                    font-weight: bold;
                }

                ${classes.elementStylingElm_class}:last-child {
                    border-bottom: none;
                }
                
                ${classes.elementStylingElm_class}:hover {
                    background-color: gray;
                    cursor: pointer;
                }

                ${id.stylingHandle_id} {
                    width: 100%;
                    height: 50px;
                    border-radius: 0px 0px 25px 25px;
                    background-color: gray;
                    position: absolute;
                    top: 84%;
                }

                ${id.stylingHandle_id} > h1 {
                    text-align: center;
                    margin: 0px;
                    margin-top: 20px;
                    font-size: 150%;
                }

                /*//STYLE MENU//*/
                ${classes.styleMenu_class} {
                    position: absolute;
                    left: 110%;
                    top: 5px;
                    height: 200px;
                    width: 190px;
                    background-color: white;
                    border: 1px solid gray;
                    overflow-y: scroll;
                    cursor: default;
                    text-align: center;
                }
                
                ${classes.styleMenu_class} > select {
                    outline: none;
                }

                ${classes.styleMenu_class} > select > option:hover {
                    background-color: lightgray;
                    cursor: pointer;
                }
                
                ${classes.styleMenu_class} > select > option:active {
                    background-color: gray;
                    cursor: pointer;
                }

                ${classes.styleMenu_class} > 
                ${classes.super_wrapper_class} {
                    display: flex;
                    flex-direction: column;
                }

                ${classes.styleMenu_class} > 
                ${classes.super_wrapper_class} > label {
                    text-align: center;
                    margin: 5px 0px;
                }
                    
                ${classes.styleMenu_class} > 
                ${classes.super_wrapper_class} > .wrapper {
                    margin: 0px 10px;
                    border-bottom: 1px solid black;
                    justify-content: space-around;
                }

                ${classes.styleMenu_class} > 
                ${classes.super_wrapper_class} > .wrapper > div {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                }

                ${classes.super_wrapper_class} input, 
                ${classes.super_wrapper_class} select {
                    width: 50%;
                    margin: 5px 0px;
                }                 

                ${classes.super_wrapper_class} input[type=number] {
                    width: 40px;
                    height: 16px;
                }
                    
                ${classes.super_wrapper_class} input[type=color] {
                    width: 30px;
                    height: 30px;
                }

                ${classes.super_wrapper_class} select {
                    width: 55px;
                    height: 20px;
                }
                    
                ${classes.styleMenuButton_class} {
                    height: 10px;
                    width: 10px;
                    background-color: black;
                    clip-path: polygon(0% 100%, 100% 50%, 0% 0%);
                    position: absolute;
                    right: 13px;
                    top: 5px;
                }

                ${classes.styleMenuButton_class}.open {
                    transform: rotate(90deg);
                    transition: transform 0.5s;
                }

                ${classes.styleMenuButton_class}.closed {
                    transition: transform 0.5s;
                }

                ${classes.styleMenuStylingPanel_class} {
                    height: 50px;
                    width: 100%;
                    border-bottom: 1px solid black;
                }

                ${classes.styleMenuSettings_class} {
                    text-align: center;
                }

                ${classes.styleMenuSettings_class} textarea {
                    height: 50px;
                }
        
                ${classes.styleMenuSettings_class} > h1, 
                ${classes.styleMenuSettings_class} > h3 {
                    margin: 0px;
                }

                ${id.deleteStylingElementBtn_id} {
                    position: absolute;
                    top: 0px;
                    left: 165px;
                    width: 17px;
                    height: 100%;
                    background-color: black;
                    clip-path: polygon(0% 35%, 100% 35%, 100% 65%, 0% 65%);
                }
                    
                .wrapper {
                    display: flex;
                    flex-direction: row;
                    cursor: default;
                }
            `;
            const optionsMenuStyling = `
                /*//OPTIONS//*/
                ${id.optionsWrapper_id}.closed {
                    margin-top: -600px;
                    margin-left: 20px;
                    transition: margin-left ${optionsOpenCloseSpeed}s;
                }
                    
                ${id.optionsWrapper_id}.open {
                    margin-top: -600px;
                    margin-left: -150px;
                    transition: margin-left ${optionsOpenCloseSpeed}s;
                }

                ${id.optionsMenu_id} {
                    width: 150px;
                    border: 1px solid black;
                    background-color: white;
                    border-radius: 5px;
                    position: relative;
                }

                ${id.optionsWrapper_id}.open > ${id.optionsMenu_id} {
                    padding-right: 100px;
                    transition: padding 1s;
                }
                    
                ${id.optionsWrapper_id}.closed > ${id.optionsMenu_id} {
                    padding-right: 0px;
                    transition: padding 1s;
                }

                ${id.optionsMenu_id} > h1 {
                    width: 100%;
                    text-align: center;
                    margin: 0px 0px;
                    font-size: 27px;
                    border-bottom: 4px solid gray;
                }

                ${id.optionsButton_id} {
                    height: 20px;
                    width: 15px;
                    background-color: black;
                    position: absolute;
                    left: 10px;
                    top: 12.5px;
                    border: none;
                    clip-path: polygon(90% 10%, 10% 50%, 90% 90%);
                }

                ${id.optionsButton_id}.closed {
                    transition: transform ${optionsOpenCloseSpeed}s;
                }

                ${id.optionsButton_id}.open {
                    transform: rotate(-90deg);
                    transition: transform ${optionsOpenCloseSpeed}s;
                }

                ${id.optionsButton_id}:hover {
                    cursor: pointer;
                }

                ${classes.optionsMenuOption_class} {
                    width: 100%;
                    background-color: white;
                    padding: 5.65% 0px;
                    font-weight: bold;
                    text-align: center;
                }

                ${classes.optionsMenuOption_class}:nth-last-child(2) {
                    border-radius: 0px 0px 0px 5px;
                }

                ${classes.optionsMenuOption_class}:hover {
                    background-color: rgb(224, 224, 224);
                    cursor: pointer;
                }
                    
                ${classes.optionsMenuOption_class}:active {
                    background-color: rgb(200, 200, 200);
                }

                /*//SETTINGS OPTION//*/
                ${classes.option_settings_subMenu_class} {
                    display: none;
                    min-height: 200px;
                    width: 200px;
                    border: 1px solid black;
                    position: absolute;
                    left: -200px;
                    top: 0px;
                    box-sizing: border-box;
                    background-color: white;
                }

                ${classes.option_settings_subMenu_class} > ${id.titleWrapper_id} {
                    width: 100%;
                    text-align: center;
                }
                
                ${classes.option_settings_subMenu_class} > ${id.titleWrapper_id} > input {
                    width: 100px;
                    margin: 10px 0px;
                    text-align: center;
                }

                ${id.settingsOptionColor_id} {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                ${id.settingsOptionColor_id} h1 {
                    margin: 5px 0px;
                    font-size: 24px;
                    text-align: center;
                    width: 100%;
                }
                
                ${id.settingsOptionColor_id} .wrapper {
                    padding-top: 10px;
                }
        
                ${id.settingsOptionColor_id} label {
                    width: 140px;
                }

                ${id.settingsOptionColor_id} input {
                    width: 20px;
                    height: 20px;
                    border: none;
                }

                ${id.settingsOptionLang_id} {
                    display: flex;
                    flex-wrap: wrap;
                    text-align: center;
                    justify-content: center;
                    margin-bottom: 10px;
                }

                ${id.settingsOptionLang_id} label {
                    width: 100%;
                    font-weight: bold;
                    margin: 10px 0px;
                }

                /*//DOWNLOAD OPTION//*/
                ${id.downloadOptions_id} {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                ${id.downloadOptions_id} .wrapper {
                    border-top: 1px solid black;
                }

                ${id.downloadOptions_id} p {
                    text-align: center;
                    font-weight: bold;
                }

                ${id.downloadOptions_id} label {
                    width: 130px;
                }
    
                ${id.downloadOptions_id} button {
                    margin-top: 20px;
                    boder: none;
                    border-radius: 0;
                }

                ${id.downloadOptions_id} button:hover {
                    cursor: pointer;
                }

                /*//SAVE OPTION//*/
                ${classes.options_save_selection_class} {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 50% 50%;
                    margin-top: 5px;
                }

                ${classes.option_save_saveSlot_class} {
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    z-index: 10;
                    box-shadow: 0px 0px 1px black;
                    cursor: none;
                }
                
                ${classes.option_save_saveSlot_class}:hover {
                    box-shadow: 0px 0px 3px black;
                    cursor: pointer;
                }

                ${classes.options_save_selected_class} {
                    border: 3px solid black;
                    box-sizing: border-box;
                }

                ${classes.options_save_buttonWrapper_class} {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 5px;
                }

                ${classes.options_save_buttonWrapper_class} > button {
                    width: 33.33333%;
                    border: none;
                }

                ${classes.options_save_buttonWrapper_class} > button:hover {
                    cursor: pointer;
                    background-color: lightgray;
                }

                ${classes.options_save_buttonWrapper_class} > button:active {
                    cursor: pointer;
                    background-color: darkgray;
                }

                .iframe-wrapper {
                    margin: 10px auto !important;
                }
                
                .iframe-wrapper > iframe {
                    border: none !important;
                }
            `;

            stylingTags.textContent += menuStyling;
            stylingTags.textContent += optionsMenuStyling;
            stylingTags.textContent += stylingMenuStyling;
        }

        function addListeners() {
            menuElements.stylingHandle.onclick = () => {
                utils.OpenCloseToggle(menuElements.stylingWrapper);

                const wrapperState = menuElements.stylingWrapper.className;
                let stylingOpen = false;

                for (let i = 0; i < stylingMenus.length; i++) {
                    if (stylingMenus[i].style.display == "block") {
                        stylingOpen = true;
                        break;
                    }
                }

                const elementStylinglength = document.querySelectorAll(classes.elementStylingElm_class).length;
                if (stylingOpen && wrapperState == "open" && elementStylinglength > 0) {
                    menuElements.elementStyling.className = "open";
                }
                else {
                    menuElements.elementStyling.className = "closed";
                }

            };
            menuElements.optionsButton.onmousedown = () => {
                utils.OpenCloseToggle(menuElements.optionsWrapper);
                if (icon == null) utils.OpenCloseToggle(menuElements.optionsButton);

                if (menuElements.optionsWrapper.className == "closed") {
                    const subMenus = document.querySelectorAll(`${id.optionsMenu_id} > ${classes.option_settings_subMenu_class}`);
                    subMenus.forEach(subMenu => subMenu.style.display = "none");
                }
            };
        }

        function dragMenu() {
            let grabOffsetX;
            let grabOffsetY;
            let draggingMenu = false;

            const menuHandle = menuElements.menuHandle;
            const menu = menuElements.menu;
            const menuWrapper = menuElements.menuWrapper;

            function move(e) {
                let isInsideBodyX = (e.clientX < (window.innerWidth + grabOffsetX - menuWrapper.offsetWidth) && e.clientX > grabOffsetX);
                let isInsideBodyY = (e.clientY < (window.innerHeight + grabOffsetY - (menuWrapper.offsetHeight + 25)) && e.clientY > grabOffsetY);

                if (isInsideBodyX) menu.style.left = `${e.clientX - grabOffsetX}px`;
                if (isInsideBodyY) menu.style.top = `${e.clientY - grabOffsetY}px`;
            }

            menuHandle.onmousedown = (e) => {
                e.stopPropagation();
                grabOffsetX = e.offsetX;
                grabOffsetY = e.offsetY;

                draggingMenu = true;

                if (e.target === menuHandle) {
                    window.addEventListener("mousemove", move);
                }
            }

            window.addEventListener("mouseup", removeEventListeners);

            function removeEventListeners() {

                if (draggingMenu) {
                    window.removeEventListener("mousemove", move);
                    draggingMenu = false;
                }
            }
        }

        function createElements() {
            const dictionaire = elementDictionaire();
            const elementsDisplay = menuElements.elementsDisplay;

            Object.keys(dictionaire).forEach((key) => {
                if (dictionaire[key] == "HEADER") {
                    const header = utils.createElm({
                        class: classes.menuElementHeader_class,
                        text: key.replace(/_/g, " ")
                    });

                    elementsDisplay.append(header);
                }
                else {
                    const newElement = utils.createElm({
                        class: classes.menuElement_class,
                        text: key
                    });

                    elementsDisplay.append(newElement);
                }
            });
        }

        function setSubElementsText() {
            const allSubElements = document.querySelectorAll(classes.menuElement_class);
            const dictionaire = elementDictionaire();

            allSubElements.forEach(elm => {
                elm.onmouseover = (e) => {
                    hoveredSubElement = e.target;
                    elm.style.cursor = "grab";
                    const description = dictionaire[elm.innerHTML];
                    menuElements.descriptionBoxHeader.textContent = hoveredSubElement.textContent;
                    menuElements.descriptionBoxText.textContent = description;
                }
            });

            if (hoveredSubElement) {
                const description = dictionaire[hoveredSubElement.innerHTML];
                menuElements.descriptionBoxText.textContent = description;
            }
        }

        function grabElement() {
            const allSubElements = document.querySelectorAll(classes.menuElement_class);
            let clone;
            let dragging = false;

            let drag = function (event) {
                clone.style.left = (event.clientX + 10) + "px";
                clone.style.top = (event.clientY + 10) + "px";
            }

            setSubElementsText();

            allSubElements.forEach((elm) => {
                elm.onmousedown = (e) => {
                    dragging = true;
                    clone = elm.cloneNode(true);
                    clone.className = classes.menuElementClone_class.replace(".", "");
                    clone.style.zIndex = 10000;

                    clone.style.left = e.clientX + "px";
                    clone.style.top = e.clientY + "px";

                    document.body.append(clone);

                    document.body.style.cursor = "pointer";
                    elm.style.cursor = "grabbing";

                    window.addEventListener("mousemove", drag, false);

                    window.onmouseup = (e) => {
                        if (dragging) {
                            const element = utils.createElm({ name: clone.innerHTML });

                            let canBeDropped = true;
                            if (e.target.getAttribute('isdroppable'))
                                canBeDropped = (e.target.getAttribute('isdroppable') === 'true');

                            if (canBeDropped) {
                                e.target.append(element);
                                createStylingElement(element);
                                document.body.append(menuElements.menu);
                            }

                            clone.remove();
                            document.body.style.cursor = "default";
                            elm.style.cursor = "grab";
                            window.removeEventListener("mousemove", drag);
                            dragging = false;
                        }
                    }
                }

            });
        }

        function createStylingElement(baseElement) {

            function removeElements() {
                baseElement.remove();
                stylingElement.remove();

                menuElements.elementStyling.className = "closed";
            }

            function highlight(e, mode = false) {

                if (e.target !== e.currentTarget) return;

                if (mode == false && overlay) {
                    overlay.remove();
                    return;
                }

                let computedStyle = getComputedStyle(baseElement);
                const marginTop = Number(computedStyle.marginTop.replace(/[a-z]/g, ""));
                const marginRight = Number(computedStyle.marginRight.replace(/[a-z]/g, ""));
                const marginBottom = Number(computedStyle.marginBottom.replace(/[a-z]/g, ""));
                const marginLeft = Number(computedStyle.marginLeft.replace(/[a-z]/g, ""));

                overlay.style.width = (baseElement.offsetWidth + marginLeft + marginRight) + "px";
                overlay.style.height = (baseElement.offsetHeight + marginTop + marginBottom) + "px";
                overlay.style.left = baseElement.offsetLeft + "px";
                overlay.style.top = (baseElement.offsetTop - marginTop) + "px";
                baseElement.append(overlay);
            }

            const bin = iconCompHandler.binButton();

            const stylingElement = utils.createElm({
                class: classes.elementStylingElm_class,
                text: baseElement.tagName.toLowerCase()
            });

            const styleMenuButton = utils.createElm({
                class: classes.styleMenuButton_class + " closed"
            });

            const styleMenu = utils.createElm({
                class: classes.styleMenu_class
            });

            stylingElement.append(bin, styleMenuButton, styleMenu);

            _createInputElements(styleMenu, baseElement);
            _createExtraSettings(styleMenu, baseElement);

            styleMenu.style.display = "none";
            stylingMenus.push(styleMenu);

            bin.onclick = removeElements;

            stylingElement.addEventListener("click", handleEvent, false);
            stylingElement.addEventListener("mouseover", e => highlight(e, true), false);
            stylingElement.addEventListener("mouseout", e => highlight(e, false), false);

            const overlay = utils.createElm();
            overlay.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
            overlay.style.position = "absolute";
            overlay.style.zIndex = "100";

            function handleEvent(e) {

                if (e.target !== this) return;

                let styleMenu;
                let button;
                if (e.target.className == classes.elementStylingElm_class.replace(".", "")) {
                    styleMenu = e.target.querySelector(classes.styleMenu_class);
                    button = e.target.querySelector(classes.styleMenuButton_class);
                }
                else {
                    return;
                }

                if (styleMenu) {
                    if (styleMenu.style.display == "none") {
                        stylingMenus.forEach((menu) => {
                            menu.style.display = "none";
                            menu.previousSibling.className = classes.styleMenuButton_class.replace(".", "") + " closed";
                        });

                        styleMenu.style.display = "block";

                        menuElements.elementStyling.scrollTop = stylingElement.offsetTop;
                        menuElements.elementStyling.style.scrollBehavior = "smooth";
                        menuElements.elementStyling.className = "open";

                        button.classList.remove("closed");
                        button.classList.add("open");
                    }
                    else {
                        styleMenu.style.display = "none";
                        menuElements.elementStyling.className = "closed";

                        button.classList.remove("open");
                        button.classList.add("closed");
                    }
                }
            }

            menuElements.elementStyling.append(stylingElement);
        }

        function _createInputElements(styleMenu, baseElement) {
            let allLabels = [];
            let allOptions = [];

            function createIndentation() {
                let parrentCount = 0;

                let currElm = baseElement;
                let hasParent;

                function* generator(parrentCount) {
                    while (true) {
                        yield parrentCount += 1;
                    }
                }
                const gen = generator(0);

                while (true) {

                    if (currElm.parentElement)
                        hasParent = true
                    else
                        hasParent = false;

                    if (hasParent && currElm.tagName != "BODY") {
                        parrentCount = gen.next().value;
                        currElm = currElm.parentElement;
                    }
                    else {
                        break;
                    }
                }

                let emp = "";

                for (let i = 1; i < parrentCount; i++) {
                    emp += "-";
                }

                styleMenu.parentElement.firstChild.nodeValue = (emp + styleMenu.parentElement.firstChild.nodeValue);
            }

            function search() {
                const wrapper = utils.createElm({ class: classes.style_menu_search_class });
                const label = utils.createElm({ name: 'label', text: 'Search' });
                const searchInput = utils.createElm({ name: 'input', type: 'search', spellcheck: false });

                searchInput.addEventListener("input", () => {
                    allLabels.forEach((currLabel) => {

                        const text = searchInput.value.toLowerCase();

                        if (text == "") {
                            currLabel.parentElement.style.display = "flex";
                            return;
                        }

                        const labelHTML = currLabel.innerHTML;
                        let wholeString = "";

                        for (let i = 0; i < text.length; i++) {

                            wholeString += labelHTML.charAt(i);

                            if (text == wholeString) {
                                currLabel.parentElement.style.display = "flex";
                                break;
                            }
                            else {
                                currLabel.parentElement.style.display = "none";
                            }
                        }
                    });

                    allOptions.forEach((option) => {

                        const text = searchInput.value.toLowerCase();

                        if (text == "") {
                            option.style.display = "block";
                            return;
                        }

                        const optionHTML = option.innerHTML;
                        let wholeString = "";

                        for (let i = 0; i < text.length; i++) {

                            wholeString += optionHTML.charAt(i);

                            if (text == wholeString) {
                                option.style.display = "block";
                                break;
                            }
                            else {
                                option.style.display = "none";
                            }
                        }
                    });
                });

                wrapper.append(label, searchInput);

                return wrapper;
            }

            function createInput(str_labelText, str_type) {
                const label = utils.createElm({ name: "label", text: str_labelText });
                const input = utils.createElm({ name: "input", type: str_type, spellcheck: false });
                let unitType = null;

                switch (str_type) {
                    case inputType.number: {

                        unitType = utils.createElm({ name: "select" });
                        const pixel = utils.createElm({ name: 'option', text: 'px' });
                        const percent = utils.createElm({ name: 'option', text: '%' });
                        unitType.append(pixel, percent);

                        input.addEventListener("input", () => {
                            baseElement.style[utils.CTJV(str_labelText)] = input.value + unitType.value;
                        });
                    }
                        break;
                    case inputType.color: {
                        input.addEventListener("input", () => {
                            baseElement.style[utils.CTJV(str_labelText)] = input.value;
                        });
                    }
                        break;
                }

                const superWrapper = utils.createElm({ class: classes.super_wrapper_class });
                const inputWrapper = utils.createElm({ class: "wrapper" });

                allLabels.push(label);

                superWrapper.append(label, inputWrapper);
                inputWrapper.append(input);
                if (unitType != null) inputWrapper.append(unitType);

                return superWrapper;
            }

            function createSelectBox(arr_options, css_prop) {
                const label = utils.createElm({ name: "label", text: css_prop });
                const selectBox = utils.createElm({ name: "select" });

                arr_options.forEach((option) => {
                    selectBox.append(utils.createElm({ name: "option", text: option }));
                });

                selectBox.addEventListener("input", () => {
                    baseElement.style[utils.CTJV(css_prop)] = selectBox.value;
                });

                const superWrapper = utils.createElm({ class: classes.super_wrapper_class });
                const wrapper = utils.createElm({ class: "wrapper" });

                allLabels.push(label);

                superWrapper.append(label, wrapper);
                wrapper.append(selectBox);

                return superWrapper;
            }

            function createMultipleInputs(str_labelText, array_type) {
                const label = utils.createElm({ name: "label", text: str_labelText });
                let inputs = [];
                let color = "rgb(0,0,0)";
                let number = 0;
                let selection = "";

                array_type.forEach((type) => {

                    if (typeof (type) == "string") {
                        if (type == inputType.number) {
                            const input = utils.createElm({ name: "input", type: type, spellcheck: false });

                            input.addEventListener("input", () => {
                                number = `${input.value}px`;
                                baseElement.style.cssText += `${str_labelText}: ${number} ${selection} ${color};`;
                            });

                            inputs.push(input);
                        } else if (type == inputType.color) {
                            const input = utils.createElm({ name: "input", type: type, spellcheck: false });

                            input.addEventListener("input", () => {
                                color = input.value;
                                baseElement.style.cssText += `${str_labelText}: ${number} ${selection} ${color};`;
                            });

                            inputs.push(input);
                        }
                    } else {

                        const selectBox = utils.createElm({ name: "select", });

                        type.forEach((option) => {
                            selectBox.append(utils.createElm({ name: "option", text: option }));
                        });

                        selectBox.addEventListener("input", () => {
                            selection = selectBox.value;
                            baseElement.style.cssText += `${str_labelText}: ${number} ${selection} ${color};`;
                        });

                        inputs.push(selectBox);
                    }
                });

                const inputElements = utils.createElm();

                inputs.forEach(input => {
                    inputElements.append(input)
                });

                const superWrapper = utils.createElm({ class: classes.super_wrapper_class });
                const wrapper = utils.createElm({ class: "wrapper" });

                allLabels.push(label);

                superWrapper.append(label, wrapper);
                wrapper.append(inputElements);

                return superWrapper;
            }

            createIndentation();

            const inputElements = {
                height: createInput(cssProp.height, inputType.number),
                width: createInput(cssProp.width, inputType.number),
                margin: createInput(cssProp.margin, inputType.number),
                marginLeft: createInput(cssProp.margin_left, inputType.number),
                marginTop: createInput(cssProp.margin_top, inputType.number),
                marginBottom: createInput(cssProp.margin_bottom, inputType.number),
                marginRight: createInput(cssProp.margin_right, inputType.number),
                padding: createInput(cssProp.padding, inputType.number),
                paddingTop: createInput(cssProp.padding_top, inputType.number),
                paddingRight: createInput(cssProp.padding_right, inputType.number),
                paddingBottom: createInput(cssProp.padding_bottom, inputType.number),
                paddingLeft: createInput(cssProp.padding_left, inputType.number),
                backgroundColor: createInput(cssProp.background_color, inputType.color),
                color: createInput(cssProp.color, inputType.color),
                textAlign: createSelectBox(["left", "center", "right"], cssProp.text_align),
                fontFamily: createSelectBox(["Arial", "Verdana", "Helvetica", "Tahoma"], cssProp.font_family),
                border: createMultipleInputs(cssProp.border, [inputType.number, ["solid", "dotted", "none", "dashed", "double", "groove", "ridge", "inset", "outset", "hidden"], inputType.color]),
                listStyleType: createSelectBox(["circle", "square", "upper-roman", "lower-alpha", "none"], cssProp.list_style_type),
                display: createSelectBox(["none", "inline", "block", "inline-block", "flex"], cssProp.display),
                flexDirection: createSelectBox(["row", "row-reverse", "column", "column-reverse", "initial", "inherit"], cssProp.flex_direction)
            }
            
            const propertyPicker = utils.createElm({ name: 'select', text: 'property picker' });
            propertyPicker.setAttribute('size', 3);

            propertyPicker.addEventListener('change', () => {
                styleMenu.append(inputElements[propertyPicker.value]);

                //function?
                const propIndex = utils.getIndexOfProp(inputElements, propertyPicker.value);

                if (baseElement.hasAttribute('properties')) {
                    const currValue = baseElement.getAttribute('properties');

                    if (currValue.indexOf(propIndex) === -1) {
                        const edited = currValue + `${propIndex};`;
                        baseElement.setAttribute('properties', edited);
                    }
                }
                else {
                    baseElement.setAttribute('properties', `${propIndex};`);
                }
            });

            for (const property in inputElements) {
                const option = utils.createElm({ name: 'option', text: property });
                allOptions.push(option);
                propertyPicker.append(option);
            }

            const searchElm = search();
            styleMenu.append(searchElm, propertyPicker);

            //function?
            const keys = Object.keys(inputElements);
            if (baseElement.hasAttribute('properties')) {
                const index = baseElement.getAttribute('properties').split(';');

                for (let i = 0; i < index.length; i++) {
                    if (index[i] !== '')
                        styleMenu.append(inputElements[keys[index[i]]]);
                }
            }

            //function?
            const allStyleMenuElements = styleMenu.querySelectorAll(`${classes.styleMenu_class}, ${classes.styleMenu_class} *`);
            for (let i = 0; i < allStyleMenuElements.length; i++) {
                allStyleMenuElements[i].setAttribute("isdroppable", false);
            }
        }

        function _createExtraSettings(styleMenu, baseElement) {

            const settingsElement = utils.createElm({ class: classes.styleMenuSettings_class });
            const settingsHeader = utils.createElm({ name: "h1", text: baseElement.tagName.toLowerCase() });

            styleMenu.prepend(settingsElement);
            settingsElement.append(settingsHeader);

            const settings = {
                text: () => {
                    const textHeader = utils.createElm({ name: "h3", text: "text" });
                    const input = utils.createElm({ name: "textarea", spellcheck: false });

                    settingsElement.append(textHeader);
                    settingsElement.append(input);

                    input.addEventListener("input", () => {
                        baseElement.textContent = input.value;
                    });
                },
                img: () => {
                    const textHeader = utils.createElm({ name: "h3", text: "img url" });
                    const input = utils.createElm({ name: "input" });

                    settingsElement.append(textHeader);
                    settingsElement.append(input);

                    input.addEventListener("change", () => {
                        baseElement.setAttribute('src', input.value);
                    });
                }
            }

            switch (baseElement.tagName.toLowerCase()) {
                case "h1": {
                    settings.text();
                }
                    break;
                case "h2": {
                    settings.text();
                }
                    break;
                case "p": {
                    settings.text();
                }
                    break;
                case "h3": {
                    settings.text();
                }
                    break;
                case "ul": {

                }
                    break;
                case "li": {
                    settings.text();
                }
                    break;
                case "img": {
                    settings.img();
                }
                    break;
            }
        }

        function elementDictionaire() {
            const currentLang = localStorage.getItem('language');

            if (currentLang == langLists.lang.nederlands || currentLang == null) {
                return {
                    SECTIES: "HEADER",
                    body: "Bevat alle renderbare elementen.",
                    article: "Bevat te distribueren inhoud.",
                    section: "Definieert een sectie van het document.",
                    nav: "Definieert een navigatiegedeelte.",
                    aside: "Bevat inhoud slechts in geringe mate gerelateerd.",
                    h1: "Voegt een kop van niveau 1 in.",
                    h2: "Voegt een kop van niveau 2 in.",
                    h3: "Voegt een kop van niveau 3 in.",
                    h4: "Voegt een kop van niveau 4 in.",
                    h5: "Voegt een kop van niveau 5 in.",
                    h6: "Voegt een kop van niveau 6 in.",
                    header: "Bevat de koptekst van een sectie.",
                    footer: "Bevat de voettekst van een sectie.",
                    address: "Biedt contactgegevens.",

                    INHOUD_GROEPEREN: "HEADER",
                    p: "Voegt een alinea in.",
                    hr: "Tekent een horizontale lijn of regel",
                    pre: "Definieert een blok met vooraf opgemaakte teks.",
                    blockquote: "Offerte op blokniveau",
                    ol: "Voegt een georderde lijst in.",
                    ul: "Voegt een ongeorderde lijst in.",
                    menu: "Voegt een werkbalkmenu in.",
                    li: "Definieert een lijstitem.",
                    dl: "Voegt een definitielijst in.",
                    dt: "Voegt een term in een lijst in",
                    dd: "Biedt beschrijvingen in een lijst.",
                    figure: "Markeert de inhoud als referentie",
                    figcaption: "Biedt een onderschrift voor een figuur.",
                    main: "Fungeert als een hoofdcontainer voor elementen.",
                    div: "Definieert een inhoudsblok.",

                    SEMANTIEK_OP_TEKSTNIVEAU: "HEADER",
                    a: "Voegt links of bladwijzers in.",
                    em: "Geeft nadruk aan.",
                    strong: "Geeft een sterke nadruk aan.",
                    small: "Geeft tekst weer in 'klein' lettertype.",
                    s: "Inhoud is niet langer nauwkeurig of relevant.",
                    cite: "Voegt een citaat of referentie in.",
                    q: "Voegt een inline offerte in.",
                    dfn: "Geeft een definitie voor een term.",
                    abbr: "Verklaart afkortingen",
                    ruby: "Voegt ruby geannoteerde tekst in.",
                    rt: "Biedt een robijnrode annotatie",
                    rp: "Zorgt ervoor dat tekst in robijn moet worden genegeerd.",
                    data: "Biedt een machineleesbare versie.",
                    time: "Vertegenwoordigt een datum en / of tijd.",
                    code: "Vertegenwoodigt computercode.",
                    var: "Geeft een instantie van een variable aan.",
                    samp: "Bevat een voorbeelduitvoer van een programma.",
                    kbd: "Vertegenwoordigt tekst die door gebruikers is ingevoerd.",
                    sub: "Definieert subscripttekst.",
                    sup: "Definieert superscripttekst.",
                    i: "Geeft cursieve tekst weer.",
                    b: "Tekst in vetgedrukte stijl.",
                    u: "Vertegenwoordigt niet-tekstuele annotaties.",
                    mark: "Markeert tekst in een ander document.",
                    bdi: "Isoleert voor bidirectionele opmaak.",
                    bdo: "Overschrijft het bidirectionele algoritme.",
                    span: "Wijst attributen toe aan tekst.",
                    br: "Forceert een regeleinde.",
                    wbr: "Vertegenwoordigt een regeleinde-mogelijkheid.",

                    BEWERKINGEN: "HEADER",
                    ins: "Geeft ingevoegde tekst aan.",
                    del: "Geeft verwijderde tekst aan.",

                    INGESLOTEN_INHOUD: "HEADER",
                    source: "Specificeert alternative mediabronnen.",
                    img: "Voegt een afbeelding in.",
                    iframe: "Voegt een kader in een document in.",
                    embed: "Integreert externe applicaties.",
                    object: "Draait externe applicaties.",
                    param: "Stelt een parameter in voor een object.",
                    video: "Voegt video's in het document in.",
                    audio: "Voegt audiobestanden in het document in.",
                    track: "Biedt teksttracks voor een video.",
                    map: "Definieert eeb image-map aan de clientzijde.",
                    area: "Definieert sectoren voor afbeeldingskaarten.",

                    TABELGEGEVENS: "HEADER",
                    table: "Voegt een tafel in.",
                    caption: "Biedt een bijschrift voor een tafel.",
                    colgroup: "Groepeert kolommen in een tabel.",
                    col: "Stelt attributen in voor de kolommen van een tabel.",
                    tbody: "Bepaalt de inhoud van een tabel.",
                    thead: "Definieert de koptekst van een tabel.",
                    tfoot: "Definieert de voettekst van een tabel.",
                    tr: "Voegt een rij in een tabel in.",
                    td: "Voegt een gewone cel in een tabel in.",
                    th: "Voegt een koptekstcel in een tabel in.",

                    FORMULIEREN: "HEADER",
                    form: "Voegt een formulier in.",
                    label: "Stelt een label in voor een besturingselement.",
                    input: "Geeft een invoerbesturingselement weer.",
                    button: "Creëert een knopbediening",
                    select: "Creëert een selectieknop",
                    datalist: "Biedt suggesties voor invoervelden.",
                    optgroup: "Groepeert opties in een geselecteerd besturingselement.",
                    option: "Voegt een optie in een selectie-besturingselement in.",
                    textarea: "Creëert een tekstinvoer met meerdere regels.",
                    output: "Toont de output van een proces.",
                    progress: "Toont de voortgang van de voltooiing van een taak.",
                    meter: "Vertegenwoordigt een meting.",
                    fieldset: "Groepeert besturingselementen in een formulier.",
                    legend: "Assigns a caption for a fieldset.",

                    INTERACTIEVE_ELEMENTEN: "HEADER",
                    details: "Biedt samenvouwbare informatie.",
                    summary: "Biedt een samenvatting voor een detailelement.",
                    dialog: "Voegt een dialoogvenster in.",

                    SCRIPTING: "HEADER",
                    script: "Bevat scripts.",
                    noscript: "Biedt alternative inhoud voor scripts.",
                    template: "Definieert een sjabloon voor toekomstige gegevens.",
                    slot: "Tijdelijke aanduiding voor gegevens in componenten.",
                    canvas: "Geeft dynamische bitmapbeeldingen weer."
                }
            } else if (currentLang == langLists.lang.english) {
                return {
                    SECTIONS: "HEADER",
                    body: "Defines the document's body.",
                    article: "Defines an article.",
                    section: "Defines a section in a document.",
                    nav: "Defines navigation links.",
                    aside: "Define content aside from the page content.",
                    h1: "Defines a HTML heading of level 1.",
                    h2: "Defines a HTML heading of level 2.",
                    h3: "Defines a HTML heading of level 3.",
                    h4: "Defines a HTML heading of level 4.",
                    h5: "Defines a HTML heading of level 5.",
                    h6: "Defines a HTML heading of level 6",
                    header: "Defines a header for a document or section.",
                    footer: "Defines a footer for a document or section.",
                    address: "Defines contact infromation for the author/owner of a document.",

                    GROUP_CONTENT: "HEADER",
                    p: "Defines a paragraph.",
                    hr: "Defines a thematic change in the content.",
                    pre: "Defines preformatted text.",
                    blockquote: "Defines a section that is quoted from another source.",
                    ol: "Defines an ordered list.",
                    ul: "Defines an unordered list.",
                    menu: "Defines a defines a list/menu of commands.",
                    li: "Defines a list item.",
                    dl: "Defines a description list.",
                    dt: "Defines a term/name in a description list.",
                    dd: "Defines a description/value of a term in a description list.",
                    figure: "Specifies self-contained content.",
                    figcaption: "Biedt een onderschrift voor een figuur.",
                    main: "Fungeert als een hoofdcontainer voor elementen.",
                    div: "Defines a section in a document.",

                    SEMATICS_AT_THE_TEKST_LEVEL: "HEADER",
                    a: "Defines a hyperlink.",
                    em: "Defines emphasized text.",
                    strong: "Defines important text.",
                    small: "Defines smaller text.",
                    s: "Defines text that is no longer correct.",
                    cite: "Defines the title of a work.",
                    q: "Defines a short quotation.",
                    dfn: "Specifies a term that is going to be defined within the content.",
                    abbr: "Defines an abbreviation or an acronym.",
                    ruby: "Defines a ruby annotation (for East Asian typography).",
                    rt: "Defines an explanation/pronunciation of characters (for East Asian typography).",
                    rp: "Defines what to show in browsers that do not support ruby annotations.",
                    data: "Adds a machine-readable translation of a given content.",
                    time: "Defines a specific time (or datetime).",
                    code: "Defines a piece of computer code.",
                    var: "Defines a variable.",
                    samp: "Defines sample output from a computer program.",
                    kbd: "Defines keyboard input.",
                    sub: "Defines subscripted text.",
                    sup: "Defines superscripted text.",
                    i: "Defines a part of text in an alternate voice or mood.",
                    b: "Defines bold text.",
                    u: "Defines some text that is unarticulated and styled differently from normal text.",
                    mark: "Defines marked/highlighted text.",
                    bdi: "Isolates a part of text that might be formatted in a different direction from other text outside it.",
                    bdo: "Overrides the current text direction.",
                    span: "Defines a section in a document.",
                    br: "Defines a single line break.",
                    wbr: "Defines a possible line-break.",

                    OPERATIONS: "HEADER",
                    ins: "Defines a text that has been inserted into a document.",
                    del: "Defines text that has been deleted from a document.",

                    EMBEDDED_CONTENT: "HEADER",
                    img: "Defines an image.",
                    source: "Defines multiple media resources for media elements (<video> and <audio>).",
                    iframe: "Defines an inline frame.",
                    embed: "Defines a container for an external application.",
                    object: "Defines a container for an external application.",
                    param: "Defines a parameter for an object.",
                    video: "Defines embedded video content.",
                    audio: "Defines embedded sound content.",
                    track: "Defines text tracks for media elements (<video> and <audio>).",
                    map: "Defines an image map.",
                    area: "Defines an area inside an image map.",

                    TABLE_DATA: "HEADER",
                    table: "Defines a table.",
                    caption: "Defines a table caption.",
                    colgroup: "Specifies a group of one or more columns in a table for formatting.",
                    col: "Specifies column properties for each column within a <colgroup> element.",
                    tbody: "Groups the body content in a table.",
                    thead: "Groups the header content in a table.",
                    tfoot: "Groups the footer content in a table.",
                    tr: "Defines a row in a table.",
                    td: "Defines a cell in a table.",
                    th: "Defines a header cell in a table.",

                    FORMS: "HEADER",
                    form: "Defines an HTML form for user input.",
                    label: "Defines a label for an <input> element.",
                    input: "Defines an input control.",
                    button: "Defines a clickable button.",
                    select: "Defines a drop-down list.",
                    datalist: "Specifies a list of pre-defined options for input controls.",
                    optgroup: "Defines a group of related options in a drop-down list.",
                    option: "Defines an option in a drop-down list.",
                    textarea: "Defines a multiline input control (text area).",
                    output: "Defines the result of a calculation.",
                    progress: "Represents the progress of a task.",
                    meter: "Defines a scalar measurement within a known range (a gauge).",
                    fieldset: "Groups related elements in a form.",
                    legend: "Defines a caption for a <fieldset> element.",

                    INTERACTIVE_ELEMENTS: "HEADER",
                    details: "Defines additional details that the user can view or hide.",
                    summary: "Defines a visible heading for a <details> element.",
                    dialog: "Defines a dialog box or window.",

                    SCRIPTING: "HEADER",
                    script: "Defines a client-side script.",
                    noscript: "Defines an alternate content for users that do not support client-side scripts.",
                    template: "Defines a container for content that should be hidden when the page loads.",
                    slot: "Tijdelijke aanduiding voor gegevens in componenten.",
                    canvas: "Used to draw graphics, on the fly, via scripting (usually JavaScript)."
                }
            }
        }

        function options() {

            function closeSubMenus(exception) {
                subMenus.forEach(subMenu => {
                    if (exception != null) {
                        if (subMenu != exception)
                            subMenu.style.display = "none";
                    } else {
                        subMenu.style.display = "none";
                    }
                });
            }

            function relayInfo(text) {
                menuElements.infoBar.textContent = text;
                menuElements.infoBar.classList.replace("closed", "open");

                setTimeout(() => {
                    menuElements.infoBar.classList.replace("open", "closed");
                }, 1000);
            }

            function createSaveSlot(bodyHTML, scale = 0.05) {
                const iframe = utils.createIframe(bodyHTML, scale);
                const saveSlot = document.createElement('div');
                saveSlot.className = classes.option_save_saveSlot_class.replace('.', '');
                iframe.prepend(saveSlot);

                return iframe;
            }

            let subMenus = [];

            function clearPage() {
                const element = menuElements.option_prepareren;

                element.addEventListener("click", function () {
                    utils.removeBodyElements([menuElements.menu, menuElements.infoBar]);

                    const stylingElements = document.querySelectorAll(`${id.elementStyling_id} > *`);
                    for (let i = 0; i < stylingElements.length; i++) {
                        stylingElements[i].remove();
                    }
                });
            }
            function save() {
                const element = menuElements.option_opslaan;
                const subMenu = menuElements.option_opslaan_subMenu;

                subMenus.push(subMenu);
                (function createSaveMenu() {

                    function checkSlotId() {
                        localStorageItems.forEach(item => {
                            if (item.split('-')[1] == saveSlotId) {
                                saveSlotId++;
                                checkSlotId();
                            }
                        })
                    }

                    let saveSlotId = 0;

                    menuElements.saveBtn = iconCompHandler.saveBtn;
                    menuElements.deleteSaveBtn = iconCompHandler.deleteSaveBtn;
                    menuElements.loadSaveBtn = iconCompHandler.loadSaveBtn;

                    const saveSelection = utils.createElm({ class: classes.options_save_selection_class });

                    let saveSlots = [];
                    let selectedSave = null;
                    let localStorageItems = Object.keys(localStorage);

                    if (localStorageItems.length > 0) {

                        localStorageItems.forEach(item => {
                            if (item.split('-')[0] != 'save') return;

                            const saveSlot = createSaveSlot(localStorage.getItem(item), 0.04);
                            saveSelection.append(saveSlot);
                            saveSlots.push(saveSlot);
                            saveSlot.setAttribute('slotid', item);

                            saveSlot.addEventListener('click', e => {

                                saveSlots.forEach(slot => {
                                    slot.children[0].classList.remove(classes.options_save_selected_class.replace('.', ''));
                                });

                                e.target.classList.add(classes.options_save_selected_class.replace('.', ''));
                                selectedSave = e.target.parentElement;
                            });

                        });
                    }

                    menuElements.saveBtn.onclick = e => {
                        if (saveSlots.length > 5) return;

                        checkSlotId();

                        const body = utils.bodyScanner([menuElements.menu, menuElements.infoBar]);

                        localStorage.setItem(`save-${saveSlotId}`, body);

                        const saveSlot = createSaveSlot(body, 0.04);
                        saveSlot.setAttribute('slotid', `save-${saveSlotId}`);
                        saveSlotId++;
                        relayInfo("saved");

                        saveSelection.append(saveSlot);
                        saveSlots.push(saveSlot);

                        saveSlot.addEventListener('click', e => {

                            saveSlots.forEach(slot => {
                                slot.children[0].classList.remove(classes.options_save_selected_class.replace('.', ''));
                            });

                            e.target.classList.add(classes.options_save_selected_class.replace('.', ''));
                            selectedSave = e.target.parentElement;
                        });
                    }

                    menuElements.deleteSaveBtn.onclick = e => {
                        if (selectedSave == null) {
                            relayInfo("no save selected");
                            return;
                        }

                        const selectedSaveId = selectedSave.getAttribute('slotid');

                        if (selectedSaveId)
                            localStorage.removeItem(selectedSaveId);

                        const index = saveSlots.indexOf(selectedSave);
                        saveSlots.splice(index, 1);
                        selectedSave.remove();

                        relayInfo("save deleted");

                        selectedSave = null;
                    }

                    menuElements.loadSaveBtn.onclick = e => {
                        if (selectedSave == null) {
                            relayInfo("no save selected");
                            return;
                        }

                        utils.removeBodyElements([menuElements.menu, menuElements.infoBar]);

                        const currentElms = document.querySelectorAll(classes.elementStylingElm_class);
                        if (currentElms.length > 0) {
                            currentElms.forEach(elm => elm.remove());
                        }

                        const selectedSaveId = selectedSave.getAttribute('slotid');

                        if (selectedSaveId)
                            document.body.insertAdjacentHTML('beforeend', localStorage.getItem(selectedSaveId));
                        else
                            return;

                        const bodyChildren = Array.from(document.body.children);
                        for (let i = 0; i < bodyChildren.length; i++) {

                            if (bodyChildren[i] == menuElements.menu || bodyChildren[i] === menuElements.infoBar)
                                continue;

                            createStylingElement(bodyChildren[i]);

                            const refs = bodyChildren[i].querySelectorAll('*');
                            refs.forEach((element) => {
                                createStylingElement(element);
                            });
                        }

                        relayInfo("save loaded");
                    }

                    const buttonWrapper = utils.createElm({ class: classes.options_save_buttonWrapper_class });
                    buttonWrapper.append(menuElements.saveBtn, menuElements.deleteSaveBtn, menuElements.loadSaveBtn);

                    subMenu.append(buttonWrapper, saveSelection);

                })();

                element.onclick = e => {
                    e.stopPropagation();
                    closeSubMenus(subMenu);
                    utils.toggleDisplay(subMenu);
                }
            }
            function settings() {
                const element = menuElements.option_settings;
                const subMenu = menuElements.option_settings_subMenu;

                subMenus.push(subMenu);

                (function setPageTitle(subMenu) {
                    const titleWrapper = utils.createElm({ id: id.titleWrapper_id })
                    const titleElm = utils.createElm({ name: 'input', placeholder: 'Page title' });
                    const docTitle = document.querySelector('title');

                    titleWrapper.append(titleElm);

                    titleElm.addEventListener('input', () => {
                        docTitle.textContent = titleElm.value;
                        if (docTitle.textContent == '') docTitle.textContent = 'Web Builder Tool';
                    });

                    subMenu.append(titleWrapper);

                })(subMenu);
                (function createLangSetting(subMenu) {

                    const langSettings = utils.createElm({ id: id.settingsOptionLang_id });

                    menuElements.languageBoxLabel = utils.createElm({ name: "label", text: "Taal" });
                    const languageBox = utils.createElm({ name: "select" });
                    const options = [langLists.lang.nederlands, langLists.lang.english];
                    let defaultLang = langLists.lang.nederlands;

                    if (localStorage.getItem('language') != null)
                        defaultLang = localStorage.getItem('language');

                    options.forEach(option => {
                        if (option == defaultLang) {
                            languageBox.append(utils.createElm({ name: "option", text: option, selected: true }));
                        }
                        else {
                            languageBox.append(utils.createElm({ name: "option", text: option }));
                        }
                    });

                    languageBox.addEventListener("input", () => {
                        localStorage.setItem("language", languageBox.value);
                        langLists.load[languageBox.value]();
                        setSubElementsText();
                    });

                    langSettings.append(menuElements.languageBoxLabel, languageBox);
                    subMenu.append(langSettings);
                })(subMenu);
                (function createCollorSettings(subMenu) {
                    const collorSettings = utils.createElm({ id: id.settingsOptionColor_id });

                    menuElements.menuColorSettingsHeader = utils.createElm({ name: "h1", text: "Menu kluer" })

                    const wrapper1 = utils.createElm({ class: "wrapper" });
                    menuElements.labelHandleColor = utils.createElm({ name: "label", text: "Handvat kleur" });
                    menuElements.labelBackgroundColor = utils.createElm({ name: "label", text: "Achtergrond kleur" });

                    const wrapper2 = utils.createElm({ class: "wrapper" });
                    const handleColor = utils.createElm({ name: "input", type: "color" });
                    const backgroundColor = utils.createElm({ name: "input", type: "color" });

                    handleColor.value = "#808080";
                    backgroundColor.value = "#d3d3d3";

                    handleColor.addEventListener("input", () => {
                        menuElements.menuHandle.style.backgroundColor = handleColor.value;
                        menuElements.stylingHandle.style.backgroundColor = handleColor.value;
                    });

                    backgroundColor.addEventListener("input", () => {
                        menuElements.menuWrapper.style.backgroundColor = backgroundColor.value;
                        menuElements.stylingDisplay.style.backgroundColor = backgroundColor.value;
                    });


                    collorSettings.append(menuElements.menuColorSettingsHeader);
                    wrapper1.append(menuElements.labelHandleColor, handleColor);
                    wrapper2.append(menuElements.labelBackgroundColor, backgroundColor);
                    collorSettings.append(wrapper1, wrapper2);
                    subMenu.append(collorSettings);

                })(subMenu);
                
                element.addEventListener("click", function (e) {
                    e.stopPropagation();
                    closeSubMenus(subMenu);
                    utils.toggleDisplay(subMenu);
                });
            }
            function download() {
                const element = menuElements.option_download;
                const subMenu = menuElements.option_download_subMenu;

                subMenus.push(subMenu);
                (function createDownloadSettings() {

                    function makeFile(text, type) {
                        let textFile = null;

                        (function () {
                            const data = new Blob([text], { type: type });

                            if (textFile !== null)
                                window.URL.revokeObjectURL(textFile);

                            textFile = window.URL.createObjectURL(data);

                            return textFile;
                        })();
                        return textFile;
                    }

                    const downloadOptions = utils.createElm({ id: id.downloadOptions_id });
                    menuElements.download_description = utils.createElm({ name: "p", text: "Welken files wilt u downloaden?" });

                    const wrapper1 = utils.createElm({ class: "wrapper" });
                    const CSSLabel = utils.createElm({ name: "label", text: "css file" });
                    const CSSCheckbox = utils.createElm({ name: "input", type: inputType.checkbox });


                    const wrapper2 = utils.createElm({ class: "wrapper" });
                    const HTMLLabel = utils.createElm({ name: "label", text: "html file" });
                    const HTMLCheckbox = utils.createElm({ name: "input", type: inputType.checkbox });

                    const downloadButton = utils.createElm({ name: "button", text: "download" });

                    downloadButton.addEventListener('click', () => {

                        if (CSSCheckbox.checked) {
                            const link = document.createElement('a');
                            link.setAttribute('download', 'style.css');
                            link.href = makeFile(" body { width: 100px; height: 100px; }", "css");
                            document.body.appendChild(link);

                            window.requestAnimationFrame(function () {
                                const event = new MouseEvent('click');
                                link.dispatchEvent(event);
                                document.body.removeChild(link);
                            });
                        }


                        if (HTMLCheckbox.checked) {
                            const link = document.createElement('a');
                            link.setAttribute('download', 'index.html');
                            link.href = makeFile(`
                            <!DOCTYPE html>
                            <html style="height: 100%;">
                                <head>
                                    <title>Test</title>
                                </head>
                                <body style="height: 100%; margin: 0px;">
                                    ${utils.bodyScanner([menuElements.menu, menuElements.infoBar])}
                                </body>
                            </html>
                        `, "html");
                            document.body.appendChild(link);

                            window.requestAnimationFrame(function () {
                                let event = new MouseEvent('click');
                                link.dispatchEvent(event);
                                document.body.removeChild(link);
                            });
                        }
                    });

                    wrapper1.append(CSSLabel, CSSCheckbox);
                    wrapper2.append(HTMLLabel, HTMLCheckbox);
                    downloadOptions.append(menuElements.download_description, wrapper1, wrapper2, downloadButton);
                    subMenu.append(downloadOptions);
                })()

                element.addEventListener("click", function (e) {
                    e.stopPropagation();
                    closeSubMenus(subMenu);
                    utils.toggleDisplay(subMenu);
                });
            }

            clearPage();
            save();
            settings();
            download();
        }

        function setDefault() {
            const allElements = document.querySelectorAll(`${id.menu_id}, ${id.menu_id} *`);
            for (let i = 0; i < allElements.length; i++) allElements[i].setAttribute("isdroppable", false);

            if (localStorage.getItem('language'))
                langLists.load[localStorage.getItem('language')]();
        }

    }
};