import { Option } from "./Option.js";
import { DrawTool } from "../../general/DrawTool.js";
import { ProgramManager } from "../../ProgramManager.js";
import { Settings } from "../settings/Settings.js";
import { Slider } from "../../general/Slider.js";

export class DrawOption extends Option {
    #draw = null;
    #toggle = false;
    #canvasTarget = null;
    #abortController = null;
    #canDraw = false;
    #onMove = null;
    #canvas = null;
    #paths = [];

    constructor(canvas_target) {
        super('Draw', 'draw-option');
        this.#canvasTarget = canvas_target;

        this.#onMove = this.#OnMove.bind(this);
        
        this.#canvas = canvas_target.GetCanvas();
        this.#draw = new DrawTool(canvas_target.GetCanvas(), canvas_target.GetElement());
    }

    Action() {
        this.#toggle = !this.#toggle;

        if(this.#toggle) {
            this.#canvasTarget.SetDraggable(false);
            this.#canvas.GetElement().style.pointerEvents = "auto";
            window.addEventListener('mousedown', this.#onMove, false);
            ProgramManager.cursorHandler.SetCursorType('circle');
        } else {
            this.#canvasTarget.SetDraggable(true);
            this.#canvas.GetElement().style.pointerEvents = "none";
            window.removeEventListener('mousedown', this.#onMove, false);
            ProgramManager.cursorHandler.SetCursorType('dark-arrow3');
        }

        window.addEventListener('keydown', e => {
            if(e.key == 'z') {
                this.RollBack();
            }
        })
    }

    GetSettings() {
        const settings = new Settings('Draw Settings');

        const valueText = document.createElement('p');
        valueText.textContent = '0px';

        const sliderGroup = document.createElement('div');
        sliderGroup.className = 'slider-group';

        const slider = new Slider(120, 30);
        slider.onSlide = (value) => {
            this.#draw.SetLineWidth(value);
            valueText.textContent = `${value}px`;
        }

        sliderGroup.append(slider.GetSliderElement(), valueText);

        settings.AddSetting(sliderGroup);

        return settings;
    }

    RollBack() {
        const currPath = this.#paths.pop();
        console.log(currPath);

        currPath.forEach(path => {
            this.#draw.Remove(path[0], path[1]);
        });
    }

    #OnMove(e) {
        e.stopPropagation();
        e.preventDefault();
        
        this.#canDraw = true;
        this.#draw.SetPosition(e.clientX, e.clientY);
        const path = [];

        this.#abortController = new AbortController();

        window.addEventListener('mousemove',  e=> {
            e.stopPropagation();
            e.preventDefault();

            path.push([e.clientX, e.clientY]);
            this.#draw.Draw(e.clientX, e.clientY);

        }, { signal: this.#abortController.signal });

        window.addEventListener('mouseup', e => {
            e.stopPropagation();
            e.preventDefault();
            this.#paths.push(path);
            this.#abortController.abort();
            console.log(this.#paths);

        }, { signal: this.#abortController.signal });
    }
}