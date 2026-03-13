export async function searchPlaces(category) {
    const query = `${category} in Jabalpur`;
  
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        query
      )}&format=json&origin=*`
    );
  
    const data = await res.json();
    return data.query.search;
  }
  
  export async function getPlaceDetails(title) {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=true&titles=${encodeURIComponent(
        title
      )}&pithumbsize=800&format=json&origin=*`
    );
  
    const data = await res.json();
    return Object.values(data.query.pages)[0];
  }
  