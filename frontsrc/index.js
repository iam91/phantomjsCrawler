/**
 * Created by zwy on 17-3-24.
 */
/**
 * Created by zwy on 17-3-20.
 */

"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {SearchBox} from './searchBox';
import {ResultList} from './resultList';

ReactDOM.render(
    <SearchBox/>,
    document.querySelector('.search-box')
);

ReactDOM.render(
    <ResultList/>,
    document.querySelector('.r-bing')
);

ReactDOM.render(
    <ResultList/>,
    document.querySelector('.r-baidu')
);