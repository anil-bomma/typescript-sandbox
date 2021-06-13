import React, { createRef } from "react";

import { AppStateContext } from "./AppState";

interface IProps {

}

interface IState {
    isOpen: boolean
}


// type -- prop state snapshot 3types
export default class Cart extends React.Component<IProps, IState> {

    // ref is created to access and handle outside click
    #conatinerRef : React.RefObject<HTMLDivElement>;

    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false
        }
        // this.handleClick = this.handleClick.bind(this);

        this.#conatinerRef = createRef();
    }

    // need to register only once when the component mount
    // when cart is open nd click outside will has to close
    handleOutSideClick = (e: MouseEvent) => {
        if (this.#conatinerRef.current && !this.#conatinerRef.current.contains(e.target as Node)) {
        this.setState({ isOpen: false});
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutSideClick);
    }
    // let's remove this when component is removed
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutSideClick)
    }

    // useEffect(()=> {
    //     const lister = () => {
    //         alert("Hello")
    //     };
    //     document.addEventListener('mousedown', lister);
    //     return () => {
    //         document.removeEventListener('mousedown', lister)
    //     }
    // }, []); 

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e.target) // span --> eventTragetInteface
        console.log(e.currentTarget) // button
        if ((e.target as HTMLElement).nodeName == "SPAN") {
            // work with span
            // (e.target as HTMLSpanElement)
        }
        this.setState(
            (prevState) => ({ isOpen: !prevState.isOpen })
        )
    }

    render() {
        return (
            <AppStateContext.Consumer>{(state) => {
                return (
                    <div ref={this.#conatinerRef}>
                        <button type="button"
                            onClick={this.handleClick}>
                            <span>{state.cart.items.length} Pizza(s)</span>
                        </button>
                        <div style={{ display: this.state.isOpen ? 'block' : 'none' }}>
                            <ul>
                                <li>Deep Dish</li>
                                <li>Italian</li>
                                {state.cart.items.map(item => <li key={item.id}>{item.name}</li>)}
                            </ul>
                        </div>
                    </div>
                )
            }}</AppStateContext.Consumer>

        )
    }

}