/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { Link } from "react-router-dom";
import "./css/searchBar.scss";

function SearchBar()
{

  return (
    <div className="searchBar">
      <div >
        <input type="text" name="location" placeholder="Ville ..." required={true}/>
        <button className={"flex justify-center justify-items-center text-center pt-4"}>
        <Link to={'/list'}>
          {/*<a href={"/list"}>*/}
            <img src="/search.png" alt="" />
          {/*</a>*/}
        </Link>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
