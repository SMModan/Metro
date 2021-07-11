import React, { Component } from 'react'
import { AlertDialog, ProgressDialog } from '../../../common'
import PhotoPicker from '../../../common/PhotoPicker'
import opportunityApi from '../../apis/OpportunityApis'
import OppAttachmentUi from './OppAttachmentUi'
class OppAttachment extends Component {

    editMode = this.props.route?.params?.editMode || true
    oppId = this.props.route?.params?.id
    state = {
        attachments: [],
        documentName: "",
        visibleDialog: false,
        visibleEditDialog: false,
        selectedAttachment: {},
        loading: false
    }

    componentDidMount = () => {
        console.log("OppId", this.oppId)

        //  if (this.editMode)
        this.getAttachment()
    }
    insertAttachment = () => {

        ProgressDialog.show()
        const { documentName, attachment } = this.state
        opportunityApi.insertOpportunityAttachment({
            OpportunityID: this.oppId,
            DocumentName: documentName,
            FileName: attachment.fileName,
            FileContentType: attachment.type,
            File: attachment.base64
        }, (res) => {

            this.getAttachment()

            ProgressDialog.hide()
        }, () => {
            ProgressDialog.hide()
        })
    }

    deleteAttachment = () => {
        ProgressDialog.show()
        const { selectedAttachment } = this.state
        opportunityApi.deleteOpportunityAttachment({
            OpportunityID: this.oppId,
            ID: selectedAttachment.id,

        }, () => {

            const { attachments, selectedAttachment } = this.state

            attachments.splice(selectedAttachment.index, 1)

            this.setState({
                attachments: [...attachments], documentName: "", attachment: {}
            })
            ProgressDialog.hide()
        }, () => {
            ProgressDialog.hide()
        })
    }

    updateAttachment = () => {
        ProgressDialog.show()
        const { documentName, attachment, selectedAttachment } = this.state
        opportunityApi.updateOpportunityAttachment({
            OpportunityID: this.oppId,
            ID: selectedAttachment.id,
            DocumentName: documentName,
            FileName: attachment?.fileName || "",
            FilePath: selectedAttachment?.path,
            FileContentType: attachment?.type || "",
            File: attachment?.base64 || ""
        }, () => {

            const { attachments, selectedAttachment } = this.state

            attachments.splice(selectedAttachment.index, 1, { ...selectedAttachment, name: documentName })

            this.setState({
                attachments: [...attachments], documentName: "", attachment: {}
            })
            ProgressDialog.hide()
        }, () => {
            ProgressDialog.hide()
        })
    }
    getAttachment = () => {

        this.setState({ loading: true })
        opportunityApi.getOpportunityAttachment(this.oppId, (res) => {
            this.setState({ loading: false, attachments: res || [] })

        }, () => {
            this.setState({ loading: false })

        })
    }

    // openOption={}
    render() {
        return (
            <OppAttachmentUi onDocumentNameChanged={(text) => {

                this.setState({
                    documentName: text
                })
            }} visibleDialog={this.state.visibleDialog} onDismissed={() => {

                this.setState({
                    visibleDialog: false,
                    visibleEditDialog: false,

                })
            }} onDone={() => {


                this.setState({
                    visibleDialog: false
                })
                this.insertAttachment()

            }}
                onEditDone={() => {


                    this.setState({
                        visibleEditDialog: false
                    })
                    this.updateAttachment()

                }}
                onEdit={(item) => {


                    this.setState({
                        selectedAttachment: item,
                        visibleEditDialog: true,
                        documentName: item.name,
                    })
                    // this.insertAttachment()

                }}
                onDelete={(item) => {



                    this.setState({
                        selectedAttachment: item,
                    })
                    AlertDialog.show({
                        title: "Delete Attachment",
                        message: "Do you want to delete this attachment?",
                        positiveButton: {
                            onPress: () => {
                                AlertDialog.hide()
                                this.deleteAttachment()
                            },
                            title: "Yes"
                        },
                        negativeButton: {
                            onPress: () => {
                                AlertDialog.hide()
                            },
                            title: "No"
                        }
                    })
                    // this.insertAttachment()

                }}
                selectedAttachment={this.state.selectedAttachment}
                documentName={this.state.documentName}
                visibleEditDialog={this.state.visibleEditDialog} loading={this.state.loading} editMode={this.props.route?.params?.editMode} attachments={this.state.attachments} onBrowse={(edit) => {

                    PhotoPicker({
                        onFileSelect: (res) => {

                            // console.log("res", res.base64)
                            this.setState({
                                attachment: res,
                                selectedAttachment: { ...this.state.selectedAttachment, file: { source: res.source } },
                                visibleDialog: !edit
                            })
                        }
                    })
                }} />
        )
    }
}

export default OppAttachment
