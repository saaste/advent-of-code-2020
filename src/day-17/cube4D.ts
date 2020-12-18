export class Cube4D {
    x: number;
    y: number;
    z: number;
    w: number;
    isActive: boolean;
    preparedState: boolean;

    constructor(x: number, y: number, z: number, w: number, isActive: boolean) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.isActive = isActive
        this.preparedState = isActive
    }

    prepareState = (isActive: boolean) => {
        this.preparedState = isActive
    }

    updateState = () => {
        this.isActive = this.preparedState
    }

    toString = (): string => {
        return this.isActive ? '#' : '.';
    }
}