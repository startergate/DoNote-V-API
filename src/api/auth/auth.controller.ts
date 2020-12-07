import {Context} from "koa";

import { user, note } from "../../models";

export const loginFlow = async (ctx: Context) => {
  const pid = ctx.request.query.pid;

  await user.findOrCreate({
    where: {
      pid: pid,
    },
    defaults: {
      pid: pid,
      recentSessid: ctx.request.query.sessid,
    },
  });

  // @ts-ignore
  note.tableName = `notedb_${pid}`;
  await note.sync();

  ctx.redirect("/note");
};
