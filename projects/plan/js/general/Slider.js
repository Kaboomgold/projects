class Slider {

    #slider = document.createElement('div');
    #line = document.createElement('div');
    #sliderBtn = document.createElement('div');
    #sliderWidth = 0;
    #maxValue = 0;
    #increaseAmount = 0;
    #oldClientX = 0;
    #minRange = 0;
    #maxRange = 0;
    #moveRange = 0;
    #actualRange = 0;

    onSlide = null;

    constructor(width, maxValue) {
        this.#maxValue = maxValue;
        this.#sliderWidth = width;

        this.#increaseAmount = this.#maxValue / this.#sliderWidth;
        this.#actualRange = this.#moveRange;

        this.#slider.append(this.#line, this.#sliderBtn);

        this.#ApplyStyling();
        this.#SetupSliderBtn();
    }

    #ApplyStyling() {
        this.#slider.className = 'slider';
        this.#slider.style.width = `${this.#sliderWidth}px`;

        this.#line.className = 'line';

        this.#sliderBtn.className = 'slider-button';
    }

    GetSliderElement() {
        return this.#slider;
    }

    #SetupSliderBtn() {
        const btn = this.#sliderBtn; // Move

        btn.addEventListener('mousedown', e => {
            e.stopPropagation();
            e.preventDefault();
            const abbController = new AbortController(); //Move

            this.#oldClientX = 0;
            this.#slide(abbController);

            window.addEventListener('mouseup', e => {
                e.stopPropagation();
                abbController.abort();
            }, {signal: abbController.signal});

        });
    }

    #slide(abbController) {
        const btn = this.#sliderBtn;

        window.addEventListener('mousemove', e => {
            e.stopPropagation();
            e.preventDefault();
            if(e.clientX > this.#oldClientX) {

                if(this.#oldClientX != 0 && this.#moveRange < this.#sliderWidth) {
                    this.#moveRange  += (e.clientX - this.#oldClientX);
                    this.#actualRange += this.#increaseAmount * (e.clientX - this.#oldClientX);
                }

                if(this.#moveRange  > this.#sliderWidth) {
                    this.#moveRange  = this.#sliderWidth;
                    this.#actualRange = this.#maxValue;
                    btn.style.left = `${this.#sliderWidth}px`;
                } else {
                    btn.style.left = `${this.#moveRange}px`;
                }
            }
            
            if(e.clientX < this.#oldClientX) {
                
                if(this.#oldClientX != 0 && this.#moveRange  > this.#minRange) {
                    this.#moveRange  -= (this.#oldClientX - e.clientX);
                    this.#actualRange -= this.#increaseAmount * (this.#oldClientX - e.clientX);
                }
                
                if(this.#moveRange  < this.#minRange) {
                    this.#moveRange  = this.#minRange;
                    this.#actualRange = 0;
                    btn.style.left = `${this.#minRange}px`;
                } else {
                    btn.style.left = `${this.#moveRange}px`;
                }
            }

            if(typeof(this.onSlide) == 'function') {
                this.onSlide(Math.abs(this.#actualRange.toFixed(0)));
            }

            this.#oldClientX = e.clientX;

        }, {signal: abbController.signal});
    }
}

export { Slider }