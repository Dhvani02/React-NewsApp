import React from 'react';
const commentBox = require('commentbox.io');
// commentBox('5740559117320192-proj');


class PageWithComments extends React.Component {
constructor(props){
    super(props)
    console.log(this.props.id)
}

    componentDidMount() {

        this.removeCommentBox = commentBox('5740559117320192-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" id= {this.props.id}>
            </div>
        );
    }
}
export default PageWithComments;