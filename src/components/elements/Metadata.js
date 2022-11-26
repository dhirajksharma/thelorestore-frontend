import React, { useContext } from "react";
import Helmet from "react-helmet";
import NavContext from "./NavContext";

const Metadata =({title, nav, ogimage="https://github.com/dhirajksharma/thelorestore-frontend/blob/main/src/res/thumb.jpg?raw=true"}, ogtitle="The Lore Store", ogdes="An online Book Store created by one Dhiraj K. Sharma") =>{

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
            <meta name="og:image" content={ogimage} />
            <meta property="og:title" content={ogtitle} />
            <meta property="og:description" content={ogdes}/>
        </Helmet>
    )
}

export default Metadata;