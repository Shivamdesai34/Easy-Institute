import {Component, effect, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GridOptions} from 'ag-grid-community';
import {MarksheetViewerService} from './marksheet-viewer.service';
import * as myGlobals from '../../../globals/global-variable';
import {GlobalMessage} from '../../../globals/global.message';
import {CommonService} from '../../../globals/common.service';
import {Marksheet_url, MarksheetPrinting_Url} from '../../../globals/global-api';
import {Ireq_outstanding, Ireq_show_marksheet,} from './marksheet-viewer.requestmodel';
import {Sessiondata} from '../../../models/Sessiondata';
import {SessionService} from '../../../globals/sessionstorage';
import {EncryptData, encryptUsingAES256} from '../../../globals/encryptdata';
import {
    Allbatchs,
    download_files,
    Ires_Studentmarklist,
    Ires_validateEligiblestudents,
    Res_Outstanding,
} from '../../../models/response';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    IColumn,
    RowComponent,
    SmartTableComponent,
    SpinnerComponent
} from "@coreui/angular-pro";
import {PdfViewerModule} from "ng2-pdf-viewer";

import {Extractguid} from "../../../globals/global_utility";

@Component({
    templateUrl: './marksheet-viewer.component.html',
    styleUrls: ['./marksheet-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
    ReactiveFormsModule,
    ColComponent,
    RowComponent,
    SpinnerComponent,
    CardComponent,
    CardBodyComponent,
    ButtonDirective,
    PdfViewerModule,
    SmartTableComponent
],
    standalone: true
})
export class MarksheetViewerComponent implements OnInit {

    activePage = 1;
    itemsPerPage = 10;

    private gridApi: any;
    private gridColumnApi: any;
    gridOptions: any;
    showpdfbox = false;
    showGridbox = true;
    //zoom
    // pageVariable: number = 1;
    zoom: number = 1.0;
    Batch_code: any;
    Semester: any;
    Batchexam_id: any;
    Lastyearbatchcode: any;
    rowData: any;
    oSession!: Sessiondata;
    pdfSrc = this._base64ToArrayBuffer('');
    res_outstanding = {} as Res_Outstanding;
    validateadmissionstart = {} as Allbatchs;
    Print_Marksheet = {} as download_files
    demo_route: any;
    res_studentmarksheetlist: Ires_Studentmarklist[] = [];
    selectedRowJson = {} as Ires_Studentmarklist;
    selectedLastRowJson = {} as Ires_Studentmarklist;
    res_validateeligibility = {} as Ires_validateEligiblestudents;

    incrementZoom(amount: number) {
        this.zoom += amount;
    }

    nSelectedReceipt: number = 0;
    nSelected_singlerecieptdata = {} as Ires_Studentmarklist
    readonly signal_users = signal<Ires_Studentmarklist[]>([]);
    readonly signal_selectedId = signal<number | undefined>(0);
    //Delete
    AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
    FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
    BatchCode = parseInt(sessionStorage.getItem('BatchCode')!);
    TokenSession = sessionStorage.getItem('Token');

    columns: (IColumn | string)[] = [
        {key: 'finyear', filter: false, sorter: false, _style: {width: '20%'}, _classes: 'text-muted small'},
        {key: 'batch_name', filter: false, sorter: false, _style: {width: '100%'}, _classes: 'text-muted small'},
        {key: 'semester', filter: false, sorter: false, _style: {width: '100%'}, _classes: 'text-muted small'},
    ];

    res_outstand = {} as Res_Outstanding;

    constructor(
        private router: Router, private activeroute: ActivatedRoute,
        private commonService: CommonService,
        private marksheetviewerservice: MarksheetViewerService,
        private formBuilder: UntypedFormBuilder,
        private sessionservice: SessionService,
        private globalmessage: GlobalMessage
    ) {
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };

        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();

