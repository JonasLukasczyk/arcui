import { BrowserWindow, ipcMain, dialog } from 'electron';
import PATH from 'path';
import FS from 'fs';

export const FileBrowserService = {

  readDir: (e,root) => {

    const tree = FileBrowserService.readDir_(root);

    console.log(tree)

    const window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())
    window.webContents.send('tree', tree);
  },

  readDir_: (e,path) => {
    const labels = FS.readdirSync(path);
    const children = [];
    for(const l of labels){
      const stat = FS.lstatSync(PATH.join(path,l));
      stat.label = l;
      stat.isDirectory = stat.isDirectory();
      stat.lazy = stat.isDirectory;
      stat.id = path+'/'+stat.label;
      children.push(stat);
    }

    children.sort((a,b)=>{
      if(a.isDirectory && !b.isDirectory){
        return -1;
      } else if (!a.isDirectory && b.isDirectory){
        return 1;
      }
      return a.label.localeCompare(b.label);
    });

    return children;
  },

  selectArc: async ()=>{
    const window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())
    const result = await dialog.showOpenDialog(window, {
      properties: ['openDirectory']
    });
    console.log(result)
    return result.filePaths[0];
  },

  readFile: (e,path)=>{
    return FS.readFileSync(path,{encoding:'UTF-8'});
  },

  init: async () => {
    process.on('unhandledRejection', (reason, p) => {
      console.error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
    });

    ipcMain.handle('FileBrowserService.readDir', FileBrowserService.readDir_)
    ipcMain.handle('FileBrowserService.selectArc', FileBrowserService.selectArc)
    ipcMain.handle('FileBrowserService.readFile', FileBrowserService.readFile)
  }
}
