/* eslint-disable react/no-unescaped-entities */
import {useContext} from "react";
import {AdvancedCtx} from "@/app/tutorial/AdvancedContext";
import {BoxedDiv, CodeSpan, ElemDiv, TextDiv} from "@/app/tutorial/Styled";
import flow from "./flow.png"
import Image from "next/image";

export const Conclusion = () => {
    const advanced = useContext(AdvancedCtx);

    return <BoxedDiv>
        <TextDiv>
            We discussed several different ways to manage state, in this conclusion the different advantages of each method are listed:
            <ul>
                <li><CodeSpan>useState()</CodeSpan>:
                    Simple and direct. Ideal for simple state that is used in the component itself of near direct
                    children. Perfect for small state if modification often means rewrite the whole state anyways.
                </li>
                <li><CodeSpan>useContext()</CodeSpan>:
                    Useful to pass state to deeper context. Ideal when state is not often modified, and mostly read.<br/>
                    Second use is to actually pass mobx (state tree) stores around.
                </li>
                <li><CodeSpan>MobX store</CodeSpan>:
                    Whenever state becomes complex, and we need it at many places around the application.
                    Yet the store is stand alone and not really part of the big complex "state tree".
                    Or when performance is required (about 5 times as fast as MST for decent large stores).
                </li>
                <li><CodeSpan>mobx state tree</CodeSpan>:
                    Whenever state becomes more complex, and we need it at many places. And the whole tree is actually
                    part of the general application "state". MST also provides help with validating the types, making sure
                    the when data is sent it has broadly the right structure.
                </li>
                <li><CodeSpan>useLocalObservable()</CodeSpan>:
                    Whenever state becomes complex, yet we only need it locally in a component, or it's near direct children.<br/>
                    Use this method sparingly.
                </li>
            </ul>
        </TextDiv>
        {/* ADVANCED */}
        {advanced && <>
            <ElemDiv>
                <TextDiv>
                    Below flow graph should help making a decision:
                    <Image src={flow} alt={"flow"}/>
                </TextDiv>
            </ElemDiv>
        </>}
        {/* END-ADVANCED */}
    </BoxedDiv>
}
