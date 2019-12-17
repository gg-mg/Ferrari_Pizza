// ================================
//     Business Logic
// ================================
$(document).ready(function () {


  function Pizza(pizzaSize, crusts) {
    this.pizzaSize = pizzaSize;
    this.crusts = crusts;
    this.meatToppings = [];
    this.vegToppings = [];

  }
  Pizza.prototype.addMeat = function (meat) {
    this.meatToppings.push(meat);
  }
  Pizza.prototype.addVeg = function (veggie) {
    this.vegToppings.push(veggie);
  }
  Pizza.prototype.refreshCost = function () {
    var cost = 0;
    if (this.pizzaSize === "medium") {
      cost = 700;
    }
    if (this.pizzaSize === "small") {
      cost = 500;
    }
    if (this.pizzaSize === "large") {
      cost = 900;
    }
    if (this.pizzaSize === "extra large") {
      cost = 1000;
    }
    if (this.crusts === "crispy") {
      cost += 200;
    }
    if (this.crusts === "italian") {
      cost += 150;
    }
    if (this.crusts === "stuffed") {
      cost += 100;
    }
    if (this.crusts === "glutenfree") {
      cost += 250;
    }
    this.meatToppings.forEach(function () {
      if (this.pizzaSize === "medium") {
        cost += 200;
      }
      if (this.pizzaSize === "small") {
        cost += 150;
      }
      if (this.pizzaSize === "large") {
        cost += 250;
      }
      if (this.pizzaSize === "medium") {
        cost += 300;
      }

    });
    this.vegToppings.forEach(function () {
      if (this.pizzaSize === "medium") {
        cost += 150;
      }
      if (this.pizzaSize === "small") {
        cost += 100;
      }
      if (this.pizzaSize === "large") {
        cost += 200;
      }
      if (this.pizzaSize === "medium") {
        cost += 250;
      }
    });

    this.cost = cost;
  }


  function Order(customerName, customerAddress, customerPhone, customerCashCredit) {
    this.customerName = customerName;
    this.customerAddress = customerAddress;
    this.customerPhone = customerPhone;
    this.customerCashCredit = customerCashCredit;
    this.pizzas = [];
  }
  Order.prototype.addPizza = function (pizza) {
    pizza.refreshCost();
    this.pizzas.push(pizza);
  }
  Order.prototype.removePizza = function (pizzaNumber) {
    this.pizzas.splice(pizzaNumber - 1, 1);
  }
  Order.prototype.determineTotalCost = function () {
    var totalCost = 0;
    this.pizzas.forEach(function (pizza) {
      totalCost += pizza.cost;
    });
    this.totalCost = totalCost;
  }


  // ================================
  //     User Interface Logic
  // ================================

  var nextDiv = function (toHide, toShow) {
    $(toHide).hide();
    $(toShow).show();
  }
  var createCustomerOrder = function () {
    var customerName = $('#customer-name').val();
    var customerAddress = $('#customer-street').val() + ', ' + $('#customer-city').val() + ', ' + $('#customer-zip-code').val();
    var customerPhone = $('#customer-phone').val();
    var customerCashCredit = $('input[name="cash-credit"]:checked').val();

    return new Order(customerName, customerAddress, customerPhone, customerCashCredit);
  }
  var createPizza = function () {
    var pizzaSize = $('input[name="pie-size"]:checked').val();
    var crusts = $('input[name="crusts"]:checked').val();
    var newPizza = new Pizza(pizzaSize, crusts);
    var meatToppings = [];
    $('input[name="meat-toppings"]:checked').each(function () {
      newPizza.addMeat($(this).val());
    });
    var vegToppings = [];
    $('input[name="veg-toppings"]:checked').each(function () {
      newPizza.addVeg($(this).val());
    });
    resetPizzaForm();
    return newPizza;
  }
  var resetPizzaForm = function () {
    $('input[name="pie-size"]:checked').attr("checked", false);
    $('input[name="crusts"]:checked').attr("checked", false);
    $('input[value="medium"]').prop("checked", true);
    $('input[value="regular"]').prop("checked", true);
    $('input[name="meat-toppings"]:checked').attr("checked", false);
    $('input[name="veg-toppings"]:checked').attr("checked", false);
  }
  var populatePizzaList = function (pizza) {
    $('.pizza-list').append('<div class="pizza">' +
      '<h4><span class="pizza-list-size">- One ' + pizza.pizzaSize + ' pizza</span></h4>' +
      '<h5><span class="crusts"> - ' + pizza.crusts + ' crust</span></h5>' +
      '<div class="pizza-info-toggle">' +
      '<p>Meat toppings: </p>' +
      '<ul class="pizza-list-meat-toppings"></ul>' +
      '<p>Veggie toppings: </p>' +
      '<ul class="pizza-list-veg-toppings"></ul>' +
      '<p>Cost of this pizza: KSH<span>' + pizza.cost + '</span></p>' +
      '</div>' +
      '</div>');
    pizza.meatToppings.forEach(function (meatTopping) {
      $('.pizza-list .pizza-list-meat-toppings').last().append('<li>' + meatTopping + '</li>');
    });
    pizza.vegToppings.forEach(function (vegTopping) {
      $('.pizza-list .pizza-list-veg-toppings').last().append('<li>' + vegTopping + '</li>');
    });

    $('.pizza').last().click(function () {
      $(this).find('.pizza-info-toggle').toggle();
    });
    $('.pizza-info-toggle').last().click(function () {
      $(this).find('.pizza-info-toggle').toggle();
    });

  }
  var populateTotalPrice = function (customerOrder) {
    customerOrder.determineTotalCost();
    return customerOrder.totalCost;
  }

  $(document).ready(function () {
    var customerOrder = new Order();

    $('.launch-order button').click(function () {
      nextDiv('.launch-order', '.order-information-input');
    });


    $('.order-information-input form').submit(function (event) {
      event.preventDefault();
      customerOrder = createCustomerOrder();
      nextDiv('.order-information-input', '.order-pizza-input');
    });


    $('.order-pizza-input form').submit(function (event) {
      event.preventDefault();
      var thisPizza = createPizza();
      customerOrder.addPizza(thisPizza);
      populatePizzaList(thisPizza);
      $("#pizza-list-total-cost").text('KSH ' + populateTotalPrice(customerOrder).toFixed(2));
      nextDiv('.order-pizza-input', '.order-summary');
    });

    $('#add-another-pizza').click(function () {
      nextDiv('.order-summary', '.order-pizza-input');
    });




    $('#new-order').click(function () {
      customerOrder = new Order();
      $('.pizza-list').empty();
      nextDiv('.checked-out', '.launch-order');
    });


    $('#console-log').click(function () {
      alert(customerOrder);
    });

    $("#yes").click(function () {
      $("#enter_info").show();
    });
    $("#no").click(function () {
     alert("Your order total is " + 'KSH ' + populateTotalPrice(customerOrder).toFixed(2))
    });

    $("#submit").click(function () {

      alert("Your order will be delivered to your location")     
      alert("Your order total is " + 'KSH ' + (populateTotalPrice(customerOrder)+1000).toFixed(2))
      return
    })

    $("#checkout-order").click(function () {
      alert(" We deliver at an extra price of KSH 1000 to any location within Nairobi")
       


      $(".delivery_option").show();
    });

  });

});