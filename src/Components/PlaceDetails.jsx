import React, { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";
import { getPlaceDetails } from "../api/wikipedia";

function PlaceDetails() {
  const { title } = useParams();
  const [place, setPlace] = useState(null);
  const [hindiText, setHindiText] = useState("");
  const [showHindi, setShowHindi] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const nearbyPlaces = [
    "Bhedaghat",
    "Dhuandhar Falls",
    "Madan Mahal Fort",
    "Balancing Rock",
    "Bargi Dam",
    "Rani Durgavati Museum"
  ];

  const filteredNearby = nearbyPlaces.filter(
    (p) => p.toLowerCase() !== place?.title?.toLowerCase()
  );

  useEffect(() => {
    getPlaceDetails(title).then(setPlace);
  }, [title]);

  if (!place) return <p className="p-6 text-lg text-center">Loading...</p>;

  const cleanText = place.extract.replace(/<[^>]*>?/gm, "");

  const speak = (text, lang) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const translateToHindi = async () => {
    if (hindiText) {
      setShowHindi(!showHindi);
      return;
    }

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        cleanText
      )}&langpair=en|hi`
    );

    const data = await response.json();
    setHindiText(data.responseData.translatedText);
    setShowHindi(true);
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen px-4 py-8">
      <div className="bg-white shadow-xl rounded-xl max-w-5xl w-full p-6 sm:p-10">

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700 text-center mb-6">
          {place.title}
        </h1>

        {/* IMAGE */}
        {place.thumbnail && (
          <div className="flex justify-center mb-6">
            <img
              src={place.thumbnail.source}
              alt={place.title}
              className="rounded-xl w-full sm:w-[500px] md:w-[600px]"
            />
          </div>
        )}

        {/* ENGLISH DESCRIPTION */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          English Description
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6">
          {cleanText}
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 mb-8">

          <button
            onClick={() => speak(cleanText, "en-US")}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
          >
            🔊
          </button>

          <button
            onClick={stopSpeech}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-600 text-white rounded-full shadow hover:bg-gray-700"
          >
            ⏹
          </button>

          <button
            onClick={translateToHindi}
            className="px-5 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600"
          >
            हिंदी विवरण
          </button>

          <button
            onClick={() => setShowMap(!showMap)}
            className="px-5 py-2 bg-purple-500 text-white rounded-full shadow hover:bg-purple-600"
          >
            📍 Show Location
          </button>

        </div>

        {/* HINDI SECTION */}
        {showHindi && (
          <>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              हिंदी विवरण
            </h2>

            <p className="text-base sm:text-lg leading-relaxed mb-6">
              {hindiText}
            </p>

            <div className="flex gap-4 mb-8">

              <button
                onClick={() => speak(hindiText, "hi-IN")}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
              >
                🔊
              </button>

              <button
                onClick={stopSpeech}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-600 text-white rounded-full shadow hover:bg-gray-700"
              >
                ⏹
              </button>

            </div>
          </>
        )}

        {/* MAP SECTION */}
        {showMap && (
          <div className="mt-8">

            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Location Map
            </h2>

            <div className="w-full h-[400px] rounded-xl overflow-hidden">
              <iframe
                title="map"
                width="100%"
                height="100%"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  place.title + " Jabalpur"
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>

          </div>
        )}
        
        {/* NEARBY PLACES */}
<div className="mt-10">

<h2 className="text-2xl sm:text-3xl font-semibold mb-6">
  Nearby Places
</h2>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

  {filteredNearby.map((p, index) => (
    <Link
      key={index}
      to={`/place/${p}`}
      className="bg-blue-100 hover:bg-blue-200 transition 
      rounded-lg p-4 text-center font-semibold"
    >
      {p}
    </Link>
  ))}

</div>

</div>
      </div>
    </div>
  );
}

export default PlaceDetails;

