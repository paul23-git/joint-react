/* eslint-disable react/no-unescaped-entities */
'use client'

import {useContext, useRef, useState} from "react";
import {ElemDiv, TextDiv} from "@/app/tutorial/Styled";
import {AdvancedCtx} from "@/app/tutorial/AdvancedContext";
import {observer} from "mobx-react-lite";
import {runInAction} from "mobx";
import {Todo} from "@/app/tutorial/c4-mobx-store-nested/TodoStore";
import {SubComponent} from "@/app/tutorial/c4-mobx-store-nested/SubComponent";
import {BoxedDiv} from "@/app/tutorial/Styled";
import {BaseTy} from "@/app/tutorial/c6-local-mobx-store/types";
import {StateBasedFooComponent} from "@/app/tutorial/c4-mobx-store-nested/StateBasedFooComponent";
import {StateBasedHelloComponent} from "@/app/tutorial/c4-mobx-store-nested/StateBasedHelloComponent";
import {StoreBasedFooComponent} from "@/app/tutorial/c4-mobx-store-nested/StoreBasedFooComponent";
import {StoreBasedHelloComponent} from "@/app/tutorial/c4-mobx-store-nested/StoreBasedHelloComponent";



export const MobxComplexState = observer((props: {tabKey: string | number}) => {
    const advanced = useContext(AdvancedCtx);
    const renderCount = useRef(0);
    const todoStoreRef = useRef(new Todo("Hello world"));

    /* ADVANCED */
    const [stateVersion, setStateVersion] = useState<BaseTy>(() => {
        return {
            foo: 0,
            hello: 0,
            base: 0,
        }
    })
    /* END-ADVANCED */

    const todoStore = todoStoreRef.current;

    renderCount.current += 1;

    function handleDirectToggle() {
        // Notice that this will lead to a warning.
        todoStore.finished = !todoStore.finished;
    }
    function handleRunInActionToggle() {
        // This works without warning
        runInAction(() => {
            todoStore.finished = !todoStore.finished;
        })
    }


    return <BoxedDiv>
        <TextDiv>
            Mobx takes care of knowing when to update what element, most of the time you should not have to think about
            this.
            However there are some details you should keep in mind, and three important rules:<br/>
            <ul>
                <li>Use small, minimal component size!</li>
                <li>Each react component should be an observer</li>
                <li>Each react component should not be a store. Do not mix "observer" and "observable"/"computed"</li>
            </ul>
        </TextDiv>
        <hr/>
        <ElemDiv>
            <TextDiv><b>
            {"Rerender count: " + renderCount.current.toString()}
            </b></TextDiv>
            <TextDiv>
                Components are only rerendered if the *observable* state they use is updated. Any change to the store not visible
                in the component will not trigger a rerender. <br/>
                <br/>
                This is one of the major advantages of mobx, and for this reason it is of vital importance
                to make react components as small as possible.
            </TextDiv>
            <div>
                <hr/>
                <SubComponent todoStore={todoStore}/>
                <hr/>
            </div>
        </ElemDiv>


        {/* ADVANCED */}
        {advanced && <ElemDiv>
            <TextDiv><b>
                {"Rerender count: " + renderCount.current.toString()}
            </b></TextDiv>
            <TextDiv>
                We will to compare the difference between using mobx store and using a state here. <br/>
                The first two use normal states, as explained in tutorial 3.<br/>
                The bottom two use observable stores. <br/>
                <br/>
                Notice the difference in which are rerendered when we press them.
            </TextDiv>
            <hr/>
            <StoreBasedFooComponent data={todoStore}/>
            <StoreBasedHelloComponent data={todoStore}/>
            <hr/>
            <StateBasedFooComponent data={stateVersion} setData={setStateVersion}/>
            <StateBasedHelloComponent data={stateVersion} setData={setStateVersion}/>

        </ElemDiv>}
        {/* END-ADVANCED */}
    </BoxedDiv>
});


