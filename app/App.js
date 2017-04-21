import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadFirstIssues, loadSecondIssues} from './src/actions';
import GraphLandscape from './src/graph_landscape';
import GraphVertical from './src/graph_vertical';


class App extends Component {
    handleClick(){
        this.props.loadFirstIssues();
        //this.props.loadSecondIssues();
    }
    
    render() {
        
        return (
            <div>
                <button onClick={::this.handleClick}> Load </button>
                <GraphLandscape data={this.props.issuesOne}/>
                <GraphVertical data={this.props.issuesOne}/>
            </div>
        );
    }
}


export default connect(
    (state) => {return {issuesOne: state.issuesOne, issuesTwo: state.issuesTwo}; },
    (dispatch) => bindActionCreators({loadFirstIssues}, dispatch)
    
)(App);


