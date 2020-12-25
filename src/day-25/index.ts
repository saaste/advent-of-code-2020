import { parseConfigFileTextToJson } from 'typescript';
import { readInputAsNumbers } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;

class Device {
    publicKey: number;
    subjectNumber: number = 7;
    
    loopSize: number = 0;
    otherPublicKey: number;
    encryptionKey: number = 0;

    constructor(publicKey: number, otherPublicKey: number) {
        this.publicKey = publicKey;
        this.otherPublicKey = otherPublicKey;
        this.findLoopSize();
        this.findEncryptionKey();
    }

    findLoopSize = () => {
        let loopSize = 1;
        let value = 1;

        while(this.loopSize === 0) {
            value = this.transform(value, this.subjectNumber);
            if (value === this.publicKey) {
                this.loopSize = loopSize
            } else {
                loopSize++;
            }
        }
    }

    findEncryptionKey = () => {
        let value = 1
        for (let i = 0; i < this.loopSize; i++) {
            value = this.transform(value, this.otherPublicKey);
        }
        this.encryptionKey = value;
    }

    transform = (value: number, subjectNumber: number): number => {
        value = value * subjectNumber;
        value = value % 20201227;
        return value;
    }

    handshake = () => {

    }


    
}

export const day25_step_1 = () => {
    const [doorPK, cardPK] = readInputAsNumbers(inputFile);
    
    const door = new Device(doorPK, cardPK);
    const card = new Device(cardPK, doorPK)

    console.log('Step 1');
    console.log('------')
    console.log('Encryption key: ' + door.encryptionKey) // 448851 is correct
}

export const day25_step_2 = () => {
    // Requires all stars. Damn!
}