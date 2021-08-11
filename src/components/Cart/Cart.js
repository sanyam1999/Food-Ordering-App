import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
    const cartitems = (
        <ul>
            {[{ id: "c1", name: "shushi", amount: 2, price: 12.99 }].map((item) => (
                <li>{item.name}</li>
            ))}
        </ul>
    );

    return (
        <Modal onBackdrop={props.onClose}>
            {cartitems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>32.33</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;
