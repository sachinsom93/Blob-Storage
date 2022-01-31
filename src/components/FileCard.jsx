import React from 'react'
import { Button, Card, Flex } from '@fluentui/react-northstar'
import { EditIcon, DownloadIcon, CloseIcon, ShareGenericIcon } from '@fluentui/react-icons-northstar'
import { useDispatch  } from 'react-redux';
import { deleteFile, downloadFile, renameFile, shareFile } from '../store/actions/file';
import { setAlert } from '../store/actions/alert';

const FileCard = ({file}) => {

    // Dispatcher
    const dispatch = useDispatch()

    // Function to handle deletion
    function handleCloseClick(fileID, name) {
        if(window.confirm(`Do You want to delete ${name} ?`)) {
            dispatch(deleteFile(fileID))
        }
        return;
    }

    // Function to handle file renaming
    function handleEditClick(fileID) {
        const newName = window.prompt('Enter new file name.');
        if(newName === '') {
            dispatch(setAlert('Please enter valid filename.', 'warning'))
            return;
        }
        dispatch(renameFile(fileID, newName));
    }

    // Function to handle file downloading
    function handleDownloadClick(fileID, fileName) {
        dispatch(downloadFile(fileID, fileName))
    }

    // Function to handle file sharing
    function handleShareClick(fileID) {
        const userEmail = window.prompt('Whom with you want to share ? Enter Email ID:')
        if(!userEmail) return
        dispatch(shareFile(fileID, userEmail));
    }

    return (
        <Card aria-roledescription="card with action buttons" style={{ width: '30vw' }}>
            <Card.Footer fitted>
                <Flex space="between">
                <Button content={file.blob_name}/>
                <Flex>
                    <Button icon={<EditIcon />} iconOnly text title="Edit" onClick={() => handleEditClick(file.id)}/>
                    <Button icon={<DownloadIcon />} iconOnly text title="Download" onClick={() => handleDownloadClick(file.id, file.blob_name)} />
                    <Button icon={<CloseIcon />} iconOnly text title="Close" onClick={() => handleCloseClick(file.id, file.blob_name)}/>
                    <Button icon={<ShareGenericIcon />} iconOnly text title="Share" onClick={() => handleShareClick(file.id)} />
                </Flex>
                </Flex>
            </Card.Footer>
        </Card>
    )}

export default FileCard