import {INavData} from '@coreui/angular-pro';

export const navItems: INavData[] = [
    {
        name: 'Dashboard',
        iconComponent: {name: 'cil-home'},
        url: '/dashboard',
    },
    {
        name: 'Admission 2026-2027',
        iconComponent: {name: 'cil-layers'},
        class: 'admission-menu',
        children: [
            {
                name: 'Registration Fees',
                iconComponent: {name: 'cil-arrow-right'},
                url: '/formfees',
                linkProps: {queryParams: {'page': 'R'}}
            },
            {
                name: 'Student Profile',
                url: '/studentprofilenew',
                iconComponent: {name: 'cil-arrow-right'},
            },
            // {
            //     name: 'Student Profile',
            //     iconComponent: {name: 'cil-arrow-right'},
            //     url: '/studentprofile',
            //     // attributes: { hidden: true }
            // },
            {
                name: 'Additional Course',
                url: '/formfeesA',
                linkProps: {queryParams: {'page': 'A'}},
                iconComponent: {name: 'cil-arrow-right'},
            },
            {
                name: 'PGDM Course',
                url: '/formfeesPGD',
                linkProps: {queryParams: {'page': 'PGD'}},
                iconComponent: {name: 'cil-arrow-right'},
            },
            {
                name: 'Certificate Course',
                url: '/formfeesCERT',
                linkProps: {queryParams: {'page': 'CERT'}},
                iconComponent: {name: 'cil-arrow-right'},
            },
            {
                name: 'Program Status',
                iconComponent: {name: 'cil-arrow-right'},
                url: '/approvedbatch',
            },
        ]
    },

    // {
    //     name: 'Student Profile',
    //     url: '/studentprofilenew',
    //     iconComponent: {name: 'cil-notes'},
    // },

    // {
    //     name: 'Demo Stepper',
    //     url: '/stepperform',
    //     iconComponent: {name: 'cil-notes'},
    // },

    {
        name: 'ABCID Form',
        url: '/abc',
        iconComponent: {name: 'cil-notes'},
    },

    {
        name: 'ATKT Form',
        url: '/atkt',
        iconComponent: {name: 'cil-notes'},
    },
    {
        name: 'Fees payment',
        url: '/Fees',
        iconComponent: {name: 'cil-money'},
    },
    {
        name: 'Print Fee Receipt',
        url: '/Feereceipt',
        iconComponent: {name: 'cil-pen'},
    },
    {
        name: 'Cancel Admission',
        iconComponent: {name: 'cil-x-circle'},
        url: '/canceladmission'
    },
    {
        name: 'View Marksheet',
        iconComponent: {name: 'cil-layers'},
        url: '/marksheet-viewer',
    },
    {
        name: 'Internal Exam Marks',
        url: '/internal-exammarks',
        iconComponent: {name: 'cil-notes'},
    },
    {
        name: 'Update Image/mobile/email',
        iconComponent: {name: 'cil-wallpaper'},
        url: '/updateprofile',
    },
    // {
    //   name: 'NEP Third Year Subjects',
    //   iconComponent: {name: 'cil-wallpaper'},
    //   url: '/nepsubjects',
    // },
    //
    // {
    //   name: 'Face Detect',
    //   iconComponent: {name: 'cil-wallpaper'},
    //   url: '/facedetect',
    // },
    // {
    //   name: 'New Subject',
    //   iconComponent: {name: 'cil-arrow-right'},
    //   url: '/newsubject',
    // },
    //
    // {
    //   name: 'New FormFees',
    //   iconComponent: {name: 'cil-arrow-right'},
    //   url: '/newformfees',
    // },

    // {
    //     name: 'Demo component',
    //     iconComponent: {name: 'cil-wallpaper'},
    //     url: '/democomponent',
    // },
];

