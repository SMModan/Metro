import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

const WrappedComponent = (PassedComponent) => (props) => {

    const [loading, setLoading] = useState(false)
    const session = useSelector(state => state.session)

    const extraProps = { loading, session, setLoading }
    return (
        <PassedComponent {...props} {...extraProps} />
    )
}

export default WrappedComponent