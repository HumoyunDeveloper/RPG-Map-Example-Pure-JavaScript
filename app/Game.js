class Game {
    constructor() {
        this.WIDTH = 0,
            this.FRAME = 1000 / 60,
            this.HEIGHT = 0,
            this.WORLD = {
                MAP: [],
                BLOCK: 0,
                COLS: 0,
                ROWS: 0
            },
            this.Keyboard = {
                key: "null",
                handle: (e) => {
                    this.Keyboard.key = e.key;
                }
            }
        this.Mouse = {
            x: 0,
            y: 0,
            setPos: (e) => {
                this.Mouse.x = this.element.getBoundingClientRect().left - e.clientX;
                this.Mouse.x = this.element.getBoundingClientRect().top - e.clientY;
            }
        },
            this.OBJECTS = {
                Rect,
                Circle,
                StrokeRect,
                Sprite,
                Player
            },
            this.COUNTERS = {
                COINS: 0,
                SCORE: 0
            },
            this.COLORS = {
                RED: "#F00",
                GREEN: "#0F0",
                BLUE: "#00F",
                BLACK: "#000",
                WHITE: "#FFF",
                CYAN: "#0FF"
            },
            this.OBJECTS_MAP = {
                HOUSES: {
                    RED: [{ sx: 0, sy: 672, sw: 198, sh: 135 }, { sx: 190, sy: 672, sw: 120, sh: 135 }, { sx: 320, sy: 675, sw: 150, sh: 125 }, { sx: 0, sy: 795, sw: 160, sh: 125 }, { sx: 310, sy: 795, sw: 110, sh: 125 }, { sx: 410, sy: 795, sw: 100, sh: 125 }],
                    GREEN: [{ sx: 0, sy: 920, sw: 198, sh: 135 }, { sx: 320, sy: 920, sw: 150, sh: 125 }, { sx: 0, sy: 920, sw: 180, sh: 125 }, { sx: 315, sy: 925, sw: 170, sh: 125 }, { sx: 330, sy: 924, sw: 157, sh: 120 }, { sx: 410, sy: 1050, sw: 100, sh: 125 }],
                    BLUE: [{ sx: 0, sy: 1200, sw: 198, sh: 120 }, { sx: 190, sy: 1190, sw: 120, sh: 120 }, { sx: 320, sy: 1180, sw: 150, sh: 120 }, { sx: 0, sy: 1320, sw: 160, sh: 125 }, { sx: 310, sy: 1310, sw: 110, sh: 125 }, { sx: 410, sy: 1310, sw: 100, sh: 125 }]
                },
                OBJ: [{
                    w: 35,
                    h: 35,
                    sw: 55,
                    sh: 55,
                    sx: 480,
                    sy: 1000
                }],
                GROUND: [{ sx: 180, sy: 90, sw: 35, sh: 35 }, { sx: 135, sy: 0, sw: 35, sh: 35 }],
                TREES: {
                    SX: [
                        { sx: 290, sy: 400, sw: 60, sh: 90 },
                        { sx: 354, sy: 400, sw: 60, sh: 90 },
                        { sx: 418, sy: 400, sw: 60, sh: 90 },
                        { sx: 482, sy: 400, sw: 63, sh: 90 },
                        { sx: 548, sy: 400, sw: 63, sh: 90 }
                    ],
                    MX: [
                        { sx: 290, sy: 485, sw: 160, sh: 90 },
                        { sx: 450, sy: 485, sw: 160, sh: 90 },
                        { sx: 290, sy: 585, sw: 160, sh: 85 },
                        { sx: 450, sy: 585, sw: 160, sh: 85 }
                    ]
                }
            },
            this.IMAGES = [],
            this.GENERATOR = {
                GENERATED: {
                    RANDOM: {
                        HOUSES: [],
                        TREES: [],
                        OBJECTS: [],
                        generateRandomHouse: (_num) => {
                            this.GENERATOR.GENERATED.RANDOM.HOUSES = [{ x: 8080, y: 8082 }];
                            for (var stpoint = 0; stpoint <= _num; stpoint++) {
                                var randomNumber, randomHouse, isClone;
                                randomNumber = Math.floor(Math.random() * this.GENERATOR.GENERATED.HOUSES.length);
                                randomHouse = this.GENERATOR.GENERATED.HOUSES[randomNumber];
                                isClone = this.GENERATOR.GENERATED.RANDOM.HOUSES.some((house) => house.x == randomHouse.x && house.y == randomHouse.y);
                                if (isClone) {
                                    console.info("clone or Collision detected HOUSE");
                                } else {
                                    this.GENERATOR.GENERATED.RANDOM.HOUSES.push(randomHouse);
                                }
                            }
                        },
                        generateRandomObjects: (_num) => {
                            this.GENERATOR.GENERATED.RANDOM.OBJECTS = [];
                            for (var st = 0; st < _num; st++) {
                                var isClone, randomPos, isCollide;
                                randomPos = this.GENERATOR.GENERATED.OBJECTS[Math.floor(Math.random() * this.GENERATOR.GENERATED.OBJECTS.length)];
                                isClone = this.GENERATOR.GENERATED.RANDOM.OBJECTS.some((obj) => obj.x == randomPos.x && obj.y == randomPos.y);
                                isCollide = this.GENERATOR.GENERATED.RANDOM.HOUSES.some((el) => {
                                    return el.x == randomPos.x - this.WORLD.BLOCK && el.y == randomPos.y - this.WORLD.BLOCK;
                                });
                                if (isClone || isCollide) {
                                    console.info("clone or Collison detected OBJECT");
                                } else {
                                    this.GENERATOR.GENERATED.RANDOM.OBJECTS.push(randomPos);
                                }
                            }
                        },
                        generateRandomTree: (_num) => {
                            this.GENERATOR.GENERATED.RANDOM.TREES = [{ x: 8080, y: 8082 }];
                            for (var stpoint = 0; stpoint <= _num; stpoint++) {
                                var randomNumber, randomTree, isClone, isCollide;
                                randomNumber = Math.floor(Math.random() * this.GENERATOR.GENERATED.TREES.length);
                                randomTree = this.GENERATOR.GENERATED.TREES[randomNumber];
                                isClone = this.GENERATOR.GENERATED.RANDOM.TREES.some((tree) => tree.x == randomTree.x && tree.y == randomTree.y);
                                isCollide = this.GENERATOR.GENERATED.RANDOM.HOUSES.some((el) => {
                                    return el.x == randomTree.x && el.y == randomTree.y;
                                });
                                if (isClone || isCollide) {
                                    console.info("clone Or Collision detected TREE");
                                } else {
                                    this.GENERATOR.GENERATED.RANDOM.TREES.push(randomTree);
                                }
                            }
                        }
                    },
                    GROUND: [],
                    TOPTREES: [],
                    LEFTTREES: [],
                    TREES: [],
                    HOUSES: [],
                    OBJECTS: []
                },
                generateGrounds: () => {
                    this.GENERATOR.GENERATED.GROUND = [];
                    this.WORLD.MAP.forEach((col, cx) => {
                        col.forEach((row, rx) => {
                            const xpos = rx * this.WORLD.BLOCK;
                            const ypos = cx * this.WORLD.BLOCK;
                            const options = {
                                ...this.OBJECTS_MAP.GROUND[Math.floor(Math.random() * this.OBJECTS_MAP.GROUND.length)],
                                x: xpos,
                                y: ypos,
                                w: this.WORLD.BLOCK,
                                h: this.WORLD.BLOCK
                            };
                            this.GENERATOR.GENERATED.GROUND.push(options);
                        });
                    });
                },
                generateObjects: () => {
                    this.GENERATOR.GENERATED.OBJECTS = [];
                    this.WORLD.MAP.forEach((col, cx) => {
                        col.forEach((row, rx) => {
                            const xpos = rx * this.WORLD.BLOCK;
                            const ypos = cx * this.WORLD.BLOCK;
                            const options = {
                                ...this.OBJECTS_MAP.OBJ[0],
                                x: xpos,
                                y: ypos,
                                w: this.WORLD.BLOCK,
                                h: this.WORLD.BLOCK
                            };
                            this.GENERATOR.GENERATED.OBJECTS.push(options);
                        });
                    });
                },
                generateTopTrees: () => {
                    this.GENERATOR.GENERATED.TOPTREES = [];
                    var len = this.WORLD.MAP[0].length;
                    for (var num = 0; num < len; num++) {
                        const xpos = num * this.WORLD.BLOCK * 2;
                        const ypos = -this.WORLD.BLOCK;
                        if (xpos >= this.WORLD.BLOCK * this.WORLD.ROWS) {
                            break;
                        } else {
                            const options = {
                                ...this.OBJECTS_MAP.TREES.MX[Math.floor(Math.random() * 2 + 2)],
                                x: xpos,
                                y: ypos,
                                w: this.WORLD.BLOCK * 2,
                                h: this.WORLD.BLOCK * 2
                            };
                            this.GENERATOR.GENERATED.TOPTREES.push(options);
                        }
                    }
                },
                generateLeftTrees: () => {
                    this.GENERATOR.GENERATED.LEFTTREES = [];
                    var len = this.WORLD.MAP.length;
                    for (var num = 0; num < len; num++) {
                        const xpos = -this.WORLD.BLOCK;
                        const ypos = num * this.WORLD.BLOCK * 3;
                        if (ypos >= this.WORLD.BLOCK * this.WORLD.COLS) {
                            break;
                        } else {
                            const options = {
                                ...this.OBJECTS_MAP.TREES.MX[Math.floor(Math.random() * 2 + 2)],
                                x: xpos,
                                y: ypos,
                                w: this.WORLD.BLOCK * 2,
                                h: this.WORLD.BLOCK * 3
                            };
                            this.GENERATOR.GENERATED.LEFTTREES.push(options);
                        }
                    }
                },
                generateHouses: (_type, _len = 0) => {
                    this.GENERATOR.GENERATED.HOUSES = [];
                    this.WORLD.MAP.forEach((col, cx) => {
                        col.forEach((row, rx) => {
                            const xpos = this.WORLD.BLOCK + rx * (this.WORLD.BLOCK * 2);
                            const ypos = cx * (this.WORLD.BLOCK * 2);
                            if (((xpos + this.WORLD.BLOCK) + this.WORLD.BLOCK * 0.5 <= this.WORLD.BLOCK * this.WORLD.ROWS) && (ypos + this.WORLD.BLOCK) + this.WORLD.BLOCK * 0.5 <= this.WORLD.BLOCK * this.WORLD.COLS) {
                                const options = {
                                    ...this.OBJECTS_MAP.HOUSES[_type][Math.floor(Math.random() * this.OBJECTS_MAP.HOUSES[_type].length)],
                                    x: xpos,
                                    y: ypos,
                                    w: this.WORLD.BLOCK * 2,
                                    h: this.WORLD.BLOCK * 2
                                };
                                this.GENERATOR.GENERATED.HOUSES.push(options);
                            }
                        });
                    });
                },
                generateTree: () => {
                    this.GENERATOR.GENERATED.TREES = [];
                    this.WORLD.MAP.forEach((col, cx) => {
                        col.forEach((row, rx) => {
                            const xpos = this.WORLD.BLOCK + rx * (this.WORLD.BLOCK);
                            const ypos = cx * (this.WORLD.BLOCK);
                            if (((xpos + this.WORLD.BLOCK) + this.WORLD.BLOCK * 0.5 <= this.WORLD.BLOCK * this.WORLD.ROWS) && (ypos + this.WORLD.BLOCK) + this.WORLD.BLOCK * 0.5 <= this.WORLD.BLOCK * this.WORLD.COLS) {
                                const options = {
                                    ...this.OBJECTS_MAP.TREES.SX[4],
                                    x: xpos,
                                    y: ypos,
                                    w: this.WORLD.BLOCK,
                                    h: this.WORLD.BLOCK
                                };
                                this.GENERATOR.GENERATED.TREES.push(options);
                            }
                        });
                    });
                }
            },
            this.element = document.createElement("canvas"),
            this.buffer = this.element.getContext("2d");
    }
    
    // I DON'T KNOW WHAT I AM DOING 😂

    render(_element) {
        if (document.querySelector(_element)) {
            document.querySelector(_element).appendChild(this.element);
            this.element.width = this.WIDTH;
            this.element.height = this.HEIGHT;
        }
    }

    toggleClass(_className) {
        this.element.classList.toggle(_className);
    }

    createMap(_w = this.WORLD.ROWS, _h = this.WORLD.COLS, _fill = 0) {
        this.WORLD.MAP = [];
        for (var col = 0; col < _h; col++) {
            this.WORLD.MAP[col] = [];
            for (var row = 0; row < _w; row++) {
                this.WORLD.MAP[col][row] = _fill;
            }
        }
    }

    preventDefault() {
        this.element.oncontextmenu = (e) => e.preventDefault();
    }

    incrementScoreBy(_num) {
        this.COUNTERS.SCORE += _num;
    }

    incrementCoinsBy(_num) {
        this.COUNTERS.COINS += _num;
    }

    exportSceneAs(_type = "image/png", _qual = 1) {
        return this.element.toDataURL(_type, _qual);
    }

    reset() {
        this.COUNTERS.COINS = 0;
        this.COUNTERS.SCORE = 0;
        this.WORLD.MAP = [];
        this.WORLD.BLOCK = 0;
        this.WORLD.COLS = 0;
        this.WORLD.ROWS = 0;
    }
}

