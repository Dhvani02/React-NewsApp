import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Cards from './components/Cards'
import Loading from './components/Loading'

class Business extends React.Component {
  constructor(){
    super()
    this.state = {apinfo:[],loading:true,clicked:false, switch1 : localStorage.getItem('switch') === null ? true : localStorage.getItem('switch') === "true" ?true:false};
    // localStorage.setItem('switch',true);
    console.log(localStorage.getItem('switch'))
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
}
handleSwitchChange = nr => () => {
  let switchNumber = `switch${nr}`;
  this.setState({
    [switchNumber]: !this.state[switchNumber],
    loading : true
  });
  document.getElementById('navbarSupportedContent').classList.remove('show')

}
 componentDidMount() {
let url;
    if(this.state.switch1 === true){
       url = 'https://backend-nodejs-273603.wl.r.appspot.com/guardianbusiness'
    }
    else{
       url = 'https://backend-nodejs-273603.wl.r.appspot.com/nytimesbusiness'
    }
    this.setState({loading:true})

    fetch(url)
    .then((response) => response.json())
    .then(booksList => {
        console.log(booksList)
        this.setState({ apinfo: booksList, loading:false });
    });
}

componentDidUpdate(prevProps, prevState){
  if(prevState.switch1!== this.state.switch1){
    localStorage.setItem('switch',this.state.switch1.toString())
    let url;
    if(this.state.switch1 === true){
       url = 'https://backend-nodejs-273603.wl.r.appspot.com/guardianbusiness'
    }
    else{
       url = 'https://backend-nodejs-273603.wl.r.appspot.com/nytimesbusiness'
    }
    this.setState({loading:true})

    fetch(url)
    .then((response) => response.json())
    .then(booksList => {
        console.log(booksList)
        this.setState({ apinfo: booksList, loading:false });
    });

  }  
}

  render(){
    let cardData;
    // console.log(this.state);
    function getinfo(multimedia){
      if(multimedia === null){
        return 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'
      }
      let resp = null;
      for(var i = 0; i < multimedia.length; i++){
        if (multimedia[i].width >= 2000){
          resp = multimedia[i].url;
          break;
        }
      }
      if(resp === null){
        return 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'
      }
      else{
        return resp;
      }
    }
    function getinfo_g(img){
      let ret = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
      try{
        ret = img.blocks.main.elements[0].assets[img.blocks.main.elements[0].assets.length-1].file
      }
      catch(err){
      }
      return ret
    }

    if(!this.state.loading && !this.state.clicked){
      if(this.state.switch1 === false){//NYTIMES
        cardData = this.state.apinfo.results.
        map(
          function(any){
          try{
          return(
          <Cards key = {any.url} 
          id = {any.url ? any.url : (function(){throw ""}())} 
          url = {any.url ? any.url : (function(){throw ""}())} 
          title = {any.title ? any.title : (function(){throw ""}())} 
          imgurl = {getinfo(any.multimedia)} 
          descr = {any.abstract ? any.abstract : (function(){throw ""}())} 
          date = {any.published_date ? any.published_date.substr(0,10):(function(){throw ""}())} 
          section = {any.section ? any.section : (function(){throw ""}())}/>)
          }
          catch(err){
            console.log(err)
          }
        });
        cardData = cardData.slice(0,Math.min(cardData.length,10))
      }
      else{//GUARDIAN
        cardData = this.state.apinfo.response.results
        .map(
          function(any){ 
          try{
           return(<Cards key = {any.id} 
            id = {any.id ? any.id : (function(){throw ""}())} 
            title = {any.webTitle ? any.webTitle : (function(){throw ""}())} 
            url = {any.webUrl ? any.webUrl : (function(){throw ""}())} 
            imgurl={getinfo_g(any)} 
            descr = {any.blocks.body[0].bodyTextSummary} 
            date={any.webPublicationDate ? any.webPublicationDate.substr(0,10): (function(){throw ""}())} 
            section={any.sectionId ? any.sectionId : (function(){throw ""}())}/>)
          }
          catch(err){
            console.log(err)
          }
        });
      }
      return (
        <div className="App">
          <Navbar handleSwitchChange = {this.handleSwitchChange} checked = {this.state.switch1}/>
          {cardData}
        </div>
      )
    }
    else if(this.state.loading){
      return(
        
        <div className="App">
            <Navbar handleSwitchChange = {this.handleSwitchChange} checked = {this.state.switch1}/>
            <Loading />

          
        </div>
      )
    }
  }
}

export default Business;
