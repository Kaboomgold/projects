import { Models_Page } from "./models-page.js";

function addSubMenuEvents() {
    const sub_menus = [...document.querySelectorAll('.sub-menu')];

    for(let i = 0; i < sub_menus.length; i++) {
        const name = sub_menus[i].querySelector('div');
        const menu = sub_menus[i].querySelector('ul');

        name.addEventListener('click', e => {
            sub_menus[i].classList.toggle('active');
            menu.classList.toggle('open');
        });
    }
}

class Main { 

    static {
        const mp = new Models_Page();
        addSubMenuEvents();
    }
}