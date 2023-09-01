import React from "react";
import { Link } from "react-router-dom";
const Product=({product})=>{
    function ellipsify (str) {
        if (str.length > 35) {
            return (str.substring(0, 35) + "...");
        }
        else {
            return str;
        }
    }
        return(
            <Link to={`/books/${product._id}`}>
            <div className="mx-4 mb-4">
                <img alt="product" src={product.image[0].url} className="w-[100px] sm:w-40 aspect-[3/4] rounded-md"></img>
                <h2 className="font-serif text-sm sm:text-base mt-1 -mb-1">{ellipsify(product.title)}</h2>
                <h3 className="text-gray-700 text-sm sm:text-base sm:block font-serif font-thin -mb-1">{product.author}</h3>
                <h2 className="font-serif font-thin text-gray-500 text-sm sm:text-base ">{product.year}</h2>
            </div>
            </Link>
        )
    }

export default Product;