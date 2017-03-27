/**
 * Created by zwy on 17-3-25.
 */
"use strict";
import React from 'react';
import * as comm from './comm';

export class SearchBox extends React.Component{
    constructor(){
        super();
        this.state = { value: '' };
        this.searchHandler = this.searchHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    searchHandler(e){
        e.preventDefault();
        if(e.type === 'keyup' && e.keyCode === 13 || e.type === 'click'){
            console.log('search: ' + this.state.value);
            comm.search(this.state.value);
        }
    }
    changeHandler(e){
        this.setState({ value: e.target.value });
    }
    render(){
        return (
            <span>
                <input type="text" onKeyUp={this.searchHandler} onChange={this.changeHandler}></input>
                <button onClick={this.searchHandler}>go</button>
            </span>
        );
    }
};