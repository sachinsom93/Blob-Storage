import React from'react';
import { useDispatch, useSelector } from 'react-redux';
import { Attachment } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';
import { deleteFile } from '../store/actions/file';

function FileList() {
    // Files
    const files = useSelector(state => state.fileReducer.files)

    // dispatch
    const dispatch = useDispatch()

    function handleCloseClick(fileID, name) {
        if(window.confirm(`Do You want to delete ${name} ?`)) {
            dispatch(deleteFile(fileID))
        }
        return;
    }
    return (
        <ul
            style={{
                width: '30vw',
                height: '100vh',
                position: 'fixed',
                right: '0',
                top: '0',
                overflowY: 'auto'
            }}
        >
            {
                files && files.map((file) => {
                    return (
                        <li
                            style={{
                                listStyle: 'none',
                                marginBottom: '1em'
                            }}
                            key={file.id}
                        >
                            <Attachment
                                header={file.blob_name}
                                actionable
                                action={{
                                    icon: <CloseIcon />,
                                    onClick: () => handleCloseClick(file.id, file.blob_name),
                                    title: 'Close',
                                }}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default FileList;