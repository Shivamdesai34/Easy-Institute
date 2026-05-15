import {SessionService} from "../globals/sessionstorage";
import {decrypt, Decryptdata} from "../globals/encryptdata";

export class Sessiondata {
  aadhaar?: number = 0;
  collegecode?: number = 0;
  finyear?: number = 0;
  websiteid?: number = 0;
  lastfinyear?: number = 0;
  lastbatchcode?: number = 0;
  registerfinyear?: number = 0;

  maxbatchcode?: number = 0;

  maxfinyear?: number = 0;
  maxbatchlevel?: number = 0;
  submittedyear?: number = 0;
  currentformfeesbatchcode?: number = 0;
  currentformfeesbatchlevel?: string;
  currentformfeesboardlevel?: string;
  currentformfeesbatchuuid?: string;
  maxsubjectgroupid?: number = 0;
  minor?: number = 0;
  userrole?: string;
  username?: string;
  token?: string;
  studenttype?: string;
  coursetype?: string;
  batchcode?: number;
  register_batchcode?: number;
  registerbatchname?: string;
  demo?: string;
  lastyearoutstanding?: string;
  formfeesrecieved?: string;
  isprofilesubmited?: string;
  iseligible?: string;
  Admissionboard?: string;
  maxadmissionboard?: string;
  maxsubjectgroupcode?: string;
  singlebatchlevel?: number;
  singlebatchadmissionboard?: string;
  registeradmissionboard?: string;
  currentlevel?: number = 0;
  currentboardlevel? : string;
  currentlevelfinyear?: number = 0;
  registrationbatchuuid?: string;
  currentbatchuuid?: string;
  admissionbatchuuid?: string;
  maxbatchuuid?: string;
  minbatchuuid?: string;

  constructor(private sessionservice: SessionService) {
  }

