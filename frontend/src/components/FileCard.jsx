import React from 'react'
import { Button, Card, Flex } from '@fluentui/react-northstar'
import { EditIcon, DownloadIcon, CloseIcon } from '@fluentui/react-icons-northstar'
import { useDispatch  } from 'react-redux';
import { deleteFile, renameFile } from '../store/actions/file';

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
        dispatch(renameFile(fileID, newName));
    }

    return (
        <Card aria-roledescription="card with action buttons">
            <Card.Footer fitted>
                <Flex space="between">
                <Button content={file.blob_name}/>
                <Flex>
                    <Button icon={<EditIcon />} iconOnly text title="Edit" onClick={() => handleEditClick(file.id)}/>
                    <Button icon={<DownloadIcon />} iconOnly text title="Download" />
                    <Button icon={<CloseIcon />} iconOnly text title="Close" onClick={() => handleCloseClick(file.id, file.blob_name)}/>
                </Flex>
                </Flex>
            </Card.Footer>
        </Card>
    )}

export default FileCard