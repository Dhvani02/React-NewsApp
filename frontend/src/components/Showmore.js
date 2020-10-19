import React from 'react';
import { FiChevronDown,FiChevronUp } from 'react-icons/fi'
import {IconContext} from 'react-icons'
import {Link} from 'react-scroll'

class Showmore extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fulltext: props.fulltext,
            expanded: false
        };

    }

    getReadMoreContent() {
        const dropdown = {
            color:'black',
            fontSize: '20px'
        }
        const full = this.state.fulltext;
        let count = 0;
        let i;
        for(i = 0; i < full.length; i++){
            if((full[i] === '.' && full[i+1] === ' ' || full[i+1] === '\n') || (full[i] === '!' && full[i+1] === ' ' || full[i+1] === '\n') || (full[i] === '?' && full[i+1] === ' '|| full[i+1] === '\n')){
                count+=1;
                if(count > 3){       
                    break;
                }
            }
        }
        const half = full.substring(0,i+1);
        if (full.length > i && !this.state.expanded) {
            return(
                <>  
                    <span id = "justify_this">{half}</span><div id= "scroll_here"></div>
                    <div>  
                        <Link to="scroll_here" smooth={true}>      
                        <button type="button" style ={{display: 'block',float: 'right', margin:'0.5%'}}className="btn btn-link">
                        <IconContext.Provider value={{ color: "black", size: "3em" }}>
                            <div>
                                <FiChevronDown onClick={this.showLongText.bind(this)}/>
                            </div>
                        </IconContext.Provider>
                        </button>
                        </Link>
                    </div>
                </>
            
            )
        }
        else if (full.length <= i) {
            return (
                <span>{full}</span>
            );
        }
        return (
            <span className="long-text" id = "justify_this">
            {half}
            <br /><br />
            <p id = "justify_this">{full.substring(i+2,full.length)}</p>
                <div >        
                    <Link to="topmost" smooth={true}>
                    <button type="button" style ={{display: 'block',float: 'right', margin:'0.5%'}}className="btn btn-link">
                    <IconContext.Provider value={{ color: "black", size: "3em" }}>
                            <div>
                                <FiChevronUp onClick={this.showShortText.bind(this)}/>
                            </div>
                        </IconContext.Provider>
                    </button>
                    </Link>
                </div>
            </span>
            
        );
        
    };
    showLongText() {
        this.setState({expanded:true})
        this.getReadMoreContent();
        // console.log(document.body.scrollHeight)
        // window.scrollTo({top: window.outerHeight, left: 0, behavior: 'smooth' });
        // window.scrollTo(0,document.body.scrollHeight);
        // this.scroll(this.myRef)
    }
    
    showShortText() {
        this.setState({expanded:false})
        this.getReadMoreContent();
    }
    render() {
        return (
          <div id = "justify_this">
            {this.getReadMoreContent()}
          </div>
        );
      }

}

export default Showmore;