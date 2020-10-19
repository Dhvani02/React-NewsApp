import React from 'react';
import AsyncSelect from 'react-select/async';
import _ from "lodash";
import {Redirect,withRouter} from 'react-router-dom'
  
class AutoSearch extends React.Component{
    constructor(props){
        super(props);
      let obj=""
    if(window.location.href.includes("search?q=")){
          const val = window.location.href.indexOf("q=");
          const setval = window.location.href.substr(val+2);
           obj = {'label':decodeURIComponent(setval),'value':setval}
    }

    this.state = {res:"",redirect:false,inputValue:"",label:obj}
    this.loadOptions = _.debounce(this.loadOptions.bind(this),1050,{
        leading: true});
    // this.handleInputChange = this.handleInputChange.bind(this);
    }

    requestResults = (result) => {
      console.log(result)
      return this.state.res
    }
    // loadOptions = (inputValue,callback) => {
    //   const options = [
    //     { value: 'blues', label: 'Blues' },
    //     { value: 'rock', label: 'Rock' },
    //     { value: 'jazz', label: 'Jazz' },
    //     { value: 'orchestra', label: 'Orchestra' } ,
    //     { value: 'tesla', label: 'tesla' },
    //     { value: 'trump', label: 'trump' } ,
    //     { value: 'coronavirus', label: 'coronavirus' }, 
    //     { value: 'hello fresh', label: 'hello%20fresh' } 
    //   ];
    //   callback(options)
    // }
    loadOptions = (inputValue, callback) => {
        console.log(inputValue)
            fetch(
              `https://sayali-ashok-lagad.cognitiveservices.azure.com/bing/v7.0/suggestions?q=${inputValue}`,
              {
                headers: {
                  "Ocp-Apim-Subscription-Key": "90eafc6cde834d6bacccc7c727fc73ae"
                }
              }
              // `https://bingbongautosuggest.cognitiveservices.azure.com/bing/v7.0/suggestions?q=${inputValue}`,
              // {
              //   headers: {
              //     "Ocp-Apim-Subscription-Key": "a82c0be37f6c45eda2f8a683e7a59514"
              //   }
              // }
            ).then(response => {
              response.json().then(data => {
                if(data.suggestionGroups){
                  const resultsRaw = data.suggestionGroups[0].searchSuggestions;
                  const results = resultsRaw.map(result => ({ label: result.displayText,value: result.displayText}));
                  console.log(results)
                  callback(results);
                }
                else{console.log(response)}
              });
            });
          }

    handleInputChange = (newValue) => {
        const inputValue = newValue;
        this.setState({ inputValue:inputValue });
        return inputValue;
      };

      handleOnChange = (value) => {
        // console.log(value)
        this.setState({
          redirect: true,
          res:value
        });
        // console.log(value.label)
        // return value.label
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          this.setState({redirect:false})
          const s = encodeURIComponent(this.state.res.label)
          // console.log(this.state.res)
          // this.props.history.push(`/search?q=${s}`)
          return <Redirect to={`/search?q=${s}`} />
        }
      }

    render(){
        const focus = this.state.label === "" ? false : true
        return(
        
            <div className="search">
                <AsyncSelect
                    loadOptions={this.loadOptions}                                          
                    onInputChange={this.handleInputChange} 
                    placeholder="Enter Keyword.." 
                    onChange = {this.handleOnChange.bind(this)}
                    value={this.state.label}
                    // autoFocus = {focus}
                  />
                  <div>{this.renderRedirect()}</div>
            </div>
        );
    }
}
export default (AutoSearch);
