import React from 'react';
import CardSmall from './CardSmall';
import Loading from './Loading';
import Navbar from './Navbar';

class SearchResults extends React.Component{
    constructor(props){
    super(props)
    this.state = {
        loadingG:true,
        loadingN:true,
        guardian:[],
        nytimes: [],
        // input: this.props.match.params.query,
        source: localStorage.getItem('switch') === null ? true : localStorage.getItem('switch') === "true" ?true:false
    }
    console.log(this.props)

    // console.log(this.state.source)
    }
    // componentDidUpdate(prevProps, prevState){
    //     if(prevProps.location != this.props.location){
    //     if(this.state.source === true){
    //         fetch(`http://localhost:4000/guardianSearch/${this.props.location.search.substr(3)}`)
    //             .then((response) => response.json())
    //             .then(results => {
    //                 console.log(results)
    //                 this.setState({guardian: results,loadingG:false});
    //             });
    //         }
    //         else{
    //         fetch(`http://localhost:4000/nytimesSearch/${this.props.location.search.substr(3)}`)
    //             .then((response) => response.json())
    //             .then(results => {
    //                 console.log(results)
    //                 this.setState({nytimes: results,loadingN:false});
    //             });
    //         }
    //     }
    // }
    
    componentDidMount() {
        // console.log(this.props.location.search)
        console.log(this.state.source)
        if(this.state.source === true){
        console.log('guardian')
        fetch(`https://backend-nodejs-273603.wl.r.appspot.com/guardianSearch/${this.props.location.search.substr(3)}`)
            .then((response) => response.json())
            .then(results => {
                console.log(results)
                this.setState({guardian: results,loadingG:false});
            });
        }
        else{
        fetch(`https://backend-nodejs-273603.wl.r.appspot.com/nytimesSearch/${this.props.location.search.substr(3)}`)
            .then((response) => response.json())
            .then(results => {
                console.log(results)
                this.setState({nytimes: results,loadingN:false});
            });
        }
    }
    getinfo(multimedia){
            if(multimedia === null) return 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg' 
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
              return `https://static01.nyt.com/${resp}`;
            }
          }
render(){
    const g = [], n = [],  nytimes = this.state.nytimes
    // if(!this.state.loadingG && !this.state.loadingN){
        if(!this.state.loadingG){
        for(var i = 0; i < this.state.guardian.response.results.length; i++){
            const check = this.state.guardian.response.results[i]
            if(check.webTitle === 'undefined' || check.blocks === 'undefined' || check.blocks.main === 'undefined' || check.sectionId === 'undefined' || check.webPublicationDate === 'undefined' || check.webUrl === 'undefined')  continue;
            g.push(<CardSmall key = {this.state.guardian.response.results[i].id} id = {encodeURIComponent(this.state.guardian.response.results[i].id)} title = {this.state.guardian.response.results[i].webTitle} url = {this.state.guardian.response.results[i].webUrl} img={this.state.guardian.response.results[i].blocks.hasOwnProperty('main') ? this.state.guardian.response.results[i].blocks.main.elements[0].assets.length >0 ? this.state.guardian.response.results[i].blocks.main.elements[0].assets[this.state.guardian.response.results[i].blocks.main.elements[0].assets.length-1].file: 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png': 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'} date={this.state.guardian.response.results[i].webPublicationDate.substr(0,10)} section={this.state.guardian.response.results[i].sectionId} />)
            if(g.length >= 10)  break;
        }
        return( 
            <>
            <Navbar/>
            {g.length > 0 ? 
            <>
            <h1 style={{margin:'0em 0em 0em 1em'}}>Results</h1>
            <div className="row" style={{padding:'2em',paddingTop:'0'}}>
                {g}
            </div>
            </>
            :
            <h3 align = "center">No Results</h3>
            }
            </>
        );
    }
    else if (!this.state.loadingN){
        // console.log(g)
        for(var i = 0; i < this.state.nytimes.response.docs.length; i++){ 
            const check = nytimes.response.docs[i]
            if(check.web_url === 'undefined' || check.headline.main === 'undefined' || check.pub_date === 'undefined' || check.news_desk === 'undefined')   continue;
            n.push(<CardSmall key = {nytimes.response.docs[i].web_url} id = {encodeURIComponent(nytimes.response.docs[i].web_url)} url = {nytimes.response.docs[i].web_url} title = {nytimes.response.docs[i].headline.main} img = {this.getinfo(nytimes.response.docs[i].multimedia)}  date = {nytimes.response.docs[i].pub_date.substr(0,10)} section = {nytimes.response.docs[i].news_desk}/>)
            if(n.length>= 10)  break;
        }
        // console.log(n)
        return( 
            <>
            <Navbar/>
            {n.length > 0 ? 
            <>
            <h1 style={{margin:'0em 0em 0em 1em'}}>Results</h1>
            <div className="row" style={{padding:'2em',paddingTop:'0'}}>
                {n}
            </div>
            </>
            :
            <h3 align = "center">No Results</h3>
            }
            </>
        );
    }
    else {
        return (<>
        <Navbar/>
        <Loading /></>)
    }

}
}

export default SearchResults;