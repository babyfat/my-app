const {app, BrowserWindow, Menu} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const AppDAO = require('./server/dao')
const UserRepository = require('./server/user_repository')
const AssetsRepository = require('./server/assets_repository')
const SalaryRepository = require('./server/salary_repository')
const ProjectRepository = require('./server/project_repository')
const AnalysisRepository = require('./server/analysis_repository')
let mainWindow;
function createWindow() {
    const { ipcMain } = require('electron')
    const dao = new AppDAO(path.resolve(__dirname, './server/database.sqlite3'))
    //实例化用户dao
    const userRepo = new UserRepository(dao)
    //实例化易耗品dao
    const assetsRepo = new AssetsRepository(dao)
    //实例化工资dao
    const salaryRepo = new SalaryRepository(dao)
    //实例化项目dao
    const projectRepo = new ProjectRepository(dao)
    //
    const analysisRepo = new AnalysisRepository(dao)
    //隐藏菜单
    Menu.setApplicationMenu(null)

    //登录接口
    ipcMain.handle('login',async (event, args) => {
        const result = await userRepo.verifyLogin(args.loginId,args.passwd)
        return result
    })
    //通过id查询单个用户信息
    ipcMain.handle('getById', async (event, args) => {
        const result = await userRepo.getById(args)
        return result
    })
    //删除用户信息
    ipcMain.handle('removeUser', async (event, args) => {
        const result = await userRepo.delete(args)
        return result
    })
    //更新用户信息
    ipcMain.handle('updateUser', async (event, args) => {
        const result = await userRepo.update(args)
        return result
    })
      //新增用户信息
      ipcMain.handle('addUser', async (event, args) => {
        const result = await userRepo.insert(args)
        return result
    })
    //获取全部用户监听接口
    ipcMain.handle('getAllPeople', async (event, ...args) => {
        const result = await userRepo.getAll()
        return result
    })
    //用户条件查询
    ipcMain.handle('getByCondition',async (event, args)=>{
        const result = await userRepo.getByKeyword(args)
        return result 
    })
    //易耗品新增
    ipcMain.handle('assetAdd',async (event,args)=>{
        const asset = await assetsRepo.insert(args)
        return asset
    })
    //易耗品修改
    ipcMain.handle('assetUpdate',async (event,args)=>{
        const asset = await assetsRepo.update(args)
        return asset
    })
    //易耗品删除
    ipcMain.handle('assetDelete',async (event,args)=>{
        const asset = await assetsRepo.delete(args)
        return asset
    })
    //易耗品查询
    ipcMain.handle('assetQuery',async (event,args)=>{
        const asset = await assetsRepo.getAll(args)
        return asset
    })
    //工资单查询
    ipcMain.handle('getAllSalary',async (event,args)=>{
        const asset = await salaryRepo.getAll(args)
        return asset
    })
    //工资单新增
    ipcMain.handle('addSalary',async (event,args)=>{
        const asset = await salaryRepo.insert(args)
        return asset
    })
    //工资单更新
    ipcMain.handle('updateSalary',async (event,args)=>{
        const asset = await salaryRepo.update(args)
        return asset
    })
    //工资单删除
    ipcMain.handle('deleteSalary',async (event,args)=>{
        const asset = await salaryRepo.delete(args)
        return asset
    })
    //工资单单体查询
    ipcMain.handle('getSalaryById',async (event,args)=>{
        const asset = await salaryRepo.getById(args)
        return asset
    })
    //项目列表查询
    ipcMain.handle('getProjectAll',async (event,args)=>{
        const asset = await projectRepo.getAll(args)
        return asset
    })
     //项目单体查询
     ipcMain.handle('getProject',async (event,args)=>{
        const asset = await projectRepo.getById(args)
        return asset
    })
    //add
    ipcMain.handle('addProject',async (event,args)=>{
        const asset = await projectRepo.insert(args)
        return asset
    })
    //update
    ipcMain.handle('updateProject',async (event,args)=>{
        const asset = await projectRepo.update(args)
        return asset
    })
    //delete
    ipcMain.handle('deleteProject',async (event,args)=>{
        const asset = await projectRepo.delete(args)
        return asset
    })
    //工资统计
    ipcMain.handle('salarySum',async (event,args)=>{
        const asset = await analysisRepo.getSalarySum(args)
        return asset
    })
    //固定资产统计
    ipcMain.handle('assetSum',async (event,args)=>{
        const asset = await analysisRepo.getFixedAssetsSum(args)
        return asset
    })
    //易耗品统计
    ipcMain.handle('productSum',async (event,args)=>{
        const asset = await analysisRepo.getDailyAssetsSum(args)
        return asset
    })
    //公司社保支出统计
    ipcMain.handle('insuranceSum',async (event,args)=>{
        const asset = await analysisRepo.getCompanyInsuranceSum(args)
        return asset
    })
    // 创建一个浏览器窗口
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // and load the index.html of the app.
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : url.format({
        pathname: path.join(__dirname, 'build/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // 打开开发者工具
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    // if (process.platform !== 'darwin'){
        app.quit()
    // }
});

app.on('activate', function () {
    if (mainWindow === null) createWindow()
});

