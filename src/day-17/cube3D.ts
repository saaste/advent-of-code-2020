export class Cube3D {
    x: number;
    y: number;
    z: number;
    isActive: boolean;
    preparedState: boolean;

    constructor(x: number, y: number, z: number, isActive: boolean) {
        this.x = x;
        this.y = y;
        this.z = z;
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