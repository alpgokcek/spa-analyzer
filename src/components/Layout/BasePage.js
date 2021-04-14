import React from 'react';

const BasePage = props =>(
    <div className="wrapper">
        { props.children }
        <div className="p-3 text-center">
            <span className="mr-2">&copy;</span>
            <span>2021</span>
            <span className="mx-2">-</span>
            <span>SPA</span>
            <br/>
        </div>
    </div>
)

export default BasePage;
