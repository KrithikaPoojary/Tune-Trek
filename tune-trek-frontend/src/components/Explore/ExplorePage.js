import React from "react";

function ExplorePage() {
  const moods = ["Happy", "Chill", "Sad", "Romantic", "Workout"];

  return (
    <div>
      <h2 className="mb-3">Explore by Mood</h2>

      <div className="d-flex gap-2 flex-wrap">
        {moods.map((mood) => (
          <button key={mood} className="btn btn-outline-primary">
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
