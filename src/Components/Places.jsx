import { useState } from "react";
import { Link } from "react-router-dom";
import { searchPlaces } from "../api/wikipedia";
import React from "react";
import jabalpurImg2 from "../images/jabalpurimg2.jpg";

const categories = [
  "Temples",
  "Waterfalls",
  "Museums",
  "Parks",
  "Historical places"
];

function Places() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setLoading(true);

    const results = await searchPlaces(category);
    setPlaces(results);

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={jabalpurImg2}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-10 py-10 text-black">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Explore Jabalpur
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="border px-4 py-2 text-base sm:text-lg md:text-xl
              rounded hover:bg-pink-300 bg-white/20 backdrop-blur-sm"
            >
              {cat}
            </button>
          ))}

        </div>

        {/* Places container */}
        {selectedCategory && (
          <div className="border rounded p-4 sm:p-6 bg-white/80 text-black max-w-2xl">

            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              {selectedCategory} in Jabalpur
            </h2>

            {loading && <p>Loading places...</p>}

            {!loading && places.length === 0 && (
              <p>No places found.</p>
            )}

            {!loading &&
              places.map((place) => (
                <Link
                  key={place.pageid}
                  to={`/place/${place.title}`}
                  className="block text-base sm:text-lg text-blue-600 hover:underline mb-2"
                >
                  {place.title}
                </Link>
              ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Places;