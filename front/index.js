/**
 * Created by zwy on 17-3-20.
 */

"use strict";

class SearchBox extends React.Component{

    constructor(){
        super();
        this.state = { value: '' };
        this.searchHandler = this.searchHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    searchHandler(e){
        const type = e.type;
        e.preventDefault();
        if(type === 'keyup' && e.keyCode === 13 || type === 'click'){
            console.log('search: ' + this.state.value);
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
}

ReactDOM.render(
    <SearchBox/>,
    document.querySelector('.search-box')
);