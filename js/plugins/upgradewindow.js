/*:
*  @plugindesc Upgrade window
*  @author ZainWD
*  @help send help
*/

function Scene_Upgrade() {
    this.initialize.apply(this, arguments);
}

function Window_UpgradeCommand() {
    this.initialize.apply(this, arguments);
}

function Window_PHCommand() {
    this.initialize.apply(this, arguments);
};

function Window_ConfirmCommand() {
    this.initialize.apply(this, arguments);
};

(function() {


    Scene_Upgrade.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Upgrade.prototype.constructor = Scene_Upgrade;
    
    Scene_Upgrade.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
    };
    
    Scene_Upgrade.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
        this._commandWindow.open();
        this.createGoldWindow();
        this.createStatusWindow();
        };
        
        
        
    Scene_Upgrade.prototype.createCommandWindow = function () {
        this._commandWindow = new Window_UpgradeCommand();
        this._commandWindow.setHandler('upgrade', this.commandPersonal.bind(this));
        this._commandWindow.setHandler('exit',	this.commandExit.bind(this));
        $gameSwitches.setValue(123, true)
        this.addWindow(this._commandWindow);
        this._commandWindow.select(0)
    };
    
    Scene_Upgrade.prototype.createPHWindow = function () {
        this._PHWindow = new Window_PHCommand();
        this._PHWindow.selectLast;
        this._statusWindow.deactivate();
        this._PHWindow.activate();
        this._PHWindow.setHandler('Not enough tokens.', this.removePH.bind(this));
        this.addWindow(this._PHWindow);
    };
    
    Scene_Upgrade.prototype.createGoldWindow = function() {
        this._goldWindow = new Window_Gold(0, 0);
        this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
        this.addWindow(this._goldWindow);
    };
    
    Scene_Upgrade.prototype.createStatusWindow = function() {
        this._statusWindow = new Window_MenuStatus(this._commandWindow.width, 0);
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
    };
    
    Scene_Upgrade.prototype.commandPersonal = function() {
        this._statusWindow.setFormationMode(false);
        this._statusWindow.selectLast();
        this._statusWindow.activate();
        this._statusWindow.setHandler('ok',     this.onPersonalOk.bind(this));
        this._statusWindow.setHandler('cancel', this.onPersonalCancel.bind(this));
    };
    
    Scene_Upgrade.prototype.createConfirmWindow = function () {
        this._ConfirmWindow = new Window_ConfirmCommand();
        this._ConfirmWindow.selectLast;
        this._statusWindow.deactivate();
        this._ConfirmWindow.activate();
        this._ConfirmWindow.setHandler('Upgrade', this.confirmYes.bind(this));
        this._ConfirmWindow.setHandler('Cancel', this.confirmNo.bind(this));
        this.addWindow(this._ConfirmWindow);
    };
    
    Scene_Upgrade.prototype.onPersonalOk = function() {
        switch (this._commandWindow.currentSymbol()) {
        case 'upgrade':
        if (this.actor().level < 3) 
        {if ($gameParty.gold() > 99) 
            {   this._statusWindow.activate();
                this.createConfirmWindow();
                break; } else { 
                var soundObj = { name: '[C] Error', volume: 100, pitch: 100, pan: 0 }
                AudioManager.playSe(soundObj);
                this._statusWindow.activate();
                this.createPHWindow();
                }  
            break; } else { 
            var soundObj = { name: '[C] Error', volume: 100, pitch: 100, pan: 0 }
            AudioManager.playSe(soundObj);
            this._statusWindow.activate();
            }   
        }
        };
    
    Scene_Upgrade.prototype.onPersonalCancel = function() {
        this._statusWindow.deselect();
        this._commandWindow.activate();
    };
        
    Scene_Upgrade.prototype.commandExit = function () {
        $gameSwitches.setValue(123, false);
        this.popScene(this);
    };
    
    Scene_Upgrade.prototype.removePH = function () {
        this._windowLayer.removeChild(this._PHWindow);
        this._statusWindow.activate();
    };
    
    Scene_Upgrade.prototype.confirmYes = function () {
        this._windowLayer.removeChild(this._ConfirmWindow);
        this._statusWindow.activate();
        $gameParty.gainGold(-100);
        this._goldWindow.refresh();
        var buyUpg = { name: 'Shop1', volume: 100, pitch: 100, pan: 0 }
        AudioManager.playSe(buyUpg);
        $gameParty.menuActor().changeLevel(this.actor().level + 1, false);
        this._statusWindow.refresh();
    };
    
    Scene_Upgrade.prototype.confirmNo = function () {
        this._windowLayer.removeChild(this._ConfirmWindow);
        this._statusWindow.activate();
    };
    
    //thingie for the window
    

    
    Window_UpgradeCommand.prototype = Object.create(Window_Command.prototype);
    Window_UpgradeCommand.prototype.constructor = Window_UpgradeCommand;
    
    Window_UpgradeCommand.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.updatePlacement();
        this.selectLast();
    };
    
    Window_UpgradeCommand._lastCommandSymbol = null;
    
    Window_UpgradeCommand.initCommandPosition = function() {
        this._lastCommandSymbol = null;
    };
    
    Window_UpgradeCommand.prototype.windowWidth = function() {
        return 260;
    };
    
    Window_UpgradeCommand.prototype.updatePlacement = function() {
        this.x = 0;
        this.y = 0;
    };
    
    Window_UpgradeCommand.prototype.makeCommandList = function() {
        this.addCommand('Upgrade',   'upgrade');
        this.addCommand('Exit', 'exit', this.isContinueEnabled());
    };
    
    Window_UpgradeCommand.prototype.isContinueEnabled = function() {
        return DataManager.isAnySavefileExists();
    };
    
    Window_UpgradeCommand.prototype.processOk = function() {
        Window_UpgradeCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    };
    
    Window_UpgradeCommand.prototype.selectLast = function() {
        if (Window_UpgradeCommand._lastCommandSymbol) {
            this.selectSymbol(Window_UpgradeCommand._lastCommandSymbol);
        } else if (this.isContinueEnabled()) {
            this.selectSymbol('exit');
        }
    };
    
    //other window
    

    
    Window_PHCommand.prototype = Object.create(Window_Command.prototype);
    Window_PHCommand.prototype.constructor = Window_PHCommand;
    
    Window_PHCommand.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, 408, 280);
        this.updatePlacement();
        this.selectLast();
    };
    
    Window_PHCommand._lastCommandSymbol = null;
    
    Window_PHCommand.initCommandPosition = function() {
        this._lastCommandSymbol = null;
    };
    
    Window_PHCommand.prototype.windowWidth = function () {
        return 295;
    };
    
    Window_PHCommand.prototype.windowHeight = function () {
        return 80;
    };
    
    Window_PHCommand.prototype.updatePlacement = function () {
        this.x = 208;
        this.y = 232;
    };
    
    Window_PHCommand.prototype.makeCommandList = function() {
        this.addCommand('Not enough tokens.',   'Not enough tokens.', this.isContinueEnabled());
    };
    
    Window_PHCommand.prototype.isContinueEnabled = function() {
        return DataManager.isAnySavefileExists();
    };
    
    Window_PHCommand.prototype.processOk = function() {
        Window_PHCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    };
    
    Window_PHCommand.prototype.selectLast = function() {
        if (Window_PHCommand._lastCommandSymbol) {
            this.selectSymbol(Window_PHCommand._lastCommandSymbol);
        } else if (this.isContinueEnabled()) {
            this.selectSymbol('Not enough tokens.');
        }
    };
    
    Window_PHCommand.prototype.itemTextAlign = function(){
        return 'center';
    };
    
    
    //third window
    

    
    Window_ConfirmCommand.prototype = Object.create(Window_Command.prototype);
    Window_ConfirmCommand.prototype.constructor = Window_ConfirmCommand;
    
    Window_ConfirmCommand.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, 408, 280);
        this.updatePlacement();
    };
    
    Window_ConfirmCommand._lastCommandSymbol = null;
    
    Window_ConfirmCommand.initCommandPosition = function() {
        this._lastCommandSymbol = null;
    };
    
    Window_ConfirmCommand.prototype.windowWidth = function () {
        return 295;
    };
    
    Window_ConfirmCommand.prototype.windowHeight = function () {
        return 120;
    };
    
    Window_ConfirmCommand.prototype.updatePlacement = function () {
        this.x = 208;
        this.y = 232;
    };
    
    Window_ConfirmCommand.prototype.makeCommandList = function() {
        this.addCommand('Upgrade',   'Upgrade');
        this.addCommand('Cancel',   'Cancel');
    };
    
    Window_ConfirmCommand.prototype.isContinueEnabled = function() {
        return DataManager.isAnySavefileExists();
    };
    
    Window_ConfirmCommand.prototype.processOk = function() {
        Window_ConfirmCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    };
    
    Window_ConfirmCommand.prototype.itemTextAlign = function(){
        return 'center';
    };
})();
