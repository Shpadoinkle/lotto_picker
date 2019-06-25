import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

class Table extends Component {
    state = {
        results: [],
        results2: [],

        Top: 35,
        Bottom: 20
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

    checkNumClass(i, ispower) {
        let string = "";
        if (ispower) string = string + ' ispowerball';
        if (_.includes(ispower ? this.state.results2 : this.state.results, i)) string = string + ' ball_isChosen';
        return string;
    }

    renderNumbers(ispower) {
        var count = ispower ? this.state.Bottom : this.state.Top
        var nums = []
        for (var i = 1; i <= count; i++) {
            nums.push(
                <div key={i} className={`resTable_cell ${this.checkNumClass(i, ispower)}`}>
                    <div style={{ zIndex: 2 }}>
                        {i}
                    </div>
                    <div className='table_chosen'>
                        <div className="fa fa-times" />
                    </div>
                </div >
            );
        }
        return (
            <div className="resTable">
                {nums}
            </div>
        );
    }

    render() {
        return (
            <div style={{ marginTop: 24 }}>
                {this.renderNumbers()}
                <div style={{ backgroundColor: '#ccc', marginTop: 12 }}>Select your powerball</div>
                {this.renderNumbers(true)}
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

export default connect(mapStateToProps, {})(withRouter(Table));
