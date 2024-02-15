//  542bec5bdbf6414fa69ee266a887429f- API Key
// https://api.spoonacular.com/recipes/findByIngredients - fetch url

// Fetching Data from API

async function findRecipesByIngredients(ingredients) {
  const API_KEY = `542bec5bdbf6414fa69ee266a887429f`;
  const API_URL = `https://api.spoonacular.com/recipes/findByIngredients`;

  // Construct the query parameters
  const queryParams = new URLSearchParams({
    ingredients: ingredients.join(","),
    number: 2, // Example number of recipes you want to retrieve
    apiKey: API_KEY,
  });

  const urlWithParams = `${API_URL}?${queryParams}`;

  // Example --> https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2

  try {
    const response = await fetch(urlWithParams);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

// DOM variables
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector(".searchBtn");
const recipeTitle = document.querySelector(".recipeTitle");

// Adding event listener and displaying some data
searchBtn.addEventListener("click", async () => {
  const inputValue = searchInput.value;
  const ingredients = inputValue.split(",").map((item) => item.trim()); // Split the input value by commas and trim whitespace
  const recipes = await findRecipesByIngredients(ingredients);
  if (recipes) {
    recipeTitle.innerText = `${recipes[0].title}`;
    console.log(recipes); // Displaying the recipes data
  }
});

// // Example usage
// const ingredients = ["apple", "banana", "orange"];
// findRecipesByIngredients(ingredients)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
