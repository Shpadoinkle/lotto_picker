import React, { Component } from 'react';
import _ from 'lodash';

class Ball extends Component {
    getClass() {
        var string = '';
        if (this.props.isPower) string = string + ' ball-power';
        if (this.props.number === '' || this.props.number === 'PB') string = 'ball-empty';

        return string;
    }


    render() {
        return (
            <div className={`ball ${this.getClass()}`}>
                {this.props.number}
            </div>
        );
    }
}

export default Ball;
