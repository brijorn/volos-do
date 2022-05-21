import { Component, createEffect, createSignal, For, Show, useContext } from "solid-js";
import { AppContext, useAppContext } from "../AppContext";

import styles from "./ListBrowser.module.css"
import { TodoList } from "./TodoList";
export const ListBrowser: Component = () => {
    const [content, setContent] = createSignal("")
    const [context, { newList }] = useAppContext()

    const inputStyle = () => {
        const base = `${styles.input} `
        if (content().length > 0) return base

        return base + styles.rounded
    }
    const buttonStyle = () => {
        const base = `${styles.add} `
        console.log(base)
        if (content().length > 0) return base + styles.show

        return base + styles.hide
    }

    const createList = () => {

        if (content().length == 0) return;
        newList(content())
        setContent("")
    }

    const select = (id: string) => {
        
    }

    return (
        <div class={styles.container}>
            <div class={styles.create}>
                <input
                    class={inputStyle()}
                    type='text'
                    placeholder='Enter new List name'
                    value={content()}
                    onInput={(e) => setContent(e.currentTarget.value)}
                />
                <button class={buttonStyle()} onClick={() => createList()}>Add</button>
            </div>

            <div class={styles.browser}>
                <Show when={context.lists.length > 0}>
                    <div class={styles.lists}>
                        <For each={context.lists}>
                            {item => <TodoList 
                            id={item.id}
                            name={item.name} 
                            todoCount={item.todos.length} 
                             />}
                        </For>
                    </div>

                </Show>
                <Show when={context.lists.length == 0}><h4 style={{ color: "#666666" }}>You have no to-do lists..</h4></Show>
            </div>
        </div>

    )
}