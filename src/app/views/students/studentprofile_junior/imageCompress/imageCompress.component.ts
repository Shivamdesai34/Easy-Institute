import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {bootstrapApplication} from '@angular/platform-browser';
import 'zone.js';
import {
    DataUrl, DOC_ORIENTATION,
    NgxImageCaptureModule,
    NgxImageCompressService,
    UploadResponse,
} from 'ngx-image-compress';
import {FormControlDirective} from "@coreui/angular-pro";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-imageCompress',
    templateUrl: './imageCompress.component.html',
    standalone: true,
    imports: [CommonModule, NgxImageCaptureModule, FormControlDirective, ReactiveFormsModule],
    providers: [NgxImageCompressService],
})
export class ImageCompressComponent {
    // imgResultBeforeCompress: DataUrl = '';
    // imgResultAfterCompress: DataUrl = '';
    // //
    // // imgResultAfterCompression!: string;

    originalImageSrc: string | null = null;
    compressedImageSrc: string | null = null;
    compressedFile: File | null = null;


    constructor(
        private imageCompress: NgxImageCompressService
    ) {

    }
    //
    // onFileSelected(event: any) {
    //     return this.imageCompress
    //         .uploadFile()
    //         .then(({image, orientation}: UploadResponse) => {
    //             console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
    //             this.imageCompress
    //                 .compressFile(image, orientation, 50, 50)
    //                 .then((result: DataUrl) => {
    //                     this.imgResultAfterCompress = result;
    //                     console.warn(
    //                         'Size in bytes is now:',
    //                         this.imageCompress.byteCount(result)
    //                     );
    //                 });
    //         });
    // }
    //
    // // onFileSelected(event: Event): void {
    // //     const input = event.target as HTMLInputElement;
    // //     if (!input.files || input.files.length === 0) {
    // //         return;
    // //     }
    // //     const file = input.files[0];
    // //     const reader = new FileReader();
    // //     reader.readAsDataURL(file);
    // //     reader.onload = async () => {
    // //         const image = reader.result as DataUrl;
    // //         console.warn(
    // //             'Original size:',
    // //             this.imageCompress.byteCount(image),
    // //             'bytes'
    // //         );
    // //         const compressedImage = await this.imageCompress.compressFile(
    // //             image,
    // //             -1,   // auto orientation
    // //             50,   // quality
    // //             50    // ratio
    // //         );
    // //         console.warn(
    // //             'Compressed size:',
    // //             this.imageCompress.byteCount(compressedImage),
    // //             'bytes'
    // //         );
    // //     };
    // // }
    //
    // dataUrlToFile(dataUrl: string, fileName: string): File {
    //     const arr = dataUrl.split(',');
    //     const mime = arr[0].match(/:(.*?);/)![1];
    //     const bstr = atob(arr[1]);
    //     let n = bstr.length;
    //     const u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new File([u8arr], fileName, {type: mime});
    // }

    onFileChange(event: any) {
        const file: File = event.target.files[0];

        if (file) {
            this.originalImageSrc = URL.createObjectURL(file);

            const reader = new FileReader();
            reader.onload = (readerEvent: any) => {
                const imageDataUrl = readerEvent.target.result;

                // console.log('Original size (bytes):', this.imageCompress.byteCount(imageDataUrl));

                this.imageCompress.compressFile(
                    imageDataUrl,
                    DOC_ORIENTATION.Up,
                    50,
                    50
                ).then(
                    (compressedBase64: string) => {
                        this.compressedImageSrc = compressedBase64;

                        // Log compressed size
                        // console.log('Compressed size (bytes):', this.imageCompress.byteCount(compressedBase64));

                        // Convert the compressed base64 string back to a File object
                        this.compressedFile = this.base64ToFile(compressedBase64, file.name.split('.')[0] + '_compressed.jpeg');
                        // console.log('Compressed File object:', this.compressedFile);

                        // You can now use the 'this.compressedFile' for upload or further processing
                    },
                    (error) => {
                        console.error('Compression failed:', error);
                    }
                );
            };
            reader.readAsDataURL(file);
        }
    }

    // Helper function to convert base64 to a File object
    private base64ToFile(base64Data: string, filename: string): File | null {
        const arr = base64Data.split(',');
        if (arr.length < 2) return null;
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) return null;
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }




}

