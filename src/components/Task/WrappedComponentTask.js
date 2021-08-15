import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { TaskContext } from './TaskContext'

const WrappedComponentTask = (PassedComponent) => (props) => {

    const [loading, setLoading] = useState(false)
    const taskContext = useContext(TaskContext)
    const session = useSelector(state => state.session)

    const extraProps = { loading, session, setLoading, taskContext }
    return (
        <PassedComponent {...props} {...extraProps} />
    )
}

export default WrappedComponentTask