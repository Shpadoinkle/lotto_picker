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
        loadResults: []
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
        this.setState({ loadResults: props.loadResults });
    }

    testGet() {
        console.log('Test Powerball fetch')
        lottoActions.getLastPowerball()
            .then((res) => {
                console.log('fetch reutrn')
                console.log(res)
                if (res.data.Success) {
                    console.log('fetch was gooooood')
                }
            })
            .catch((err) => {
                console.log('fetch FAIL')
                console.log(err)
            });
    }

    search = async (isPop) => {
        let searchString = encodeURIComponent(this.state.Search);
        searchString = searchString.replace(/%20/g, "+");

        let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6ed12e064b90ae1290fa326ce9e790ff&query=${searchString}&language=en-US`;

        if (isPop) {
            apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&page=1`
        }

        this.setState({ loading: !isPop, testResults: [], empty: false, searchReturn: false });

        axios({
            method: 'get',
            url: apiUrl,
        })
            .then((res) => {
                // console.log('results....')
                // console.log(res.data.results);
                if (isPop) {
                    this.props.loadPop(res.data.results);
                    this.setState({
                        popular: res.data.results,
                        empty: _.isEmpty(res.data.results),
                        loading: false
                    });
                } else {
                    this.props.loadLists(res.data.results);
                    this.setState({
                        testResults: res.data.results,
                        empty: _.isEmpty(res.data.results),
                        loading: false,
                        searchReturn: true
                    });
                }
            }).catch((err) => {
                console.log(err);
                console.log('error');
                this.setState({ loading: false });
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

    render() {
        return (
            <div className={`relative pageContainer`} style={{ padding: 17, paddingTop: 0 }}>
                {this.renderLoading()}
                <div className='resultsContainer'>
                    {this.renderResults()}
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
