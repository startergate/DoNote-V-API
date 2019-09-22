const sid = require('@startergate/sidjs');
const md5 = require('md5');

const note = require('models').note;
const metadata = require('models').metadata;
const sharedMetadata = require('models').sharedmetadata;

const universals = require('modules/universalModules');

exports.sidAuthMiddleware = (req, res, next) => {
    sid.loginAuth(req.headers.sid_clientid, req.headers.sid_sessid).then(info => {
        if (info.is_vaild && info.is_succeed) {
            res.status(401);
            res.send({
                type: 'error',

                is_valid: true,
                is_succeed: false
            });
            return;
        }
        note.tableName = `notedb_${info.pid}`;
        metadata.tableName = `metadb_${info.pid}`;
        sharedMetadata.tableName = `sharedb_${info.pid}`;
        next();
    }).catch(err => {
        console.error(err);
        res.sendStatus(400);
    });
};

exports.findNote = (req, res, next) => {
    note.findByPk(req.params.id, {attributes: ['name', 'text', 'edittime', 'id', 'category']}).then(note => {
        res.send({
            type: 'data',

            is_valid: true,
            data: note
        });
    }).catch(err => {
        console.error(err);
        res.sendStatus(202);
    });
};

exports.updateNote = (req, res, next) => {
    let updateQuery;
    if (req.body.name || req.body.text) updateQuery = {
        name: req.body.name,
        text: req.body.text,
        edittime: new Date(Date.now()).toISOString().replace('T', ' ').split('Z').join('')
    };
    else {
        res.send({
            type: 'error',

            is_valid: true,
            is_succeed: false,
            is_modified: false
        });
    }
    note.update(updateQuery, {
        where: {id: req.params.id}
    }).then(result => {
        res.send({
            type: 'data',

            is_valid: true,
            is_succeed: true,
            is_modified: true
        });
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
};

exports.createNote = (req, res, next) => {
    let createQuery;
    if (req.body.name || req.body.text) createQuery = {
        name: req.body.name,
        text: req.body.text,
        edittime: new Date(Date.now()).toISOString().replace('T', ' ').split('Z').join('')
    };
    else {
        res.send({
            type: 'error',

            is_valid: true,
            is_succeed: false,
            is_created: false
        });
    }
    createQuery.id = md5(req.body.name + universals.randomString(10));
    note.create(createQuery).then(result => {
        res.send({
            type: 'data',

            is_valid: true,
            is_succeed: true,
            is_created: true
        });
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
};

exports.findAllNote = (req, res, next) => {
    note.findAll({ attributes: ['name', 'id', 'category'] }).then(notes => {
        res.send({
            type: 'data',

            is_valid: true,
            data: notes
        });
    }).catch(err => {
        console.error(err);
        res.sendStatus(202);
    });
};

exports.findCategorizedNote = (req, res, next) => {
    note.findAll({ where: { category: req.params.id }, attributes: ['name', 'id', 'category'] }).then(notes => {
        res.send({
            type: 'data',

            is_valid: true,
            data: notes
        });
    }).catch(err => {
        console.error(err)
        res.sendStatus(202);
    });
};

exports.findCategory = (req, res, next) => {
    metadata.findAll({ where: { datatype: "CATEGORY" }, attributes: [ 'metadata', 'metaid' ] })
        .then(categories => {
            res.send({
                type: 'data',

                is_valid: true,
                data: categories
            });
        }).catch(err => {
        console.error(err);
        res.statusCode = 520;
        res.send({
            type: 'data',

            is_valid: true,
            is_succeed: false
        });
    });
};

exports.createCategory = (req, res, next) => {
    metadata.create({datatype: "CATEGORY", metadata: req.body.name, metaid: md5(req.body.name + universals.randomString(10))}).then(user => {
        res.send({
            type: 'data',

            is_valid: true,
            is_succeed: true,
            is_created: true
        });
    }).catch(err => {
        console.error(err);
        res.statusCode = 500;
        res.send({
            type: 'data',

            is_valid: true,
            is_succeed: false
        });
    });
};

exports.findSharedNote = (req, res, next) => {
    let currentNoteDBName = note.tableName;
    let output = [];

    sharedMetadata.findAll().then(smd => {
        let procedureCounter = 0;
        smd.forEach(async data => {
            procedureCounter++;
            let noteData = data.shareTable.split('_');
            note.tableName = `notedb_${noteData[0]}`;
            if (note.tableName !== currentNoteDBName) {
                await note.findByPk(noteData[1], {attributes: ['name']}).then(note => {
                    output.push({shareID: data.shareID, isEditable: !!+data.shareEdit, name: note.name});
                    console.log(output);
                }).catch(err => {
                    console.error(err);
                });
            }
            if (procedureCounter === smd.length) {
                res.send({
                    type: "data",

                    is_valid: true,
                    data: output
                });
            }
        });
    });
};