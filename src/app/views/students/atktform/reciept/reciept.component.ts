import {Component, effect, Input, OnInit, signal, ViewChild} from '@angular/core';
import {CardBodyComponent, ColComponent, IColumn, RowComponent, SmartTableComponent} from "@coreui/angular-pro";
import {FormsModule} from "@angular/forms";
import {NgxPrintElementComponent, NgxPrintElementDirective} from "ngx-print-element";
import {Fees_receiptatkt} from "../../../../models/response";
import {Router} from "@angular/router";
import {CommonService} from "../../../../globals/common.service";
import {Sessiondata} from "../../../../models/Sessiondata";
import {SessionService} from "../../../../globals/sessionstorage";
import {Ireq_reciept} from "../atktform.requestmodel";
import {Students_url} from "../../../../globals/global-api";
import {Subject} from "rxjs";

@Component({
    selector: 'app-atkt-reciept',
    imports: [
        CardBodyComponent,
        ColComponent,
        FormsModule,
        NgxPrintElementComponent,
        NgxPrintElementDirective,
        RowComponent,
        SmartTableComponent
    ],
    templateUrl: './reciept.component.html',
    styleUrl: './reciept.component.scss'
})
export class RecieptComponent implements OnInit {
    @ViewChild('tableRef') tableElement: any;
    @Input() tab_event: number = 0
    @Input('clickSubject') clickSubject: Subject<any> | undefined;
    Rjcollegeemail: string = "rjcollege@rjcollege.edu.in"
    out_rowselected: any;
    iReq_Reciept: Fees_receiptatkt[] = [];
    feeatkthead: string = ""
    Penalty_feeshead: string = ""
    oSession!: Sessiondata;
    itemsPerPage = 10;
    activePage = 1;
    FeeReceipt = false;
    readonly signal_users = signal<Fees_receiptatkt[]>([]);
    readonly signal_selectedId = signal<number | undefined>(0);
    nSelectedReceipt: number = 0;
    nSelected_singlerecieptdata = {} as Fees_receiptatkt

    constructor(
        private router: Router, private commonService: CommonService,
        private sessionservice: SessionService,) {
        // this.loadUsers()
        effect(() => {
            this.signal_users.set(this.getReceipts(this.signal_selectedId()));
        });
    }

    ngOnInit(): void {
        this.oSession = new Sessiondata(this.sessionservice)
        this.oSession.Getdatafromstroage();
        this.clickSubject!.subscribe((e: number) => {
            if (e == 2) {
                // console.log("receipt")
            }
        });
        this.ShowReciept(this.oSession.finyear, this.oSession.collegecode, this.oSession.aadhaar)
    }

    ngOnDestroy() {
        this.clickSubject!.unsubscribe();
    }

    columns: (IColumn | string)[] = []

    ShowReciept(finyear: number = 0, Collegecode: number = 0, aadhaar: number = 0) {

        let jsonin: Ireq_reciept = {
            College_code: Collegecode,
            Finyear: finyear!,
            Aadhaar: aadhaar!,
        }
        let input_jsonin = jsonin

        // console.log('mm1')

        this.commonService.Post_json_normal<Fees_receiptatkt[]>(Students_url.getReciept, input_jsonin).subscribe((response) => {
            // if (!response) return;
            this.iReq_Reciept = response

            // console.log('mm',this.iReq_Reciept)
            this.signal_users.set(this.iReq_Reciept)
            // this.gridApi_inatkt_Reciept.setRowData(this.iReq_Reciept)
        })
    }

    onSelectedItemsChange(selectedItems: Fees_receiptatkt[]) {
        this.FeeReceipt = true
        let filter_noselected: Fees_receiptatkt[]
        filter_noselected = selectedItems.filter(
            (receipt_item: Fees_receiptatkt) => receipt_item.receipt_id !== this.signal_selectedId()
        );
        this.nSelectedReceipt = filter_noselected[0]?.receipt_id ?? undefined
        this.signal_selectedId.set(this.nSelectedReceipt);
        this.nSelected_singlerecieptdata = filter_noselected[0] ?? undefined
        this.feeatkthead = this.nSelected_singlerecieptdata.description
        if (this.nSelected_singlerecieptdata.penaltyamt > 0) {
            this.Penalty_feeshead = "Penalty-late fees "
        }
    }

    intToRoman(num: number) {
        const romanNumerals = [
            {value: 1000, numeral: 'M'},
            {value: 900, numeral: 'CM'},
            {value: 500, numeral: 'D'},
            {value: 400, numeral: 'CD'},
            {value: 100, numeral: 'C'},
            {value: 90, numeral: 'XC'},
            {value: 50, numeral: 'L'},
            {value: 40, numeral: 'XL'},
            {value: 10, numeral: 'X'},
            {value: 9, numeral: 'IX'},
            {value: 5, numeral: 'V'},
            {value: 4, numeral: 'IV'},
            {value: 3, numeral: 'III'},
            {value: 1, numeral: 'I'}
        ];
        let roman = '';
        for (let i = 0; i < romanNumerals.length; i++) {
            while (num >= romanNumerals[i].value) {
                roman += romanNumerals[i].numeral;
                num -= romanNumerals[i].value;
            }
        }
        return roman;
    }

    getReceipts(selectedId: number | undefined) {
        return this.iReq_Reciept.map((lineitem: Fees_receiptatkt) => {
            lineitem._selected = lineitem.receipt_id === selectedId;
            return {...lineitem};
        });
    }
}