  Getdatafromstroage() {
    this.demo = "";
    this.finyear = 0;
    this.aadhaar = 0;
    this.collegecode = 0;
    this.studenttype = "";
    this.userrole = "";
    this.username = "";
    this.token = "";
    this.coursetype = "";
    this.registerbatchname = "";
    this.registeradmissionboard = "";
    this.lastyearoutstanding = "";
    this.formfeesrecieved = "";
    this.isprofilesubmited = "";
    this.iseligible = "";
    this.Admissionboard = "";

    this.maxadmissionboard = "";
    this.maxsubjectgroupcode = "";
    this.singlebatchlevel = 0;
    this.singlebatchadmissionboard = "";


    this.currentformfeesbatchcode = 0;
    this.currentformfeesbatchlevel = "";
    this.currentformfeesboardlevel = "";
    this.currentboardlevel = "";
    this.currentformfeesbatchuuid = "";

    this.registrationbatchuuid = '';
    this.currentbatchuuid = '';
    this.admissionbatchuuid = '';
    this.minbatchuuid = "";
    this.maxbatchuuid = "";
    this.register_batchcode = 0;
    this.batchcode = 0;
    // this.lastfinyear = 0;
    this.websiteid = 0;
    this.lastbatchcode = 0;
    this.lastfinyear = 0;
    this.registerfinyear = 0;
    this.maxbatchcode = 0;
    this.maxfinyear = 0;
    this.submittedyear = 0;
    this.maxbatchlevel = 0;
    this.maxsubjectgroupid = 0;
    this.minor = 0;
    this.currentlevel = 0;
    this.currentlevelfinyear = 0;

    let decrypted = ""
    decrypted = Decryptdata(this.sessionservice.GetData('aadhaar')!);
    if (decrypted != "") {
      this.aadhaar = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('demo'))
    if (decrypted != "") {
      this.demo = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('finyear'!));

    if (decrypted != "") {
      this.finyear = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('collegecode'))

    if (decrypted != "") {
      this.collegecode = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('studenttype'))
    if (decrypted != "") {
      this.studenttype = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('userrole'))
    if (decrypted != "") {
      this.userrole = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('username'))
    if (decrypted != "") {
      this.username = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('coursetype'))
    if (decrypted != "") {
      this.coursetype = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('websiteid'))
    if (decrypted != "") {
      this.websiteid = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('batchcode'))
    if (decrypted != "") {
      this.batchcode = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('registerbatchcode'))
    if (decrypted != "") {
      this.register_batchcode = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('registerbatchname'))
    if (decrypted != "") {
      this.registerbatchname = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('registerfinyear'))
    if (decrypted != "") {
      this.registerfinyear = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('registeradmissionboard'))
    if (decrypted != "") {
      this.registeradmissionboard = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('lastbatchcode'))
    if (decrypted != "") {
      this.lastbatchcode = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('lastfinyear'))
    if (decrypted != "") {
      this.lastfinyear = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('lastyearoutstanding'))
    if (decrypted != "") {
      this.lastyearoutstanding = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('formfeesnotpaid'))
    if (decrypted != "") {
      this.formfeesrecieved = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('isprofilesubmitted'))
    if (decrypted != "") {
      this.isprofilesubmited = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('submittedyear'))
    if (decrypted != "") {
      this.submittedyear = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('iseligible'))
    if (decrypted != "") {
      this.iseligible = decrypted.trim();
    }
    decrypted = decrypt(this.sessionservice.GetData('Admissionboard'))
    if (decrypted != "") {
      this.Admissionboard = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('maxbatchcode'))
    if (decrypted != "") {
      this.maxbatchcode = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('maxfinyear'))
    if (decrypted != "") {
      this.maxfinyear = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('maxbatchlevel'))
    if (decrypted != "") {
      this.maxbatchlevel = parseInt(decrypted);
    }
    decrypted = decrypt(this.sessionservice.GetData('maxadmissionboard'))
    if (decrypted != "") {
      this.maxadmissionboard = decrypted.trim();
    }
    decrypted = decrypt(this.sessionservice.GetData('maxsubjectgroupcode'))
    if (decrypted != "") {
      this.maxsubjectgroupcode = decrypted.trim();
    }
    decrypted = decrypt(this.sessionservice.GetData('maxsubjectgroupid'))
    if (decrypted != "") {
      this.maxsubjectgroupid = parseInt(decrypted);
    }
    decrypted = decrypt(this.sessionservice.GetData('currentformfeesbatchcode'))
    if (decrypted != "") {
      this.currentformfeesbatchcode = parseInt(decrypted);
    }
    decrypted = decrypt(this.sessionservice.GetData('currentformfeesbatchlevel'))
    if (decrypted != "") {
      this.currentformfeesbatchlevel = decrypted.trim();
    }
    decrypted = decrypt(this.sessionservice.GetData('currentformfeesboardlevel'))
    if (decrypted != "") {
      this.currentformfeesboardlevel = decrypted.trim();
    }

    decrypted = decrypt(this.sessionservice.GetData('currentformfeesbatchuuid'))
    if (decrypted != "") {
      this.currentformfeesbatchuuid = decrypted.trim();
    }
    decrypted = decrypt(this.sessionservice.GetData('minor'))
    if (decrypted != "") {
      this.minor = parseInt(decrypted);
    }
    decrypted = decrypt(this.sessionservice.GetData('singlebatchlevel'))
    if (decrypted != "") {
      this.singlebatchlevel = parseInt(decrypted);
    }
    decrypted = decrypt(this.sessionservice.GetData('singlebatchadmissionboard'))
    if (decrypted != "") {
      this.singlebatchadmissionboard = decrypted.trim();
    }
    decrypted = decrypt(this.sessionservice.GetData('currentlevel'))
    if (decrypted != "") {
      this.currentlevel = parseInt(decrypted);
    }
    decrypted = decrypt(this.sessionservice.GetData('currentboardlevel'))
    if (decrypted != "") {
      this.currentboardlevel = decrypted.trim();
    }
    decrypted = decrypt(this.sessionservice.GetData('currentlevelfinyear'))
    if (decrypted != "") {
      this.currentlevelfinyear = parseInt(decrypted);
    }
    decrypted = Decryptdata(this.sessionservice.GetData('minbatchuuid'))
    if (decrypted != "") {
      this.minbatchuuid = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('maxbatchuuid'))
    if (decrypted != "") {
      this.maxbatchuuid = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('registrationbatchuuid'))
    if (decrypted != "") {
      this.registrationbatchuuid = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('currentbatchuuid'))
    if (decrypted != "") {
      this.currentbatchuuid = decrypted.trim();
    }
    decrypted = Decryptdata(this.sessionservice.GetData('admissionbatchuuid'))
    if (decrypted != "") {
      this.admissionbatchuuid = decrypted.trim();
    }

  }
}


