import React, { useContext } from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import TinyDropdown from './TinyDropdown';
import './Navbar.css'
import NavContext from './NavContext.js';

const Navbar=()=>{

    const navigate=useNavigate();
    
    const options = [ 'Home', 'Explore', 'Shop', 'User' ];
    const { navOption, setNavOption } = useContext(NavContext);

    const navHandler=(option, index)=>{
        sessionStorage.setItem( 'NavOption', index);
        setNavOption(index);
        
        if(option==='Home')
            navigate('/');
        else if(option==='User')
            navigate('/login');
        else
            navigate(`/${option.toLowerCase()}`)
    }
        return(
            <div id='navbar' className="flex flex-row justify-between mx-3 sm:mx-9 mt-3 items-center">
                <h1 className="font-serif inline mt-1 tracking-wide">THE LORE STORE</h1>

                <div className="hidden sm:block">
                    <NavLink to='/' onClick={()=>{setNavOption(0);sessionStorage.setItem('NavOption',0);}}>
                    <h1 className="font-serif inline mr-4">Home</h1>
                    </NavLink>
                    <NavLink to='/explore' onClick={()=>{setNavOption(1);sessionStorage.setItem('NavOption',1);}}>
                    <h1 className="font-serif inline mr-4">Explore</h1>
                    </NavLink>
                    <NavLink to='/shop' onClick={()=>{setNavOption(2);sessionStorage.setItem('NavOption',2);}}>
                    <h1 className="font-serif inline mr-4">Shop</h1>
                    </NavLink>
                    <NavLink to='/login' onClick={()=>{setNavOption(3);sessionStorage.setItem('NavOption',3);}}>
                    <h1 className="font-serif inline">User</h1>
                    </NavLink>
                </div>

                <div id='tinynavbar' className="block sm:hidden font-serif">

                <TinyDropdown
                    options={options}
                    onSelect={(option, selectedIndex) => navHandler(option, selectedIndex)}
                    placeHolder='Home'
                    selectedIndex={navOption}
                    cssOverrides={{
                        dropdownButton: {
                            fontSize:'medium'
                        },
                        dropdownPanel: {
                            marginRight:"4px"
                        },
                        dropdownOption: {
                            fontFamily: 'serif',
                            marginBottom:'2px',
                            letterSpacing:'0.5px',
                            fontSize:'medium',
                        },
                        dropdownOptionSelected: {
                            fontFamily: 'serif',
                            marginBottom:'2px',
                            letterSpacing:'0.5px',
                            fontSize:'medium'
                        }
                      }}
                />
                </div>

            </div>
        )
    }

export default Navbar;