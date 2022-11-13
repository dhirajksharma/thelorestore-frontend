import {React} from 'react';

const Cartitems=({item})=>{
    
    return (
        <div>
            <h1>{item.name}</h1>
            <h1>{item.price}</h1>
            <h1>{item.quantity}</h1>
            <h1>{item.sellerName}</h1>
        </div>
    )
}

export default Cartitems;