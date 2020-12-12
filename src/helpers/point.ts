export class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    move = (angleDeg: number, dist: number): void => {
        this.x = Math.round(Math.cos(angleDeg * Math.PI / 180) * dist + this.x);
        this.y = Math.round(Math.sin(angleDeg * Math.PI / 180) * dist + this.y);
    }

    moveUp = (steps: number = 1): void => {
        this.y += steps
    }

    moveDown = (steps: number = 1): void => {
        this.y -= steps
    }

    moveRight = (steps: number = 1): void => {
        this.x += steps
    }

    moveLeft = (steps: number = 1): void => {
        this.x -= steps
    }

    distance = (point: Point): number => {
        return Math.hypot(this.x - point.x, this.y - point.y)
    }

    distanceXY = (point: Point): number => {
        return Math.abs(this.x - point.x) + Math.abs(this.y - point.y)
    }

    angle = (point: Point): number => {
        const deltaX = point.x - this.x;
        const deltaY = point.y - this.y;
        return Math.atan2(deltaY, deltaX) * (180/Math.PI);
    }

    rotate = (center: Point, angleDeg: number): void => {
        const sin = Math.sin(angleDeg * (Math.PI / 180))
        const cos = Math.cos(angleDeg * (Math.PI / 180))
        
        this.x -= center.x;
        this.y -= center.y;

        const newX = this.x * cos - this.y * sin;
        const newY = this.x * sin + this.y * cos;

        this.x = Math.round(newX + center.x);
        this.y = Math.round(newY + center.y);
    }

    toString = (): string => {
        return `${this.x},${this.y}`
    }
}