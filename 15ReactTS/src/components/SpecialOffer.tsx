import React from "react";
import PizzaCss from "./Pizza.module.css";
import { IPizza } from "./Pizza"

import { useDispatchAction } from "./AppState"
import { IAddToCartProps, withAddToCart, WithAddToCartProps } from "./AddToCartHOC";

// ßßßßtype-1HOC
// interface IProps extends IAddToCartProps {
//     pizza: IPizza
// }

interface IProps {
    pizza: IPizza;
    addToCart?: any
}

const SpecialOffer: React.FC<IProps> = ({ pizza, addToCart }) => {

    // this logic is duplicate, common between the pizza and speacial pizza
    // lets create HOC and use pass this commit peace through props
    // wrap both the component and can access code using props 
    // *******************
    const dispatch = useDispatchAction();
    const handleAddToCartClick = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                item: { id: pizza.id, name: pizza.name, price: pizza.price }
            }
        });
    };

    return <li className={PizzaCss.container2}>
        <h2>{pizza.name}</h2>
        <h4>{pizza.description}</h4>
        <h4>{pizza.id}</h4>
        <h4>{pizza.price}</h4>
        {/* <button onClick={handleAddToCartClick}>Add to cart</button> */}
        {/* this is used for HOC type-1 wrap */}
        {/* <button onClick={() => { addToCart({ id: pizza.id, name: pizza.name, price: pizza.price }) }}>Add to cart</button> */}
        
        {/* this is using HOC render props patten */}
        <WithAddToCartProps>
            {({addToCart}) => {
                return <button onClick={() => { addToCart({ id: pizza.id, name: pizza.name, price: pizza.price }) }}>Add to cart</button>
            }}
        </WithAddToCartProps>
    </li>
};

export default SpecialOffer; // HOC type-2 render props pattren
// export default withAddToCart(SpecialOffer); // this is using type -1