        this.loadUsers()
        effect(() => {
            this.signal_users.set(this.getReceipts(this.signal_selectedId()));
        });
    }

    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice);
        this.oSession.Getdatafromstroage();
        // this.ShowMarksheet();
        // this.CheckOutstanding();
        this.loadUsers()
        this.ShowMarksheet(this.oSession.finyear, this.oSession.collegecode, this.oSession.aadhaar)
    }

    loadUsers() {
        this.ShowMarksheet(this.oSession.finyear, this.oSession.collegecode, this.oSession.aadhaar);
    }

    //Marksheet view
    //Grid
    columnData = [
        {
            field: '',
            maxWidth: 50,
            checkboxSelection: true,
        },
        {
            headerName: 'Batch_name',
            minWidth: 600,
            field: 'Batch_name',
            flex: 1,
            resizable: true,
        },
        {
            headerName: 'Exam Name',
            minWidth: 500,
            field: 'Userexamname',
            flex: 1,
            resizable: true,
        },
        // { headerName: "Semester", field: "Semester", resizable: true },
        // {
        //   headerName: 'Documents',
        //   field: 'Document_Filename ',
        //   cellRenderer: PdfCellCustomComponent,
        // },
    ];

    //rowData: any = [];
    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    public rowSelection: 'single' | 'multiple' = 'single';

    onSelectionChanged(event: any) {
        const selectedRows = this.gridApi.getSelectedRows();
        this.selectedRowJson = selectedRows[0];
        if (this.selectedRowJson.outstanding == 1) {
            this.CheckOutstanding();
        }
        // if (this.selectedRowJson.Nextyeareligbility == 1) {
        //   this.ValidateEligibility();
        // }
        if (
            this.selectedLastRowJson.batchexam_id != this.selectedRowJson.batchexam_id
        ) {
            //this.ShowPDF();
        }

    }

    marksheetloader = false;

    OpenPdfDoc_view() {
        if (this.nSelected_singlerecieptdata == null) {
            return;
        }
        this.marksheetloader = true
        // let selected = selectedItems[0]
        // this.selectedRowJson
        //  this.showGridbox = false;
        this.validateData();
        // this.ShowPDF();
    }

    ShowMarksheet(finyear: number = 0, Collegecode: number = 0, aadhaar: number = 0) {
        let marksheetURL = myGlobals.Domainname
        let jsonin: Ireq_show_marksheet = {
            finyear: finyear,
            collegecode: Collegecode,
            Webportal: marksheetURL,
        };
        let input_json = jsonin
        this.commonService
            .Post_json_data<Ires_Studentmarklist[]>(Marksheet_url.studentsmarksheetlist,input_json)
            .subscribe((response) => {
                this.res_studentmarksheetlist = response.data
                this.signal_users.set(this.res_studentmarksheetlist)

                // if (this.res_studentmarksheetlist.length > 0) {
                //   this.gridOptions.api.setRowData(this.res_studentmarksheetlist);
                // }
                // this.selectedLastRowJson =
                //   this.res_studentmarksheetlist[
                //   this.res_studentmarksheetlist.length - 1
                //     ];
            });
    }

    //pdf Viewer
    _base64ToArrayBuffer(base64: any) {
        var binary_string = base64.replace(/\\n/g, '');
        binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    validateData() {


        this.ShowPDF();

    }

    ShowPDF() {

        // let selected = this.selectedRowJson[0]
        this.showpdfbox = true;
        let jsonin = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            template: 'ug',
            batch_code: this.nSelected_singlerecieptdata.batch_code,
            batchuuid: this.nSelected_singlerecieptdata.batchuuid,
            semester: this.nSelected_singlerecieptdata.semester,
            batchexam_id: this.nSelected_singlerecieptdata.batchexam_id,
            Singlepdf: false,
            boardlevel: this.nSelected_singlerecieptdata.boardlevel
        };
        if (this.nSelected_singlerecieptdata.batch_code == null) {
            this.globalmessage.Show_message('Please Select row to view Marksheet!');
            this.showpdfbox = false;
            this.showGridbox = true;
        } else {
            this.commonService.Post_json_normal<download_files>(MarksheetPrinting_Url.printmarksheet_date, jsonin).subscribe(
                (response) => {
                    this.Print_Marksheet = response;
                    // const blob_first = this.Print_Marksheet.blobdata.substring(0, 200)
                    // // const cut_data = blobdata.substring(201,33)
                    // const last_date = this.Print_Marksheet.blobdata.substring(232, this.Print_Marksheet.blobdata.length)
                    // const mystring = blob_first + last_date
                    // let mystring = Extractguid(this.Print_Marksheet.blobdata)
                    this.pdfSrc = this._base64ToArrayBuffer(this.Print_Marksheet.blobdata);
                    // this.selectedRowJson = {} as Ires_Studentmarklist;
                    this.marksheetloader = false
                },
                (error) => {
                    if (error.error !== null) {
                        this.marksheetloader = false
                    } else {
                    }
                }
            );
        }
    }

    CheckOutstanding() {
        let jsonin: Ireq_outstanding = {
            finyear: this.oSession.finyear,
            college_code: this.oSession.collegecode,
            // aadhaar: this.oSession.aadhaar,
            batch_code: -99,
            // batchuuid
        };
        let input_json = {
            Input: encryptUsingAES256(jsonin),
        };
        this.marksheetviewerservice
            .checkoutstanding(input_json)
            .subscribe((response) => {
                this.res_outstanding = response.data;
                //Shivam
                //this.Lastyearbatchcode = this.res.data.Lastyearbatchcode;
                if (this.res_outstanding.outstanding) {
                    this.globalmessage.Show_error(
                        'Please pay your pending Fees to view Marksheet!'
                    );
                    this.router.navigate(['/dashboard']);
                } else {
                    // /this.ShowMarksheet();
                    // this.ValidateEligibility();
                }
            });
    }

    onSelectedItemsChange(selectedItems: Ires_Studentmarklist[]) {
        let filter_noselected: Ires_Studentmarklist[]
        filter_noselected = selectedItems.filter(
            (receipt_item: Ires_Studentmarklist) => receipt_item.batchexam_id !== this.signal_selectedId()
        );
        this.nSelectedReceipt = filter_noselected[0]?.batchexam_id ?? undefined
        this.signal_selectedId.set(this.nSelectedReceipt);
        this.nSelected_singlerecieptdata = filter_noselected[0] ?? undefined
    }

    getReceipts(selectedId: number | undefined) {
        return this.res_studentmarksheetlist.map((lineitem: Ires_Studentmarklist) => {
            lineitem._selected = lineitem.batchexam_id === selectedId;

            return {...lineitem};
        });
    }


}
