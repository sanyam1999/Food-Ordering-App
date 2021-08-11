import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/Carticon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const [btnHighlighted, setbtnHighlighted] = useState(false);

    const cartctx = useContext(CartContext);
    const { items } = cartctx;

    const numberofCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClass = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;
    useEffect(() => {
        if (items.length === 0) return;

        setbtnHighlighted(true);
        const timer = setTimeout(() => {
            setbtnHighlighted(false)
        }, 300);

        return ()=>{clearTimeout(timer)};
    }, [items]);

    return (
        <button className={btnClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberofCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
