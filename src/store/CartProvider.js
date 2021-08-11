import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const CartReducer = (state, action) => {
    if (action.type === "ADD") {
        const newTotalAmt =
            state.totalAmount + action.item.price * action.item.amount;

        const exisitingCartItemsIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const exisitingCartItems = state.items[exisitingCartItemsIndex];

        let updatedItems;
        if (exisitingCartItems) {
            const updatedItem = {
                ...exisitingCartItems,
                amount: exisitingCartItems.amount + action.item.amount,
            };

            updatedItems = [...state.items];
            updatedItems[exisitingCartItemsIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmt,
        };
    }

    else if (action.type === "REMOVE") {
        const exisitingCartItemsIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const exisitingCartItems = state.items[exisitingCartItemsIndex];
        const newTotalAmt = state.totalAmount - exisitingCartItems.price;

        let updatedItems;
        if (exisitingCartItems.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        }
        else {
            const updatedItem = { ...exisitingCartItems, amount: exisitingCartItems.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[exisitingCartItemsIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmt,
        };
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartstate, dispatchCartAction] = useReducer(
        CartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };

    const removeItemToCartHandler = (id) => { 
        dispatchCartAction({ type: "REMOVE", id: id });
    };

    const cartContext = {
        items: cartstate.items,
        totalamount: cartstate.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
