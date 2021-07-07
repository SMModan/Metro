import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { ProgressDialog } from '../../../common'
import PhotoPicker from '../../../common/PhotoPicker'
import opportunityApi from '../../apis/OpportunityApis'
import OppAttachmentUi from './OppAttachmentUi'
import { decode } from "base64-arraybuffer"
class OppAttachment extends Component {

    oppId = this.props.route?.params?.editMode || 6597
    state = {
        attachments: [],
        documentName: "",
        visibleDialog: false
    }

    insertAttachment = () => {

        ProgressDialog.show()
        const { documentName, attachment } = this.state
        opportunityApi.insertOpportunityAttachment({
            OpportunityID: this.oppId,
            DocumentName: documentName,
            FileName: attachment.fileName,
            FileContentType: attachment.type,
            File: decode(attachment.base64)
        }, () => {

            const { attachments } = this.state

            attachments.push({
                name: documentName,
                file: attachment
            })
            this.setState({
                attachments: [...attachments], documentName: "", attachment: {}
            })
            ProgressDialog.hide()
        }, () => {
            ProgressDialog.hide()
        })
    }

    deleteAttachment = () => {

    }

    updateAttachment = () => {

    }
    getAttachment = () => {

    }
    render() {
        return (
            <OppAttachmentUi onDocumentNameChanged={(text) => {

                this.setState({
                    documentName: text
                })
            }} visibleDialog={this.state.visibleDialog} onDismissed={() => {

                this.setState({
                    visibleDialog: false
                })
            }} onDone={() => {


                this.setState({
                    visibleDialog: false
                })
                this.insertAttachment()

            }} editMode={this.props.route?.params?.editMode || true} attachments={this.state.attachments} onBrowse={() => {

                PhotoPicker({
                    onFileSelect: (res) => {

                        // console.log("res", res.base64)
                        this.setState({
                            attachment: res,
                            visibleDialog: true
                        })
                    },
                    extraParam: {
                        value: "Delete",
                        callback: () => {

                        }
                    }
                })
            }} />
        )
    }
}

export default OppAttachment
