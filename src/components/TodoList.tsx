import { Component, createEffect, Show } from "solid-js";
import { useAppContext } from "../AppContext";
import styles from "./TodoList.module.css"
interface ListProps {
    id: string,
    name: string,
    todoCount: number,
}
export const TodoList: Component<ListProps> = (props) => {
    const [context, { selectList, deleteList }] = useAppContext()

    const tense = (num: number) => {
        if (num == 1) return "Todo"
        return "Todos"
    }

    const listStyle = () => {
        const base = `${styles.header} `

        if (context.selectedList == props.id) return base + styles.selected

        return base + styles.unselected
    }

    return (
        <div class={styles.list} onClick={() => selectList(props.id)}>
            <div class={listStyle()} >
                <span class={styles['title']}>{props.name}</span>
                <span class={styles['count']}>{props.todoCount} {tense(props.todoCount)}</span>

            </div>
            <Show when={context.selectedList == props.id}>
                <button class={styles.delete} onClick={() => deleteList(props.id)}>Delete</button>
            </Show>
        </div>

    )
}