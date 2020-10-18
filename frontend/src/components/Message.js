import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ vairiant, children }) => {
    return <Alert vairiant={vairiant}>{children}</Alert>
}

Message.defaultProps = {
    vairiant: 'info',
}

export default Message
