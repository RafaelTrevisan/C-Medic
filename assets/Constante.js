import SQLite from 'react-native-sqlite-storage';

export const db = SQLite.openDatabase({
    name: 'bdCmedic.sqlite',
    createFromLocation: "~www/bdCmedic.sqlite",
    location: 'Library'
}, this.openCB, this.errorCB)
