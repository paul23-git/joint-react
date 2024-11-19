'use client'

import styles from "./page.module.css";
import {JointReactDiv} from "@/app/JointReactDiv";
import React, {useState} from "react";
import {ShowReactStates} from "@/app/ShowReactStates";

export default function Home() {
    const [showTutorial, setShowTutorial] = useState();
    return (
        <main className={styles.main}>
            {showTutorial ?
                <JointReactDiv/> :
                <ShowReactStates/>
            }
        </main>
    );
}
