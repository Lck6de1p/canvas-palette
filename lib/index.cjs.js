'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Palette = /** @class */ (function () {
    function Palette(options) {
        if (options === void 0) { options = {}; }
        this.press = false;
        this.canvas = null;
        var width = options.width, height = options.height, el = options.el, color = options.color, fontSize = options.fontSize;
        this.container = document.querySelector(el || 'body') || document.body;
        var containerWidth = this.container.clientWidth;
        var containerHeight = this.container.clientHeight;
        this.width = width || containerWidth;
        this.height = height || containerHeight;
        this.color = color || 'black';
        this.fontSize = fontSize || 5;
    }
    Palette.prototype.init = function () {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.container.appendChild(this.canvas);
        var that = this;
        this.canvas.addEventListener("mousedown", function (e) {
            that.mouseDown(e);
        });
        this.canvas.addEventListener("mousemove", function (e) {
            that.mouseMove(e);
        });
        this.canvas.addEventListener("mouseup", function (e) {
            that.mouseUp(e);
        });
    };
    Palette.prototype.getPen = function (x1, y1) {
        this.ctx.strokeStyle = this.color;
        // 设置线条的宽度
        this.ctx.lineWidth = this.fontSize;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
    };
    Palette.prototype.overPen = function (x1, y1) {
        this.ctx.closePath();
    };
    Palette.prototype.drawPen = function (x1, y1) {
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
    };
    Palette.prototype.mouseDown = function (e) {
        this.press = true;
        this.getPen(e.pageX, e.pageY);
    };
    Palette.prototype.mouseUp = function (e) {
        this.press = false;
        this.overPen(e.pageX, e.pageY);
    };
    Palette.prototype.mouseMove = function (e) {
        if (!this.press) {
            return;
        }
        this.drawPen(e.pageX, e.pageY);
    };
    Palette.prototype.clean = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    /**
     *
     * @param filename
     * @returns
     */
    Palette.prototype.savePicture = function (filename) {
        var base64 = this.canvas.toDataURL("image/png", 1.0);
        var file = dataURLtoFile(base64, filename);
        return { base64: base64, file: file };
    };
    return Palette;
}());
var dataURLtoFile = function (dataUrl, filename) {
    if (filename === void 0) { filename = 'img'; }
    // 将base64转换为文件
    var arr = dataUrl.split(",");
    var mime = arr[0].match(/:(.*?);/)[1];
    var suffix = mime.split("/")[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename + "." + suffix, { type: mime });
};

exports.Palette = Palette;
