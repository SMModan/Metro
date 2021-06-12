import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Images } from '../../../utils'
import TaskAttachmentUi from './TaskAttachmentUi'
import {
    MainContainer
  } from '../../common';
class Attachment extends Component {
    render() {
        return (
            <MainContainer
            header={{
              left: {
                image: Images.ic_BackWhite,
                onPress: () => this.props.navigation.goBack(),
              },
              title: 'Add Task',
              hideUnderLine: true,
              light: true,
            }}>
            <TaskAttachmentUi />
            </MainContainer>
        )
    }
}

export default Attachment
