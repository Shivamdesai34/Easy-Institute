### [coreui-pro-angular-admin-template](https://coreui.io/angular/) changelog

---

#### `5.4.5`

- chore(dependencies): update to `Angular 19.2`
- fix(default-layout): missing min-height for .ng-scroll-content

---

#### `5.4.1`

- chore(dependencies): version bump for tilde `~` dependencies for @coreui/* to avoid Sass modules mismatch

---

- **refactor(styles): migrate to Sass modules, cleanup**
- refactor(default-layout): scrollbar cleanups
- chore(dependencies): update

---

- refactor(app.config): use provideAnimationAsync

---

- chore(dependencies): update to `Angular 19.1`

---

#### `5.3.4`

- chore(dependencies): update
- chore(dependencies): security patch for `path-to-regexp` ReDoS in 0.1.x
- chore(workflows): update node-version to 22.x
- fix(workflows): Cannot find module @rollup/rollup-linux-x64-gnu

---

#### `5.3.0`
 
- chore(dependencies): update to Angular 19
- refactor: directives, components and pipes are now standalone by default
- chore(build): silence sass import deprecation warnings
- chore(workflows): update with npm ci

---

#### `5.2.22`

- chore(dependencies): update to `Angular 18.2.9`
- fix(widgets-brand): use capBg instead of color
- fix(toasters): toast.index is a signal

---

#### `5.2.16`

- chore(dependencies): update
  - `Angular` to `^18.2.1`
  - `typescript` to `~5.5.4`
  - `tslib`: to `^2.7.0`
  - `zone.js` to `~0.14.10`
  - `@coreui/coreui-pro` to `~5.4.0`
  - `@coreui/angular-chartjs` to `~5.2.16`,
  - `@coreui/angular-pro` to `~5.2.16`,
  - `@coreui/icons-angular` to `~5.2.16`,
  - `@fullcalendar/angular` to `^6.1.15`
  - `@googlemaps/js-api-loader` to `^1.16.8`
  - `chart.js` to `^4.4.4`
  - `jasmine-core` to `^5.2.0`
  - `karma` to `^6.4.4`,
  - `tslib` to `^2.7.0`
  - `micromatch` to `4.0.8`
    - see vulnerability [Regular Expression Denial of Service (ReDoS) in micromatch](https://github.com/advisories/GHSA-952p-6rrq-rcjv)
- refactor: move ColorModeService setup from default-header to app component
- chore(karma.conf): add custom chrome launcher with `--disable-search-engine-choice-screen` flag

---

#### `5.2.5`

- chore(dependencies): update to `Angular 18.1`

---

#### `5.2.3`

- chore(dependencies): update

---

#### `5.2.0`

CoreUI Pro v5.2 for Angular 18

- chore(dependencies): update to `Angular 18`

---

#### `5.0.4`

- chore(dependencies): update

---

#### `5.0.3`

- chore(dependencies): update
- fix: add missing `aria-label` attributes etc

---

#### `5.0.2`

- chore(dependencies): update
- refactor(default-header): color modes dropdown

---

#### `5.0.0`

CoreUI Pro v5 Starter for Angular 17

- chore(dependencies): update to `Angular 17.3`
- refactor: update to CoreUI v5 (styles, structure, api)
- refactor: standalone components app
- refactor: routes config
- refactor: project structure (containers->layout)
- refactor: use control flow

---
