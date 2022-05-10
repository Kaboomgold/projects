import { Interface } from "../generic/Interface.js";

export class IEventAction extends Interface {
    constructor(currentClass) {
        super(currentClass);
        this.HasMethod('GetEventIds', this);
    }
}