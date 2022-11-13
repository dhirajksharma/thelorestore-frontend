import React from "react";
import { Link } from "react-router-dom";
const Product=({product})=>{
        return(
            <Link to={`/books/${product._id}`}>
            <div className="mx-4 mb-4">
                <img alt="product" src={product.image[0].url} className="w-[100px] sm:w-40 aspect-ratio-[0.69]"></img>
                <h2 className="font-serif text-sm sm:text-base mt-1 -mb-1">{product.title}</h2>
                <h3 className="hidden text-sm sm:text-base sm:block font-serif font-thin -mb-1">{product.author}</h3>
                <h2 className="font-serif font-thin  text-sm sm:text-base ">{product.year}</h2>
            </div>
            </Link>
        )
    }

export default Product;