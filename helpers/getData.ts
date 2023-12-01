import fs from 'fs';

export const getData = (path: string, callback: (d: Array<string>) => void) => {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    const split = data.toString().split(/\n/);
    callback(split);
  });
};
