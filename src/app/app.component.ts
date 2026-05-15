import {ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';

import { ColorModeService } from '@coreui/angular-pro';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import {Idle} from "@ng-idle/core";
import {Keepalive, NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import {DEFAULT_INTERRUPTSOURCES} from "@ng-idle/core";
import { CommonService } from './globals/common.service';


@Component({
    selector: 'app-root',
    template: '<router-outlet />',
    imports: [RouterOutlet, NgIdleKeepaliveModule]
})
export class AppComponent implements OnInit {
  title = 'Easy Institute';

    idleState = 'Not started.';
    timedOut = false;
    lastPing!: Date;

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  #iconSetService = inject(IconSetService).icons = { ...iconSubset };

    status = 'ONLINE';

  constructor(private idle: Idle,
              private router: Router,
              private billdeskService: CommonService,
              // private connectionService:ConnectionService,
              private keepalive: Keepalive,
              private cd: ChangeDetectorRef,) {


    this.#titleService.setTitle(this.title);
     this.#iconSetService = {...iconSubset};

      idle.setIdle(1800);

      // console.log('new', this.idleState)

      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout(5);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      // console.log('change', this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES))

      idle.onIdleEnd.subscribe(() => {
          this.idleState = 'No longer idle.'
          // console.log('idle state', this.idleState);
          cd.detectChanges();
          // this.reset();
      });

      idle.onTimeout.subscribe(() => {

          // console.log('Idle timeout state')
          this.idleState = 'Timed out!';
          cd.detectChanges();
          // this.timedOut = true;
          // console.log(this.idleState);
          this.router.navigate(['/login']);
          sessionStorage.clear();
      });

      idle.onIdleStart.subscribe(() => {
          this.idleState = 'You\'ve gone idle!'

      });

      idle.onTimeoutWarning.subscribe((countdown) => {
          this.idleState = 'You will time out in ' + countdown + ' seconds!'
          // console.log(this.idleState);
      });

      // sets the ping interval to 15 seconds
      keepalive.interval(8);

      keepalive.onPing.subscribe(() => this.lastPing = new Date());

      this.billdeskService.getUserLoggedIn().subscribe(userLoggedIn => {
          if (userLoggedIn) {
              idle.watch()
              this.timedOut = false;
          } else {
              idle.stop();
          }
      })
    this.#colorModeService.localStorageItemName.set('coreui-pro-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {

    this.#router.events.pipe(
        takeUntilDestroyed(this.#destroyRef)
      ).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

      this.setStates();

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

    setStates() {
        this.idle.watch();
        this.idleState = 'Started';
    }
}
