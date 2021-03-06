import React, { Component } from 'react';

import Query from '../query';

import Table from '../table';

import SetError from '../seterror';

import './app.css';

export default class App extends Component {

  state = {
    query:'',
    search:false,
    data:null,
    error:false,
    clear: false
  };

  

  componentDidCatch(){
    this.setState({
      error:true
    });
  }

  setQuery = (val)=>{
    this.setState({query:val, search:true});
  }

  setClear = (val) =>{
    this.setState({clear:val})
  }

  render(){

    if(this.state.error){
      return <SetError/>;
    }
   

    return (
      <React.Fragment>
        <Query loadList = {this.setQuery} clearList = {this.setClear}/>
        <Table loadQuery = {this.state.query} clearQuery={this.state.clear}/>
      </React.Fragment>
    
    );

  }

}
