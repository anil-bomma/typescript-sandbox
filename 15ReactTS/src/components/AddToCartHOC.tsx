import React from "react";
import { render } from "react-dom";
import { ICart, useDispatchAction } from "./AppState";

export interface IAddToCartProps {
    addToCart: (item: ICart) => void
}

// HOC created and used withWrap --- TYPE-1
export function withAddToCart<OriginalProps extends IAddToCartProps>(
    ChildComponent: React.ComponentType<OriginalProps>
) {

    // 2important to make changes in App component we are omiting the extra fucntions adding in HOC
    // Omit<OriginalProps, keyof IAddToCartProps> this will fix error in App
    const AddToCartHOC = (props: Omit<OriginalProps, keyof IAddToCartProps>) => {
        const dispatch = useDispatchAction();
        const handleAddToCartClick: IAddToCartProps['addToCart'] = (item) => {
            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    item
                }
            });
        };

        return (
            // 2important error
            <ChildComponent {...props as OriginalProps} addToCart={handleAddToCartClick} />
        )
    };

    return AddToCartHOC;
}


// HOC created and used render props component --- TYPE-2
export const WithAddToCartProps: React.FC<{
    children: (props: IAddToCartProps) => JSX.Element
}> = ({ children }) => {
    const dispatch = useDispatchAction();
    const addToCart: IAddToCartProps['addToCart'] = (item) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                item
            }
        });
    };

    return children({ addToCart });
};


// Custome Hook -- TYPE-3

export const useAddToCart = () => {
    const dispatch = useDispatchAction();
    const addToCart: IAddToCartProps['addToCart'] = (item) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                item
            }
        });
    };

    return addToCart;
}

// usage -- simple
// import useAddToCart;
// const addToCart = useAddToCart();

