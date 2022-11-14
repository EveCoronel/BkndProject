// @ts-nocheck
const { HTTP_STATUS } = require('../../constants/api.constants');
const { HttpError } = require('../../utils/api.utils');
const fs = require('fs');

class FileContainer {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getAll() {
        let documents = JSON.parse(fs.readFileSync(`./data/${this.fileName}`, 'utf-8'))
        return documents;
    }

    getById(id) {
        let documents = this.getAll();
        let documentById = documents.find((documents) => documents.id == id);
        if (!documentById) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return documentById;
    }

    save(item) {
        let documents = this.getAll();
        let id = 1
        if (documents.length != 0) {
            id = documents[documents.length - 1].id + 1
        }
        let newDocument = {
            id,
            item
        }
        documents.push(newDocument)
        fs.writeFileSync(`./data/${this.fileName}`, JSON.stringify(documents))
        return newDocument
    }


    update(productId, item) {
        if (item) {
            let documents = this.getAll();
            let documentById = documents.find((documents) => documents.id == productId);
            if (!documentById) {
                const message = `Resource with id ${id} does not exist in our records`;
                throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
            }
            let updatedDocument = documents.map((doc) => doc.id == productId ? doc = {
                ...doc,
                item,
            } : doc);
            console.log('updated', updatedDocument)
            fs.writeFileSync(`./data/${this.fileName}`, JSON.stringify(updatedDocument))
            return updatedDocument
        }

    }

    delete(id) {
        let documents = this.getAll();
        let documentById = documents.find((document) => document.id == id);
        if (!documentById) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        let updatedDocuments = documents.filter((document) => document.id != id);
        fs.writeFileSync(`./data/${this.fileName}`, JSON.stringify(updatedDocuments))
        return documentById;

    }

    deleteAll() {
        fs.writeFileSync(`./data/${this.fileName}`, JSON.stringify([]))
    }

}
module.exports = FileContainer;