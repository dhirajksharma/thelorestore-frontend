import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom'
import notfoundimg from '../../res/3371471.jpg'
import NavContext from './NavContext.js';
import Metadata from "../elements/Metadata";
const Notfound=()=>{
    const { setNavOption } = useContext(NavContext);
    const navigate=useNavigate();

    const exploreHandler=()=>{
        setNavOption(1);
        sessionStorage.setItem('NavOption',1);
        navigate('/explore');
    }

    return (
        <div id="notfound" className="mx-4 sm:mx-9 h-[90vh] grid md:grid-cols-2 content-center justify-items-center md:items-center">
                <Metadata title="The Lore Store | ¯\_(ツ)_/¯"/>
                <img src={notfoundimg} alt="" className="md:w-[40vw] w-[80vw] max-w-[430px] md:max-w-none aspect-square"></img>

                <div>
                <h1 className="font-mono text-2xl md:text-4xl">Nothing found here...</h1>
                <p className="font-['Montserrat'] text-xl">Let's go back and explore some books instead</p>

                <button
                    onClick={exploreHandler}
                    className="bg-slate-600 hover:bg-slate-500 rounded-md font-medium px-8 py-3 mt-5 text-white"
                    >Explore</button>
                </div>

            </div>
    )
}

export default Notfound;