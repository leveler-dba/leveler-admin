import app from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

const {
  REACT_APP_prod_apiKey,
  REACT_APP_prod_authDomain,
  REACT_APP_prod_databaseURL,
  REACT_APP_prod_projectId,
  REACT_APP_prod_storageBucket,
  REACT_APP_prod_messagingSenderId,
  REACT_APP_prod_appId,
  REACT_APP_prod_measurementId
} = process.env;

const {
  REACT_APP_dev_apiKey,
  REACT_APP_dev_authDomain,
  REACT_APP_dev_databaseURL,
  REACT_APP_dev_projectId,
  REACT_APP_dev_storageBucket,
  REACT_APP_dev_messagingSenderId,
  REACT_APP_dev_appId,
  REACT_APP_dev_measurementId
} = process.env;

const prodConfig = {
  apiKey: REACT_APP_prod_apiKey,
  authDomain: REACT_APP_prod_authDomain,
  databaseURL: REACT_APP_prod_databaseURL,
  projectId: REACT_APP_prod_projectId,
  storageBucket: REACT_APP_prod_storageBucket,
  messagingSenderId: REACT_APP_prod_messagingSenderId,
  appId: REACT_APP_prod_appId,
  measurementId: REACT_APP_prod_measurementId
};

const devConfig = {
  apiKey: REACT_APP_dev_apiKey,
  authDomain: REACT_APP_dev_authDomain,
  databaseURL: REACT_APP_dev_databaseURL,
  projectId: REACT_APP_dev_projectId,
  storageBucket: REACT_APP_dev_storageBucket,
  messagingSenderId: REACT_APP_dev_messagingSenderId,
  appId: REACT_APP_dev_appId,
  measurementId: REACT_APP_dev_measurementId
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
    this.dbFs = app.firestore();
    this.fieldValue = app.firestore.FieldValue;
    this.analytics = app.analytics();
    this.logEvent = app.analytics().logEvent;
    this.appAuth = app.auth();
    this.entriesCollection = this.dbFs.collection('entries');
    this.entriesIndexCollection = this.dbFs.collection('entriesIndex');
  }

  signIn = (email, password) =>
    this.appAuth.signInWithEmailAndPassword(email, password);
}
export default Firebase;
