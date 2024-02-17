//  542bec5bdbf6414fa69ee266a887429f- API Key
// https://api.spoonacular.com/recipes/findByIngredients - fetch url

// const inputValue = searchInput.value;
// const ingredients = inputValue.split(",").map((item) => item.trim()); // Split the input value by commas and trim whitespace
// const recipes = await findRecipesByIngredients(ingredients);

// Fetching Data from API

let users = [];

const userRecipeTemplate = document.querySelector("[data-user-template]");
const dataUserTemplateContainer = document.querySelector(
  "[data-user-recipe-container]"
);

const searchInput = document.querySelector("[data-search]");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  findRecipesByIngredients([value]);
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.image.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
    console.log(isVisible);
  });
});

const recipeTitle = document.querySelector(".recipeTitle");

dataUserTemplateContainer.addEventListener("click", (e) => {
  if (e.target.closest(".autocomplete-container")) {
    const recipeName = e.target
      .closest(".autocomplete-container")
      .querySelector("[data-header]").textContent;
    recipeTitle.innerText = recipeName;
    searchInput.value = ''
    
   
    
  }
});

async function findRecipesByIngredients(ingredients) {
  const API_KEY = `542bec5bdbf6414fa69ee266a887429f`;
  const API_URL = `https://api.spoonacular.com/recipes/findByIngredients`;

  // Construct the query parameters
  const queryParams = new URLSearchParams({
    ingredients: ingredients.join(","),
    number: 4, // Example number of recipes you want to retrieve
    apiKey: API_KEY,
  });

  const urlWithParams = `${API_URL}?${queryParams}`;

  // Example --> https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2

  try {
    const response = await fetch(urlWithParams);
    if (response.ok) {
      const data = await response.json();
      users = data.map((user) => {
        const recipe = userRecipeTemplate.content.cloneNode(true).children[0];
        const recipe_header = recipe.querySelector("[data-header]");
        const recipeImg = recipe.querySelector("[data-img]");
        recipe_header.textContent = user.title;
        recipeImg.src = user.image;
        dataUserTemplateContainer.append(recipe);
        return { name: user.name, image: user.image, element: recipe };
      });
      // return data;
    } else {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
