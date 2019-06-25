import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import Ball from './Ball';

class Results extends Component {
    state = {
        empty: ['', '', '', '', '', '', ''],
        empty2: ['PB'],

        results: [],
        results2: []
    };

    componentDidMount() {
        this.updateState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }
    updateState(props) {
        this.setState({
            results: props.results,
            results2: props.results2
        });
    }

    testRender1() {
        var array = _.isEmpty(this.state.results) ? this.state.empty : this.state.results;
        return _.map(array, (element, index) => {
            return <Ball key={index} number={element} />
        });
    }

    testRender2() {
        var array2 = _.isEmpty(this.state.results2) ? this.state.empty2 : this.state.results2;
        return _.map(array2, (element, index) => {
            return <Ball key={index} number={element} isPower />
        });
    }

    render() {
        return (
            <div className='flex flex-centre'>
                {this.testRender1()}
                {this.testRender2()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { list } = state;
    return {
        results: list.results,
        results2: list.results2
    };
};


export default connect(mapStateToProps, {})(withRouter(Results));
