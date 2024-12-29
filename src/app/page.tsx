'use client'

import styles from "./page.module.css";
import {JointReactDiv} from "@/app/JointReactDiv";
import React, {useState} from "react";

export default function Home() {
    return (
        <main className={styles.main}>
            <JointReactDiv/>
        </main>
    );
}
