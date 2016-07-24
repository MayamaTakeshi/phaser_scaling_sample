var game;
window.onload = function() {
    console.log("Preparing game");

	//game = new Phaser.Game(864, 720, Phaser.AUTO, 'content');
	game = new Phaser.Game(800, 480, Phaser.AUTO, 'content');
    game.state.add("Boot", Game.Boot);

    game.state.start("Boot");

};
