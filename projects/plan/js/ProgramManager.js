import { Icon } from "./general/Icon.js";
import { StyleSheetHandler } from "./general/StylesheetHandler.js";
import { CursorHandler } from "./cursorhandler/CursorHandler.js";
import { Cursor } from "./cursorhandler/Cursor.js";
import { ContextMenu } from "./contextmenu/ContextMenu.js";
import { ContextMenuOption } from "./contextmenu/ContextMenuOption.js";

class ProgramManager {
    static cursorHandler = new CursorHandler();
    static iconHandler = new Icon();
    static styleSheetHandler = new StyleSheetHandler(document.styleSheets[0]);
    static contextMenu = new ContextMenu();

    static {
        this.CursorInit();
    }

    static CursorInit() {
        this.cursorHandler.RegisterCursor(new Cursor('default', './images/cursor/default.png', 'right bottom'));
        this.cursorHandler.RegisterCursor(new Cursor('circle', './images/cursor/circle.png'));
        this.cursorHandler.RegisterCursor(new Cursor('dark-arrow', './images/cursor/dark-arrow.png', 'right bottom'));
        this.cursorHandler.RegisterCursor(new Cursor('dark-arrow3', './images/cursor/dark-arrow3.png', 'right bottom'));
        this.cursorHandler.SetCursorType('dark-arrow3');
    }

    static AddContextMenuOption(name, groupName) {
        const option = new ContextMenuOption(name);
        this.contextMenu.AddOption([option], groupName);
        return option;
    }

}

export { ProgramManager };