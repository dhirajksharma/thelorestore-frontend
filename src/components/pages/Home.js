import React, {useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import homeimg from '../../res/6737457.jpg';
import NavContext from "../elements/NavContext";


const Home=()=>{
    const navigate=useNavigate();
    const { navOption, setNavOption } = useContext(NavContext);

    const exploreHandler=()=>{
        setNavOption(1);
        navigate('/explore');
        sessionStorage.setItem('NavOption',1);
    }
        return(
            <div id="home" className="mx-4 sm:mx-9 h-[90vh] grid md:grid-cols-2 content-center justify-items-center md:items-center">
                <img src={homeimg} alt="" className="md:hidden w-[80vw] max-w-[430px] aspect-square"></img>
                
                <div className="">
                <h1 className="font-['Averia_Serif_Libre'] text-2xl md:text-4xl w-fit">What Lore Got You Hooked Today?</h1>
                <p className="font-['Montserrat'] md:text-2xl w-fit">Explore some from our best collection...</p>

                    <button
                    onClick={exploreHandler}
                    className="border-[3px] border-slate-500 px-8 py-2 mt-5 hover:bg-gray-100 active:bg-gray-200 active:border-slate-400"
                    >Explore</button>
                </div>
                
                <img src={homeimg} alt="" className="hidden md:block w-[40vw]"></img>
            </div>
        )
    
}

export default Home;