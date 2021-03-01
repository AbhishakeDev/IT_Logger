import React, { useEffect } from 'react';
import { connect } from 'react-redux';//to bring app level state to local components
import LogItem from './LogItem';
import PropTypes from 'prop-types'
import Preloader from "../layout/Preloader";
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {

    useEffect(() => {
        getLogs();
        //eslint-disable-next-line
    }, []);

    if (loading || logs === null) {
        return <Preloader />
    }

    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">System Logs</h4>
            </li>
            {!loading && logs.length === 0 ? (<p className="center">No Logs To Show....</p>)
                :
                logs.map(log => <LogItem log={log} key={log.id} />)
            }
        </ul>
    )
}

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired,
}

//this state comes in from rootReducer that is the index.js file and this state.log is the whole initial state and contains all the states like logs,loading,current..etc
const mapStateToProps = state => ({
    log: state.log
    //now this log is recieved as a prop in the componenet so we need to destructure the whole prop above like just basic props
})

export default connect(mapStateToProps, { getLogs })(Logs)
//we are bring ing state variable over here in this component thats why we bring in mapStateToProps so that we can map the state variables as props in this component
