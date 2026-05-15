[![@coreui angular](https://img.shields.io/badge/@coreui%20-angular-lightgrey.svg?style=flat-square)](https://github.com/coreui/angular)
[![npm-coreui-angular-latest][npm-coreui-angular-badge-latest]][npm-coreui-angular]
[![npm-coreui-angular-next][npm-coreui-angular-badge-next]][npm-coreui-angular]
[![NPM downloads][npm-coreui-angular-download]][npm-coreui-angular]  
[![@coreui coreui](https://img.shields.io/badge/@coreui%20-coreui-lightgrey.svg?style=flat-square)](https://github.com/coreui/coreui)
[![npm package][npm-coreui-badge]][npm-coreui]
[![NPM downloads][npm-coreui-download]][npm-coreui]  
![angular](https://img.shields.io/badge/angular-^19.2.0-lightgrey.svg?style=flat-square&logo=angular)

[npm-coreui-angular]: https://www.npmjs.com/package/@coreui/angular

[npm-coreui-angular-badge]: https://img.shields.io/npm/v/@coreui/angular.png?style=flat-square
[npm-coreui-angular-badge-latest]: https://img.shields.io/npm/v/@coreui/angular-pro/latest?style=flat-square&color=red
[npm-coreui-angular-badge-next]: https://img.shields.io/npm/v/@coreui/angular-pro/next?style=flat-square&color=yellow
[npm-coreui-angular-download]: https://img.shields.io/npm/dm/@coreui/angular.svg?style=flat-square

[npm-coreui]: https://www.npmjs.com/package/@coreui/coreui
[npm-coreui-badge]: https://img.shields.io/npm/v/@coreui/coreui-pro.png?style=flat-square
[npm-coreui-download]: https://img.shields.io/npm/dm/@coreui/coreui.svg?style=flat-square

# CoreUI Pro Angular 18 Admin Template _Starter_

> Empty _starter_ template to bootstrap your next project.

CoreUI is meant to be the UX game changer. Pure & transparent code is devoid of redundant components, so the app is light enough to offer ultimate user
experience. This means mobile devices also, where the navigation is just as easy and intuitive as on a desktop or laptop. The CoreUI Layout API lets you
customize your project for almost any device – be it Mobile, Web or WebApp – CoreUI covers them all!

## Project Overview

This repository is a custom Angular student admission and fee management portal built on the CoreUI Pro Angular admin template. The application supports:

- user authentication and OTP flows (`login`, `register`, `otp`, `resetpassword`)
- student fee payment and receipt viewing (`formfees`, `fees`, `feereceipt`)
- admission cancellation and approval workflows (`canceladmission`, `approvedbatchs`)
- student profile updates and NEP subject/course selection (`updateprofile`, `nepsubjects`, `newsubject`, `studentprofilenew`)
- marksheet viewing and internal exam management (`marksheet-viewer`, `internal-exammarks`)
- ATKT and ABC form processing, plus custom demo components for enrollment flows

## Application Architecture

The app is organized into feature modules under `src/app/views`, with lazy-loaded routes defined in `src/app/app.routes.ts`.
Key architectural files include:

- `src/app/app.config.ts` – application providers, router configuration, HTTP client setup, CoreUI sidebar registration, service worker registration, and idle keepalive support.
- `src/app/app.routes.ts` – top-level route definitions and lazy-loading of page and student feature modules.
- `src/app/globals/global-api.ts` – centralized API endpoint definitions for student, fees, marksheet, common utilities, and payment callbacks.
- `src/app/globals/sessionstorage.ts` – session storage helper for saving, reading, and clearing session data.
- `src/app/globals/authservice.ts` – authentication helper for reading the auth token from browser session storage.
- `src/app/globals/rhttpconfig.interceptor.ts` – HTTP interceptor for request headers, token injection, and global request configuration.

## Main Modules and Features

### Authentication and Pages

- `src/app/views/pages` – contains login, register, OTP verification, forgot password, reset password, and success response pages.
- These routes are loaded directly from `app.routes.ts` and provide the main user onboarding and account recovery flows.

#### Login and Registration Flow

- `src/app/app.routes.ts` defines the login route and the registration route as direct component routes.
- `src/app/views/pages/login/login.component.ts` is the main login form. It uses a reactive Angular form with fields:
  - `identifier` (email or mobile)
  - `captchainputvalue` and `capcachid` for server captcha validation
  - `otp` for one-time password verification
- `src/app/views/pages/login/login.service.ts` provides authentication APIs:
  - `GetCaptchaImage()` loads the captcha image from `/v1/Common/Captchimage`
  - `sendotp()` calls `https://admission.rjcollege.edu.in:7005/v2/eazy/sendotp`
  - `login()` calls `https://admission.rjcollege.edu.in:7005/v2/eazy/studentlogin`
- After successful login, the service stores session data in `SessionService` and `sessionStorage`:
  - `refresh_token`, `access_token`
  - encrypted student batch and registration details
  - encoded `studenttype`, `coursetype`, `finyear`, `collegecode`
  - current batch UUIDs, admission batch UUID, and batch-level metadata.
- `src/app/views/pages/register/register.component.ts` handles student registration and form submission. It includes:
  - batch selection, Aadhaar fields, email and mobile validation
  - file upload for Aadhaar image
  - captcha input and batch selection validation
  - custom validators for Aadhaar and mobile values, and dynamic value changes for selected batch
- `src/app/views/pages/register/register.service.ts` supports registration data calls:
  - `GetOTP(jsonin)` uses `Students_url.GetOTP`
  - `registertionbatchs(jsonin)` fetches available registration batches from `Common_url.registertionbatchs`
  - `checkUserExists(identifier)` validates whether the user already exists by calling the identifier validation API
- Registration uses `FormBuilder` and Angular validators to enforce required fields, email format, and custom Aadhaar/mobile rules.

### Dashboard

- `src/app/views/dashboard` – main application dashboard component.
- The dashboard is the primary authenticated landing page for students and administrators.

### Student Workflows

The `src/app/views/students` folder contains the main student-facing feature modules. Each folder is typically lazy-loaded and corresponds to a route in `app.routes.ts`.

- `approvedbatchs` – batch approval and eligibility review workflow.
- `atktform` – ATKT form creation and payment.
- `abcd` / `abcid-form` – custom ABC / ABC ID workflows for specific student forms.
- `newformfees` – new form fees page with route guard support (`formfeesGuard`) to validate access.
- `fees` – student fee payment management.
- `feereceipt` – fee receipt viewing and download.
- `canceladmission` – admission cancellation request flow.
- `internal-exammarks` – internal exam marks entry and review.
- `updateprofile` – student profile update page.
- `dynamicchekbox` – NEP subject selection with dynamic checkbox controls.
- `newprofile` – new student profile creation workflow.
- `marksheet-viewer` – marksheet viewing and printing.
- `democomponent` – demo feature component for testing or preview.
- `studentprofilenew` – new student profile component loaded directly by route.

### Shared Layout

- `src/app/layout-warpper` – layout wrapper component that hosts the main application shell.
- `src/app/layout` – desktop and mobile layout components plus header, footer, and navigation configuration.
- `src/app/layout-service` – services related to layout state and display.

### Shared Utilities

- `src/app/globals` – reusable services, interceptors, API configuration, and helper utilities.
- `src/app/models` – request, response, and session data models used across the app.
- `src/app/services` – shared service classes used by multiple components.
- `src/app/shared` – shared imports and helper modules.

## Data Read / Write Behavior

This app reads data from REST APIs via Angular HTTP client and writes data through form submissions and API calls.

- `global-api.ts` defines all backend endpoints, including student, fees, marksheet, billdesk, and common service URLs.
- `SessionService` in `sessionstorage.ts` manages browser session storage for tokens and session values.
- `AuthService` reads the current auth token so the HTTP interceptor can attach it to requests.
- Components use lazy-loaded feature routes to fetch data only when the user navigates to the corresponding module.

## Styling and Assets

- `src/scss` – global styles, theme settings, and CoreUI SASS customization.
- `src/assets` – icons, scripts, and brand assets used across the application.

- [CoreUI Angular Admin Template](https://coreui.io/angular)
- [CoreUI Angular Demo](https://coreui.io/demos/angular/5.0/default/)
- [CoreUI Angular Docs](https://coreui.io/angular/docs/)

## Table of Contents

* [Versions](#versions)
* [CoreUI Pro](#coreui-pro)
* [Quick Start](#quick-start)
* [Installation](#installation)
* [Basic usage](#basic-usage)
* [What's included](#whats-included)
* [Documentation](#documentation)
* [Versioning](#versioning)
* [Creators](#creators)
* [Community](#community)
* [Copyright and License](#copyright-and-license)

## Versions

### CoreUI Pro

**Only customers with [Enterprise Membership Plan](https://coreui.io/pro/#buy) have access to private GitHub CoreUI Pro repository.**

* 💪  [CoreUI Pro Angular Admin Template](https://coreui.io/product/angular-dashboard-template/)
* 💪  [CoreUI Pro Bootstrap Admin Template](https://coreui.io/product/bootstrap-dashboard-template/)
* 💪  [CoreUI Pro React Admin Template](https://coreui.io/product/react-dashboard-template/)
* 💪  [CoreUI Pro Next.js Admin Template](https://coreui.io/product/next-js-dashboard-template/)
* 💪  [CoreUI Pro Vue Admin Template](https://coreui.io/product/vue-dashboard-template/)

## CoreUI PRO Angular Admin Templates

| Default Theme                                                                                                                                                                      | Light Theme                                                                                                                                                                    |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [![CoreUI PRO Angular Admin Template](https://coreui.io/images/templates/coreui_pro_default_light_dark.webp)](https://coreui.io/product/angular-dashboard-template/?theme=default) | [![CoreUI PRO Angular Admin Template](https://coreui.io/images/templates/coreui_pro_light_light_dark.webp)](https://coreui.io/product/angular-dashboard-template/?theme=light) |

| Modern Theme                                                                                                                                                                             | Bright Theme                                                                                                                                                                    |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [![CoreUI PRO Angular Admin Template](https://coreui.io/images/templates/coreui_pro_default_v3_light_dark.webp)](https://coreui.io/product/angular-dashboard-template/?theme=default-v3) | [![CoreUI PRO React Admin Template](https://coreui.io/images/templates/coreui_pro_light_v3_light_dark.webp)](https://coreui.io/product/angular-dashboard-template/?theme=light) |

## Quick Start

- [Download the latest release](https://github.com/coreui/coreui-pro-angular-admin-template/)
- Clone the repo: `git clone https://github.com/coreui/coreui-pro-angular-admin-template-starter.git`

#### <i>Prerequisites</i>

Before you begin, make sure your development environment includes `Node.js®` and an `npm` package manager.

###### Node.js
[**Angular 19**](https://angular.dev/overview) requires `Node.js` LTS version `^18.19.1` or `^20.11.1`.

- To check your version, run `node -v` in a terminal/console window.
- To get `Node.js`, go to [nodejs.org](https://nodejs.org/).

###### Angular CLI

Install the Angular CLI globally using a terminal/console window.

```bash
npm install -g @angular/cli
```

### Installation

``` bash
$ npm install
$ npm update
```

### Basic usage

``` bash
# dev server with hot reload at http://localhost:4200
$ npm start
```

Navigate to [http://localhost:4200](http://localhost:4200). The app will automatically reload if you change any of the source files.

#### Build

Run `build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
# build for production with minification
$ npm run build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations.
You'll see something like this:

```
coreui-pro-angular-admin-template
├── src/                         # project root
│   ├── app/                     # main app directory
|   │   ├── icons/               # icons set for the app
|   │   ├── layout/              # layout 
|   |   │   └── default-layout/  # layout components
|   |   |       └── _nav.js      # sidebar navigation config
|   │   └── views/               # application views
│   ├── assets/                  # images, icons, etc.
│   ├── scss/                    # scss styles
│   └── index.html               # html template
│
├── angular.json
├── README.md
└── package.json
```

## Documentation

The documentation for the CoreUI Admin Template is hosted at our website [CoreUI for Angular](https://coreui.io/angular/)

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.0.

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, CoreUI Pro Admin Template is maintained
under [the Semantic Versioning guidelines](http://semver.org/).
See [the Releases section of our project](https://github.com/coreui/coreui-pro-angular-admin-template/releases) for changelogs for each release version.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end
testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Creators

**Łukasz Holeczek**

* <https://twitter.com/lukaszholeczek>
* <https://github.com/mrholek>
* <https://github.com/coreui>

**CoreUI team**

* [https://github.com/orgs/coreui/people](https://github.com/orgs/coreui/people)

## Community

Get updates on CoreUI development and chat with the project maintainers and community members.

- Follow [@core_ui on Twitter](https://twitter.com/core_ui).
- Read and subscribe to [CoreUI Blog](https://coreui.io/blog/).

## Copyright and License

copyright 2025 creativeLabs Łukasz Holeczek.

This is commercial software. To use it, you have to obtain a commercial license.

You can buy the license on our website [https://coreui.io](https://coreui.io)

