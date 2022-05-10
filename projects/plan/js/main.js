
//Managers
import { ProgramManager } from "./ProgramManager.js";
import { ItemManager } from "./Item/ItemManager.js";

//Context Menu
import { ContextMenuBase } from "./contextmenu/ContextMenuBase.js";
import { ContextMenuOption } from "./contextmenu/ContextMenuOption.js";

//Items
import { PaperSheetItem } from "./Item/PaperSheetItem.js";
import { PlannerItem } from "./Item/PlannerItem.js";

//Menu
import { Menu } from "./menu/Menu.js";
import { DrawOption } from "./menu/options/DrawOption.js";
import { ItemOption } from "./menu/options/ItemOption.js";




class Main {
    static #menu = new Menu(document.querySelector('#menu'));
    static #paperSheet = null;

    static {
        this.CreateItems();
        this.AddOptions();
        this.InitContextMenu();
    }

    static AddOptions() {
        this.#menu.AddOption(new DrawOption(ItemManager.GetPaperSheet()));
        this.#menu.AddOption(new ItemOption());
    }

    static InitContextMenu() {
        ProgramManager.contextMenu.AddGroup('default');
        ProgramManager.contextMenu.group = 'default';
        const opt = ProgramManager.AddContextMenuOption('new', 'default');
        const sub = new ContextMenuBase();
        sub.AddOption([
            new ContextMenuOption('Planner Item', e => {
                const plannerItem = new PlannerItem();
                plannerItem.Spawn(e.clientX, e.clientY);
            })]
        );

        opt.AddSubMenu(sub);
    }

    static CreateItems() {
        this.#paperSheet = new PaperSheetItem(document.querySelector('#paper-sheet'), true);
    }
}