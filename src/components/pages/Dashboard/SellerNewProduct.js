import { Fragment } from "react";

export default function SellerNewProduct({AddBookHandler, newBookDetails, setNewBookDetails}){
    function generateOptions(){
      
        return ['Arts and Entertainment','Biographies and Memoirs','Business and Investing','Comics','Computer and Technology','Cookery, Food and Wine','Fiction and Literature','Health, Mind and Body','Religion and Spirituality'].map( genre => (
            <option value={genre}>{genre}</option>
        ));
    }
    
    return (
        <Fragment>
            <form onSubmit={AddBookHandler}>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 -ml-1">Book Info</h3>
                <select
                    required
                    className="-ml-1 block font-['Montserrat'] font-medium text-gray-600 uppercase text-sm mb-2"
                    value={newBookDetails.genre}
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, genre: e.target.value}))}>
                    <option value="">SELECT A GENRE</option>
                    {generateOptions()}
                </select>
            <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Title</h3>
                <input
                    required
                    type="text"
                    placeholder="Book Title"
                    value={newBookDetails.title}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, title: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Author</h3>
                <input
                    required
                    type="text"
                    placeholder="Book Author"
                    value={newBookDetails.author}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, author: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Description</h3>
                <textarea
                required
                placeholder="Write a description for the book..."
                value={newBookDetails.description}
                onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, description: e.target.value}))}
                className="block font-serif border-x border-y min-w-[250px] w-[30vw]"
                rows={4}
                ></textarea>
                
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 mt-5 -ml-1">Publishing Info</h3>
            
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">ISBN Number</h3>
                <input
                    required
                    type="text"
                    placeholder="Book ISBN"
                    value={newBookDetails.isbn}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, isbn: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Publisher Name</h3>
                <input
                    required
                    type="text"
                    placeholder="Book Publisher"
                    value={newBookDetails.publisher}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, publisher: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Publishing Year</h3>
                <input
                    required
                    type="text"
                    placeholder="Book Publishing Year"
                    value={newBookDetails.year}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, year: e.target.value}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Maximum Retail Price</h3>
                <input
                    required
                    type="text"
                    placeholder="Book MRP"
                    value={newBookDetails.maxprice}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, maxprice: e.target.value}))}
                />
                    
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-lg mb-2 mt-5 -ml-1">Seller Info</h3>
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Quantity</h3>
                <input
                    required
                    type="text"
                    placeholder="Book Quantity"
                    value={newBookDetails.currentSeller.quantity}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, currentSeller:{...newBookDetails.currentSeller,quantity: e.target.value}}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Your Selling Price</h3>
                <input
                    required
                    type="text"
                    placeholder="Book Selling Price"
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    value={newBookDetails.currentSeller.sellingPrice}
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, currentSeller:{...newBookDetails.currentSeller,sellingPrice: e.target.value}}))}
                />
                <h3 className="font-['Montserrat'] font-medium text-gray-600 uppercase text-sm">Cover Image Link</h3>
                <input
                    required
                    type="text"
                    placeholder="Book Cover Image Link"
                    value={newBookDetails.image}
                    className="mb-2 font-serif tracking-wider text-slate-900 min-w-[250px] w-[30vw] border-b"
                    onChange={(e)=>setNewBookDetails(newBookDetails=>({...newBookDetails, image: e.target.value}))}
                />
                <button type='submit' className='p-2 bg-yellow-400 hover:bg-yellow-300 rounded-md block mt-4 mb-3 font-["Montserrat"] font-medium'>Add Book</button>
            </form>
        </Fragment>
    )
}