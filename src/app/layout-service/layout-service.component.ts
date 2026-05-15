import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LayoutService {

    isMobile$ = this.breakpoint.observe([
        Breakpoints.Handset,
    ]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    constructor(private breakpoint: BreakpointObserver) {}
}
