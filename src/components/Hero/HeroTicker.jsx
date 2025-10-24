import React, { useEffect, useState } from "react";
import "./HeroTicker.css";

function HeroTicker() {
  const [animeData] = useState([
    [
      "Demon Slayer",
      "https://4kwallpapers.com/images/wallpapers/tanjiro-kamado-2560x2560-9322.jpg",
    ],
    [
      "JoJo",
      "https://4kwallpapers.com/images/wallpapers/jojos-bizarre-2048x2048-13743.jpg",
    ],
    [
      "Hunter Hunter",
      "https://i.pinimg.com/736x/3f/06/23/3f06237b631eb8c499ba638b888c1081.jpg",
    ],
    [
      "Death Note",
      "https://play-lh.googleusercontent.com/w_jj4cm0qhxg7tjFopS9lS1qgFTyJeHsEkt7svlYR5huhbYMwXb50z5xYxy6oxT5OZlg",
    ],
    [
      "Naruto",
      "https://i.pinimg.com/736x/e4/64/75/e464758d26a1cd32a216404e5bc02a11.jpg",
    ],
    [
      "Fullmetal Alchemist",
      "https://4kwallpapers.com/images/wallpapers/alphonse-elric-1280x1280-10551.jpg",
    ],
  ]);

  const loopAnime = [...animeData, ...animeData];

  return (
    <div aria-label="coolest animes" className="ticker-wrapp">
      <div className="wrap">
        <div className="ticker" id="animeTicker">
          {loopAnime.map(([animeName, img], index) => (
            <span
              key={`${animeName}-${index}`}
              className="anime"
              role="listitem"
              aria-label={animeName}
            >
              <img
                src={img}
                className="anime-icon"
                alt={animeName}
                aria-hidden="true"
              />
              <b className="anime-name">{animeName}</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroTicker;