export const navItems_nep: INavData[] = [
    {
        name: 'Dashboard',
        iconComponent: {name: 'cil-home'},
        url: '/dashboard',
    },
    {
        name: 'Admission 2026-2027',
        iconComponent: {name: 'cil-layers'},
        class: 'admission-menu',
        children: [
            {
                name: 'Nep Registration Fees',
                iconComponent: {name: 'cil-arrow-right'},
                url: '/nepadditionalcourse',
                linkProps: {queryParams: {'page': 'R'}}
            },
            // {
            //     name: 'Student Profile',
            //     iconComponent: {name: 'cil-arrow-right'},
            //     url: '/studentprofile',
            //     // attributes: { hidden: true }
            // },
            {
                name: 'Student Profile',
                url: '/studentprofilenew',
                iconComponent: {name: 'cil-arrow-right'},
            },
            {
                name: 'Apply for Additional Course',
                url: '/nepadditionalcourseA',
                linkProps: {queryParams: {'page': 'A'}},
                iconComponent: {name: 'cil-arrow-right'},
            },

            {
                name: 'Certificate Course2',
                url: '/formfeesCERT',
                linkProps: {queryParams: {'page': 'CERT'}},
                iconComponent: {name: 'cil-arrow-right'},
            },

            // {
            //     name: 'NEP Third Year Subjects',
            //     iconComponent: {name: 'cil-wallpaper'},
            //     url: '/nepsubjects',
            // },

            {
                name: 'Program Status',
                iconComponent: {name: 'cil-arrow-right'},
                url: '/approvedbatch',
            },


        ]
    },

    // {
    //     name: 'Student Profile New',
    //     url: '/studentprofilenew',
    //     iconComponent: {name: 'cil-notes'},
    // },

    // {
    //     name: 'Demo Stepper',
    //     url: '/stepperform',
    //     iconComponent: {name: 'cil-notes'},
    // },

    {
        name: 'ABCID Form',
        url: '/abc',
        iconComponent: {name: 'cil-notes'},
    },
    {
        name: 'ATKT Form',
        url: '/atkt',
        iconComponent: {name: 'cil-notes'},
    },
    {
        name: 'Fees payment',
        url: '/Fees',
        iconComponent: {name: 'cil-money'},
    },
    {
        name: 'Print Fee Receipt',
        url: '/Feereceipt',
        iconComponent: {name: 'cil-pen'},
    },
    {
        name: 'Cancel Admission',
        iconComponent: {name: 'cil-x-circle'},
        url: '/canceladmission'
    },
    {
        name: 'View Marksheet',
        iconComponent: {name: 'cil-layers'},
        url: '/marksheet-viewer',
    },
    {
        name: 'Internal Exam Marks',
        url: '/internal-exammarks',
        iconComponent: {name: 'cil-notes'},
    },
    {
        name: 'Update Image/mobile/email',
        iconComponent: {name: 'cil-wallpaper'},
        url: '/updateprofile',
    },
    // {
    //     name: 'Demo component',
    //     iconComponent: {name: 'cil-wallpaper'},
    //     url: '/democomponent',
    // },

    //
    // {
    //   name: 'Face Detect',
    //   iconComponent: {name: 'cil-wallpaper'},
    //   url: '/facedetect',
    // },
    // {
    //   name: 'New Subject',
    //   iconComponent: {name: 'cil-arrow-right'},
    //   url: '/newsubject',
    // },
    //
    // {
    //   name: 'New FormFees',
    //   iconComponent: {name: 'cil-arrow-right'},
    //   url: '/newformfees',
    // },
];

export const navItems_thirdyear_nep: INavData[] = [
    {
        name: 'Dashboard',
        iconComponent: {name: 'cil-home'},
        url: '/dashboard',
    },
    {
        name: 'Admission 2026-2027',
        iconComponent: {name: 'cil-layers'},
        class: 'admission-menu',
        children: [

            {
                name: 'NEP Registration Fees',
                iconComponent: {name: 'cil-arrow-right'},
                url: '/nepsubjects',
            },
            {
                name: 'Student Profile',
                url: '/studentprofilenew',
                iconComponent: {name: 'cil-notes'},
            },
            // {
            //     name: 'Student Profile',
            //     iconComponent: {name: 'cil-arrow-right'},
            //     url: '/studentprofile',
            //     // attributes: { hidden: true }
            // },

            {
                name: 'Certificate Course3',
                url: '/formfeesCERT',
                linkProps: {queryParams: {'page': 'CERT'}},
                iconComponent: {name: 'cil-arrow-right'},
            },
            {
                name: 'Program Status',
                iconComponent: {name: 'cil-arrow-right'},
                url: '/approvedbatch',
            },

        ]
    },
    // {
    //     name: 'Student Profile New',
    //     url: '/studentprofilenew',
    //     iconComponent: {name: 'cil-notes'},
    // },
    // {
    //     name: 'Demo Stepper',
    //     url: '/stepperform',
    //     iconComponent: {name: 'cil-notes'},
    // },
    {
        name: 'ABCID Form',
        url: '/abc',
        iconComponent: {name: 'cil-notes'},
    },
    {
        name: 'ATKT Form',
        url: '/atkt',
        iconComponent: {name: 'cil-notes'},
    },
    {
        name: 'Fees payment',
        url: '/Fees',
        iconComponent: {name: 'cil-money'},
    },
    {
        name: 'Print Fee Receipt',
        url: '/Feereceipt',
        iconComponent: {name: 'cil-pen'},
    },
    {
        name: 'Cancel Admission',
        iconComponent: {name: 'cil-x-circle'},
        url: '/canceladmission'
    },
    {
        name: 'View Marksheet',
        iconComponent: {name: 'cil-layers'},
        url: '/marksheet-viewer',
    },
    {
        name: 'Internal Exam Marks',
        url: '/internal-exammarks',
        iconComponent: {name: 'cil-notes'},
    },
    {
        name: 'Update Image/mobile/email',
        iconComponent: {name: 'cil-wallpaper'},
        url: '/updateprofile',
    },

    //
    // {
    //   name: 'Face Detect',
    //   iconComponent: {name: 'cil-wallpaper'},
    //   url: '/facedetect',
    // },
    // {
    //   name: 'New Subject',
    //   iconComponent: {name: 'cil-arrow-right'},
    //   url: '/newsubject',
    // },
    //
    // {
    //   name: 'New FormFees',
    //   iconComponent: {name: 'cil-arrow-right'},
    //   url: '/newformfees',
    // },

    // {
    //     name: 'Demo component',
    //     iconComponent: {name: 'cil-wallpaper'},
    //     url: '/democomponent',
    // },
];

