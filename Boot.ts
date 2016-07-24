///<reference path="bower_components/phaser/typescript/phaser.d.ts"/>

module Utils {

	export class Mobile {
		static resize(element: HTMLElement, context: any, logging?: boolean) {
			var _this = context;

			_this.resize_counter++;
		
			// A value of 1 means no scaling 0.5 means half size, 2 double the size and so on.
			var scale = Math.min(window.innerWidth / _this.game.width, window.innerHeight / _this.game.height) * 0.99;
		 
			// Resize parent div in order to vertically center the canvas correctly.
			var innerHeight = window.innerHeight;
			element.style.minHeight = innerHeight.toString() + "px";
		 
			// Resize the canvas keeping the original aspect ratio.
			_this.game.scale.setUserScale(scale, scale, 0, 0);
		 
			if (logging == true) {
				var w = Math.floor(_this.game.width * scale),
					h = Math.floor(_this.game.height * scale);
				var msg = "The game has just been resized to: " + w + " x " + h + " (counter=" + _this.resize_counter + ")\nwindow.innerWidth=" + window.innerWidth + " window.innerHeight=" + window.innerHeight + "\ngame.width=" + _this.game.width + " game.height=" + _this.game.height;
				//console.info(msg);
				_this.my_text.setText(msg);
			}
		}

		static resize2(element: HTMLElement, context: any, logging?: boolean) {
			var _this = context;

			_this.resize_counter++;
		
			var msg = "Resize event (counter=" + _this.resize_counter + "): width=" + window.innerWidth + " height=" + window.innerHeight;
			_this.my_text.setText(msg);
		}

	}

}

module Game {

    export class Boot extends Phaser.State {
 
        parentElement: HTMLElement = document.getElementById("content");

		my_text: Phaser.Text;

		resize_counter: number = 0;
 
        preload() {
            // preload something
        }

		last_inner_width: number = 0;
		last_inner_height: number = 0;
 
        create() {
            this.game.scale.fullScreenTarget = this.parentElement;
            this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // Important
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.stage.disableVisibilityChange = true;
            this.game.input.maxPointers = 1;

			this.my_text = this.game.add.text(0, 0, "placeholder", {fill: "white"});
 
            this.game.scale.setResizeCallback(function () {
				if(window.innerWidth == this.last_inner_width && window.innerHeight == this.last_inner_height) return;

				this.last_inner_width = window.innerWidth;
				this.last_inner_height = window.innerHeight;

                Utils.Mobile.resize(this.parentElement, this, true); 
                // you would probably just use this.game.scale.setResizeCallback(this.resize, this);
            }, this);

			/* 
			this.game.scale.onSizeChange.add(function() {
                Utils.Mobile.resize(this.parentElement, this, true); 
				console.log("onSizeChange");
			});
			*/

            this.game.state.start('Preload', true, false);
        }
    }
 
}
