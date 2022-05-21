import { createContext, createEffect, ParentComponent, useContext } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { v4 as uuidv4 } from 'uuid';
interface Todo {
    id: string,
    content: string,
}
interface TodoList {
    id: string,
    name: string,
    todos: Todo[],
}

interface AppContextInterface {
    lists: Store<TodoList[]>,
    selectedList: string | null,


}

type AppContextValue = [
    state: AppContextInterface,
    actions: {
        selectList(id: string): void;
        newList(name: string): void;
        deleteList(id: string): void;
    }
]
const defaultContext: AppContextInterface = {
    lists: [],
    selectedList: null,
}

function setContextValue(): AppContextInterface {
    if (localStorage.context) return JSON.parse(localStorage.context)

    return defaultContext
}

export const AppContext = createContext<AppContextValue>([
    defaultContext,
    {
        selectList: () => { },
        newList: () => { },
        deleteList: () => { }
    }
]);



export const AppContextProvider: ParentComponent = (props) => {
    const [state, setState] = createStore(setContextValue())


    const selectList = (id: string | null) => {
        setState({
            selectedList: id
        })
    }

    const newList = (name: string) => {
        setState('lists', [...state.lists, { id: uuidv4(), name, todos: [] }])
    }

    const deleteList = (id: string) => {
        selectList(null)
        setState({
            selectedList: null,
            lists: state.lists.filter(list => list.id !== id)
        })
    }

    const newTodo = (list: string, name: string) => {
        const listIndex = state.lists.findIndex(x => x.name == list)
        if (listIndex == -1) return;
    }

    createEffect(() => {
        localStorage.setItem('context', JSON.stringify(state))
    }, state)

    return (
        <AppContext.Provider value={[state, { selectList, newList, deleteList }]}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => { return useContext(AppContext) }

//     createEffect(() => (localStorage.todos = JSON.stringify(state)))