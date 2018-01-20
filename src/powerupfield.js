const dashmod = require('dashmod');
const $ = require('jquery');

class Field extends dashmod.Entry {
    drawRect(color, x, y, w, h) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    drawText(color, x, y, w, h, text) {
        this.ctx.fillStyle = color;
        const tw = this.ctx.measureText(text).width;
        this.ctx.font = "30px Arial";
        this.ctx.fillText(text, x + tw / 2, y + h / 2 + 10, w);
    }

    drawRectLoop(color, x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    drawCanvas(w, h) {
        console.log(w, h);
        var canvas = this.ctx.canvas;
        canvas.width = w;
        canvas.height = h;
        this.drawField(w, h);
    }

    drawField(w, h) {
        this.drawRectLoop("black", 0, 0, w, h);

        //stations
        const stations = function (p, color, offset, l) {
            for (let i = 0; i < 3; i++) {
                p.drawRectLoop(color, offset, l * i, l, l);
            }
        };
        const l = h / 3;
        stations(this, "red", 0, l);
        stations(this, "blue", w - l, l);

        var allianceOffset = this.redAlliance ? 0 : w - l;

        this.drawRect(this.redAlliance ? "red" : "blue", allianceOffset, (this.station - 1) * l, l, l);
        this.drawText("white", allianceOffset, (this.station - 1) * l, l, l, "1793");

        //switches
        var switchWidth = 40;
        this.drawRectLoop("black", w / 4, h / 4, switchWidth, h / 2);
        this.drawRectLoop("black", w - w / 4 - switchWidth, h / 4, switchWidth, h / 2);


        //red switch

        var posRed = this.switchLeft ? h / 4 : h - h / 4 - switchWidth;
        var posBlue = this.switchLeft ? h - h / 4 - switchWidth : h / 4;
        this.drawRect("red", w / 4, posRed, switchWidth, switchWidth);
        this.drawRect("blue", w / 4, posBlue, switchWidth, switchWidth);

        //blue

        posBlue = this.switchLeft ? h / 4 : h - h / 4 - switchWidth;
        posRed = this.switchLeft ? h - h / 4 - switchWidth : h / 4;
        this.drawRect("red", w - w / 4 - switchWidth, posRed, switchWidth, switchWidth);
        this.drawRect("blue", w - w / 4 - switchWidth, posBlue, switchWidth, switchWidth);

        //scale
        var scaleWidth = 70;
        var scaleOffset = 40;
        this.drawRectLoop("black", w / 2 - scaleWidth / 2, scaleOffset, scaleWidth, h - (2 * scaleOffset));


    }

    init() {
        this.redAlliance = false;
        var canvas = $(`<canvas id='field' width=${this.data.width} height=${this.data.height} ></canvas>`);
        this.module.container.css("min-width", this.data.width);
        super.init(canvas);
        var c = document.getElementById("field");
        this.ctx = c.getContext("2d");

        this.drawCanvas(this.data.width, this.data.height);
    }

    update(key, value) {
        console.log(key, value);
        switch (key) {
            case "/FMSInfo/IsRedAlliance":
                this.redAlliance = value;
                break;
            case "/FMSInfo/StationNumber":
                this.station = value;
                break;
            case "/FMSInfo/GameSpecificMessage":
                this.switchLeft = (value === 'l');
        }
        this.drawCanvas(this.data.width, this.data.height);
    }

    contains(key) {
        return key === "/FMSInfo/IsRedAlliance" ||
            key === "/FMSInfo/StationNumber";
    }

}

dashmod.Module.registerEntryType(Field);