import { ItemManager } from '../../Item/ItemManager.js';
import { Option } from './Option.js';
import { PlannerItem } from '../../Item/PlannerItem.js';

class ItemOption extends Option {
    #paperSheet = ItemManager.GetPaperSheet()

    constructor() {
        super('Item', 'Item Option');
    }

    Action() {
        const plannerItem = new PlannerItem();

        plannerItem.Spawn(
            ((window.innerWidth / 2)) - Math.random() * 100, 
            ((window.innerHeight / 2)) - Math.random() * 100
        );

    }

    GetSettings() {
        return null;
    }
}

export { ItemOption }