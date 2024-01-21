import React, { useState, useEffect } from "react";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./movielistpage.scss";
const MovieListPage = ({
  movieList = [],
  makeImageApiCall = () => {},
  totalContentItem,
}) => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const handleScroll = (event) => {
    const target = event.target.scrollingElement;
    setScrollPosition({ x: target.scrollWidth, y: target.scrollHeight });
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      makeImageApiCall();
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="movie-list">
      {!movieList.length && <p>No data to show</p>}
      {movieList.length &&
        movieList?.map((image, id) => (
          <div key={id} className="movie-item">
            <LazyLoadImage
              wrapperClassName="movie-banner"
              key={id}
              alt={image.name}
              effect="blur"
              threshold={100}
              width={100} //2 times width
              height={150} // 3 times height
              scrollPosition={scrollPosition}
              src={`https://test.create.diagnal.com/images/${image["poster-image"]}`}
              visibleByDefault={image.src === "/diagnal_logo.jpg"}
            />
            <p className="movie-name">{image.name}</p>
          </div>
        ))}
      <br />
      {totalContentItem === movieList.length && movieList.length && (
        <p className="end-of-list">--- End of list ---</p>
      )}
    </div>
  );
};
export default trackWindowScroll(MovieListPage);
