import React, { useState, useEffect, useRef, useContext } from "react";
import NavBar from "./Components/NavBar/NavBar";
import MovieListPage from "./Components/MovieListPage/MovieListPage";
import "./styles.css";

export default function App() {
  const itemCountValue = useRef(1);
  const [totalContentItem, setTotalContentItems] = useState(0);
  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const [title, setTitle] = useState("");
  const [imageList, setImageList] = useState([]);
  const [movieList, setMovieList] = useState(imageList);
  const makeImageApiCall = () => {
    console.log("api call data before", {
      itemCountValue: itemCountValue.current,
      itemsLength: imageList.length,
      totalContentItem,
    });
    if (!imageList.length || imageList.length < totalContentItem) {
      fetch(
        `https://test.create.diagnal.com/data/page${itemCountValue.current}.json`
      )
        .then((response) => response.json())
        .then((resp) => {
          // console.log("setImageList", resp.page["content-items"]);
          const totalContentItems = Number(resp.page["total-content-items"]);
          setTotalContentItems(totalContentItems);
          const movieContentItems = [
            ...imageList,
            ...resp.page["content-items"]["content"],
          ];
          setImageList(movieContentItems);
          setMovieList(movieContentItems);
          setTitle(resp.page?.title);
          if (movieContentItems.length <= totalContentItems) {
            console.log("called incrementor");
            itemCountValue.current += 1;
          }
          console.log("api call data after", {
            itemCountValue: itemCountValue.current,
            itemsLength: movieContentItems.length,
            totalContentItems,
            movieContentItems,
          });
        })
        .catch((err) => {
          setIsErrorOccured(err.message);
        });
    } else {
      console.log("no more api calls will be done, as the limit reached");
    }
  };
  useEffect(() => {
    makeImageApiCall();
  }, []);
  const filterItemListByInput = (name) => {
    if (name?.length >= 2) {
      const filteredData = movieList.filter((item) => {
        return item.name?.toLowerCase().indexOf(name) >= 0;
      });
      if (filteredData?.length) {
        setMovieList(filteredData);
      } else {
        setMovieList(imageList);
      }
    } else {
      setMovieList(imageList);
    }
  };
  return (
    <div className="App">
      <NavBar title={title} filterItemListByInput={filterItemListByInput} />
      <div className="movie-banners">
        {isErrorOccured && <p>Error occured while fetching for data</p>}
        {!isErrorOccured && movieList.length && (
          <MovieListPage
            movieList={movieList}
            makeImageApiCall={makeImageApiCall}
            totalContentItem={totalContentItem}
          />
        )}
      </div>
    </div>
  );
}
