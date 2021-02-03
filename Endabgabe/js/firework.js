var silvester;
(function (silvester) {
    class Firework {
        constructor(_position, _type, _color, _speed, _particleRadius, _lifetime) {
            this.particleArray = [];
            console.log(_lifetime);
            this.color = _color;
            this.position = _position;
            this.particleRadius = _particleRadius;
            this.lifeTime = _lifetime;
            switch (_type) {
                case "circle":
                    for (let i = 0; i < 20; i++) {
                        this.particleArray.push(new silvester.Circle(this.position, silvester.Vector.getuberVector(_speed, silvester.Vector.getRandom(-1, 1))));
                    }
                    break;
                case "cone":
                    for (let i = 0; i < 20; i++) {
                        this.particleArray.push(new silvester.Cone(this.position, silvester.Vector.getuberVector(_speed, silvester.Vector.getRandom(-1, 1))));
                    }
                    break;
                case "heart":
                    for (let i = 0; i < 20; i++) {
                        this.particleArray.push(new silvester.Heart(this.position, silvester.Vector.getuberVector(_speed, silvester.Vector.getRandom(-1, 1))));
                    }
                    break;
                case "arch":
                //createCircle();
                default:
                    console.log("Diesen Typ gibt es nicht");
                    return;
            }
        }
        draw() {
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].draw(this.color, this.particleRadius);
            }
        }
        update() {
            console.log(this.lifeTime);
            this.lifeTime--;
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].move();
            }
        }
        isAlive() {
            if (this.lifeTime == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    silvester.Firework = Firework;
})(silvester || (silvester = {}));
//# sourceMappingURL=firework.js.map