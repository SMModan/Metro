import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { OpportunityContext } from './AddOpportunity'

const WrappedComponentOpportunity = (PassedComponent) => (props) => {

    const [loading, setLoading] = useState(false)
    const oppContext = useContext(OpportunityContext)
    const session = useSelector(state => state.session)

    const extraProps = { loading, session, setLoading, oppContext }
    return (
        <PassedComponent {...props} {...extraProps} />
    )
}

export default WrappedComponentOpportunity