import React, { useContext } from "react";
import {Link, useNavigate} from 'react-router-dom'
import notfoundimg from '../../res/3371471.jpg'
import NavContext from './NavContext.js';

const Notfound=()=>{
    const { navOption, setNavOption } = useContext(NavContext);
    const navigate=useNavigate();

    const exploreHandler=()=>{
        setNavOption(1);
        sessionStorage.setItem('NavOption',1);
        navigate('/explore');
    }

    return (
        <div id="notfound" className="mx-4 sm:mx-9 h-[90vh] grid md:grid-cols-2 content-center justify-items-center md:items-center">

                <img src={notfoundimg} alt="" className="md:w-[40vw] w-[80vw] max-w-[430px] md:max-w-none aspect-square"></img>

                <div>
                <h1 className="font-mono text-2xl md:text-4xl">Nothing found here...</h1>
                <p className="font-['Montserrat'] text-xl">Let's go back and explore some books instead,</p>

                <button
                    onClick={exploreHandler}
                    className="border-[3px] border-slate-500 px-8 py-2 mt-5 hover:bg-gray-100 active:bg-gray-200 active:border-slate-400"
                    >Explore</button>
                </div>

            </div>
    )
}

export default Notfound;