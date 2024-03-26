import React from "react";
import { Link } from "react-router-dom";
import FoodShow from "../Components/FoodShow";
import Footer from "../Components/Footer";
import { recipe } from "../data";

const Food = () => {
  return (
    <div className="overflow-x-hidden">
      <Link to={"/"} className="btn btn-primary btn-lg btn-block my-2">
        <i class="fi fi-rr-arrow-left" />
        <span> BACK TO HOME</span>
      </Link>
      <h3 className="abs-center text-white">All Foods</h3>
      <FoodShow recipes={recipe} />
      <Footer />
    </div>
  );
};

export default Food;
