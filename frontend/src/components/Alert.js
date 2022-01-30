import React from 'react';
import { Alert } from '@fluentui/react-northstar';
import { useSelector } from 'react-redux';

const AlertCom = () => {

    const alerts = useSelector(state => state.alertReducer)

    if(!alerts) {
        return null;
    }

    return <>{alerts.map(alert => (
        <Alert
            content={alert.msg}
            key={alert.id}
            success={alert.type === "success" ? true : false}
            warning={alert.type === "warning" ? true : false}
            danger={alert.type === "danger" ? true : false}
        />
    ))}</>
}

export default AlertCom