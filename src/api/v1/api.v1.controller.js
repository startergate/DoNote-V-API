const sid = require('@startergate/sidjs');
const md5 = require('md5');

const note = require('models').note;
const metadata = require('models').metadata;
const sharedMetadata = require('models').sharedmetadata;

const universals = require('modules/universalModules');

exports.sidAuthMiddleware = (ctx, next) => {
    sid.loginAuth(ctx.headers.sid_clientid, ctx.headers.sid_sessid).then(info => {
        if (info.is_vaild && info.is_succeed) {
            ctx.status = 401;
            ctx.body = {
                type: 'error',

                is_valid: true,
                is_succeed: false
            };
            return;
        }
        note.tableName = `notedb_${info.pid}`;
        metadata.tableName = `metadb_${info.pid}`;
        sharedMetadata.tableName = `sharedb_${info.pid}`;
        next();
    }).catch(err => {
        console.error(err);
        ctx.status = 400;
    });
};

exports.findNote = ctx => {
    note.findByPk(ctx.params.id, {attributes: ['name', 'text', 'edittime', 'id', 'category']}).then(note => {
        ctx.body = {
            type: 'data',

            is_valid: true,
            data: note
        };
    }).catch(err => {
        console.error(err);
        ctx.status = 202;
    });
};

exports.updateNote = ctx => {
    let updateQuery;
    if (ctx.request.body.name || ctx.request.body.text) updateQuery = {
        name: ctx.request.body.name,
        text: ctx.request.body.text,
        edittime: new Date(Date.now()).toISOString().replace('T', ' ').split('Z').join('')
    };
    else {
        ctx.body = {
            type: 'error',

            is_valid: true,
            is_succeed: false,
            is_modified: false
        };
    }
    note.update(updateQuery, {
        where: {id: ctx.params.id}
    }).then(result => {
        ctx.body = {
            type: 'data',

            is_valid: true,
            is_succeed: true,
            is_modified: true
        };
    }).catch(err => {
        console.error(err);
        ctx.status = 500;
    });
};

exports.createNote = ctx => {
    let createQuery;
    if (ctx.request.body.name || ctx.request.body.text) createQuery = {
        name: ctx.request.body.name,
        text: ctx.request.body.text,
        edittime: new Date(Date.now()).toISOString().replace('T', ' ').split('Z').join('')
    };
    else {
        ctx.body = {
            type: 'error',

            is_valid: true,
            is_succeed: false,
            is_created: false
        };
    }
    createQuery.id = md5(ctx.request.body.name + universals.randomString(10));
    note.create(createQuery).then(result => {
        ctx.body = {
            type: 'data',

            is_valid: true,
            is_succeed: true,
            is_created: true
        };
    }).catch(err => {
        console.error(err);
        ctx.status = 500;
    });
};

exports.findAllNote = ctx => {
    note.findAll({ attributes: ['name', 'id', 'category'] }).then(notes => {
        ctx.body = {
            type: 'data',

            is_valid: true,
            data: notes
        };
    }).catch(err => {
        console.error(err);
        ctx.body = 202;
    });
};

exports.findCategorizedNote = ctx => {
    note.findAll({ where: { category: ctx.params.id }, attributes: ['name', 'id', 'category'] }).then(notes => {
        ctx.body = {
            type: 'data',

            is_valid: true,
            data: notes
        };
    }).catch(err => {
        console.error(err);
        ctx.status = 202;
    });
};

exports.findCategory = ctx => {
    metadata.findAll({ where: { datatype: "CATEGORY" }, attributes: [ 'metadata', 'metaid' ] })
        .then(categories => {
            ctx.body = {
                type: 'data',

                is_valid: true,
                data: categories
            };
        }).catch(err => {
            console.error(err);
            ctx.status = 520;
            ctx.body = {
                type: 'data',

                is_valid: true,
                is_succeed: false
            };
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