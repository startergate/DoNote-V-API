import md5 from "md5";

import { note, metaData, sharedMetaData } from "../../models";

import { randomString } from "../../modules/universalModules";

export const findNote = async (ctx) => {
  let notes = await note.findByPk(ctx.params.noteid, {
    attributes: ["name", "text", "edittime", "id", "category"],
  });
  ctx.body = {
    type: "data",

    is_valid: !!notes,
    data: notes,
  };
};

export const updateNote = async (ctx) => {
  let updateQuery;
  if (ctx.request.body.name || ctx.request.body.text)
    updateQuery = {
      name: ctx.request.body.name,
      text: ctx.request.body.text,
      edittime: new Date(Date.now())
        .toISOString()
        .replace("T", " ")
        .split("Z")
        .join(""),
    };
  else
    ctx.body = {
      type: "error",

      is_valid: true,
      is_succeed: false,
      is_modified: false,
    };
  let result = await note.update(updateQuery, {
    where: { id: ctx.params.noteid },
  });

  ctx.body = {
    type: "data",

    is_valid: true,
    is_succeed: !!result[0],
    is_modified: true,
  };
};

export const deleteNote = async (ctx) => {
  let result = await note
    .destroy({
      where: { id: ctx.params.noteid },
    })
    .catch((err) => {
      console.error(err);
      ctx.status = 500;

      return new Promise((resolve, reject) => {
        resolve(0);
      });
    });

  ctx.body = {
    type: "data",

    is_valid: true,
    is_succeed: !!result,
  };
};

export const createNote = async (ctx) => {
  let createQuery;
  if (ctx.request.body.name && ctx.request.body.text)
    createQuery = {
      id: md5(ctx.request.body.name + randomString(10)),
      name: ctx.request.body.name,
      text: ctx.request.body.text,
      edittime: new Date(Date.now())
        .toISOString()
        .replace("T", " ")
        .split("Z")
        .join(""),
    };
  else {
    ctx.body = {
      type: "error",

      is_valid: true,
      is_succeed: false,
    };
    return;
  }
  let result = await note.create(createQuery).catch((err) => {
    console.error(err);
    ctx.status = 500;
  });

  ctx.body = {
    type: "data",

    is_valid: true,
    is_succeed: !!result,
  };
};

export const findAllNote = async (ctx) => {
  let notes = await note
    .findAll({ attributes: ["name", "id", "category"] })
    .catch((err) => {
      console.error(err);
      ctx.body = 202;
    });

  ctx.body = {
    type: "data",

    is_valid: true,
    data: notes,
  };
  ctx.status = 200;
};

export const findCategorizedNote = async (ctx) => {
  let notes = await note
    .findAll({
      where: { category: ctx.params.cateid },
      attributes: ["name", "id", "category"],
    })
    .catch((err) => {
      console.error(err);
      ctx.status = 202;
    });
  ctx.body = {
    type: "data",

    is_valid: true,
    data: notes,
  };
};

export const findCategory = async (ctx) => {
  let categories = await metaData
    .findAll({
      where: { datatype: "CATEGORY" },
      attributes: ["metadata", "metaid"],
    })
    .catch((err) => {
      console.error(err);
      ctx.status = 520;
      ctx.body = {
        type: "data",

        is_valid: true,
        is_succeed: false,
      };
    });
  ctx.body = {
    type: "data",

    is_valid: true,
    data: categories,
  };
};

export const createCategory = async (ctx) => {
  let result = await metaData
    .create({
      datatype: "CATEGORY",
      metadata: ctx.request.body.name,
      metaid: md5(ctx.request.body.name + randomString(10)),
    })
    .catch((err) => {
      console.error(err);
      ctx.status = 500;
      ctx.body = {
        type: "data",

        is_valid: true,
        is_succeed: false,
      };
      return new Promise((resolve, reject) => {
        resolve(false);
      });
    });

  ctx.body = {
    type: "data",

    is_valid: true,
    is_succeed: !!result,
  };
};

export const findSharedNote = async (ctx) => {
  let currentNoteDBName = note.tableName;
  let output = [];

  await sharedMetaData.findAll().then(async (smd) => {
    return new Promise((resolve, reject) => {
      let procedureCounter = 0;
      smd.forEach(async (data) => {
        procedureCounter++;
        let noteData = data.shareTable.split("_");
        note.tableName = `notedb_${noteData[0]}`;
        if (note.tableName !== currentNoteDBName) {
          await note
            .findByPk(noteData[1], { attributes: ["name"] })
            .then((note) => {
              output.push({
                shareID: data.shareID,
                isEditable: !!+data.shareEdit,
                name: note.name,
              });
              console.log(output);
            })
            .catch((err) => {
              console.error(err);
            });
        }
        if (procedureCounter === smd.length) {
          ctx.body = {
            type: "data",

            is_valid: true,
            data: output,
          };
          resolve(true);
        }
      });
    });
  });
};
