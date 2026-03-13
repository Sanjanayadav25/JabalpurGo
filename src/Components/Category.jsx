import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchPlaces } from "../api/wikipedia";

function Category() {
  const { name } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    searchPlaces(name).then(setPlaces);
  }, [name]);

  return (
    <div className="p-4 sm:p-8">

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        {name} in Jabalpur
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {places.map((place) => (
          <Link
            key={place.pageid}
            to={`/place/${place.title}`}
            className="block p-4 bg-white rounded-lg shadow hover:bg-gray-100"
          >
            {place.title}
          </Link>
        ))}

      </div>

    </div>
  );
}

export default Category;

