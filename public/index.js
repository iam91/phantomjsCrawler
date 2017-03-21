/**
 * Created by zwy on 17-3-20.
 */

"use strict";

class SearchBox extends React.Component{

    constructor(){
        super();
        this.state = {
            value: ''
        };
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(e){
        const type = e.type;
        if(type === 'keyup' && e.keyCode === 13 || type === 'click'){
            console.log('search: ' + this.state.value);
        }
    }

    render(){
        return (
            <span>
                <input type="text" onKeyUp={this.searchHandler}></input>
                <button onClick={this.searchHandler}>go</button>
            </span>
        );
    }
}

ReactDOM.render(
    <SearchBox/>,
    document.querySelector('.search-box')
);