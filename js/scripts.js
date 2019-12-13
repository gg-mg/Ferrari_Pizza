
function Pizza(pizzaSize, crust,toppings) {
    this.pizzaSize = pizzaSize;
    this.crust = crust;
    this.toppings = toppings;
    
  }
  Pizza.prototype.cost = function() {
    var cost = 0;
    
    if (this.pizzaSize === "small") {
      cost = 500;
    }
      if (this.pizzaSize === "medium") {
        cost = 700;
    } if (this.pizzaSize === "large") {
      cost = 900;
    } 
  
  if (this.crust === "Gluten_Free") {
    cost += 200;
  }
    if (this.crust === "Crispy") {
      cost = 150;
  } if (this.crust === "Stuffed") {
    cost = 100;
  } 

if (this.toppings === "Chicken") {
    cost += 200;
  }
    if (this.toppings === "Pepperoni") {
      cost = 150;
  } if (this.toppings === "Ham") {
    cost = 100;
  } 
  if (this.toppings === "crispybacon") {
    cost += 200;
  }
    if (this.toppings === "sausage") {
      cost = 150;
  } if (this.toppings === "steak") {
    cost = 100;
  } 
  if (this.toppings === "mixedpeppers") {
    cost += 200;
  }
    if (this.toppings === "mushrooms") {
      cost = 150;
  } if (this.toppings === "tomato") {
    cost = 100;
  } if (this.toppings === "pinneaple") {
    cost = 100;
  } 

}