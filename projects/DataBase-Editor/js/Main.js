import AjaxHandler from './AjaxHandler.js';
import CreateListing from './CreateListing.js';

const inputPlacements = document.querySelectorAll('.input-placement');

function createLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';

    const loadingElementText = document.createElement('h2');
    loadingElementText.textContent = 'Loading...';

    loadingElement.append(loadingElementText);
    return loadingElement;
}

function dropTable(tableName) {
    const dropTableBtn = document.createElement('button');
    dropTableBtn.textContent = 'Delete Table';

    const tableElm = document.querySelector(`.${tableName}`);

    dropTableBtn.addEventListener('click', () => {

        tableElm.append(createLoadingElement());
        const postData = document.querySelector('#post-data').value;
        const prepare = { "table-name": tableName, "post-data": postData, "state": "REMOVE"};

        AjaxHandler.makeRequest('editDataBase.php', 'table-data', JSON.stringify(prepare), xhttp => {
            tableElm.remove();
        }, true);
    });

    return dropTableBtn;
}

class DBTable {
    #container = null;
    #listing = null;
    #sendBtn = null;

    constructor(container) {
        this.#container = container;
        this.#CreateCreateBtn();
        this.#CreateListingObj();
        this.#AddSendEvent();
    }

    #CreateCreateBtn() {
        const createBtn = document.createElement('button');
        createBtn.textContent = 'Create';
        createBtn.type = 'button';
        this.#container.prepend(createBtn);
        this.#sendBtn = createBtn;
    }

    #CreateListingObj() {
        const listing = new CreateListing('table-values');
        listing.inputCount = 5;
        listing.inputTypes.push('text', ['VARCHAR', 'INT', 'FLOAT'], 'number', ['', 'PRIMARY'], 'checkbox');
        this.#container.append(listing.baseElement);
        this.#listing = listing;
    }

    #AddSendEvent() {
        this.#sendBtn.addEventListener('click', () => {
            const tableName = document.querySelector('#table-name').value;
            const postdata = document.querySelector('#post-data').value;
            const preparedData = { "table-name": tableName, "table-rows": this.#listing.GetItemList(), "post-data": postdata, "state": "ADD" };
            
            AjaxHandler.makeRequest('editDataBase.php', 'table-data', JSON.stringify(preparedData), xhttp => {
                document.body.insertAdjacentHTML('afterbegin', xhttp.responseText);
                window.location.reload();
            }, true);
        });
    }
}

const table = new DBTable(document.querySelector('#add-table-container'));

inputPlacements.forEach(inputPlacement => {
    //Create button to send the xmlhttprequest.
    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Update';


    const tableName = inputPlacement.getAttribute('table-name');
    const tableHeaders = JSON.parse(inputPlacement.getAttribute('table-headers'));

    //Create listing obj.
    const listing = new CreateListing('product-listing');
    listing.inputCount = tableHeaders.length;
    listing.inputPlaceHolders = tableHeaders;

    listing.baseElement.append(sendBtn);

    inputPlacement.append(listing.baseElement);
    inputPlacement.append(dropTable(tableName));

    sendBtn.addEventListener('click', () => {

        //Creating and append loading element.
        const loadingElem = createLoadingElement();
        const loadingPos = document.querySelector(`.${tableName} table`);
        loadingPos.append(loadingElem);

        //Table delete toggle for deleting rows from tables.
        const deletToggles = document.querySelectorAll(`.${tableName} .delete-toggle`);
        let deleteList = [];
        for (let i = 0; i < deletToggles.length; i++) {
            if (deletToggles[i].checked) {
                deleteList.push(deletToggles[i].getAttribute('rowid'));
            }
        }

        //Post data that contains the data base login.
        const postdata = document.querySelector('#post-data').value; 
        //Prepare data to be send by a xmhtml object.
        const preparedData = { "table-name": tableName, "item-list": listing.GetItemList(), "delete-values": deleteList, "post-data": postdata };

        //Remove input groups.
        const inputGroups = document.querySelectorAll(`.${tableName} .inputGroup`);
        inputGroups.forEach(inputGroup => {
            listing.RemoveInputGoup(inputGroup);
        });

        //Make java request.
        AjaxHandler.makeRequest('editDBTable.php', 'table-data', JSON.stringify(preparedData), xhttp => {
            const tablePos = document.querySelector(`.${tableName} > div`);
            const oldTable = document.querySelector(`.${tableName} table`);
            oldTable.remove();
            tablePos.insertAdjacentHTML('afterbegin', xhttp.responseText);
        });
    });
});

