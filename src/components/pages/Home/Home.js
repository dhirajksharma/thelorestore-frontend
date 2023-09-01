import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import homeimg from '../../../res/6737457.jpg';
import NavContext from "../../elements/NavContext";
import Metadata from "../../elements/Metadata";

const Home=()=>{
    const navigate=useNavigate();
    const { setNavOption } = useContext(NavContext);

    const exploreHandler=()=>{
        setNavOption(1);
        navigate('/explore');
        sessionStorage.setItem('NavOption',1);
    }
        return(
            <div id="home" className="mx-4 sm:mx-9 h-[90vh] grid md:grid-cols-2 content-center justify-items-center md:items-center">
                <Metadata title="The Lore Store | Home"  nav={0}/>
                <img src={homeimg} alt="" className="md:hidden w-[80vw] max-w-[430px] aspect-square"></img>
                
                <div className="text-text">
                <h1 className="font-['Averia_Serif_Libre'] text-2xl md:text-4xl w-fit">What Lore Got You Hooked Today?</h1>
                <p className="font-['Montserrat'] md:text-2xl w-fit">Explore some from our best collection...</p>

                    <button
                    onClick={exploreHandler}
                    className="bg-yellow-400 hover:bg-yellow-300 rounded-md font-medium px-8 py-3 mt-5"
                    >Explore</button>
                </div>
                
                <img src={homeimg} alt="" className="hidden md:block w-[40vw]"></img>
            </div>
        )
    
}

export default Home;