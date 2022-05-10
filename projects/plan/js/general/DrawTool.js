export class DrawTool {
    #canvas_target = null;
    #ctx = null;
    #canvas_element = null;
    #offset_element = null;
    #oldPosX = 0;
    #oldPosY = 0;
    #path = [];
    #lineWidth = 10;
    
    constructor(canvas_target, offsetElement = null) {
        this.#canvas_target = canvas_target;

        if(offsetElement != null) {
            this.#offset_element = offsetElement;
        } else {
            this.#offset_element = canvas_target;
        }

        this.#ctx = canvas_target.GetContext2D();
        this.#Init();
    }

    #Init() {
        const ctx = this.#ctx;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        this.#canvas_element = this.#canvas_target.GetElement();
    }

    SetLineWidth(width) {
        this.#ctx.lineWidth = width;
        this.#lineWidth = width;
    }

    SetPosition(mousePosX, mousePosY) {
        this.#oldPosX = Math.abs(parseFloat(this.#offset_element.style.left.match(/[0-9]+|-[0-9]+/g)[0])) + mousePosX;
        this.#oldPosY = Math.abs(parseFloat(this.#offset_element.style.top.match(/[0-9]+|-[0-9]+/g)[0])) + mousePosY;
    }

    Remove(posX, posY) {
        const newOffsetX = Math.abs(parseFloat(this.#offset_element.style.left.match(/[0-9]+|-[0-9]+/g)[0]));
        const newOffsetY = Math.abs(parseFloat(this.#offset_element.style.top.match(/[0-9]+|-[0-9]+/g)[0]));
        this.#ctx.clearRect(
            (posX + newOffsetX) - this.#lineWidth/2, 
            (posY + newOffsetY) - this.#lineWidth/2, 
            this.#lineWidth + 5, 
            this.#lineWidth + 5);
    }

    Draw(mousePosX, mousePosY) {
        const ctx = this.#ctx;

        const newOffsetX = Math.abs(parseFloat(this.#offset_element.style.left.match(/[0-9]+|-[0-9]+/g)[0]));
        const newOffsetY = Math.abs(parseFloat(this.#offset_element.style.top.match(/[0-9]+|-[0-9]+/g)[0]));

        ctx.beginPath();
        ctx.moveTo(this.#oldPosX, this.#oldPosY);
        ctx.lineTo(mousePosX + newOffsetX, mousePosY + newOffsetY)
        ctx.stroke();
        ctx.closePath();

        this.#oldPosX = mousePosX + newOffsetX;
        this.#oldPosY = mousePosY + newOffsetY;
    }
}