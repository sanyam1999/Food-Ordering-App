import classes from "./Available.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
    const [meals, setmeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpErr, setHttpErr] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                "https://react-food-order-app-6caa7-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
            );

            if (!response.ok) {
                throw new Error("Something Went Wrong");
            }
            const data = await response.json();

            const loadedMeals = [];
            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }
            setmeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpErr(error.message);
        });
    }, []);

    if (httpErr) {
        return (
            <section className={classes.error}>
                <p>{httpErr}</p>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className={classes.loading}>
                <p>Loading...</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => {
        return (
            <MealItem
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                id={meal.id}
            />
        );
    });
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
