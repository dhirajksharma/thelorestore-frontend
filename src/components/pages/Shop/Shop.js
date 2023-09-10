import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import Product from '../../elements/Product';
import Loader from '../../elements/Loader';
import { getProduct } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../elements/Search";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';
import Slider from 'react-input-slider';
import TinyDropdown from '../../elements/TinyDropdown';
import './Shop.css';
import $ from 'jquery';
import controller from '../../../res/settings.png'
import Metadata from "../../elements/Metadata";
import { toast } from "react-toastify";
import NavContext from "../../elements/NavContext";

const Shop=()=>{
    const dispatch=useDispatch();
    const {serverError}=useContext(NavContext);
    const {product, loading, productsCount, resultPerPage, filteredProductCount}=useSelector(state=>state.products)
    const [currentPage, setCurrentPage]=useState(1);
    const [state, setState] = useState({ x: 5000});
    const [colorbtn, setColorbtn]=useState(0);
    const [rating, setRating] = useState({ x: 0});
    const [dragEnd, setDragEnd]=useState(1);
    const [sort, setSort]=useState({
        maxprice:0,
        ratings:0,
        year:0
    })
    const options=['None','Price: Low to High', 'Price: High to Low', 'Newest Arrivals First', 'Most Rated Books First']
    const [optionSelected, setOptionSelected]=useState(0);

    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    let {keyword}=useParams();

    useEffect(()=>{
        dispatch(getProduct(keyword, currentPage, [0,state.x], rating.x, sort));
    },[dispatch,keyword, currentPage, dragEnd, sort,rating.x, state.x])

    const sortHandler=(index)=>{
        setOptionSelected(index);
        if(index===0){
            setColorbtn(0);
            setSort({year:0,ratings:0,maxprice:0})
        }
        else
            handleSortToggle(index);
    }


    const handleSortToggle=(item)=>{
        switch(item){
            case 1:
                if(sort.maxprice===0){
                    setSort({year:0,ratings:0,maxprice:1})
                    setColorbtn(1);
                }
                else{
                    setSort({year:0,ratings:0,maxprice:0})
                    setColorbtn(0);
                }
                return;
            case 2:
                if(sort.maxprice===0||sort.maxprice===1){
                    setSort({year:0,ratings:0,maxprice:-1})
                    setColorbtn(2);
                }
                else{
                    setSort({year:0,ratings:0,maxprice:0})
                    setColorbtn(0);
                    }
                return;
            case 3:
                if(sort.year===0){
                    setSort({year:-1,ratings:0,maxprice:0})
                    setColorbtn(3);
                }
                else{
                    setSort({year:0,ratings:0,maxprice:0})
                    setColorbtn(0);
                }
                return;
            case 4:
                if(sort.ratings===0){
                    setSort({year:0,ratings:-1,maxprice:0})
                    setColorbtn(4);
                }
                else{
                    setSort({year:0,ratings:0,maxprice:0})
                    setColorbtn(0);
                }
                return;
            default:
                return;
        }
    }

    const togglefilterdiv=()=>{
        let dib=document.querySelector('#filterdiv');
        if(dib.style.display==='flex')
            $('#filterdiv').hide();
        else{
            $('#filterdiv').slideToggle();
            dib.style.display='flex';
        }
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
        <div id="shop" className="mx-3 sm:mx-9 h-[90vh] text-text">
            <Metadata title="The Lore Store | Shop" nav={2}/>
            {loading ?(
                        <Fragment>
                        <Loader/>
                        {traffcheck()}
                        </Fragment>
            ):(
            <div className="sm:grid sm:grid-cols-[1fr_2fr] grid-rows-[min-content_auto_min-content] gap-2 h-[90vh]">

                <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-4xl font-serif mt-2 border-b-2 border-yellow-400 w-1/3 pb-1 col-start-1 col-end-3">Checkout Store</h1>
                    <div className="flex flex-col pl-1 items-center sm:items-start">
                        <div id='filterfix' className="flex flex-row justify-center sm:justify-start items-center">
                            <Search/>
                            <img src={controller} alt="filters" className="w-[17px] sm:hidden ml-2 mt-4" onClick={togglefilterdiv}/>
                        </div>

                        <div id='filterdiv' className="font-serif mt-7 hidden sm:flex flex-col items-center sm:items-start w-fit sm:w-auto">
                            <h1 className="border-b border-accent sm:w-1/2 sm:text-left sm:px-0 text-center px-24 w-fit">Filters</h1>
                            <p className="mt-2 text-center sm:text-left mb-1">{`Max Price: ${state.x}`}</p>
                            <Slider
                                axis="x" x={state.x}
                                xmax={10000}
                                onChange={({ x }) => setState(state => ({ ...state, x }))}
                                onDragEnd={(dragEnd)=>{setDragEnd(dragEnd => (dragEnd+1))}}
                            />
                            
                            <p className="mt-2 text-center sm:text-left mb-1">{`Minimum Rating: ${rating.x}`}</p>
                            <Slider
                                axis="x" x={rating.x}
                                xmax={5}
                                onChange={({ x }) => setRating(rating => ({ ...rating, x }))}
                                onDragEnd={(dragEnd)=>{setDragEnd(dragEnd => (dragEnd+1))}}
                            />

                        <div className="hidden sm:block">
                            <h1 className="border-b border-accent w-1/2 mt-5">Sort</h1>
                                {colorbtn!==1 && <button id='sortbtn1' className="block m-1 w-full border-2 p-1 rounded-md mt-4 hover:bg-gray-100" onClick={()=>handleSortToggle(1)}>Price: Low to High</button>}
                                {colorbtn===1 && <button id='sortbtn1' className="bg-yellow-400 border-2 border-yellow-400 block w-full m-1 p-1 rounded-md mt-4" onClick={()=>handleSortToggle(1)}>Price: Low to High</button>}
                                
                                {colorbtn!==2 && <button id='sortbtn2' className="block m-1 w-full border-2 p-1 rounded-md hover:bg-gray-100" onClick={()=>handleSortToggle(2)}>Price: High to Low</button>}
                                {colorbtn===2 && <button id='sortbtn2' className="bg-yellow-400 border-2 border-yellow-400 block w-full m-1 p-1 rounded-md" onClick={()=>handleSortToggle(2)}>Price: High to Low</button>}

                                {colorbtn!==3 && <button id='sortbtn3' className="block m-1 w-full border-2 p-1 rounded-md hover:bg-gray-100" onClick={()=>handleSortToggle(3)}>Newest Arrivals First</button>}
                                {colorbtn===3 && <button id='sortbtn3' className="bg-yellow-400 border-2 border-yellow-400 block w-full m-1 p-1 rounded-md" onClick={()=>handleSortToggle(3)}>Newest Arrivals First</button>}

                                {colorbtn!==4 && <button id='sortbtn4' className="block m-1 w-full border-2 p-1 rounded-md hover:bg-gray-100" onClick={()=>handleSortToggle(4)}>Most Rated Books First</button>}
                                {colorbtn===4 && <button id='sortbtn4' className="bg-yellow-400 border-2 border-yellow-400 block w-full m-1 p-1 rounded-md" onClick={()=>handleSortToggle(4)}>Most Rated Books First</button>}
                        </div>               

                        <div id='tinysort' className="mt-5 mb-3 sm:hidden font-medium flex justify-between items-center mx-5">
                            <p className="pb-0.5 mr-1">Sort: </p>
                                <TinyDropdown
                                    options={options}
                                    onSelect={(option, selectedIndex) => sortHandler(selectedIndex)}
                                    placeHolder='None'
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

                        </div>
                    </div>

                    <div className="prd_display mt-2 sm:mt-0">
                        {product && product.map(prod =>(
                            <Product product={prod}/>
                        ))}
                    </div>
                    {resultPerPage < filteredProductCount && (
                        <div className='flex flex-row justify-center text-gray-500 col-start-2'>
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

export default Shop;