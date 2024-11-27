import {observer} from "mobx-react-lite";
import {useRef} from "react";
import {TextDiv} from "@/app/tutorial/Styled";
import {runInAction} from "mobx";
import {BaseTy} from "@/app/tutorial/c6-local-mobx-store/types";




export const StoreBasedFooComponent = observer((props: { data: BaseTy }) => {
    const {data} = props;
    const renderCount = useRef(0);

    renderCount.current += 1;

    function onClick() {
        // Notice that we update the store, but only this component rerenders.
        runInAction(() => {
            data.foo += 1;
        })
    }

    return <>
        <TextDiv><b>
            {"Rerender SubComponent count: " + renderCount.current.toString()}
        </b><br/>
            {"Count (foo) " + data.foo }</TextDiv>
        <div>
            <button onClick={onClick}>Click me!</button>
        </div>
    </>
});