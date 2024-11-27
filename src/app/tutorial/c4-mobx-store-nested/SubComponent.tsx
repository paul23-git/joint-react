import {observer} from "mobx-react-lite";
import {useRef} from "react";
import {TextDiv} from "@/app/tutorial/Styled";
import type {Todo} from "@/app/tutorial/c4-mobx-store-nested/TodoStore";

export const SubComponent = observer((props: { todoStore: Todo }) => {
    const {todoStore} = props;
    const renderCount = useRef(0);

    renderCount.current += 1;

    return <>
        <TextDiv><b>
            {"Rerender count: " + renderCount.current.toString()}
        </b></TextDiv>
        <div><b>Todo: </b>{todoStore.title}</div>
        <div><b>finished: </b>
            <input checked={todoStore.finished}
                   type={"checkbox"}
                   onChange={e => todoStore.toggle()}/>
        </div>
    </>
});