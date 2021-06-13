import React from "react";
import PizzaCss from "./Pizza.module.css";

import { useSetState, useDispatchAction } from "./AppState"
import { IAddToCartProps, withAddToCart } from "./AddToCartHOC";

export interface IPizza {
    id: number;
    name: string;
    description: string;
    price: number
}

interface IProps extends IAddToCartProps {
    pizza: IPizza
}

const Pizza: React.FC<IProps> = ({ pizza, addToCart }) => {
    // my custome hook uses AppSetState consumer and will use setSate method
    const setState = useSetState();
    const dispatch = useDispatchAction();

    const handleAddToCartClick = () => {
        // this is not graet as we need to define the whole state and can use logic in other components 
        // lets build useReducer hook where we can export/import logic across components

        // setState((prevState) => {
        //     return {
        //         ...prevState,
        //         cart: {
        //             ...prevState.cart,
        //             items: [
        //                 ...prevState.cart.items,
        //                 {
        //                     id: pizza.id,
        //                     name: pizza.name,
        //                     price: pizza.price
        //                 }
        //             ]
        //         }
        //     }
        // });

        // now lets use myReducer and dispatch the action by sending type and payload
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                item: { id: pizza.id, name: pizza.name, price: pizza.price }
            }
        });
    };

    return <li className={PizzaCss.container}>
        <h2>{pizza.name}</h2>
        <h4>{pizza.description}</h4>
        <h4>{pizza.id}</h4>
        <h4>{pizza.price}</h4>
        {/* <button onClick={handleAddToCartClick}>Add to cart</button> */}
        {/* HOC wrap component and getting addToCart from props */}
        <button onClick={() => { addToCart({ id: pizza.id, name: pizza.name, price: pizza.price }) }}>Add to cart</button>

    </li>
};

// export default Pizza;
export default withAddToCart(Pizza); // need to make some changes in App also -- search for 2important
