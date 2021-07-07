import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PhotoPicker from '../../../common/PhotoPicker'
import OppAttachmentUi from './OppAttachmentUi'

class OppAttachment extends Component {

    state = {
        attachment: {}
    }

    render() {
        return (
            <OppAttachmentUi attchment={this.state.attachment} onBrowse={() => {

                PhotoPicker({
                    onFileSelect: (res) => {

                        this.setState({
                            attachment: res
                        })
                    }
                })
            }} />
        )
    }
}

export default OppAttachment
