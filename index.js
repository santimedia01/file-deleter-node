function main() {
    const fs = require('fs');
    const path = require('path');
    const now = new Date();
    // https://www.npmjs.com/package/simple-node-logger
    const SimpleNodeLogger = require('simple-node-logger'),
        Logger = SimpleNodeLogger.createSimpleLogger({
            logFilePath: `./logs/filesFoundAndDeleted - ${now.getDay()}_${now.getMonth()+1}_${now.getFullYear()}.log`,
            timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
        });
    
    const FilesLib = require('./lib/files.js');

    const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
    
    //
    const filesToSearch = FilesLib.getAllFilesInFolder(config.paths.filesToDelete, 0);
    const allFiles = FilesLib.getAllFilesInFolder(config.paths.toSearchAndDelete);

    let filesToDelete = [];

    allFiles.forEach(file => {
        if( filesToSearch.includes(path.basename(file)) ){
            filesToDelete.push(file);
        }
    });
    
    FilesLib.removeFiles(filesToDelete);
    
    Logger.info('\nConfig(files to search): "', config.paths.filesToDelete + '"',
                '\nConfig(files to search an delete): "', config.paths.toSearchAndDelete + '"',
                //'\nConfig(files to check content too): "', config.paths.folderWithFilesToCheckContentToo + '"',
                '\n\nAll files deleted: ', filesToDelete,
                '\n\n\n');
}    

module.exports = {
    main
};
