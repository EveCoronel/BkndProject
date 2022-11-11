// @ts-nocheck
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const { HTTP_STATUS } = require('../../constants/api.constants');
const dbConfig = require('../../db/db.config');
const { HttpError } = require('../../utils/api.utils');

admin.initializeApp({
  credential: admin.credential.cert(dbConfig.firebase.credentials)
})
console.log('Firebase connected sucessfully!')

class FirebaseContainer {
  constructor(collection) {
    const db = getFirestore();
    this.query = db.collection(collection);
  }

  async getAll() {
    const docRef = await this.query.get();
    const documents = docRef.docs;
    return documents.map(document => {
      return {
        id: document.id,
        ...document.data()
      }
    })
  }

  async getById(id) {
    console.log(id)
    const docRef = this.query.doc(id);
    const document = await docRef.get();
    if (!document.data()) {
      const message = `Resource with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);/* "HOLA" */
    }
    return document.data();
  }

  async save(item) {
    const docRef = this.query.doc();
    return await docRef.set(item);
  }

  async update(id, item) {
    const docRef = this.query.doc(id);
    const documentRef = await docRef.get();
    if (!documentRef.data()) {
      const message = `Resource with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message); 
    }
    return await docRef.update(item);
  }

  async delete(id) {
    const docRef = this.query.doc(id);
    const documentRef = await docRef.get();
    if (!documentRef.data()) {
      const message = `Resource with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return await docRef.delete();
  }
}

module.exports = FirebaseContainer;