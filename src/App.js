import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "./Components/NavBar/NavBar";
import MovieListPage from "./Components/MovieListPage/MovieListPage";
import getMovieList from "./Services/MovieListService/MovieListService";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default function App() {
  const itemFlags = useRef({ itemCountValue: 1, isPageBottomReached: false });
  const [totalContentItem, setTotalContentItems] = useState(0);
  const [title, setTitle] = useState("");
  const [imageList, setImageList] = useState(() => []);
  const [movieList, setMovieList] = useState(() => []);
  //do api call
  const onSuccess = (resp) => {
    const totalContentItems = Number(resp.page["total-content-items"]);
    const movieContentItems = resp.page["content-items"]["content"];
    setTotalContentItems(totalContentItems);
    setImageList((old) => old.concat(movieContentItems));
    setMovieList((old) => old.concat(movieContentItems));
    setTitle(resp.page?.title);
  };
  const onError = (err) => {
    console.log("error while making api call", err);
    toast.error(`Error: ${err.message}`, {
      position: "top-right",
      className: "toast-bar",
    });
  };
  const makeApiCall = () => {
    if (!itemFlags.current.isPageBottomReached) {
      getMovieList({
        pageNum: itemFlags.current.itemCountValue,
        callBacks: { onSuccess, onError },
      });
    } else {
      toast.success("End of list reached!", {
        position: "top-right",
        className: "toast-bar",
      });
    }
  };
  useEffect(() => {
    if (imageList.length < totalContentItem) {
      itemFlags.current = {
        ...itemFlags.current,
        itemCountValue: itemFlags.current.itemCountValue + 1,
      }; // this is used for page number to call
    } else if (imageList.length && imageList.length === totalContentItem) {
      itemFlags.current = {
        ...itemFlags.current,
        isPageBottomReached: true,
      };
    }
  }, [imageList]);
  useEffect(() => {
    makeApiCall(); // makes an api call on page load (componentDidMount)
  }, []);
  const filterItemListByInput = (name) => {
    if (name?.length >= 2) {
      //if text length is > 2 starts filtering by search string
      const filteredData = imageList.filter((item) => {
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
            imageList={imageList}
            movieList={movieList}
            makeApiCall={makeApiCall}
            totalContentItem={totalContentItem}
          />
        ) : (
          <p>No data available</p>
        )}
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
