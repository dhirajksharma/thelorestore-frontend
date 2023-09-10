import React, { Fragment, useContext, useRef } from "react";
import { useEffect, useState } from "react";
import Product from "../../elements/Product";
import { getProduct } from "../../../actions/productAction";
import {useSelector, useDispatch} from 'react-redux';
import Pagination from 'react-js-pagination';
import Loader from "../../elements/Loader";
import TinyDropdown from '../../elements/TinyDropdown';
import './Explore.css';
import Metadata from "../../elements/Metadata";
import { toast } from "react-toastify";
import NavContext from "../../elements/NavContext";
const Explore=()=>{
    const dispatch=useDispatch();
    const {product, loading, productsCount, resultPerPage, filteredProductCount}=useSelector(state=>state.products)
    const [currentPage, setCurrentPage]=useState(1);
    const {serverError}=useContext(NavContext);

    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    const [genre, setGenre]=useState("");

    const options=['All','Arts and Entertainment','Biographies and Memoirs','Business and Investing','Comics','Computer and Technology','Cookery, Food and Wine','Fiction and Literature','Health, Mind and Body','Religion and Spirituality'];
    const [optionSelected,setOptionSelected]=useState(0);
    useEffect(()=>{
        dispatch(getProduct("",currentPage,[0,25000],0,{maxprice:0,year:0,ratings:0},genre));
    },[dispatch, genre, currentPage]);


    const handleGenre=(evt)=>{
        if(evt.target.innerText==='All')
            setGenre("");
        else
            setGenre(evt.target.innerText);
    }

    const genreHandler=(option, index)=>{
        setOptionSelected(index);
        if(option==='All')
            setGenre("");
        else
            setGenre(option);
    }

    const generateOptions=()=>
    {
        return ['All','Arts and Entertainment','Biographies and Memoirs','Business and Investing','Comics','Computer and Technology','Cookery, Food and Wine','Fiction and Literature','Health, Mind and Body','Religion and Spirituality'].map( genre => (
            <button className="hover:bg-gray-100 block font-serif text-left font-light mb-2 px-2 py-1 rounded-md max-w-[250px]" onClick={handleGenre}>{genre}</button>
        ));
    }
    const loadRef=useRef(loading);
    loadRef.current=loading;
    const serverRef=useRef(serverError);
    serverRef.current=serverError;

    const traffcheck=()=>{
        setTimeout(()=>{
            if(loadRef.current===true && serverRef.current!==1)
            toast('🐢 The first request takes upto 30s, please wait while the server is spun up...', {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId:"traffcheck"
                });
        },8000)
    }
        return(
            <div id="explore" className="mx-4 sm:mx-9 text-text">
            <Metadata title="The Lore Store | Explore"  nav={1}/>
                {loading ?(
                        <Fragment>
                        <Loader/>
                        {traffcheck()}
                        </Fragment>
            ):(
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] grid-rows-[min-content_auto_min-content] gap-2 h-[90vh]">

                <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 border-yellow-400 w-1/3 pb-1 col-start-1 col-end-3">Browse Genres</h1>                
                
                <div className="hidden sm:flex flex-col pl-1">
                    {generateOptions()}
                </div>

                <div id='tinyexplore' className="sm:hidden font-['Montserrat'] font-medium flex justify-between items-center">
                    Select a Genre: 
                <TinyDropdown
                    options={options}
                    onSelect={(option, selectedIndex) => genreHandler(option, selectedIndex)}
                    placeHolder='All'
                    selectedIndex={optionSelected}
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
                
                <div className="prd_display">
                    {product && product.map(prod =>(
                        <Product product={prod}/>
                    ))}
                </div>    
                {resultPerPage < filteredProductCount && (
                    <div className='flex flex-row justify-center text-gray-500 sm:col-start-2 pb-2'>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText='Next'
                            prevPageText='Prev'
                            firstPageText='1st'
                            lastPageText='Last'
                            itemClass='mx-2'
                            linkClass=''
                            activeLinkClass="text-black font-bold"
                            innerClass="flex flex-row"
                            activeClass=""
                            />
                    </div>
                )}
            </div>
            )}
            </div>
        )
    }

export default Explore;