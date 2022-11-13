import React from "react";
const Review=({review})=>{
        return(
            <div className="flex flex-col justify-evenly border p-2">
                <h2 className="font-['Montserrat'] font-medium">{review.name}: {review.rating}&#9733;</h2>
                <h2 className="font-['Roboto_Slab'] text-sm mt-1">{review.comment}</h2>
            </div>
        )
    }

export default Review;