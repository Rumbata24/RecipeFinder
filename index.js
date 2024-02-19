// Onload main course displayed items
const dataStatsTemplate = document.querySelector("[data-stats-template]");
const statsContainer = document.querySelector("[data-stats-container]");

const dataIngredientContainer = document.querySelector(
  "[data-ingredient-container]"
);
const dataIngredientsTemplate = document.querySelector(
  "[data-ingredients-template]"
);

const ingredientsArr = [
  {
    ingredients: "500g mixed vegetables",
  },
  {
    ingredients: "2 garlic cloves",
  },
  {
    ingredients: "1 tsp thyme leaves or chopped rosemary",
  },
  {
    ingredients: "100g Cropwell Bishop Stilton, crumbled",
  },
  {
    ingredients: "2 tbsp cream or crème fraîche",
  },
  {
    ingredients: "1 tsp Dijon mustard",
  },
  {
    ingredients: "pinch of ground cayenne or paprika",
  },
  {
    ingredients: "small squeeze lemon juice",
  },
  {
    ingredients: "2 fillet steaks",
  },
  {
    ingredients: "oil for frying, e.g. vegetable or sunflower",
  },
  {
    ingredients: "salt and pepper",
  },
];

const loadCookingSteps = () => {
  const statsElement = dataStatsTemplate.content.cloneNode(true);

  statsContainer.appendChild(statsElement);

  ingredientsArr.forEach((ingredient) => {
    const ingredientElement = dataIngredientsTemplate.content.cloneNode(true);

    const dataCheckbox = ingredientElement.querySelector("[data-checkbox]");

    dataCheckbox.innerText = ingredient.ingredients;
    dataIngredientContainer.appendChild(ingredientElement);
  });
};

window.onload = loadCookingSteps;

// Displaying data dynamically from API
const userRecipeTemplate = document.querySelector("[data-user-template]");
const dataUserTemplateContainer = document.querySelector(
  "[data-user-recipe-container]"
);
const searchInput = document.querySelector("[data-search]");
const recipeTitle = document.querySelector(".recipeTitle");
const course = document.querySelector(".course");
const displayRecipeImg = document.querySelector(".change_img");
const active = document.querySelector(".active");
const recipe_uri = document.querySelector(".recipe_uri");

// Function to update the displayed recipes
function updateDisplayedRecipes(recipes) {
  dataUserTemplateContainer.innerHTML = ""; // Clear previous suggestions

  recipes.forEach((recipe) => {
    const recipeElement = userRecipeTemplate.content.cloneNode(true);

    const recipeHeader = recipeElement.querySelector("[data-header]");
    const recipeImg = recipeElement.querySelector("[data-img]");

    recipeHeader.textContent = recipe.recipe.label;
    recipeImg.src = recipe.recipe.image;
    active.style.display = "block";

    recipeElement
      .querySelector(".autocomplete-container")
      .addEventListener("click", (e) => {
        recipeTitle.innerText = recipe.recipe.label;
        searchInput.value = "";
        displayRecipeImg.src = recipe.recipe.image;
        active.style.display = "none";
        course.textContent = `${recipe.recipe.dishType || "N/A"}`;
        recipe_uri.href = recipe.recipe.url;
        console.log(recipe.recipe.url);
        console.log(recipe);

        dataIngredientContainer.innerHTML = "";
        recipe.recipe.ingredientLines.forEach((ingredient) => {
          const ingredientElement =
            dataIngredientsTemplate.content.cloneNode(true);

          const dataCheckbox =
            ingredientElement.querySelector("[data-checkbox]");

          dataCheckbox.innerText = ingredient;
          dataIngredientContainer.appendChild(ingredientElement);
        });

        // Update ingredients
        // Clear the existing content of statsContainer
        statsContainer.innerHTML = "";

        // Clone the template content

        const statsElement = dataStatsTemplate.content.cloneNode(true);
        // Update template with recipe data

        statsElement.querySelector("[data-calorie]").innerText = `${Math.round(
          recipe.recipe.calories
        )} calories`;

        const dataAttributes = [
          {
            key: "data-meal-type",
            label: "Meal type",
            value: recipe.recipe.mealType || "N/A",
          },
          {
            key: "data-cuisineType",
            label: "Cuisine Type",
            value: recipe.recipe.cuisineType || "N/A",
          },
          {
            key: "data-healthLabels",
            label: "Health Labels",
            value: recipe.recipe.healthLabels.join(", ") || "N/A",
          },
          {
            key: "data-dietLabels",
            label: "Diet Labels",
            value: recipe.recipe.dietLabels.join(", ") || "N/A",
          },
        ];

        dataAttributes.forEach((attribute) => {
          const element = statsElement.querySelector(`[${attribute.key}]`);
          element.querySelector("strong").innerText = `${attribute.label}:`;
          element.querySelector("span").innerText = attribute.value;
        });

        statsContainer.appendChild(statsElement);
      });

    dataUserTemplateContainer.appendChild(recipeElement);
  });

  if (recipes.length === 0) {
    const noResultsElement = document.createElement("div");
    noResultsElement.textContent = "No recipes found";
    dataUserTemplateContainer.appendChild(noResultsElement);
  }
}

// Event listener for the check the recipe here

// Event listener for input on search
searchInput.addEventListener("input", async (e) => {
  const value = e.target.value.toLowerCase().trim();
  const recipes = await findRecipesByQuery(value);
  updateDisplayedRecipes(recipes);
});

async function findRecipesByQuery(query) {
  const API_ID = "e609571a";
  const API_KEY = "17e642e5eaa6371efff804c1e4dc142a	";
  const API_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}&random=true&limit=4`;

  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      return data.hits;
    } else {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}
