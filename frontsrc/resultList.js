/**
 * Created by zwy on 17-3-27.
 */
"use strict";
import React from 'react';

export class ResultList extends React.Component{
    constructor(){
        super();
        this.state = {
            listItemsEl: [],
            listItems: []
        };
        this.setItems = this.setItems.bind(this);
    }
    setItems(items){
        this.state.listItems = items;
        this.state.listItemsEl = items.map((item, idx) => {
            <li><a href=item.url>{idx}</a></li>
        });
    }
    render(){
        return (
            <ul>
                {this.listItems}
            </ul>
        );
    }
};