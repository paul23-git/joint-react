import {action, makeObservable, observable, runInAction} from "mobx";

function asyncTimeout(ms: number) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

export class Todo {
    id = Math.random();
    title = "";
    finished = false;
    complex_count = observable.map();

    constructor(title: string) {
        makeObservable(this, {
            title: observable,
            finished: observable,
            toggle: action,
            increaseFooCount: action,
            increaseHelloCount: action,
            delayedToggleNoRunInAction: action,
            delayedToggle: action,
        });
        this.title = title;
    }

    toggle() {
        this.finished = !this.finished
    }
    async delayedToggleNoRunInAction() {
        await asyncTimeout(0.5);
        this.finished = !this.finished;
    }
    async delayedToggle() {
        await asyncTimeout(0.5);
        runInAction(() => {
            this.finished = !this.finished;
        });
    }


    increaseFooCount() {
        const c = this.complex_count.get("foo") || 0;
        this.complex_count.set("foo", c + 1);
    }
    increaseHelloCount() {
        const c = this.complex_count.get("hello") || 0;
        this.complex_count.set("hello", c + 1);
    }
}