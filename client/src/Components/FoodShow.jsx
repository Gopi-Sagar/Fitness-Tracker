import React, { useState } from "react";

const FoodShow = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="py-2">
      {Array.isArray(recipes) ? (
        <div className="row row-cols-1 row-cols-md-2 g-4 my-2">
          {console.log(Array.isArray(recipes))};
          {recipes.map((recipe) => (
            <div key={recipe.id} className="card-group max mx-auto">
              <div
                className={`card cursor-pointer ${
                  selectedRecipe === recipe ? "bg-light" : ""
                }`}
                onClick={() => handleRecipeClick(recipe)}
              >
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {recipe.tag ? recipe.tag[0] : ""}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4 my-5">
          {/* Assuming recipes is an object if not an array */}
          {Object.values(recipes).map((recipe) => (
            <div key={recipe.id} className="card-group max mx-auto">
              <div
                className={`card cursor-pointer ${
                  selectedRecipe === recipe ? "bg-light" : ""
                }`}
                onClick={() => handleRecipeClick(recipe)}
              >
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {recipe.tag ? recipe.tag[0] : ""}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedRecipe && (
        <div className="card mt-3">
          <div className="card-body">
            <h2>{selectedRecipe.name}</h2>
            <p>{selectedRecipe.description}</p>
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredientGroup?.map(
                (
                  group // Check for ingredientGroup existence
                ) => (
                  <li key={group.name}>
                    <h4>{group.name}</h4>
                    <ul>
                      {group.ingredient?.map(
                        (
                          ingredient // Check for ingredient existence
                        ) => (
                          <li key={ingredient.name}>
                            {ingredient.amount
                              ? `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`
                              : ingredient.name}
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                )
              )}
            </ul>
            <h3>Steps</h3>
            <ol>
              {selectedRecipe.step?.map(
                (
                  step,
                  index // Check for step existence
                ) => (
                  <li key={index}>{step.description}</li>
                )
              )}
            </ol>
            <button onClick={closeDetails}>Close Details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodShow;
