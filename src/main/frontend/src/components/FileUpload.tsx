import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../features/store';
import { BsTrash } from 'react-icons/bs';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { getTaskFiles } from '../features/newSlices/taskFileSlice';
import { selectCurrentToken } from '../features/auth/authSlice';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const FILEDATA_API_BASE_URL = "http://localhost:8080/files";

const FileUpload = ({ taskId, files, setFiles, selectedFiles, setSelectedFiles, removeFiles, setRemoveFiles }) => {

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        console.log("USE EFFECT FileUpload")
    })

    const filePicker = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files;
        console.log("event.target.files: ", event.target.files)
        if (selectedFiles === null) {
            setSelectedFiles([...file]);
        }
        else {
            setSelectedFiles([...selectedFiles, ...file]);
        }
    }

    // Вызов системного окна выбора файла
    const handleFilePick = () => {
        filePicker.current.click();
    }

    // Скачивание файла
    const downloadFile = (fileId, fileName) => {
        console.log("key: ", fileId)
        axiosPrivate.get(FILEDATA_API_BASE_URL + "/data/" + fileId, { responseType: "blob" }).then((res) => {
            console.log(res)
            const url = window.URL.createObjectURL(new Blob([res.data]));
            let anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = fileName;
            document.body.append(anchor);
            anchor.setAttribute("style", "display: none;");
            anchor.click();
            anchor.remove();
        });

    }

    const cancelFileUpload = (fileId) => {
        setSelectedFiles(selectedFiles.filter(item =>
            selectedFiles.indexOf(item) !== fileId
        ));
    }

    const deleteFile = (fileId) => {
        const found = removeFiles.find(item => { return item == fileId });
        if (!found)
            setRemoveFiles([...removeFiles, fileId]);
        setFiles(files.filter(item => item.fileId !== fileId));

    }
    const cancelDeleteFile = (fileId) => {
        setRemoveFiles(removeFiles.filter(item => item !== fileId));
    }

    // Рендер выбранных для загрузки файлов
    let renderSelectedFiles = selectedFiles ?
        (Array.from(selectedFiles).map((file: any) => {
            return (
                <tr key={selectedFiles.indexOf(file)} >
                    <td>{file.name}</td>
                    <td className="flex-shrink-1 text-end">
                        <button className="bg-danger"
                            onClick={() => {
                                cancelFileUpload(selectedFiles.indexOf(file));
                                console.log(selectedFiles);
                            }}>
                            <BsTrash />
                        </button>
                    </td>
                </tr>
            )
        })) : (
            <tr>Нет вложений</tr>
        );


    // Рендер уже имеющихся файлов, если они есть
    let renderFiles = (files !== undefined && files !== null && files.length !== 0) ?
        (files.map((item) => {
            return (
                <tr key={item.fileId}
                    onClick={() => downloadFile(item.fileId, item.fileName)}>
                    <td>{item.fileName}</td>
                    <td className="flex-shrink-1 text-end">
                        <button className="bg-danger"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteFile(item.fileId);
                                console.log(removeFiles);
                            }}>
                            <BsTrash />
                        </button>
                    </td>
                </tr>
            )
        }))
        : (
            <tr>Нет вложений</tr>
        )

    return (
        <>
            <div className="d-flex flex-row">
                <div className="d-flex flex-column fs-6 col-12">
                    <button onClick={handleFilePick}>Добавить вложение</button>
                    <input className="hidden"
                        type="file"
                        multiple
                        ref={filePicker}
                        onChange={handleFileChange}
                        accept="image/*,.pdf,.docx"
                    />
                    <div className="d-flex flex-row">
                        <table className="table">
                            <thead>
                                <th>Новые файлы</th>
                            </thead>
                            <tbody>
                                {renderSelectedFiles}
                            </tbody>
                        </table>

                    </div>
                    <div className="d-flex flex-row">
                        <table className="table task-files">
                            <thead >
                                <th>Загруженные файлы</th>
                            </thead>
                            <tbody>
                                {renderFiles}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FileUpload;