// export const mobileMenus = [
//     {
//         name: 'Admission 25-26',
//         icon: 'cil-layers',
//         children: [
//             {
//                 name: 'Registration Fees',
//                 url: '/formfees',
//                 queryParams: { page: 'R' },
//                 icon: 'cil-arrow-right'
//             },
//             {
//                 name: 'Student Profile',
//                 url: '/studentprofilenew',
//                 icon: 'cil-arrow-right'
//             },
//             {
//                 name: 'Additional Course',
//                 url: '/formfeesA',
//                 queryParams: { page: 'A' },
//                 icon: 'cil-arrow-right'
//             },
//             {
//                 name: 'PGDM Course',
//                 url: '/formfeesPGD',
//                 queryParams: { page: 'PGD' },
//                 icon: 'cil-arrow-right'
//             },
//             {
//                 name: 'Certificate Course1',
//                 url: '/formfeesCERT',
//                 queryParams: { page: 'CERT' },
//                 icon: 'cil-arrow-right'
//             },
//             {
//                 name: 'Cancel Admission',
//                 url: '/canceladmission',
//                 icon: 'cil-x-circle'
//             },
//             {
//                 name: 'Program Status',
//                 url: '/approvedbatch',
//                 icon: 'cil-arrow-right'
//             }
//         ]
//     },
//
//     {
//         name: 'Payment',
//         icon: 'cil-money',
//         children: [
//             {
//                 name: 'Fees payment',
//                 url: '/Fees',
//                 icon: 'cil-money'
//             },
//             {
//                 name: 'Print Fee Receipt',
//                 url: '/Feereceipt',
//                 icon: 'cil-pen'
//             }
//         ]
//     },
//
//     {
//         name: 'Marksheet',
//         icon: 'cil-layers',
//         children: [
//             {
//                 name: 'ABCID Form',
//                 url: '/abc',
//                 icon: 'cil-notes'
//             },
//             {
//                 name: 'ATKT Form',
//                 url: '/atkt',
//                 icon: 'cil-notes'
//             },
//             {
//                 name: 'View Marksheet',
//                 url: '/marksheet-viewer',
//                 icon: 'cil-layers'
//             },
//             {
//                 name: 'Internal Exam Marks',
//                 url: '/internal-exammarks',
//                 icon: 'cil-notes'
//             }
//         ]
//     },
//
//     {
//         name: 'Update Profile',
//         icon: 'cil-wallpaper',
//         url: '/updateprofile'
//     }
// ];



// mobile-menu.ts

import {navItems_junior} from "../destkop-layout/_nav";

export interface MobileMenu {
    name: string;
    icon?: string;
    url?: string;
    queryParams?: any;
    children?: MobileMenu[];
}

