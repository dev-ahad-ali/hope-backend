import fs from 'fs';

export const deleteFileAfterUpload = (path) => {
  return fs.unlinkSync(path);
};
