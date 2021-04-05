function main() {
    const fs = require('fs');
    const path = require('path');

    // https://www.npmjs.com/package/simple-node-logger
    const SimpleNodeLogger = require('simple-node-logger'),
        logOptions = {
            logFilePath:'./logs/filesFoundAndDeleted.log',
            timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
        },
        Logger = SimpleNodeLogger.createSimpleLogger( logOptions );
    
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
                '\n\nFiles found to search: ', filesToSearch, 
                '\n\nAll files found for search and delete:', allFiles, 
                '\n\nAll files deleted: ', filesToDelete,
                '\n\n\n');
}    

module.exports = {
    main
};