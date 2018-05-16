const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

export const init = value => {
  const DB = low(new FileSync('./data/db.json'));

  DB.defaults(value).write();
};

export const fetchAll = key => {
  const DB = low(new FileSync('./data/db.json'));

  return DB.get(key).value();
};

export const fetchOne = (key, cond) => {
  const DB = low(new FileSync('./data/db.json'));

  return DB.get(key)
    .find(cond)
    .value();
};

export const saveOne = (key, value) => {
  const DB = low(new FileSync('./data/db.json'));

  const LAST = DB.get(key)
    .last()
    .value();

  const ID = LAST ? LAST.id + 1 : 1;
  const ONE = Object.assign(value, { id: ID });

  DB.get(key)
    .push(ONE)
    .write();
};

export const editOne = (key, value) => {
  const DB = low(new FileSync('./data/db.json'));

  DB.get(key)
    .find({ id: value.id })
    .assign(value)
    .write();
};
