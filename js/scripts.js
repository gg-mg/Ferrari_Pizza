
// Business Logic
var meat = { name: "Meat", toppings: [chicken, pepperoni, crispybacon, sausage, steak] };
var veggie = { name: "Veggie", toppings: [mixedpeppers, mushrooms, tomato, pineapple] };
var toppings=[meat,veggie]

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
  
  if (this.crust === "Crispy") {
    cost += 200;
  }
    if (this.crust === "Italian") {
      cost = 150;
  } if (this.crust === "Stuffed_Crust") {
    cost = 100;
  } if (this.crust === "Gluten_Free") {
    cost = 250;
  } 
  this.toppings.forEach(function() {
    cost += 200;
  });
  this.toppings.forEach(function() {
    cost += 150;
  });
  this.cost = cost;

}