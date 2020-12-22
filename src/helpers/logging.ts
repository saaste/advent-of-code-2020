export const log = (loggingEnabled: boolean, msg: string = ""): void => {
    if (loggingEnabled) {
        console.log(msg);
    }
}