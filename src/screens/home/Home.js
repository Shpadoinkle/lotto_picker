import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import { loadResults, resetResults } from '../../actions';
import { TEXT_DARK } from '../../js';
import { lottoActions } from '../../webapi';
import Results from './Results';
import Table from './Table';

class Home extends Component {
    initialState = {
        loading: false
    }

    state = { ...this.initialState };

    componentDidMount() {
        this.updateProps(this.props);

        // this.testGet();
    }

    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
    }

    updateProps(props) {
        // this.setState({ loadResults: props.loadResults });
    }

    testGet() {
        this.setState({ loading: true });
        lottoActions.getLastPowerball()
            .then((res) => {
                if (res.data.Success) {
                    this.setState({ loading: false });
                    this.props.loadResults(
                        res.data.DrawResults[0].PrimaryNumbers,
                        res.data.DrawResults[0].SecondaryNumbers
                    );
                }
            })
            .catch((err) => {
                console.log('fetch FAIL')
                console.log(err);
                this.setState({ loading: false });
            });
    }

    autoPick() {
        console.log('Click on autoFill...');
        this.testGet();
    }

    clearSelection() {
        console.log('Clearing...');
        this.props.resetResults();
    }

    renderLoading() {
        if (this.state.loading) {
            return <FontAwesome style={styles.spinner} name="spinner fa-pulse fa-fw" />;
        }
    }

    render() {
        return (
            <div className={`relative pageContainer`} style={{ padding: 17, paddingTop: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 60 }}>
                    {this.renderLoading()}
                </div>
                <div style={styles.resultsContainer}>
                    <Results />
                </div>
                <div style={styles.resultsContainer}>
                    <Table />
                </div>
                <div style={{ ...styles.resultsContainer, marginTop: 24 }} >
                    <div onClick={this.autoPick.bind(this)} className="homeButton">
                        <div className="fa fa-bolt" />
                    </div>
                    <div onClick={this.clearSelection.bind(this)} className="homeButton homeButton-trash">
                        <div className="fa fa-trash" />
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    resultsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    listheader: {
        lineHeight: '24px',
        fontSize: 20,
        marginBottom: 18,
        fontWeight: 700,
        letterSpacing: '1px'
    },
    spinner: {
        color: TEXT_DARK
    }
}

export default connect(null, { loadResults, resetResults })(withRouter(Home));
