namespace silvester {
    export class Cone extends Particle{
        

        constructor (_position: Vector, _velocity: Vector){
            super();
            this.position = new Vector(0,0);
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }
        public draw (_color: string, _particleRadius: number): void {
            crc2.beginPath();
            crc2.fillStyle = _color;
            // crc2.arc(this.position.x, this.position.y, _particleRadius, 0, 2*Math.PI);
            // crc2.fill();
            crc2.fillRect(this.position.x, this.position.y, 10, 10);
            
        }
        
    }
}