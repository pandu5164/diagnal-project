import React, { useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./navbar.scss";
const NavBar = ({
  title,
  filterItemListByInput = () => {},
  restView = () => {},
}) => {
  const [searchInput, showSearchInput] = useState(false);
  const [isInputCleared, setIsInputCleared] = useState(false);
  const searchInputRef = useRef("");
  // toggles the input text on click of search icon on nav bar
  const toggleMovieListSearch = () => {
    showSearchInput(!searchInput);
    if (!searchInput) {
      setTimeout(() => searchInputRef.current.focus(), 0); // delay is for focus after state update and input is visible in viewport
    } else {
      restView();
    }
  };
  // filter operation - call the parent function
  const updateMovieListData = (e) => {
    console.log("targetval", e.target.value);
    if (e.target.value) {
      searchInputRef.current.value = e.target.value;
      let inputValue = searchInputRef.current.value;
      setIsInputCleared(false);
      filterItemListByInput(inputValue);
    } else {
      searchInputRef.current.value = "";
      setIsInputCleared(true);
    }
  };
  return (
    <React.Fragment>
      <nav className="navbar">
        <LazyLoadImage
          wrapperClassName="nav-img"
          src={`https://test.create.diagnal.com/images/nav_bar.png`}
          height={64}
        />
        <div className="nav-menu">
          <div className="nav-menu-left">
            <LazyLoadImage
              wrapperClassName="nav-back"
              src={`https://test.create.diagnal.com/images/Back.png`}
              height={24}
            />
            <p className="nav-menu-genre">{title}</p>
          </div>
          <div className="nav-menu-right">
            <div className="nav-menu-movie-search">
              <LazyLoadImage
                onClick={() => toggleMovieListSearch()}
                wrapperClassName="nav-search"
                src={`https://test.create.diagnal.com/images/search.png`}
                height={24}
              />
            </div>
          </div>
        </div>
      </nav>
      {searchInput && (
        <React.Fragment>
          <div className="navbar-menu-movie-filter">
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Filter by name"
              onChange={(e) => updateMovieListData(e)}
            />
            {searchInputRef.current?.value?.length ? (
              <div className="navbar-menu-search-hightlight">
                Search for: {searchInputRef.current?.value || "--"}
              </div>
            ) : null}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default NavBar;