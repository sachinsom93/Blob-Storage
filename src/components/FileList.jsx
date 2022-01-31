import React from'react';
import FileCard from './FileCard';
import { useSelector } from 'react-redux';

function FileList() {

    // Files
    const files = useSelector(state => state.fileReducer.files)

    return (
        <ul
            style={{
                width: '25vw',
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
                            <FileCard file={file}/>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default FileList;