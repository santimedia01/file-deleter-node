const fs = require('fs');

/**
 * Recursive go through files and subfolder files and return an Array of files
 * @param {String} dir The directory to go through files and subfolders
 * @param {Array} fileList Files and folders previously analized
 * @param {Number} completePathReturn 0 => Only file names, 1 => With complete Path
 */
function getAllFilesInFolder(dir, completePathReturn = 1, fileList = []) {
  if( !dir.endsWith('/') ){
    dir = dir.concat('/');
  }
  
  let files = fs.readdirSync(dir);

  files.forEach( file => {

    if ( fs.statSync(dir + file).isDirectory() ) {
      fileList = getAllFilesInFolder(dir + file + '/', completePathReturn, fileList);
    } else {

      if(completePathReturn){
        // No puede haber dos archivos con la misma ruta y nombre
        fileList.push(dir + file);

        // pero si un mismo nombre de archivo
      } else if ( !fileList.includes(file) ) {
        fileList.push(file);
      }
      
    }
    
  });

  return fileList;
};

/**
 * Remove all files in the Array
 * @param {Array} files Array of complete path to files to be removed.
 */
function removeFiles (files) {
  files.forEach(file => {
    fs.unlinkSync(file);
  });
}

module.exports = {
  getAllFilesInFolder,
  removeFiles
};
