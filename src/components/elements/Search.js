import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search=()=>{
    const navigate=useNavigate();
    const [keyword, setKeyword]=useState("");

    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim())
            navigate(`/shop/${keyword}`);
        else
            navigate('/shop');
        }

    return(
        <Fragment>
            <form onSubmit={searchSubmitHandler}
            >
                <input
                    type="text"
                    placeholder="Search a book . . ."
                    onChange={(e)=>setKeyword(e.target.value)}
                    className="font-['Roboto_Slab'] text-lg mt-4 border-b"
                />
            </form>
        </Fragment>
    )
}

export default Search;