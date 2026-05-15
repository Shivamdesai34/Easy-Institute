import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

import {GlobalMessage} from "../../../globals/global.message";
import {FormControlDirective} from "@coreui/angular-pro";

@Component({
  selector: 'app-fileuploadversiontwo',
    imports: [
        ReactiveFormsModule,
        FormControlDirective
    ],
  templateUrl: './fileuploadversiontwo.component.html',
  styleUrl: './fileuploadversiontwo.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileuploadversiontwoComponent),
      multi: true
    }
  ]

})
export class FileuploadversiontwoComponent implements ControlValueAccessor, OnInit{

  @Input() buttonText = 'Select File';
  @Output() fileChange = new EventEmitter<File>();
  selectedFile: File | null = null;

  maxSize = 1 * 1024 * 1024; // 1MB
  fileTooLarge = false;

  @Output() onFileChange: EventEmitter<any> = new EventEmitter();


  fileUploadForm!: FormGroup;

  constructor(private globalmessage: GlobalMessage) {
  }

  ngOnInit(): void {
    this.fileUploadForm = new FormGroup({
      file: new FormControl(null)
    });
    this.fileUploadForm.get('file')?.valueChanges.subscribe((file: File) => {
      this.selectedFile = file;
      this.fileChange.emit(file);
    });


  }

  // onFileChange(event: any): void {
  //   const file: File = event.target.files[0];
  //   this.fileUploadForm.get('file')?.setValue(file);
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.onFileChange.emit(file);
    // if (file && file.size > this.maxSize) {
    //   this.globalmessage.Show_error('File size should be less than ' + this.maxSize);
    //   this.fileTooLarge = true;
    //   this.selectedFile = event.target.files[0];
    //   return;
    // }
    this.fileTooLarge = false;
  }

  writeValue(value: any): void {
    if (!value) {
      this.fileUploadForm.get('file')?.setValue(null);
      this.selectedFile = null;
    }
  }

  registerOnChange(fn: any): void {
    this.fileUploadForm.get('file')?.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {}
}
