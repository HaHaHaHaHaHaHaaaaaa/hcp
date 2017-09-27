import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppServiceProvider {
  myDB: any = {
    name: 'test',
    version: 1,
    db: IDBDatabase
  };
  db: IDBDatabase;
  constructor(public http: Http) {
    console.log('Hello AppServiceProvider Provider');
  }

  createDb(name) {
    var request = window.indexedDB.open(name);
    request.onerror = (e) => {
      console.log('OPen Error!');
    };
    request.onsuccess = (e) => {
      let target: any = e.target;
      this.db = target.result;
      console.log('打开成功');
      console.log(e)
    };
    request.onupgradeneeded = function (e) {
      let target: any = e.target;
      var db: IDBDatabase = target.result;
      if (!db.objectStoreNames.contains('students')) {
        db.createObjectStore('students', { autoIncrement: true });
      }
      console.log('DB version changed to ' + db.version);
    };
  }

  add(name, data) {
    let objStore = this.db.transaction(name, 'readwrite').objectStore(name)
    objStore.add(data)
  }


  query(db, storeName, value) {
    var transaction = db.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    var request = store.get(value);
    request.onsuccess = function (e) {
      var student = e.target.result;
      console.log(student.name);
    };
  }
  update(db, storeName, value) {
    var transaction = db.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    var request = store.get(value);
    request.onsuccess = function (e) {
      /*  var student = e.target.result;
       student.age = 35;
       store.put(student); */
    };
  }

  deleteByKey(db, storeName, value) {
    var transaction = db.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    store.delete(value);
  }

  clearObjectStore(db, storeName) {
    var transaction = db.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    store.clear();
  }

  //IndexedDB的索引 。。 store.createIndex('nameIndex','name',{unique:true}); 
}
