import {FileType} from "../enums";

export const saveExportedFile = (fileName: string, fileType: FileType, data: string) => {
    const element = document.createElement("a");
    let file: Blob;

    switch (fileType) {
        case FileType.CSV:
            file = getPreparedCsv(data);
            break;
        default:
            throw new Error(`Unknown file type: ${fileType}`);
    }

    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.${fileType}`;
    document.body.appendChild(element);
    element.click();
}

const getPreparedCsv = (data: string) => {
    const utf8Data = Uint8Array.from(atob(data), c => c.charCodeAt(0));

    return new Blob([utf8Data], { type: 'text/csv;charset=utf-8' });
}