import React, { Component } from 'react';



import './query.css';

export default class Query extends Component {

  state={
    query:''
  };

  

  onItSubmit =(e)=>{
    e.preventDefault();
    this.props.loadList(this.state.query);
    this.setState({
      query:''
    })
  }

  onItChange =(e)=>{
    this.setState({query:e.target.value});
  }
 
  onItClear = (e) =>{
    this.props.clearList(true);
  }

  onItClearUnset = (e) =>{
    this.props.clearList(false);
  }

  render() {

    return (
      <form className="request" onSubmit={this.onItSubmit}>
            <input type="text"  onChange={this.onItChange} value={this.state.query} placeholder="Input country..." id="query"/>
            <button type="submit" onClick={this.onItClearUnset}>Search</button>
            <button id="clear" type="submit" onClick={this.onItClear}>Clear</button>
      </form>
    );

  }
}