class Event {

    #id = null;
    #delegate = null;

    constructor(delegate, id) {
        this.#delegate = delegate;
        this.#id = id;
    }

    GetId() {
        return this.#id;
    }

    Fire(e) {
        this.#delegate(e);
    }
}

class Interface {
    #currentClass = null;

    constructor(currentClass) {
        this.#currentClass = currentClass;
    }

    HasMethod(methodName, childClass = '') {
        if (typeof (this.#currentClass[methodName]) != 'function') {
            console.error(`Error: Interface(${childClass.constructor.name}) | The class ${this.#currentClass.constructor.name} needs to have a ${methodName} method.`);
        }
    }
}

class EventAction extends Interface {
    constructor(currentClass) {
        super(currentClass);
        this.HasMethod('GetEventIds', this);
    }
} 

class OnMouseDown {
    #onLeftEvents = [];
    #onRightEvents = [];

    constructor(onLeft, onRight) {
        new EventAction(this);

        this.#onLeftEvents = onLeft;
        this.#onRightEvents = onRight;
        this.#CreateEvent();
    }

    #CreateEvent() {
        const onLeft = this.#onLeftEvents;
        const onRight = this.#onRightEvents;

        window.addEventListener('mousedown', e => {

            for (const E in onLeft) {
                if (e.button == 0) {
                    onLeft[E].Fire(e);
                }
            }

            for (const E in onRight) {
                if (e.button == 2) {
                    onRight[E].Fire(e);
                }
            }
        });
    }
}

class OnMouseUp {
    #onLeftEvents = [];
    #onRightEvents = [];

    constructor(onLeft, onRight) {
        new EventAction(this);

        this.#onLeftEvents = onLeft;
        this.#onRightEvents = onRight;
        this.#CreateEvent();
    }

    #CreateEvent() {
        const onLeft = this.#onLeftEvents;
        const onRight = this.#onRightEvents;

        window.addEventListener('mouseup', e => {

            for (const E in onLeft) {
                if (e.button == 0) {
                    onLeft[E].Fire(e);
                }
            }

            for (const E in onRight) {
                if (e.button == 2) {
                    onRight[E].Fire(e);
                }
            }
        });
    }
}

class OnMouseMove {
    #onMoveEvents = [];

    constructor(onMove) {
        new EventAction(this);

        this.#onMoveEvents = onMove;
        this.#CreateEvent();
    }

    #CreateEvent() {
        const onMove = this.#onMoveEvents;

        window.addEventListener('mousemove', e => {

            for (const E in onMove) {
                if (e.button == 0) {
                    onMove[E].Fire(e);
                }
            }

        });
    }
}

class EventType {
    static onMouseMove = 'onMouseMove';
    static onLeftMouseDown = 'onLefMouseDown';
    static onRightMouseDown = 'onRightMouseDown';
    static onLeftMouseUp = 'onLeftMouseUp';
    static onRightMouseUp = 'onRightMouseUp';
}

class InputHandler {
    #events = [];

    constructor() {
        this.#InitEvents();
        this.#OnMouseMove();
        this.#OnMouseDown();
        this.#OnMouseUp();
    }