export const mobileMenus: MobileMenu[] = [
    // {
    //     name: 'Dashboard',
    //     icon: 'cil-home',
    //     url: '/dashboard'
    // },

    {
        name: 'Admission 2026-2027',
        icon: 'cil-layers',
        children: [
            {
                name: 'Registration Fees',
                url: '/formfees',
                queryParams: { page: 'R' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Student Profile',
                url: '/studentprofilenew',
                icon: 'cil-arrow-right'
            },
            {
                name: 'Additional Course',
                url: '/formfeesA',
                queryParams: { page: 'A' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'PGDM Course',
                url: '/formfeesPGD',
                queryParams: { page: 'PGD' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Certificate Course',
                url: '/formfeesCERT',
                queryParams: { page: 'CERT' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Program Status',
                url: '/approvedbatch',
                icon: 'cil-arrow-right'
            },
            {
                name: 'Cancel Admission',
                icon: 'cil-arrow-right',
                url: '/canceladmission'
            },
        ]
    },

    {
        name: 'Marksheet',
        icon: 'cil-layers',
        children: [
            {
                name: 'ABCID Form',
                url: '/abc',
                icon: 'cil-notes'
            },
            {
                name: 'ATKT Form',
                url: '/atkt',
                icon: 'cil-notes'
            },
            {
                name: 'View Marksheet',
                url: '/marksheet-viewer',
                icon: 'cil-layers'
            },
            {
                name: 'Internal Exam Marks',
                url: '/internal-exammarks',
                icon: 'cil-notes'
            }
        ]
    },

    {
        name: 'Payment',
        icon: 'cil-money',
        children: [
            {
                name: 'Fees payment',
                url: '/Fees',
                icon: 'cil-money'
            },
            {
                name: 'Print Fee Receipt',
                url: '/Feereceipt',
                icon: 'cil-pen'
            }
        ]
    },

    {
        name: 'Update Profile',
        icon: 'cil-wallpaper',
        url: '/updateprofile'
    }
];



// ==========================
// NEP MENU
// ==========================

export const mobileMenus_nep: MobileMenu[] = [
    // {
    //     name: 'Dashboard',
    //     icon: 'cil-home',
    //     url: '/dashboard'
    // },

    {
        name: 'NEP Admission 2026-2027',
        icon: 'cil-layers',
        children: [
            {
                name: 'NEP Registration Fees',
                url: '/nepadditionalcourse',
                queryParams: { page: 'R' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Student Profile',
                url: '/studentprofilenew',
                icon: 'cil-arrow-right'
            },
            {
                name: 'Apply for Additional Course',
                url: '/nepadditionalcourseA',
                queryParams: { page: 'A' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Certificate Course',
                url: '/formfeesCERT',
                queryParams: { page: 'CERT' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Program Status',
                url: '/approvedbatch',
                icon: 'cil-arrow-right'
            },
            {
                name: 'Cancel Admission',
                icon: 'cil-x-circle',
                url: '/canceladmission'
            },
        ]
    },

    {
        name: 'Marksheet',
        icon: 'cil-layers',
        children: [
            {
                name: 'ABCID Form',
                url: '/abc',
                icon: 'cil-notes'
            },
            {
                name: 'ATKT Form',
                url: '/atkt',
                icon: 'cil-notes'
            },
            {
                name: 'View Marksheet',
                url: '/marksheet-viewer',
                icon: 'cil-layers'
            },
            {
                name: 'Internal Exam Marks',
                url: '/internal-exammarks',
                icon: 'cil-notes'
            }
        ]
    },

    {
        name: 'Payment',
        icon: 'cil-money',
        children: [
            {
                name: 'Fees payment',
                url: '/Fees',
                icon: 'cil-money'
            },
            {
                name: 'Print Fee Receipt',
                url: '/Feereceipt',
                icon: 'cil-pen'
            }
        ]
    },



    {
        name: 'Update Profile',
        icon: 'cil-wallpaper',
        url: '/updateprofile'
    }
];



// ==========================
// THIRD YEAR NEP MENU
// ==========================

export const mobileMenus_thirdyear_nep: MobileMenu[] = [
    // {
    //     name: 'Dashboard',
    //     icon: 'cil-home',
    //     url: '/dashboard'
    // },

    {
        name: 'NEP Admission 2026-2027',
        icon: 'cil-layers',
        children: [
            {
                name: 'NEP Registration Fees',
                url: '/nepsubjects',
                icon: 'cil-arrow-right'
            },
            {
                name: 'Student Profile',
                url: '/studentprofilenew',
                icon: 'cil-arrow-right'
            },
            {
                name: 'Certificate Course',
                url: '/formfeesCERT',
                queryParams: { page: 'CERT' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Program Status',
                url: '/approvedbatch',
                icon: 'cil-arrow-right'
            },
            {
                name: 'Cancel Admission',
                icon: 'cil-x-circle',
                url: '/canceladmission'
            },
        ]
    },

    {
        name: 'Marksheet',
        icon: 'cil-layers',
        children: [
            {
                name: 'ABCID Form',
                url: '/abc',
                icon: 'cil-notes'
            },
            {
                name: 'ATKT Form',
                url: '/atkt',
                icon: 'cil-notes'
            },
            {
                name: 'View Marksheet',
                url: '/marksheet-viewer',
                icon: 'cil-layers'
            },
            {
                name: 'Internal Exam Marks',
                url: '/internal-exammarks',
                icon: 'cil-notes'
            }
        ]
    },

    {
        name: 'Payment',
        icon: 'cil-money',
        children: [
            {
                name: 'Fees payment',
                url: '/Fees',
                icon: 'cil-money'
            },
            {
                name: 'Print Fee Receipt',
                url: '/Feereceipt',
                icon: 'cil-pen'
            }
        ]
    },



    {
        name: 'Update Profile',
        icon: 'cil-wallpaper',
        url: '/updateprofile'
    }
];
export const mobileMenus_junior: MobileMenu[] = [


    {
        name: 'Admission 2026-2027',
        icon: 'cil-layers',
        children: [
            {
                name: 'Registration Fees',
                url: '/formfees',
                queryParams: { page: 'R' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Student Profile',
                url: '/studentprofilejunior',
                icon: 'cil-arrow-right'
            },
            {
                name: 'Additional Course',
                url: '/formfeesA',
                queryParams: { page: 'A' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Certificate Course',
                url: '/formfeesCERT',
                queryParams: { page: 'CERT' },
                icon: 'cil-arrow-right'
            },
            {
                name: 'Program Status',
                url: '/approvedbatch',
                icon: 'cil-arrow-right'
            },
            {
                name: 'Cancel Admission',
                icon: 'cil-arrow-right',
                url: '/canceladmission'
            },
        ]
    },

    {
        name: 'Marksheet',
        icon: 'cil-layers',
        children: [
            {
                name: 'ABCID Form',
                url: '/abc',
                icon: 'cil-notes'
            },
            // {
            //     name: 'ATKT Form',
            //     url: '/atkt',
            //     icon: 'cil-notes'
            // },
            {
                name: 'View Marksheet',
                url: '/marksheet-viewer',
                icon: 'cil-layers'
            },
            {
                name: 'Internal Exam Marks',
                url: '/internal-exammarks',
                icon: 'cil-notes'
            }
        ]
    },

    {
        name: 'Payment',
        icon: 'cil-money',
        children: [
            {
                name: 'Fees payment',
                url: '/Fees',
                icon: 'cil-money'
            },
            {
                name: 'Print Fee Receipt',
                url: '/Feereceipt',
                icon: 'cil-pen'
            }
        ]
    },

    {
        name: 'Update Profile',
        icon: 'cil-wallpaper',
        url: '/updateprofile'
    }
];
