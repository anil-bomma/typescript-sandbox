import React, { useEffect } from "react";
import pizzas from "../data/pizzas.json";

import Pizza from "./Pizza";
import Cart from "./Cart"

import styles from "./App.module.css"
import PizzaLogo from "../svg/pizza.svg";

import { AppStateProvider } from "./AppState";
import SpecialOffer from "./SpecialOffer";

const App = () => {
    // // @ts-expect-error
    // window.hello(); // source map is enable for great debugging

    const splPizza = pizzas.find(pizza => pizza.specialOffer);
    return (
        <AppStateProvider>
            <div className={styles.container}>
                <div className={styles.header}>
                    <PizzaLogo width={120} height={120} />
                    <div className={styles.siteTitle}> D' Pizza</div>
                    <Cart />
                </div>
                <ul>
                    {splPizza && <SpecialOffer pizza={splPizza}></SpecialOffer>}
                    {pizzas.map(pizza =>
                        <Pizza key={pizza.id} pizza={pizza}></Pizza>
                    )}
                </ul>
            </div>
        </AppStateProvider>
    );
};

export default App;