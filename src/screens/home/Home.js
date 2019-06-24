import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { loadResults } from '../../actions';
import { TEXT_BRAND } from '../../js';
import { lottoActions } from '../../webapi';

class Home extends Component {
    initialState = {
        loading: false,
        results: [],
        results2: []
    }

    state = { ...this.initialState };

    componentDidMount() {
        this.updateProps(this.props);

        this.testGet();
    }

    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
    }

    updateProps(props) {
        // this.setState({ loadResults: props.loadResults });
    }

    testGet() {
        console.log('Test Powerball fetch')
        lottoActions.getLastPowerball()
            .then((res) => {
                console.log('fetch reutrn')
                console.log(res)
                if (res.data.Success) {
                    console.log('fetch was gooooood')
                    console.log(res.data.DrawResults[0].PrimaryNumbers)
                    this.setState({
                        results: res.data.DrawResults[0].PrimaryNumbers,
                        results2: res.data.DrawResults[0].SecondaryNumbers
                    })
                }
            })
            .catch((err) => {
                console.log('fetch FAIL')
                console.log(err)
            });
    }

    renderResults() {
        if (this.state.loading) {
            return null;
        }
        return null;
    }

    renderLoading() {
        if (this.state.loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FontAwesome style={styles.spinner} name="spinner fa-pulse fa-fw" />
                </div>
            );
        }
    }

    testRender1() {
        if (_.isEmpty(this.state.results)) {
            return null;
        }
        return _.map(this.state.results, (element, index) => {
            return  <div key={index} style={{ height: 20, width: 20, backgroundColor: 'cyan', margin: 4 }}>{element}</div>
        });
    }

    testRender2() {
        if (_.isEmpty(this.state.results2)) {
            return null;
        }
        return _.map(this.state.results2, (element, index) => {
            return  <div key={index} style={{ height: 20, width: 20, backgroundColor: 'coral', margin: 4 }}>{element}</div>
        });
    }

    render() {
        return (
            <div className={`relative pageContainer`} style={{ padding: 17, paddingTop: 0 }}>
                {this.renderLoading()}
                <div className='resultsContainer'>
                    {this.renderResults()}
                    {this.testRender1()}
                    {this.testRender2()}
                </div>
            </div>
        );
    }
}

const styles = {
    resultsContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    listheader: {
        lineHeight: '24px',
        fontSize: 20,
        marginBottom: 18,
        fontWeight: 700,
        letterSpacing: '1px'
    },
    spinner: {
        color: TEXT_BRAND
    }
}

const mapStateToProps = (state) => {
    const { list } = state;
    return {
        results: list.results
    };
};

export default connect(mapStateToProps, { loadResults })(withRouter(Home));
