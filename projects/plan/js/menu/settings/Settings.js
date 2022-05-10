import  { Icon } from '../../general/Icon.js';

class Settings {
    #setting_menu = document.createElement('div');
    #setting_innerMenu = document.createElement('div');
    #settings_button = new Icon().cogwheel_icon();

    constructor(title) {
        this.#setting_menu.className = 'settings-menu close';
        this.#settings_button.classList.add('settings-button');

        this.#setting_innerMenu.className = 'setting-inner-menu';
        this.#setting_menu.append(this.#setting_innerMenu);

        const h2 = document.createElement('h2');
        h2.textContent = title;
        this.#setting_innerMenu.append(h2);

        this.#settings_button.addEventListener('click', e => {
            if(this.#setting_menu.classList.contains('open')) {
                this.#setting_menu.classList.replace('open', 'close');
            } else {
                this.#setting_menu.classList.replace('close', 'open');
            }
        });
    }

    AddSetting(setting) {
        this.#setting_innerMenu.append(setting);
    }

    GetMenu() {
        return this.#setting_menu;
    }

    GetMenuBtn() {
        return this.#settings_button;
    }
}

export { Settings }