import { Game } from "./Game.js";
import { Tools as Helper } from "./Tools.js";

// Setup...
var captureEl = document.getElementById("capture");
const sprite_1 = new Image();
sprite_1.src = "./res/sprites/Serene_Village_32x32.png";
sprite_1.onload = initialise;
var collide = false;
const game = new Game();
window.game = game;
game.WORLD.BLOCK = 35;
game.WIDTH = 700;
game.HEIGHT = 300;
game.WORLD.COLS = 30;
game.WORLD.ROWS = 30;
game.createMap();
game.render("#body");
game.toggleClass("game-scene");
game.IMAGES.push(sprite_1);
game.GENERATOR.generateGrounds();
game.GENERATOR.generateHouses("GREEN", 7);
game.GENERATOR.GENERATED.RANDOM.generateRandomHouse(15);
game.GENERATOR.generateTopTrees();
game.GENERATOR.generateLeftTrees();
game.GENERATOR.generateTree();
game.GENERATOR.generateObjects();
game.GENERATOR.GENERATED.RANDOM.generateRandomObjects(20);
game.preventDefault();
game.GENERATOR.GENERATED.RANDOM.generateRandomTree(7);
const objSprite = new game.OBJECTS.Sprite(sprite_1);
const player = new game.OBJECTS.Player();
const keys = [{ key: "arrowup", xspeed: 0, yspeed: -player.yspeed }, { key: "arrowright", xspeed: player.xspeed, yspeed: 0 }, { key: "arrowdown", yspeed: player.yspeed, xspeed: 0 }, { key: "arrowleft", xspeed: -player.xspeed, yspeed: 0 }];
player.w = player.h = 35;
function initialise() {
    window.onload = animate;
    game.element.addEventListener("mousemove", game.Mouse.setPos);
    window.addEventListener("keydown", game.Keyboard.handle);
}

function captureScene() {
    if (game) {
        const imageData = game.exportSceneAs("image/jpeg", 1);
        const file = new Blob([imageData], { type: "image/jpeg" });
        const generatedURL = URL.createObjectURL(file);
        return imageData;
    }
    return;
}

function animate() {
    //game.buffer.clearRect(0, 0, game.WORLD.ROWS * game.WORLD.BLOCK, game.WORLD.COLS * game.WORLD.BLOCK);
    game.GENERATOR.GENERATED.GROUND.forEach((ground) => {
        objSprite.draw(game.buffer, { ...ground });
    });
    game.GENERATOR.GENERATED.RANDOM.OBJECTS.forEach((obj) => {
        objSprite.draw(game.buffer, { ...obj });
    });
    game.GENERATOR.GENERATED.TOPTREES.forEach((toptree) => {
        objSprite.draw(game.buffer, { ...toptree });
    });
    game.GENERATOR.GENERATED.RANDOM.HOUSES.forEach((house) => {
        objSprite.draw(game.buffer, { ...house });
    });
    game.GENERATOR.GENERATED.LEFTTREES.forEach((lefttree) => {
        objSprite.draw(game.buffer, { ...lefttree });
    });
    game.GENERATOR.GENERATED.RANDOM.TREES.forEach((tree) => {
        objSprite.draw(game.buffer, { ...tree });
    });
    player.update(game.buffer, () => {
        var hkey;
        hkey = game.Keyboard.key.toString().toLowerCase();
        keys.forEach((key) => {
            if (!collide) {
                if (key.key == hkey) {
                    player.x += key.xspeed;
                    player.y += key.yspeed;
                }
            }
        });
        game.GENERATOR.GENERATED.RANDOM.HOUSES.forEach((house) => {
            var xpos = player.x;
            if (Helper.checkCollision(player, house)) {
                collide = true;
            } else {
                collide = false;
            }
        });
    });
    window.requestAnimationFrame(animate);
}


captureEl.onclick = (e) => {
    const url = captureScene();
    e.target.innerHTML = '';
    e.target.innerHTML = `<a href="${url}" download="GAME.jpg">DOWNLOAD</a>`;
}