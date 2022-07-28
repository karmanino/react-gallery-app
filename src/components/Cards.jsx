import React, { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";

const Cards = () => {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const peticion = useCallback(async () => {
    const key = "fasZVxz-c78pBnwuPGmuj0lEU-nAHmUZi1oYXuu0_Lk";
    let route = `https://api.unsplash.com/photos/?client_id=${key}&per_page=12`;
    if (input !== "") {
      route = `https://api.unsplash.com/search/photos/?query=${encodeURI(
        input
      )}&per_page=12&client_id=${key}`;
    }

    setLoading(true);

    const res = await fetch(route);
    const data = await res.json();
    if (data.results) {
      setImages(data.results);
    } else {
      setImages(data);
    }
    setLoading(false);
  }, [input]);

  useEffect(() => {
    peticion(input);
  }, [input, peticion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    setInput(text);
  };

  return (
    <div className="text-center content">
      <form onSubmit={handleSubmit}>
        <label className="w-75">
          Search keywords: <input type="text" className="w-75" name="inputText" />
        </label>
        <button type="submit" className="btn btn-warning">
          <span className="material-icons">Search</span>
        </button>
      </form>

      <hr />

      {loading && <Loading />}

      <div className="cards">
        {images.map((img) => {
          return <Card key={img.id} img={img.urls.regular} />;
        })}
      </div>
    </div>
  );
};

export default Cards;
