import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
 
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
 
  render() {
    return (
      <div className="sweet-loading" style = {style}>
        <BounceLoader
          size={70}
          color={"blue"}
          loading={this.state.loading}
        />
        <br/>
        <div style={{textAlign:'center'}}>Loading</div>
      </div>
    );
  }
}
export default Loading;