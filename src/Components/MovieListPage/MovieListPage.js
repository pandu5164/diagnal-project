import React, { useState, useEffect } from "react";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/black-and-white.css"; //blur.css
import "./movielistpage.scss";
import defaultImage from "./diagnal_logo.jpeg"; // default image
const MovieListPage = ({
  imageList = [],
  movieList = [],
  makeApiCall = () => {},
  totalContentItem,
}) => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  // function to trigger on scroll
  const handleScroll = async (event) => {
    const target = event.target.scrollingElement;
    setScrollPosition({ x: target.scrollWidth, y: target.scrollHeight });
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      makeApiCall();
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (<React.Fragment>
    <div className="movie-list">
      {!movieList.length && <p>No data to show</p>}
      {movieList.length &&
        movieList?.map((image, id) => (
          <div key={id} className="movie-item">
            <LazyLoadImage // lazy loading image
              wrapperClassName="movie-banner"
              key={id}
              alt={image.name}
              effect="black-and-white" //blur
              threshold={100}
              width={100} //2 times width
              height={150} // 3 times height
              placeholderSrc={defaultImage} // giving default image in case of image not available
              scrollPosition={scrollPosition}
              src={`https://test.create.diagnal.com/images/${image["poster-image"]}`}
              visibleByDefault={image.src === defaultImage}
            />
            <p className="movie-name" title={image.name}>
              {image.name}
            </p>
          </div>
        ))}
      <br />
    </div>
    {totalContentItem === movieList.length && imageList.length && (
      <p className="end-of-list"><span>End of list</span><br /><span>{`${imageList.length} items viewed`}</span></p>
    )}
  </React.Fragment>);
};
export default trackWindowScroll(MovieListPage); // lazy load image plugin component requires to be wrapped in trackWindowScroll to indentify scroll behaviour
