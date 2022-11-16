import React, { useContext } from "react";
import Helmet from "react-helmet";
import NavContext from "./NavContext";

const Metadata =({title, nav}) =>{

    const { navOption, setNavOption } = useContext(NavContext);
    const setNav=()=>{
        if(sessionStorage.getItem('NavOption')!=nav){
            if(nav>=0){
                sessionStorage.setItem( 'NavOption', nav);
                setNavOption(nav);
            }
        }
    }
    return(
        <Helmet>
            <title>{title}</title>
            {setNav()};
        </Helmet>
    )
}

export default Metadata;