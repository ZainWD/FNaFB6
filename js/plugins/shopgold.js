/*:
*  @plugindesc GoldShop window
*  @author ZainWD
*  @help send h
*/

function Window_Gold2() {
    this.initialize.apply(this, arguments);
}

(function () {
    //=============================================================================
    // Window_Gold2
    //=============================================================================
    Window_Gold2.prototype = Object.create(Window_Gold.prototype);
    Window_Gold2.prototype.constructor = Window_Gold2;

    Window_Gold2.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.openness = 0;
        this.opacity = 0;
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        _Scene_Map_createAllWindows.call(this);
        this.createGoldWindow();
    };

    Scene_Map.prototype.createGoldWindow = function () {
        this._goldWindow = new Window_Gold2(8, 554);
        this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
        this.addWindow(this._goldWindow);
        this._goldWindow.refresh();
    };

    var _Scene_Map_update =
Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (this._goldWindow)
    this._goldWindow.refresh();
    };

    var _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function () {
        this._goldWindow.visible = false;
        _Scene_Map_terminate.call(this);
    };

    //=============================================================================
    // SceneManager
    //=============================================================================
    SceneManager.snapForBackground = function () {
        this._backgroundBitmap = this.snap();
    };
})();