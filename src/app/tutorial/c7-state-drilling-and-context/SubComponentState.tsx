import {BoxedDiv, ElemDiv, TextDiv} from "@/app/tutorial/Styled";
import {useContext, useRef} from "react";
import {SimpleTextualContext} from "@/app/tutorial/c7-state-drilling-and-context/SimpleTextualContext";

type Level1InBetweenPropTy = {
    outerInputValue: string,
}

export const Level1InBetween = (props: Level1InBetweenPropTy) => {
    const {outerInputValue} = props;
    return <BoxedDiv>
        Drilling deeper, level 1
        <Level2InBetween outerInputValue={outerInputValue}/>
    </BoxedDiv>
}

type Level2InBetweenPropTy = {
    outerInputValue: string,
}
const Level2InBetween = (props: Level2InBetweenPropTy) => {
    const {outerInputValue} = props;
    return <BoxedDiv>
        Drilling deeper, level 2
        <SubComponent outerInputValue={outerInputValue}/>
    </BoxedDiv>
}

type SubComponentPropTy = {
    outerInputValue: string,
}
export const SubComponent = (props: SubComponentPropTy) => {
    const renderCount = useRef(0);
    const {outerInputValue} = props;

    renderCount.current += 1;
    console.log("rerender in sub component");

    return <BoxedDiv>
        <ElemDiv>
            <TextDiv>
                {"Render count: " + renderCount.current}<br/>
                {"The text in the inputbox is: " + outerInputValue}
            </TextDiv>
        </ElemDiv>
    </BoxedDiv>
}