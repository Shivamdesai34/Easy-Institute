import {base64StringToBlob} from 'blob-util';


export function UDownloadfiles(blobdata : string , filename: string ){
    const contentType = '';
    const blobb = base64StringToBlob(blobdata, contentType);
    let blob = new Blob([blobb], {type: 'application/blob'});
    var downloadURL = window.URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = filename;
    link.click();
}

