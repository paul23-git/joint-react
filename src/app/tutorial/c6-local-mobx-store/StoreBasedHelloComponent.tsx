import {observer} from "mobx-react-lite";
import {useRef} from "react";
import {TextDiv} from "@/app/tutorial/Styled";
import {BaseTy} from "@/app/tutorial/c6-local-mobx-store/types";

export const StoreBasedHelloComponent = observer((props: { data: BaseTy }) => {
    const {data} = props;
    const renderCount = useRef(0);

    renderCount.current += 1;

    function onClick() {
        // Notice that we update the store, but only this component rerenders.
        data.hello += 1;
    }

    return <>
        <TextDiv><b>
            {"Rerender Store-SubComponent count: " + renderCount.current.toString()}
        </b><br/>
            {"Count (hello) " + data.hello }</TextDiv>
        <div>
            <button onClick={onClick}>Click me!</button>
        </div>
    </>
});