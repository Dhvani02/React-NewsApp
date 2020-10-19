import React from 'react';
import CardSmall from './CardSmall'
import Navbar from './Navbar';
import { ToastContainer, toast, Zoom } from 'react-toastify';

class Favorite extends React.Component{
    constructor(){
        super()
        this.state = {
            favs : Object.keys(localStorage)
        }
        this.delete = this.delete.bind(this);
    }
    delete(id){
        this.setState(prevState => ({
            favs: prevState.favs.filter(el => el !== id )
        }));
     }
    render(){
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

    const keys = Object.keys(localStorage)
    var count = 0
    for(var i = 0; i < keys.length; i++){
        if(keys[i].includes('card'))
            count = count + 1
    }
    if(count <= 0){
        return (
            <>
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
            <Navbar bookmark="true"/>
        <h3 align = "center">You have no saved articles </h3></>)
    }
    const torender = []
    for(var i = 0; i < keys.length; i++){
        if(keys[i].substr(0,4) !== "card"){
            continue
        }
        let newcard;
        // console.log(keys[i])
        const value = JSON.parse(localStorage.getItem(keys[i]))
        // console.log(value)
        const from = value.hasOwnProperty('docs') ? true : false;
        if(from){//NYTIMES
            newcard = <CardSmall delete={this.delete} data={this.state.favs} key = {keys[i].substr(4)} id= {keys[i].substr(4)} img = {check(value.docs[0].multimedia)} url = {value.docs[0].web_url} title = {value.docs[0].headline.main} date={value.docs[0].pub_date.substr(0,10)} section={value.docs[0].news_desk } source = {from?"NYTIMES":"GUARDIAN"}/>
        }
        else{
            newcard = <CardSmall delete={this.delete} data={this.state.favs} key = {keys[i].substr(4)} id= {keys[i].substr(4)} url = {value.webUrl} img= {value.blocks.hasOwnProperty('main')?value.blocks.main.elements[0].assets.length >0 ? value.blocks.main.elements[0].assets[value.blocks.main.elements[0].assets.length-1].file: 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png': 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'}title = {value.webTitle} date={value.webPublicationDate.substr(0,10)} section={value.sectionId} source = {from?"NYTIMES":"GUARDIAN"}/>
        }
        torender.push(newcard)
    }

    // {console.log(keys)}
    return(
    <>
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
    <Navbar bookmark="true"/>
    <h1 style={{margin: '0em 0em 0em 1em'}}>Favorites</h1>
    <div className="row" style={{padding:'2em',paddingTop:'0'}}>
    {torender}
    </div>
    </>
    
    )
    }
}

export default Favorite;