import React, { Component } from 'react';
class Loader extends Component {
    render() { 
        return ( 
            <div className="ui segment" style={{position:"static"}}>
                <div className="ui active inverted dimmer">
                    <div className="ui massive text loader">Loading...</div>
                </div>
            </div>
         );
    }
}
 
export default Loader;