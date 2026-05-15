import {Injectable} from '@angular/core';
import {base64StringToBlob} from 'blob-util';

@Injectable({
    providedIn: 'root'
})
export class GlobalDownloadfiles {

    Downloadfiles(response: any){
        const contentType = '';
        const blobb = base64StringToBlob(response.blobdata, contentType);
        let blob = new Blob([blobb], {type: 'application/blob'});
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = response.excelfile;
        link.click();
    }

    //ShivAm
    Downloadfromblob(imageblob: any , filename : any) : void {
        let downloadURL = window.URL.createObjectURL(imageblob);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = filename + '.PNG';
        link.click();
    }
}
