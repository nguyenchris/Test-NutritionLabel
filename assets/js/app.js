$('#test2').nutritionLabel({
    itemName: 'Bleu Cheese Dressing',
    // valueServingUnitQuantity: 2,
    showAmountPerServing: false,
    showIngredients: false,
    showServingUnitQuantity: false,
    widthCustom: 'auto',
    allowFDARounding: true,
    decimalPlacesForNutrition: 2,

    showPolyFat: false,
    showMonoFat: false,
    showAddedSugars: false,
    valueServingWeightGrams: 0,
    valueServingPerContainer: 1,
    valueCalories: 0,
    valueFatCalories: 0,
    valueTotalFat: 10,
    valueSatFat: 0,
    valueTransFat: 0,
    valueCholesterol: 0,
    valueSodium: 0,
    valuePotassium_2018: 0, //this is for the 2018 version
    valueTotalCarb: 0,
    valueFibers: 5,
    valueSugars: 0,
    valueProteins: 15,
    valueVitaminA: 20,
    valueVitaminC: 15,
    valueVitaminD: 15,
    valueCalcium: 0,
    valueIron: 10,
    showLegacyVersion: false
});






///https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// user object assign to 
var hi;
// Use getNutrients Method for Recipe Class


$.ajax({
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        method: 'POST',
        data: JSON.stringify({
            "query": "2 cups diced cooked turkey, 2 celery ribs diced, 1 small onion,diced, 2 hard-cooked eggs chopped, 3/4 cup mayonnaise, 1/2 teaspoon salt, 1/4 teaspoon pepper, 6 hamburger buns split"
        }),
        headers: {
            'x-app-id': '2d50c081',
            'x-app-key': '761211a498e0c9546a3d13704ab339b6',
            'x-remote-user-id': '0'
        },
        contentType: 'application/json',
        cache: false,
        dataType: 'json',
    })
    .done(function (response) {
        var ingredient = response.foods
        console.log(ingredient);

        for (var i = 0; i < ingredient.length; i++) {

            var preArray = Object.entries(ingredient[i])
            console.log(preArray);
            var filterArray = [];

            for (var j = 0; j < 17; j++) {

                if (j === 16) {

                    var calcium = ['valueCalcium'];
                    var vitaminD = ['valueVitaminD'];
                    var vitaminA = ['valueVitaminA'];
                    var iron = ['valueIron'];

                    if (preArray[j][1][12] !== -1) {
                        calcium[1] = preArray[j][1][12].value;
                        filterArray.push(calcium);
                    }

                    if (preArray[j][1][24] !== -1) {
                        vitaminD[1] = preArray[j][1][24].value;
                        filterArray.push(vitaminD);
                    }

                    if (preArray[j][1][22] !== -1) {
                        vitaminD[1] = preArray[j][1][22].value;
                        filterArray.push(vitaminA);
                    }

                    if (preArray[j][1][20] !== -1) {
                        iron[1] = preArray[j][1][20].value;
                        filterArray.push(iron);
                    }
                }
                filterArray.push(preArray[j]);
            }
            console.log(filterArray);
            var obj = Object.assign(...filterArray.map(ing => ({
                [ing[0]]: ing[1]
            })));
            console.log(obj);

            // obj will return object of all the "nf_" properties for each ingredient in the recipe
        }



    })
    .fail(function (error) {
        console.log(error.responseText);
        console.log(error);
    });




// this.ingredientLines[i].nutrients = obj




/**
 * 
 * 
 * In app:
 * 1). Get the data from recipe API
 * 2). Get inredientLines array
 * 3). Loop through ingredientLines and use method .join(", ") to convert it to string separated by commas
 * 4). Assign the string of ingredientLines as a property 'ingredientListString'
 * 5). At promise '.done' use ingredientListString as an argument for the object method getNutrients
 * 
 * 
 * get Method:
 * 1). Pass in ingredientListString value to getNutrients method 
 * 2). Use the ingredientListString as the value to the data key in AJAX Post request
 * 3). JSON.stringify the value
 * Call the request
 * 2). Success callback will return response data
//  * 3). Response data returns object (response) -> ingredients array (response.foods) -> object of each ingredient ( response.foods[i] )
 * 4). Loop through response.foods array
 * 5). In loop, response.foods[i].nutrient, 'nutrient' being the key for each value needed for nutrition label, separate each nutritient (possibly in an array in order to calculate them all, can be used to then calculate recipie's nutrients all together for the day when a user saves them).
 * 6). 
 * 
 * 
 * KEYS: of response.foods[i]
 * 
 * 
 * 1). Returns object -> ingredients array > object of each ingredient
 * 2). 
 * 
 * 
 * 
 */