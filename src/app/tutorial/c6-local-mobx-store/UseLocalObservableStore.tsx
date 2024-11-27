/* eslint-disable react/no-unescaped-entities */
'use client'

import {useContext, useRef, useState} from "react";
import {CodeSpan, TextDiv, ElemDiv} from "@/app/tutorial/Styled";
import {AdvancedCtx} from "@/app/tutorial/AdvancedContext";
import {observer, useLocalObservable} from "mobx-react-lite";
import {SubComponent} from "@/app/tutorial/c6-local-mobx-store/SubComponent";
import {StoreBasedFooComponent} from "@/app/tutorial/c6-local-mobx-store/StoreBasedFooComponent";
import {StoreBasedHelloComponent} from "@/app/tutorial/c6-local-mobx-store/StoreBasedHelloComponent";
import {StateBasedFooComponent} from "@/app/tutorial/c6-local-mobx-store/StateBasedFooComponent";
import {StateBasedHelloComponent} from "@/app/tutorial/c6-local-mobx-store/StateBasedHelloComponent";
import {BaseTy} from "@/app/tutorial/c6-local-mobx-store/types";
import {BoxedDiv} from "@/app/tutorial/Styled";


export const UseLocalObservableStore = observer((props: {tabKey: string | number}) => {
    const advanced = useContext(AdvancedCtx);
    const renderCount = useRef(0);
    const storeVersion = useLocalObservable(() => {
        return {
            foo: 0,
            hello: 0,
            base: 0,
        }
    })
    /* ADVANCED */
    const [stateVersion, setStateVersion] = useState<BaseTy>(() => {
        return {
            foo: 0,
            hello: 0,
            base: 0,
        }
    })
    /* END-ADVANCED */

    return <BoxedDiv>
        <TextDiv>
            Mobx and MST provide powerful utilities to optimize react rendering, and manage state. However sometimes creating
            a full store feels like a lot of boiler plate. Yet at the same time using state is a bit inefficient, and leads to multiple rerenders<br/>
            For this reason we can use <CodeSpan>useLocalObservable()</CodeSpan>. With this you can quickly create an observable state/store. <br/>
            <a href={"https://github.com/mobxjs/mobx-react#uselocalobservable-hook"}>See mobx-react-lite package for details</a>
        </TextDiv>
        <hr/>
        <ElemDiv>
            <TextDiv><b>
            {"Rerender count: " + renderCount.current.toString()}
            </b></TextDiv>
            <TextDiv>
                Notice that the main component is not rerendered, exactly the same as a normal mobx store would work.
            </TextDiv>
            <div>
                <hr/>
                <SubComponent data={storeVersion}/>
                <hr/>
            </div>
        </ElemDiv>


        {/* ADVANCED */}
        {advanced && <ElemDiv>
            <TextDiv><b>
                {"Rerender count: " + renderCount.current.toString()}
            </b></TextDiv>
            <TextDiv>
                We will to compare the differende between using mobx (local) store and using a state here. <br/>
                The first two use normal states, as explained in tutorial 3.<br/>
                The bottom two use observable stores. <br/>
                <br/>
                Notice the difference in which are rerendered when we press them.
            </TextDiv>
            <hr/>
            <StoreBasedFooComponent data={storeVersion}/>
            <StoreBasedHelloComponent data={storeVersion}/>
            <hr/>
            <StateBasedFooComponent data={stateVersion} setData={setStateVersion}/>
            <StateBasedHelloComponent data={stateVersion} setData={setStateVersion}/>
        </ElemDiv>}
        {/* END-ADVANCED */}
    </BoxedDiv>
});


