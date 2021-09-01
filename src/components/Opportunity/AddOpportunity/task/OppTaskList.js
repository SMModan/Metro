import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Utils } from '../../../../utils';
import opportunityApi from '../../apis/OpportunityApis';
import WrappedComponentOpportunity from '../WrappedComponentOpportunity';
import OppTaskListUi from './OppTaskListUi';


class OppTaskList extends Component {
    oppId = this.props.route?.params?.id

    state = {
        selectedIndex: 0,
        loading: true,
        listData: []
    };

    componentDidMount = () => {

        this.getTasks()

    }


    getTasks = () => {

        opportunityApi.getOpportunityActivityByID(this.oppId, (res) => {

            this.setState({ loading: false, refreshing: false, listData: res })
        }, (error) => {
            this.setState({ loading: false, refreshing: false })

            Utils.showDangerToast(error)

        })
    }

    onRefresh = () => {

        this.setState({ refreshing: true })
        this.getTasks()

    }


    render() {
        return (
            <OppTaskListUi onRefresh={this.onRefresh} loading={this.state.loading} refreshing={this.state.refreshing} taskList={this.state.listData} />
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default WrappedComponentOpportunity(OppTaskList);
