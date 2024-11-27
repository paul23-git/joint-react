import {observer} from "mobx-react-lite";
import {Dispatch, SetStateAction, useRef} from "react";
import {TextDiv} from "@/app/tutorial/Styled";
import {BaseTy} from "@/app/tutorial/c6-local-mobx-store/types";


type PropTy = { data: BaseTy, setData: Dispatch<SetStateAction<BaseTy>> }

export const StateBasedFooComponent = observer((props: PropTy) => {
    const {data, setData} = props;
    const renderCount = useRef(0);

    renderCount.current += 1;

    function onClick() {
        // Notice that we update the state, everything regarding the state rerenders, all children
        // Even those which view different parts of the state.
        setData((oldState) => {
            const cloned_state = {...oldState};
            cloned_state.foo += 1;
            return cloned_state;
        });
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