import React, { useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./navbar.scss";
export default NavBar = ({ title, filterItemListByInput = () => {} }) => {
  const [searchInput, showSearchInput] = useState(false);
  const searchInputRef = useRef("");
  const toggleMovieListSearch = () => {
    showSearchInput(!searchInput);
    if (!searchInput) {
      setTimeout(() => searchInputRef.current.focus(), 0);
    }
  };
  const updateMovieListData = () => {
    let inputValue = searchInputRef.current.value;
    filterItemListByInput(inputValue);
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
        <div className="navbar-menu-movie-filter">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Filter by name"
            onChange={() => updateMovieListData()}
          />
        </div>
      )}
    </React.Fragment>
  );
};
