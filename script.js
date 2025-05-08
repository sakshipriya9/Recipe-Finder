function searchRecipe() {
    const query = document.getElementById("searchInput").value.trim();
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = "";

    if (!query) {
        alert("Please enter a recipe name.");
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.meals) {
                data.meals.forEach((meal) => {
                    const recipeCard = document.createElement("div");
                    recipeCard.classList.add("recipe-card");

                    recipeCard.innerHTML = `
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
              <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>
            `;

                    recipeContainer.appendChild(recipeCard);
                });
            } else {
                recipeContainer.innerHTML = "<p>No recipes found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching recipes:", error);
            recipeContainer.innerHTML = "<p>Failed to load recipes.</p>";
        });
}  