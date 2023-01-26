import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";

const Search = ({searchKeyword}) => {

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const searchHandler = (e) => { 
        e.preventDefault();
        searchKeyword(keyword.trim())
    }

  return (
      <Fragment>
          <form onSubmit={searchHandler}>
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="input-group-append">
              <button id="search_btn" className="btn-medium ml-1">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          </form>
    </Fragment>
  )
}

export default Search