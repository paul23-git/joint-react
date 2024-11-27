import { types, Instance } from "mobx-state-tree";
import {runInAction} from "mobx";

function asyncTimeout(ms: number) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

export const Todo = types.model("Todo", {
    id: types.frozen(Math.random()),
    title: types.optional(types.string, ""),
    finished: types.optional(types.boolean, false),
    complexCount: types.map(types.number),
}).actions((self) => ({
    toggle() {
        self.finished = !self.finished;
    },
    increaseFooCount() {
        const c = self.complexCount.get("foo") || 0;
        self.complexCount.set("foo", c + 1);
    },
    increaseHelloCount() {
        const c = self.complexCount.get("foo") || 0;
        self.complexCount.set("foo", c + 1);
    },
    async delayedToggleNoRunInAction() {
        await asyncTimeout(0.5);
        // Code here is after an await, thus it is no longer ran in the same event loop as the "action"
        // This will hence give an error
        self.finished = !self.finished;
    }
})).actions((self) => ({
    async delayedToggle() {
        await asyncTimeout(0.5);
        // Code here is after an await, thus it is no longer ran in the same event loop as the "action"
        // We cannot put it in an action directly as mst doesn't allow that
        // So we call another action instead, notice that for this we need to split actions though
        self.toggle();
    }
}));

type ITodo = Instance<typeof Todo>;