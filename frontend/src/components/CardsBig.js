import React, { useState, useEffect } from "react"
import Loading from './Loading'
import Showmore from './Showmore'
import PageWithComments from './Comments'
import Navbar from './Navbar'
import { MdBookmarkBorder,MdBookmark } from 'react-icons/md';
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {EmailShareButton,FacebookShareButton,TwitterShareButton,FacebookIcon,TwitterIcon,EmailIcon} from "react-share";


function CardsBig({ match,location }) {
    
    // const s = match.params.id;
    // console.log(s)
    const s = location.search.substr(4)
    // console.log(match,location)
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(localStorage.getItem('card'+s) === null ? false : true);


    // const val = localStorage.getItem('switch');
    let url;
    const val = s.substr(0,4);
    if(val !== "http"){
        url = `https://backend-nodejs-273603.wl.r.appspot.com/guardian/${s}`
    } 
    else{
        url = `https://backend-nodejs-273603.wl.r.appspot.com/nytimes/${s}`
    }
        async function fetchData() {
          const res = await fetch(url);
          const data = await res.json();
          setData(data);
          setIsLoading(false);
          console.log(data);
        }

      useEffect(() =>{
          fetchData();
      },[]);
        const stylebox = {
            margin:'1em',
            boxShadow: '2px 5px 10px 0 #B0B0B0',
            transition: '0.3s',
            padding: '1.5em 0.5em',
            verticalAlign: 'top',
            border: '1px solid lightgrey'
        };

        function check(multimedia){
            let resp = null;
            for(var i = 0; i < multimedia.length; i++){
              if (multimedia[i].width >= 2000){
                resp = multimedia[i].url;
                break;
              }
            }
            // console.log(resp)
            if(resp === null){
              return 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'
            }
            else{
              return 'https://static01.nyt.com/'+resp;
            }
        };
        function storeCard(){
            if(!isLoading){
                if(isBookmarked){
                    setIsBookmarked(false);
                    localStorage.removeItem('card'+s);
                    notifyRemoved()
                }
                else{
                    const setobj = data.response.hasOwnProperty('content') ?  data.response.content : data.response;
                    localStorage.setItem('card'+s,JSON.stringify(setobj));
                    setIsBookmarked(true);
                    notifyAdded()
                }
            }
        }
        function addDefaultSrc(ev){
            ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'
          }
        function notifyAdded() {
            const toaststring = 'Saving '+(data.response.hasOwnProperty('content')? data.response.content.webTitle : data.response.docs[0].headline.main);
            toast(toaststring);
        }
        function notifyRemoved(){ 
            const toaststring = 'Removing '+(data.response.hasOwnProperty('content')? data.response.content.webTitle : data.response.docs[0].headline.main);
            toast(toaststring);        
        }
        if(!isLoading){
            let any,title="",url,date="",descr="",img;
            if(data.response.hasOwnProperty('content')){//guardian
                 any = data.response.content
                 title = any.webTitle ? any.webTitle : ""
                 url = any.webUrl ? any.webUrl : ""
                 date = any.webPublicationDate ? any.webPublicationDate.substr(0,10) : ""
                 img="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                descr = any.blocks.body[0].bodyTextSummary;
                try{
                    img = any.blocks.main.elements[0].assets[any.blocks.main.elements[0].assets.length-1].file
                } catch(err){}
            }
            else {//nytimes
                any = data.response
                img="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
                try{title = any.docs[0].headline.main}catch(err){}
                try{url = any.docs[0].web_url}catch(err){}
                try{date = any.docs[0].pub_date.substr(0,10)}catch(err){}
                try{descr = any.docs[0].abstract}catch(err){}
                try{img = check(any.docs[0].multimedia)}catch(err){}
            }
                
                return (  
                    <div>
                        <div>
                        <ToastContainer
                            transition={Zoom}
                            position="top-center"
                            autoClose={2000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnVisibilityChange={false}
                            draggable={false}
                            pauseOnHover={false}
                        />
                        </div>
                    <Navbar/>
                        <div>
                            <div className = "row" style= {stylebox}>
                                <div className = "col-12">
                                    <h1 className="card-title" style={{margin:'0px'}}><i>{title}</i></h1>
                                <div className="row justify-content-between" style ={{marginBottom:'0.5em'}}>
                                    <div className="col-6 col-sm-6 col-md-8 col-lg-10 col-xl-10" style ={{marginTop:'0.5em'}}>
                                        <h3><i>{date}</i></h3>
                                    </div>
                                    {/* share icons */}
                                    <div className="row" style = {{marginLeft:'0.1em'}}>
                                        <div data-tip="Facebook" data-for="fb">
                                    <FacebookShareButton url = {url} hashtag = "#CSCI_571_NewsApp">
                                        <FacebookIcon size={30} round />
                                    </FacebookShareButton>
                                    <ReactTooltip place= "top" type="dark" effect="float" id="fb"/>
                                    </div>
                                    <div data-tip="Twitter" data-for="tw">
                                    <TwitterShareButton url = {url} hashtags = {["CSCI_571_NewsApp"]}>
                                        <TwitterIcon size={30} round />
                                    </TwitterShareButton>
                                    <ReactTooltip place= "top" type="dark" effect="float" id="tw"/>
                                    </div>
                                    <div data-tip="Email" data-for="email">
                                    <EmailShareButton url = {url} subject = "#CSCI_571_NewsApp">
                                        <EmailIcon size={30} round />
                                    </EmailShareButton>
                                    <ReactTooltip place= "top" type="dark" effect="float" id="email"/>
                                    </div>
                                    </div>
                                    {/* share icons */}
                                    <a data-tip={localStorage.getItem(s) === null ?"Bookmark":"Unbookmark"}>
                                        <div className="col-2" style={{textAlign: 'right'}}>
                                            {!isBookmarked ? <MdBookmarkBorder size = '2em' color = '#da1a3d' onClick= {storeCard}/> : <MdBookmark size = '2em' color = '#da1a3d' onClick= {storeCard}/>}
                                        </div>
                                    </a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </div>
                                <img className="card-img-top" src={img} alt="Card image cap" />
                                </div>
                                <div className="col-12">
                                <Showmore fulltext = {descr}/>
                                </div>
                            </div>
                        </div>
                        <PageWithComments id = {decodeURIComponent(s)}/>
                    </div>
                    );
                }
     
        else{
            return(
                <div> <Navbar/><Loading /></div>
            );
        }
}

export default CardsBig;
