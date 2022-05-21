import { Component, createEffect, createSignal, Show, useContext } from 'solid-js';
import { createStore, SetStoreFunction, Store } from "solid-js/store";

import logo from './logo.svg';
import styles from './App.module.css';
import { AppContext, AppContextProvider, useAppContext } from './AppContext';
import { ListBrowser } from './components/ListBrowser';
import { ErrorBanner } from './components/ErrorBanner';





const App: Component = () => {

  const [content, setContent] = createSignal("")
  const [context] = useAppContext()

  return (
    <AppContextProvider>

      <div class={styles.container}>
        <div class={styles.nav}>
          <h2 class={styles.title}>Volos-Do</h2>
          <p  class={styles.gray}>A to-do site for the 21st century</p>
        </div>
        <div class={styles.content}>
          <ListBrowser />
          <div class={styles.main}>
            <Show when={context.selectedList !== null} fallback={<ErrorBanner />}>
            <input
              type='text'
              placeholder='Enter todo and click +'
              value={content()}
              onInput={(e) => setContent(e.currentTarget.value)} />
            </Show>

          </div>
        </div>
      </div>

    </AppContextProvider>
  );
};

export default App;
