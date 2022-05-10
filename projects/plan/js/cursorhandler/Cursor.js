class Cursor {
    #link;
    #name;
    position;
    
    constructor(cursorName, linkToImage, position = 'center') {
        this.#name = cursorName;
        this.#link = linkToImage;
        this.position = position;
    }

    GetName() {
        return this.#name;
    }

    GetUrl() {
        return this.#link;
    }
}

export { Cursor }