class Rect {
    constructor(_x = 0, _y = 0, _w = 10, _h = 10) {
        this.x = _x,
            this.y = _y,
            this.w = _w,
            this.h = _h,
            this.col = "black";
    }

    draw(_buff) {
        _buff.fillStyle = this.col;
        _buff.fillRect(this.x, this.y, this.w, this.h);
    }

    update(_buff) {
        this.draw(_buff);
        //CODE     
    }
}

class Sprite {
    constructor(_img, _options) {
        this.img = _img,
            this.options = _options;
    }
    draw(_buff, options = this.options) {
        _buff.drawImage(
            this.img,
            options.sx,
            options.sy,
            options.sw,
            options.sh,
            options.x,
            options.y,
            options.w,
            options.h,
            this.h);
    }
    update(_buff) {
        this.draw(_buff);
        //CODE     
    }
}

class StrokeRect {
    constructor(_x = 0, _y = 0, _w = 10, _h = 10) {
        this.x = _x,
            this.y = _y,
            this.w = _w,
            this.h = _h,
            this.lineWidth = 1,
            this.strokeStyle = "black";
    }

    draw(_buff) {
        _buff.strokeStyle = this.strokeStyle;
        _buff.lineWidth = this.lineWidth;
        _buff.StrokeRect(this.x, this.y, this.w, this.h);
    }

    update(_buff) {
        this.draw(_buff);
        //CODE     
    }
}

class Circle {
    constructor(_x = 0, _y = 0, _r = 10) {
        this.x = _x,
            this.y = _y,
            this.r = _r,
            this.col = "black";
    }

    draw(_buff) {
        _buff.fillStyle = this.col;
        _buff.beginPath();
        _buff.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        _buff.closePath();
        _buff.fill();
    }

    update(_buff) {
        this.draw(_buff);
        //CODE     
    }
}

class Player {
    constructor() {
        this.x = 0,
            this.y = 0,
            this.h = 0,
            this.yspeed = 0.5,
            this.xspeed = 0.5,
            this.w = 0;
    }
    setPos(_x, _y) {
        this.x = _x,
            this.y = _y;
    }
    draw(_buff) {
        _buff.fillStyle = "black";
        _buff.fillRect(this.x, this.y, this.w, this.h);
    }
    update(_buff, func) {
        this.draw(_buff);
        func();
    }
}

//Exporting the Game Object...
export { Game };