export const navItems_junior: INavData[] = [
    {
        name: 'Dashboard',
        iconComponent: {name: 'cil-home'},
        url: '/dashboard',
    },
    {
        name: 'Admission 2026-2027',
        iconComponent: {name: 'cil-layers'},
        class: 'admission-menu',
        children: [
            {
                name: 'Registration Fees',
                iconComponent: {name: 'cil-arrow-right'},
                url: '/formfees',
                linkProps: {queryParams: {'page': 'R'}}
            },
            {
                name: 'Student Profile',
                url: '/studentprofilejunior',
                iconComponent: {name: 'cil-arrow-right'},
            },
            // {
            //     name: 'Student Profile',
            //     iconComponent: {name: 'cil-arrow-right'},
            //     url: '/studentprofile',
            //     // attributes: { hidden: true }
            // },
            {
                name: 'Additional Course',
                url: '/formfeesA',
                linkProps: {queryParams: {'page': 'A'}},
                iconComponent: {name: 'cil-arrow-right'},
            },
            {
                name: 'Certificate Course',
                url: '/formfeesCERT',
                linkProps: {queryParams: {'page': 'CERT'}},
                iconComponent: {name: 'cil-arrow-right'},
            },
            {
                name: 'Program Status',
                iconComponent: {name: 'cil-arrow-right'},
                url: '/approvedbatch',
            },
        ]
    },

    // {
    //     name: 'Student Profile',
    //     url: '/studentprofilenew',
    //     iconComponent: {name: 'cil-notes'},
    // },

    // {
    //     name: 'Demo Stepper',
    //     url: '/stepperform',
    //     iconComponent: {name: 'cil-notes'},
    // },

    {
        name: 'ABCID Form',
        url: '/abc',
        iconComponent: {name: 'cil-notes'},
    },

    // {
    //     name: 'ATKT Form',
    //     url: '/atkt',
    //     iconComponent: {name: 'cil-notes'},
    // },
    {
        name: 'Fees payment',
        url: '/Fees',
        iconComponent: {name: 'cil-money'},
    },
    {
        name: 'Print Fee Receipt',
        url: '/Feereceipt',
        iconComponent: {name: 'cil-pen'},
    },
    {
        name: 'Cancel Admission',
        iconComponent: {name: 'cil-x-circle'},
        url: '/canceladmission'
    },
    {
        name: 'View Marksheet',
        iconComponent: {name: 'cil-layers'},
        url: '/marksheet-viewer',
    },
    {
        name: 'Internal Exam Marks',
        url: '/internal-exammarks',
        iconComponent: {name: 'cil-notes'},
    },
    {
        name: 'Update Image/mobile/email',
        iconComponent: {name: 'cil-wallpaper'},
        url: '/updateprofile',
    },
    // {
    //   name: 'NEP Third Year Subjects',
    //   iconComponent: {name: 'cil-wallpaper'},
    //   url: '/nepsubjects',
    // },
    //
    // {
    //   name: 'Face Detect',
    //   iconComponent: {name: 'cil-wallpaper'},
    //   url: '/facedetect',
    // },
    // {
    //   name: 'New Subject',
    //   iconComponent: {name: 'cil-arrow-right'},
    //   url: '/newsubject',
    // },
    //
    // {
    //   name: 'New FormFees',
    //   iconComponent: {name: 'cil-arrow-right'},
    //   url: '/newformfees',
    // },

    // {
    //     name: 'Demo component',
    //     iconComponent: {name: 'cil-wallpaper'},
    //     url: '/democomponent',
    // },
];
