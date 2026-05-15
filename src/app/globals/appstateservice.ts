import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdmissionState } from '../models/response';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {

    // private admissionSubject = new BehaviorSubject<AdmissionState | null>(null);
    private admissionSubject = new BehaviorSubject<AdmissionState>({});

    admission$ = this.admissionSubject.asObservable();


    get value(): AdmissionState {
        return this.admissionSubject.value;
    }

    // ✅ Set full state (from API)
    setAdmissionState(data: AdmissionState) {
        this.admissionSubject.next(data);
    }

    // ✅ Get current value (sync)
    getAdmissionState(): AdmissionState | null {
        return this.admissionSubject.value;
    }

    // ✅ Update individual fields (optional helpers)

    setOutstanding(amount: number) {
        const current = this.admissionSubject.value;
        // if (current) {
        //     this.admissionSubject.next({
        //         ...current,
        //         outstandingAmount: amount
        //     });
        // }
    }

    setFormFeesPaid(status: boolean) {
        const current = this.admissionSubject.value;
        // if (current) {
        //     this.admissionSubject.next({
        //         ...current,
        //         formFeesPaid: status
        //     });
        // }
    }

    setEligibility(status: boolean) {
        const current = this.admissionSubject.value;
        // if (current) {
        //     this.admissionSubject.next({
        //         ...current,
        //         isEligible: status
        //     });
        // }
    }

    updateState(partial: Partial<AdmissionState>) {
        this.admissionSubject.next({
            ...this.admissionSubject.value,
            ...partial
        });
    }

    // ✅ Clear state (logout / reset)
    clear() {
        this.admissionSubject.next({});
    }
}