    #IsFunc(prop) {
        return (typeof (prop) == 'function');
    }

    #InitEvents() {
        for (const [key, value] of Object.entries(EventType)) {
            this.#events[value] = [];
        }
    }

    AddEvent(delegate, id, eventType) {
        if (!this.#IsFunc(delegate)) {
            console.error('InputHandler: The first argument of the AddEvent() method needs to be of type function!');
            return;
        }

        const E = new Event(delegate, id);
        this.#events[eventType].push(E);
    }

    RemoveEvent(id) {
        for (const i in this.#events) {
            for (const E in this.#events[i]) {
                if (id == this.#events[i][E].GetId()) {
                    const index = this.#events[i].indexOf(this.#events[i][E]);
                    this.#events[i].splice(index, 1);
                }
            }
        }
    }

    #OnMouseUp() {
        const onLeft = this.#events[EventType.onLeftMouseUp];
        const onRight = this.#events[EventType.onRightMouseUp];

        const OMUE = new OnMouseUp(onLeft, onRight);
    }

    #OnMouseDown() {
        const onLeft = this.#events[EventType.onLeftMouseDown];
        const onRight = this.#events[EventType.onRightMouseDown];

        const MDE = new OnMouseDown(onLeft, onRight);
    }

    #OnMouseMove() {
        const onMove = this.#events[EventType.onMouseMove];

        const OMME = new OnMouseMove(onMove);
    }

}

class DragHandler {

    #relativeTo = null;
    #draggedTargetElements = [];
    #inputHandler = null;
    onDrop = null;
    beginDrag = null;

    constructor(relateiveTo, inputHandler) {
        this.#relativeTo = relateiveTo;
        this.#inputHandler = inputHandler;
        this.#Drag();
    }

    setOffsetPos() {
        const elements = Array.from(this.#relativeTo.querySelectorAll('#table-picker > *[canBeDragged]'));

        let existingOffsetX;
        let existingOffsetY;

        elements.forEach(element => { 
            if (this.#relativeTo != null) {
                existingOffsetX = this.#relativeTo.getBoundingClientRect().left;
                existingOffsetY = this.#relativeTo.getBoundingClientRect().top;
            }
            const boundingRect = element.getBoundingClientRect();
            const offsetX =  boundingRect.left;
            const offsetY = boundingRect.top;

            element.style.left = `${Math.abs(existingOffsetX - offsetX)}px`;
            element.style.top = `${Math.abs(existingOffsetY - offsetY)}px`;
        });
    }

    #Drag() {
        const IH = this.#inputHandler;
        let targetElement = null;
        let canDrag = false;

        IH.AddEvent(e => {
            let existingOffsetX = 0;
            let existingOffsetY = 0;

            targetElement = e.target;
            canDrag = (targetElement.getAttribute('canbedragged') == 'true');

            this.beginDrag(e, targetElement);

            if (this.#relativeTo != null) {
                existingOffsetX = this.#relativeTo.getBoundingClientRect().left;
                existingOffsetY = this.#relativeTo.getBoundingClientRect().top;
            }

            let initialOffsetX = 0;
            let initialOffsetY = 0;

            if (targetElement.style.left && targetElement.style.top) {
                initialOffsetX = parseFloat(targetElement.style.left.replace('px', ''));
                initialOffsetY = parseFloat(targetElement.style.top.replace('px', ''));
            }

            const boundingRect = targetElement.getBoundingClientRect();
            const offsetX = e.clientX - initialOffsetX;
            const offsetY = e.clientY - initialOffsetY;

            if (this.#draggedTargetElements.length > 0) {
                for (let i = 0; i < this.#draggedTargetElements.length; i++) {
                    targetElement.style.zIndex = '0';
                }
            }

            if (canDrag) {

                this.#draggedTargetElements.push(targetElement);
                targetElement.style.pointerEvents = 'none';
                targetElement.style.position = 'absolute';
                targetElement.style.margin = '0px';
                targetElement.style.zIndex = '1';

                IH.AddEvent(e => {
                    e.stopPropagation();
                    e.preventDefault();
                    targetElement.style.left = `${(e.clientX - offsetX)}px`;
                    targetElement.style.top = `${(e.clientY - offsetY)}px`;
                    return false;
                }, 'dragging', EventType.onMouseMove);

            }
        }, 'startDrag', EventType.onLeftMouseDown);

        IH.AddEvent(e => {
            IH.RemoveEvent('dragging');

            if (canDrag) {

                if (typeof (this.onDrop) == 'function') {
                    this.onDrop(e, targetElement);
                }


                targetElement.style.pointerEvents = 'auto';


                if (targetElement != null) {
                    targetElement.style.zIndex = '0';
                }
            }

        }, 'drop', EventType.onLeftMouseUp);
    }


}

