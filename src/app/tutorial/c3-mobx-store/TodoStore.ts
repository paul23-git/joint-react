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


    increaseFooCount() {
        const c = this.complex_count.get("foo") || 0;
        this.complex_count.set("foo", c + 1);
    }
    increaseHelloCount() {
        const c = this.complex_count.get("hello") || 0;
        this.complex_count.set("foo", c + 1);
    }


    async delayedToggleNoRunInAction() {
        await asyncTimeout(0.5);
        // Code here is after an await, thus it is no longer ran in the same event loop as the "action"
        // This will hence give a warning
        this.finished = !this.finished;
    }
    async delayedToggle() {
        await asyncTimeout(0.5);
        runInAction(() => {
            // Code here is after an await, thus it is no longer ran in the same event loop as the "action"
            // By putting it again in an action we prevent the warning and tell mobx to execute it while we are not rendering
            this.finished = !this.finished;
        });
    }
}