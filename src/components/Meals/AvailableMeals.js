import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

function AvailableMeals(){

  const [meals,setMeals] = useState([]);
  const [httperror,sethttperror] = useState('');

  useEffect(() => {
    var Meals = [];
    async function fetchData(){
      const results = await fetch('https://react-post-265a6-default-rtdb.firebaseio.com/Meal.json');
      const data = await results.json();

      if(!results.ok){
        throw new Error('SomeThing went wrong');
      }

      for(var key in data){
        Meals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price:data[key].price,
        });
      }
      setMeals(Meals);
    }

    fetchData().catch((error) => {
      sethttperror(error.message);
    });

  },[]);

  if(httperror != ''){
    return(<section>Data not fetched</section>);
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
