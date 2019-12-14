// Business Logic
// var meat = {
//     name: "Meat",
//     toppings: [chicken, pepperoni, crispybacon, sausage, steak]
// };
// var veggie = {
//     name: "Veggie",
//     toppings: [mixedpeppers, mushrooms, tomato, pineapple]
// };


function Pizza(pizzaSize, crust, toppings) {
    this.pizzaSize = pizzaSize;
    this.crust = crust;
    this.meatToppings = [];
    this.vegToppings = [];
}

Pizza.prototype.addMeat = function(meat) {
    this.meatToppings.push(meat);
  }
  Pizza.prototype.addVeg = function(veggie) {
    this.vegToppings.push(veggie);
  }
Pizza.prototype.calculateCost = function () {
    var cost = 0;

    if (this.pizzaSize === "small") {
        cost = 500;
    }
    if (this.pizzaSize === "medium") {
        cost = 700;
    }
    if (this.pizzaSize === "large") {
        cost = 900;
    }

    if (this.crust === "Crispy") {
        cost += 200;
    }
    if (this.crust === "Italian") {
        cost = 150;
    }
    if (this.crust === "Stuffed_Crust") {
        cost = 100;
    }
    if (this.crust === "Gluten_Free") {
        cost = 250;
    }
    this.meat.forEach(function () {
        cost += 200;
    });
    this.veggie.forEach(function () {
        cost += 150;
    });
    this.cost = cost;

}