//third window

function Window_ConfirmCommand() {
    this.initialize.apply(this, arguments);
}

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
    return 816;
};

Window_ConfirmCommand.prototype.windowHeight = function () {
    return 180;
};

Window_ConfirmCommand.prototype.updatePlacement = function () {
    this.x = 0;
    this.y = 636;
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
}
