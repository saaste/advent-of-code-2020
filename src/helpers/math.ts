export interface CongruentModulo<T extends number | bigint> {
    remainder: T;
    modulo: T;
}

/**
 * Chinese remainder theorem solver
 * 
 * Uses bigints internally 
 * 
 * @param mods 
 */
export const crt = (mods: CongruentModulo<number>[]): number => {
    return Number(
        crtBigInt(
            mods.map(({ remainder, modulo }) => ({
                remainder: BigInt(remainder),
                modulo: BigInt(modulo)
            }))
        )
    );
}

/**
 * Chinese remainder theorem solver
 * @param mods 
 */
export const crtBigInt = (mods: CongruentModulo<bigint>[]): bigint => {
    let p = BigInt(1);
    let sm = BigInt(0);

    const prod = mods.reduce((acc, { modulo }) => acc * modulo, BigInt(1));
    
    for (const { remainder, modulo } of mods) {
        p = prod / modulo;
        sm = sm + remainder * invModBigInt(p, modulo) * p;
    }

    return sm % prod
}

/**
 * Inerse module
 * 
 * Uses bigint internally
 * 
 * @param a 
 * @param m 
 */
export const invMod = (a: number, m: number): number => {
    return Number(invModBigInt(BigInt(a), BigInt(m)));
}

/**
 * 
 * @param a Inverse modulo directly with bigints
 * @param m 
 */
export const invModBigInt = (a: bigint, m: bigint) => {
    const b0 = m;
    let x0 = BigInt(0);
    let x1 = BigInt(1);
    let q: bigint;
    let tmp: bigint;
    if (m == BigInt(1)) {
        return BigInt(1);
    }
    while (a > BigInt(1)) {
        if (m === BigInt(0)) {
            throw new Error('Multiplicative inverse does not exist, tried to divide by 0');
        }
        q = a / m;
        tmp = a;
        a = m;
        m = tmp % m;
        tmp = x0;
        x0 = x1 - q * x0;
        x1 = tmp;
    }
    if (x1 < BigInt(0)) {
        x1 = x1 + b0;
    }
    return x1;
}