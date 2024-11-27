import {observer} from "mobx-react-lite";
import {useRef} from "react";
import {TextDiv} from "@/app/tutorial/Styled";
import type {Todo} from "@/app/tutorial/c4-mobx-store-nested/TodoStore";

export const SubFooComponent = observer((props: { todoStore: Todo }) => {
    const {todoStore} = props;
    const renderCount = useRef(0);

    renderCount.current += 1;

    return <>
        <TextDiv><b>
            {"Rerender Foo count: " + renderCount.current.toString()}
        </b></TextDiv>
        <div><b>Foo: </b>{todoStore.complex_count.get("foo") || 0}
            <button onClick={e => todoStore.increaseFooCount()}>Increase Foo count</button>
        </div>
    </>
});