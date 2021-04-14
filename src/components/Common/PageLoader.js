import React from 'react';

// See more loading icons here:
// https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons
const PageLoader = () => (
    <div className="page-loader">
        <img width="200px" src="img/loading.gif"/>
        {/*<em className="fas fa-circle-notch fa-spin fa-2x text-muted"></em>*/}
    </div>
)

export default PageLoader;