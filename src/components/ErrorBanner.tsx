import { Component } from "solid-js";
import styles from "./ErrorBanner.module.css"
export const ErrorBanner: Component = () => {
    return (
        <div class={styles.banner}>
           <span class={styles.title}>No List Currently Selected </span>
           <div class={styles.description}>
               Create one using the left panel to begin creating to-dos!
           </div>
        </div>
    )
}