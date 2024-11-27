import {BoxedDiv, ElemDiv, TextDiv} from "@/app/tutorial/Styled";
import {useContext, useRef} from "react";
import {SimpleTextualContext} from "@/app/tutorial/c7-state-drilling-and-context/SimpleTextualContext";

export const Level1InBetween = () => {
    return <BoxedDiv>
        Drilling deeper, level 1
        <Level2InBetween/>
    </BoxedDiv>
}
const Level2InBetween = () => {
    return <BoxedDiv>
        Drilling deeper, level 2
        <SubComponent/>
    </BoxedDiv>
}
export const SubComponent = () => {
    const renderCount = useRef(0);
    const outerInputValue = useContext(SimpleTextualContext)

    renderCount.current += 1;
    console.log("rerender in sub component");

    return <BoxedDiv>
        <ElemDiv>
            <TextDiv>
                {"The text in the inputbox is: " + outerInputValue}
            </TextDiv>
        </ElemDiv>
    </BoxedDiv>
}