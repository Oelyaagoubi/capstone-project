import React from "react";
import Navbar from "../components/NavBar";
import "../styles/About.css";
function About() {
  return (
    <div className="about-page">
      <Navbar />
      <header className="about-header">
        <h1>About Recipe Finder</h1>
        <p>
          Your ultimate companion for discovering delicious recipes, and find
          you recipes tailored to your ingredients.
        </p>
      </header>

      <section className="about-content">
        <h2>What is Recipe Finder?</h2>
        <p>
          Recipe Finder is a smart platform designed to help you create amazing
          meals using the ingredients you already have or explore our wide
          selection of ready-made recipes. Whether you're trying to minimize
          food waste, discover new dishes, or simply find a recipe for a
          specific category, Recipe Finder has you covered.
        </p>

        <h2>How Does It Work?</h2>
        <ul>
          <li>
            <strong>Input Your Ingredients:</strong> Simply list the ingredients
            you have on hand, and we'll suggest recipes you can make.
          </li>
          <li>
            <strong>Explore Categories:</strong> Browse through our curated
            recipe categories, such as Appetizers, Desserts, or Quick Meals, to
            find ready-to-cook dishes.
          </li>
          <li>
            <strong>AI-Powered Suggestions:</strong> Let our advanced algorithm
            generate creative and delicious recipes tailored to your inputs.
          </li>
          <li>
            <strong>Easy to Follow:</strong> Each recipe includes clear
            instructions to ensure your cooking experience is hassle-free.
          </li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          At Recipe Finder, our mission is to make cooking enjoyable, reduce
          food waste, and inspire creativity in the kitchen. Whether you're
          improvising with what you have or exploring new culinary horizons,
          Recipe Finder is here to make the process easy and fun.
        </p>
      </section>

      <section className="about-features">
        <h2>Key Features</h2>
        <div className="features-list">
          <div className="feature">
            <h3>Smart Recipe Suggestions</h3>
            <p>
              Get personalized recipes based on the ingredients you have
              available.
            </p>
          </div>
          <div className="feature">
            <h3>Curated Categories</h3>
            <p>
              Choose from a wide range of ready-made recipes, organized by
              categories for your convenience.
            </p>
          </div>
          <div className="feature">
            <h3>Step-by-Step Instructions</h3>
            <p>
              Follow easy, detailed steps to cook delicious meals effortlessly.
            </p>
          </div>
          <div className="feature">
            <h3>Save & Share</h3>
            <p>
              Save your favorite recipes and share them with friends and family.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Recipe Finder. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default About;
