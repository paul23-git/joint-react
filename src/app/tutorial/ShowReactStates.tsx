import {ElementType, Fragment, ReactNode, useState} from "react";
import styled from "styled-components";
import {ComplexState} from "@/app/tutorial/complex-state/ComplexState";
import {SimpleState} from "@/app/tutorial/state-and-ref/SimpleState";

type tabType = {
    label: ReactNode,
    component: ElementType<{tabKey: string | number}>,
    tabKey: string | number,
}

const HeaderDiv = styled.div`
    width: 100%;
    flex: 0;
    display: flex;
    padding-right: 4px;
    padding-left: 4px;
    border-bottom: 1px black solid;
`
const DefaultTab = styled.div`
    display: inline-flex;
    justify-content: center;
    flex-grow: 1;
    padding-left: 4px;
    padding-right: 4px;
    min-width: 100px;
    cursor: pointer;
`
const SelectedTab = styled.div`
    display: inline-flex;
    justify-content: center;
    flex-grow: 1;
    padding-left: 4px;
    padding-right: 4px;
    color: blue;
    border-bottom: 3px black solid;
    cursor: pointer;
    min-width: 100px;
`

const TabContentDiv = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: white;
    overflow: auto;
`

export const ShowReactStates = () => {
    const [visibleTab, setVisibleTab] = useState<string|number>(0);

    const tabs:tabType[] = [{
        tabKey: -1,
        label: "useState and useRef",
        component: SimpleState,
    }, {
        tabKey: 0,
        label: "complex-state",
        component: ComplexState,
    }, {
        tabKey: 1,
        label: "mobx-store",
        component: SimpleTab,
    }, {
        tabKey: 2,
        label: "mobx-state-tree",
        component: SimpleTab,
    }, {
        tabKey: 3,
        label: "local-mobx-store",
        component: SimpleTab,
    }, {
        tabKey: 4,
        label: "state-drilling",
        component: SimpleTab,
    }, {
        tabKey: 5,
        label: "Conclusion",
        component: SimpleTab,
    },]

    const DisplayComp = tabs.find((t) => t.tabKey === visibleTab)?.component

    return <div style={{
        flex: "1 1",
        display: 'flex',
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
    }}>
        <HeaderDiv>
            {tabs.map((tab) => {
                return <Fragment key={tab.tabKey}>{tab.tabKey === visibleTab ?
                    <SelectedTab key={tab.tabKey} onClick={() => setVisibleTab(tab.tabKey)}>{tab.label}</SelectedTab> :
                    <DefaultTab key={tab.tabKey} onClick={() => setVisibleTab(tab.tabKey)}>{tab.label}</DefaultTab>
                }</Fragment>
            })}

        </HeaderDiv>
        <TabContentDiv>
            {DisplayComp && <DisplayComp tabKey={visibleTab}/>}
        </TabContentDiv>
    </div>
}

export const SimpleTab = (props: {tabKey: string | number}) => {
    return <div>{"simple component " + props.tabKey.toString()}</div>
}