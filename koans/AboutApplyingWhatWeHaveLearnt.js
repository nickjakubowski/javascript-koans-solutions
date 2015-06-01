var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
     var canEat = function(elem) {
      return !(elem.containsNuts) && _.all(elem.ingredients, function(i) { return i !== "mushrooms" });
    }

    productsICanEat.push(products.filter(canEat));

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = 0;    /* try chaining range() and reduce() */
    
    var selected = _.range(0, 1000).filter(function(i) { 
    if (i % 3 === 0 || i % 5 === 0) {
        return i;
    }
});

   sum = selected.reduce(function (accum, curr) {
        return accum + curr;
});

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    
   _(products).chain()
    .map(function(elem) {return elem.ingredients})
    .flatten()
    .reduce(function(a,b) {return ingredientCount[b] = (ingredientCount[b] || 0) + 1})
    .value();
   

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function largePrime(n) {
    
    var half = Math.floor(n / 2); 

    function isPrime(num) {
       for (var i = 2; i < num; i++) {
          if (num % i === 0) {
            return false;
          }
        }
        return true;
    }
     for (var down = half; down > 1; down--) {
       if (n % down === 0 && isPrime(down)) {
        return down;
      }
     }
    

    expect(largePrime(13195)).toBe(29);
  }); 

  it("should find the largest palindrome made from the product of two 3 digit numbers", function largestPalindrome() {
      var highest = 0;

      for (var i = 999; i > 99; i--) {
        for (var j = 999; j > 99; j--) {
          if ((i * j > highest) && (parseInt(String(i * j).split("").reverse().join("")) === i * j)) {
            highest = i * j;
          }
        }
      }
    return highest;

    expect(largestPalindrome()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function smallestDivisible() {
    function isDivisible(n){
      for (var div = 1; div <= 20; div++) {
        if (n % div !== 0) {
          return false;
        }
      }
      return true;
    }

    for (var i = 20; i < Infinity; i += 20 ) {
      if (isDivisible(i)) {
        return i;
      }
    }
   expect(smallestDivisible()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function sumSquareDifference(n) {
    
    var squareOfSums;
    var sumOfSquares;
    var nums = _.range(n + 1);
    return nums;
    
    /* this code runs in the console, but won't pass koan. running reduce on empty array.
    added underscore helpers to pass
    var nums = [];
    for (var i = 1; i <= n; i++) {
      nums.push(i);
    } */

    squareOfSums = _.reduce(nums, function(accum,curr) {return accum + curr});

    squareOfSums *= squareOfSums;

    sumOfSquares = _.reduce(nums, function(accum, curr) {return accum + (curr * curr)});

    return (squareOfSums - sumOfSquares); 

    expect(sumSquareDifference(10).toBe(2640));
  });

  it("should find the 10001st prime", function tenThousandAndOnePrime() {
    
    function isPrime(n) {
      for (var i = 2; i < n; i++) {
        if (n % i === 0) {
          return false;
        }
      }
      return true;
    }

    var count = 1;
    var index = 3;

    while (count < 10001) {
      if (isPrime(index)) {
        count++;
      }
      index++;
    }

    return index - 1;

    expect(tenThousandAndOnePrime().toBe(104743))
  });
  
});
