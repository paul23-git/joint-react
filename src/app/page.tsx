'use client'

import styles from "./page.module.css";
import React, {useState} from "react";
import {ShowReactStates} from "@/app/tutorial/ShowReactStates";
import {AdvancedCtx} from "@/app/tutorial/AdvancedContext";

export default function Home() {
    const [showTutorial, setShowTutorial] = useState(true);
    const [advanced, setAdvanced] = useState(false);

    function handleChange() {
        setShowTutorial((value) => {
            return !value;
        })
    }
    function handleChangeAdvanced() {
        setAdvanced((value) => {
            return !value;
        })
    }

    return (
        <main className={styles.main}>
            <AdvancedCtx.Provider value={advanced}>
                <div style={{
                    width: "100%",
                    height: "calc(100vh - 8rem)",
                    position: "relative",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div style={{flex: '0 0'}}>
                        <label>Show tutorial </label>
                        <input type={"checkbox"} checked={showTutorial} onChange={handleChange}/>
                    </div>
                    <div style={{flex: '0 0'}}>
                        <label>Advanced tutorial </label>
                        <input type={"checkbox"} checked={advanced} onChange={handleChangeAdvanced}/>
                    </div>
                    {showTutorial ?
                        <ShowReactStates/> :
                        <div style={{flex: '1 1'}}>thing</div>
                    }
                </div>
            </AdvancedCtx.Provider>
        </main>
    );
}
