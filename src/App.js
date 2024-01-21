import React, { useState, useEffect, useRef } from "react";
import NavBar from "./Components/NavBar/NavBar";
import MovieListPage from "./Components/MovieListPage/MovieListPage";
import "./styles.css";

export default function App() {
  const itemCountValue = useRef(1);
  const [totalContentItem, setTotalContentItems] = useState(0);
  const [title, setTitle] = useState("");
  const [imageList, setImageList] = useState(() => []);
  const [movieList, setMovieList] = useState(() => []);
  //do api call
  const makeImageApiCall = () => {
    if (!imageList.length || imageList.length < totalContentItem) {
      fetch(
        `https://test.create.diagnal.com/data/page${itemCountValue.current}.json`
      )
        .then((response) => response.json())
        .then((resp) => {
          const totalContentItems = Number(resp.page["total-content-items"]);
          const movieContentItems = resp.page["content-items"]["content"];

          setTotalContentItems((old) => totalContentItems);
          setImageList((old) => old.concat(movieContentItems));
          setMovieList((old) => old.concat(movieContentItems));
          setTitle((old) => resp.page?.title);

          if (imageList.length <= totalContentItems) {
            itemCountValue.current += 1; // this is used for page number to call
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };
  useEffect(() => {
    makeImageApiCall(); // makes an api call on page load (componentDidMount)
  }, []);
  const filterItemListByInput = (name) => {
    if (name?.length >= 2) {
      //if text length is > 2 starts filtering by search string
      const filteredData = movieList.filter((item) => {
        return item.name?.toLowerCase().includes(name);
      });
      if (filteredData?.length) {
        setMovieList(filteredData);
      } else {
        setMovieList([]);
      }
    } else {
      setMovieList(imageList);
    }
  };
  return (
    <div className="App">
      <NavBar title={title} filterItemListByInput={filterItemListByInput} />
      <div className="movie-banners">
        {movieList.length ? (
          <MovieListPage
            movieList={movieList}
            makeImageApiCall={makeImageApiCall}
            totalContentItem={totalContentItem}
          />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
