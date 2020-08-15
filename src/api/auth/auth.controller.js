const { user, note } = require('models');

exports.loginFlow = async ctx => {
  const pid = ctx.request.query.pid;
  
  await user.findOrCreate({
    where: {
      pid: pid
    },
    defaults: {
      pid: pid,
      recentSessid: ctx.request.query.sessid
    }
  });
  
  note.tableName = `notedb_${pid}`;
  note.sync();
  
  ctx.redirect('/note');
};