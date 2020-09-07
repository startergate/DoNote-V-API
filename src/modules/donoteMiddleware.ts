const sid = require("@startergate/sidjs");

const { note, metaData, sharedMetaData } = require("models");

export const sidAuthMiddleware = async (ctx, next) => {
  await sid
    .loginAuth(ctx.headers.sid_clientid, ctx.headers.sid_sessid)
    .then(async (info) => {
      if (info.is_valid && info.is_succeed) {
        ctx.status = 401;
        ctx.body = {
          type: "error",

          is_valid: true,
          is_succeed: false,
        };
        return;
      }
      note.tableName = `notedb_${info.pid}`;
      metaData.tableName = `metadb_${info.pid}`;
      sharedMetaData.tableName = `sharedb_${info.pid}`;
      await next();
    })
    .catch((err) => {
      console.error(err.response.status + " " + err.response.data.error);
      ctx.status = 400;
    });
};
