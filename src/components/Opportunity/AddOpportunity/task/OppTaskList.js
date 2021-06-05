import React, { Component } from 'react';
import { connect } from 'react-redux';
import OppTaskListUi from './OppTaskListUi';


class OppTaskList extends Component {

    state = {
        selectedIndex: 0,
        listData: [
            {
                index: 0,
                date: "24-5-2021 • 12:32",
                status: "Completed",
                header: "High",
                title: "3D View / Elevation",
                description: "Megha Shah",
            },
            {
                index: 1,
                date: "24-5-2021 • 12:32",
                status: "Completed",
                header: "High",
                title: "3D View / Elevation",
                description: "Rahul Vyas",
            },
            {
                index: 2,
                date: "24-5-2021 • 12:32",
                status: "Completed",
                header: "High",
                title: "3D View / Elevation",
                description: "Ramesh Jain",
            },
        ]
    };

    render() {
        return (
            <OppTaskListUi taskList={this.state.listData} />
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OppTaskList);
