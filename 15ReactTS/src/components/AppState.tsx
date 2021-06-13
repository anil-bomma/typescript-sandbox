import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

export interface ICart {
    name: string;
    price: number;
    id: number
}
interface IAppStateValue {
    cart: {
        items: ICart[]
    }
}

const defaultState: IAppStateValue = {
    cart: {
        items: []
    }
}

// create context has both provider and consumer
// provider is HOC wrap around the component where consumer is allowed to use
export const AppStateContext = createContext<IAppStateValue>(defaultState);
// we want to send 2 diffrent context for state, setState optimization
// if you want  type look into setState type

// ***************
// export const AppSetStateContext = createContext<React.Dispatch<React.SetStateAction<IAppStateValue>> | undefined>(undefined);0
export const AppSetStateContext = createContext<React.Dispatch<AddToCartAction> | undefined>(undefined);

// HOC higger order component
// create HOC provider which we will wrap our app component
// we will use teh AppStateContext for creating the Consumer where we need to access the state
// in cart we used consumer as class compnent and in pizza we used hook to access the state
export const AppStateProvider: React.FC = ({ children }) => {

    // const [state, setState] = useState<IAppStateValue>(defaultState);

    // now let use useReduce and call dispatch methos 
    const [state, dispatch] = useReducer(myReducer, defaultState);

    // this will laod from local store
    useEffect(() => {
        console.log("cart useEffect called loading from cart");
        const cart = window.localStorage.getItem("cart");
        // now call the dispatch action method to setState
        if (cart) {
            dispatch({
                type: "INTIALIZE_CART",
                payload: { cart: JSON.parse(cart) }
            });
        }
    }, []); // call's only once because of empty [] after inatial render -- calling also important when you call

    // this will save the state in local store
    useEffect(() => {
        console.log("cart useEffect called saving into cart");
        window.localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state.cart]);


    return (
        <AppStateContext.Provider value={state}>
            {/* here we are passing setState as context noe App has access for both state and setState */}
            {/* <AppSetStateContext.Provider value={setState} > */}
            <AppSetStateContext.Provider value={dispatch} >
                {children}
            </AppSetStateContext.Provider>
        </AppStateContext.Provider>
    );
};


// creating custom hook and used in pizza to add to cart by using context
export const useSetState = () => {
    const setState = useContext(AppSetStateContext);

    // comment this below line and see the type it will show undefined
    if (!setState) {
        throw new Error("AppSetStateContext is call before it intilized")
    }
    return setState;
}

// creating useReducer hook kind of code clean up can export functions
// update state with some action for better code

interface IAction<T> {
    type: T
}

interface AddToCartAction extends IAction<'ADD_TO_CART'> {
    payload: {
        item: ICart
    }
}

interface IntilizeCartAction extends IAction<'INTIALIZE_CART'> {
    payload: {
        cart: IAppStateValue['cart']
    }
}

export const myReducer = (state: IAppStateValue, action: AddToCartAction | IntilizeCartAction) => {
    if (action.type === "ADD_TO_CART") {
        // bring logic from setState and paste here
        const prevState = state;
        const pizza = action.payload.item;
        return {
            ...prevState,
            cart: {
                ...prevState.cart,
                items: [
                    ...prevState.cart.items,
                    {
                        id: pizza.id,
                        name: pizza.name,
                        price: pizza.price
                    }
                ]
            }
        };
    }

    if (action.type === "INTIALIZE_CART") {
        return {
            ...state,
            cart: action.payload.cart
        };
    }

    return state;
};

// creating custom hook and used in pizza to add to cart by using context
export const useDispatchAction = () => {
    const dispatch = useContext(AppSetStateContext);

    // comment this below line and see the type it will show undefined
    if (!dispatch) {
        throw new Error("AppSetStateContext is call before it intilized")
    }
    return dispatch;
}
