import React, { Component } from 'react';


import TableValues from "../tabel-values";
import TableItems from "../table-items";

import ApiService from '../../servises/api-service';

import SetError from '../seterror';
import Spinner from '../spiner';

import './table.css';

export default class Table extends Component {

    apiService = new ApiService();

    state={
        data:null,
        query: '',
        loading: false,
        error:false,
        clear:false
    };
    
    componentDidMount(){
        this.updateTable();
    }
    
    componentDidUpdate(prevProps){
        if(this.props.loadQuery!==prevProps.loadQuery){
            this.setState({
                query:this.props.loadQuery,
                loading:true,
                clear: this.props.clearQuery
            })
            this.updateTable();
        } 
    }

    

    onItError = (err)=>{
          this.setState({
            loading:false,
            error:true
          });
        }

    updateTable=()=>{
        const {loadQuery} = this.props;

        if(!loadQuery){
            return null;
        }

        this.apiService
            .getData(loadQuery)
            .then((data)=>{
                this.setState({data,loading:false})
            }).catch(this.onItError)

    }


  render() {

    const {data,loading,error,clear} = this.state;
    
    if (clear){
        return(
            <div className="table">
                <TableValues/>
            </div>
        )
    }

    const status = !(loading||error);
    const errorSet = error ? <SetError/> : null;
    const spinnerSet = loading ? <Spinner/> : null;
    const content = status ? <TableItems loadResult={this.state.data}/> : null;

    return (
      <div className="table">
          <TableValues/>
          {errorSet}
          {spinnerSet}
          {content}
          
      </div>
    );

  }
}
