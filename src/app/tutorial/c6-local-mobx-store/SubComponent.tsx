import {observer} from "mobx-react-lite";
import {useRef} from "react";
import {TextDiv} from "@/app/tutorial/Styled";

export const SubComponent = observer((props: { data: any }) => {
    const {data} = props;
    const renderCount = useRef(0);

    renderCount.current += 1;

    function onClick() {
        data.base += 1;
    }

    return <>
        <TextDiv><b>
            {"Rerender SubComponent count: " + renderCount.current.toString()}
        </b><br/>
            {"Count (base) " + data.base }</TextDiv>
        <div>
            <button onClick={onClick}>Click me!</button>
        </div>
    </>
});