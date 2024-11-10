import Image from "next/image";
import styles from "./page.module.css";
import {JointReactDiv} from "@/app/JointReactDiv";

export default function Home() {
    return (
        <main className={styles.main}>
            <JointReactDiv/>
        </main>
    );
}
