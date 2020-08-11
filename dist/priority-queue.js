"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lower_bound_1 = require("./lower-bound");
class PriorityQueue {
    constructor() {
        this._queue = [];
        this.element = {};
    }
    enqueue(run, options) {
        options = Object.assign({ priority: 0, action:"",options:{},sent:false}, options);
        const element = {
            priority: options.priority,
            options:options.options,
            sent : options.sent,
            action : options.action,
            run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
            this._queue.push(element);
            return;
        }
        const index = lower_bound_1.default(this._queue, element, (a, b) => b.priority - a.priority);
        this._queue.splice(index, 0, element);
    }
    dequeue() {
        this.element = {action: this._queue[0].action, options:this._queue[0].options, sent: this._queue[0].sent};
        const item = this._queue.shift();
        return item === null || item === void 0 ? void 0 : item.run;
    }
    get current(){
        return this.element;
    }
    filter(options) {
        return this._queue.filter((element) => element.priority === options.priority).map((element) => element.run);
    }
    get size() {
        return this._queue.length;
    }
}
exports.default = PriorityQueue;
