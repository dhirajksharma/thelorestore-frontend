import { Fragment } from "react";

export default function SellerUpdateProduct({UpdateBookHandler, updateBookDetails, setUpdateBookDetails}){
    const generateOptions=()=>{
      
        return ['Arts and Entertainment','Biographies and Memoirs','Business and Investing','Comics','Computer and Technology','Cookery, Food and Wine','Fiction and Literature','Health, Mind and Body','Religion and Spirituality'].map( genre => (
            <option value={genre}>{genre}</option>
        ));
    }
        
    return (
        <Fragment>
            <form onSubmit={UpdateBookHandler}>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase -ml-1">Enter ISBN Number to Update Book</h3>
                <input
                    type="text"
                    placeholder="ISBN Number"
                    value={updateBookDetails.isbn}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b -ml-1"
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, isbn: e.target.value}))}
                />
                <h1 className="font-['Montserrat'] -ml-1 mt-2 text-sm"><b>*Only fill in the fields that you want to update</b></h1>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 -ml-1">Book Info</h3>
                <select
                    className="-ml-1 block font-['Montserrat'] font-medium text-gray-600 uppercase text-sm mb-2"
                    value={updateBookDetails.genre}
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, genre: e.target.value}))}>
                    {generateOptions()}
                    <option value="">SELECT A GENRE</option>
                </select>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Title</h3>
                <input
                    type="text"
                    placeholder="Book Title"
                    value={updateBookDetails.title}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, title: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Author</h3>
                <input
                    type="text"
                    placeholder="Book Author"
                    value={updateBookDetails.author}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, author: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Description</h3>
                <textarea
                placeholder="Write a description for the book..."
                value={updateBookDetails.description}
                onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, description: e.target.value}))}
                className="block font-serif border-x border-y min-w-[250px] w-[30vw]"
                rows={4}
                ></textarea>

                
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 mt-5 -ml-1">Publishing Info</h3>
            
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Publisher Name</h3>
                <input
                    type="text"
                    placeholder="Book Publisher"
                    value={updateBookDetails.publisher}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, publisher: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Publishing Year</h3>
                <input
                    type="text"
                    placeholder="Book Publishing Year"
                    value={updateBookDetails.year}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, year: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Maximum Retail Price</h3>
                <input
                    type="text"
                    placeholder="Book MRP"
                    value={updateBookDetails.maxprice}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, maxprice: e.target.value}))}
                />
                    
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 mt-5 -ml-1">Seller Info</h3>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Quantity</h3>
                <input
                    type="text"
                    placeholder="Book Quantity"
                    value={updateBookDetails.currentSeller.quantity}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, currentSeller:{...updateBookDetails.currentSeller,quantity: e.target.value}}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Your Selling Price</h3>
                <input
                    type="text"
                    placeholder="Book Selling Price"
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    value={updateBookDetails.currentSeller.sellingPrice}
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, currentSeller:{...updateBookDetails.currentSeller,sellingPrice: e.target.value}}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Cover Image Link</h3>
                <input
                    type="text"
                    placeholder="Book Cover Image Link"
                    value={updateBookDetails.image}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setUpdateBookDetails(updateBookDetails=>({...updateBookDetails, image: e.target.value}))}
                />
                <button type='submit' className='p-2 bg-yellow-400 hover:bg-yellow-300 rounded-md block mt-4 mb-3 font-["Montserrat"] font-medium'>Update Book</button>
            </form>
        </Fragment>
    )
}