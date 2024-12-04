import {observer} from "mobx-react-lite";
import {useRef} from "react";
import {TextDiv} from "@/app/tutorial/Styled";
import type {Todo} from "@/app/tutorial/c4-mobx-store-nested/TodoStore";

export const StoreBasedHelloComponent = observer((props: { data: Todo }) => {
    const {data} = props;
    const renderCount = useRef(0);

    renderCount.current += 1;

    return <>
        <TextDiv><b>
            {"Rerender Store-SubComponent count: " + renderCount.current.toString()}
        </b></TextDiv>
        <div><b>Foo: </b>{data.complex_count.get("hello") || 0}
            <button onClick={e => data.increaseHelloCount()}>Increase Hello count</button>
        </div>
    </>
});