class AbsoluteGrid {

    #targetElements = null;
    #offsetLeft = 0;
    #offsetTop = 0;
    #groupingContainer = null;
    paddingX = 0;
    paddingY = 0;

    constructor(groupingContainer, paddingX, paddingY) {
        this.#targetElements = groupingContainer.children;
        this.#groupingContainer = groupingContainer;
        this.paddingX = paddingX;

        groupingContainer.style.position = 'none';
        console.log(groupingContainer.offsetWidth);

        this.#gritifyTargetElements();
    }

    #gritifyTargetElements() {


        for (let i = 0; i < this.#targetElements.length; i++) {
            const targetElement = this.#targetElements[i];
            targetElement.style.position = 'absolute';


            if (this.#offsetLeft > this.#groupingContainer.offsetWidth) {
                this.#offsetLeft = 0;
                this.#offsetTop += 470;
            }
            

            targetElement.style.left = `${this.#offsetLeft}px`;
            targetElement.style.top = `${this.#offsetTop}px`;


            this.#offsetLeft += targetElement.offsetWidth + this.paddingX;

            
        }

    }

}

class TablePicker {
    #tablePickerElements = [];
    #tablePicker = null;

    constructor(tablePicker) {
        this.#tablePicker = tablePicker;
    }

    GetElement() {
        return this.#tablePicker;
    }

    AddTablePickerElm(element) {
        const TPE = new TablePickerElement(element);
        this.#tablePickerElements.push(TPE);
    }

    SetTPEToTable(domElement) {

        for (const i in this.#tablePickerElements) {
            const TPE = this.#tablePickerElements[i];

            if (TPE.GetElement() == domElement) {
                TPE.SetToTable();
            }
        }
    }

    SetTPEToTableItem(domElement) {
        for (const i in this.#tablePickerElements) {
            const TPE = this.#tablePickerElements[i];

            if (TPE.GetElement() == domElement) {
                TPE.SetToTableItem();
            }
        }
    }
    
}

class TablePickerElement {
    #domElement = null;

    constructor(domElement) {
        this.#domElement = domElement;
    }

    SetParent(parent) {
        parent.append(parent);
    }

    GetElement() {
        return this.#domElement;
    }

    SetToTable() {

        this.#domElement.classList.replace('close', 'open');
        this.#domElement.style.position = 'absolute';
    }

    SetToTableItem() {
        this.#domElement.classList.replace('open', 'close');
        this.#domElement.style.position = 'static';
    }
}

const IH = new InputHandler();
const TP = new TablePicker(document.querySelector('#table-picker'));
const DH = new DragHandler(document.querySelector('#table-editor'), IH);
//const AG = new AbsoluteGrid(document.querySelector('#table-wrapper'), 0, 0);
const tables = Array.from(document.querySelector('#table-wrapper').children);


for (const i in document.querySelector('#table-wrapper').children) {
    const child = document.querySelector('#table-wrapper').children[i];

    TP.AddTablePickerElm(child);
}

tables.forEach(table => {
    TP.GetElement().append(table);
    TP.SetTPEToTableItem(table);
});

DH.setOffsetPos();

DH.onDrop = (e, targetElm) => {
    if (e.target == document.querySelector('#table-picker') || e.target.parentElement == document.querySelector('#table-picker')) {
        TP.GetElement().append(targetElm);
        TP.SetTPEToTableItem(targetElm);
    }

    if (e.target == document.querySelector('#table-wrapper') || e.target.parentElement == document.querySelector('#table-wrapper')) {
        document.querySelector('#table-wrapper').append(targetElm);
        
    }
    DH.setOffsetPos();
}

DH.beginDrag = (e, targetElement) => {
    TP.SetTPEToTable(targetElement);
}

