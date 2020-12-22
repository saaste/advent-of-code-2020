import { readInput } from '../helpers/input';
import { log } from '../helpers/logging';

const inputFile = `${__dirname}/input.txt`;

const createDecks = (): number[][] => {
    const input = readInput(inputFile);
    const decks: number[][] = [];
    
    let currentPlayer = -1;
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        if (line.startsWith("Player")) {
            currentPlayer++;
            decks[currentPlayer] = [];
        } else if (line.length > 0) {
            decks[currentPlayer].push(parseInt(line, 10));
        }
    }
    return decks;
}

const hasEnoughCards = (p1Deck: number[], p1Card: number, p2Deck: number[], p2card: number): boolean => {
    return p1Deck.length >= p1Card && p2Deck.length >= p2card;
}

const decksToString = (p1Deck: number[], p2Deck: number[]): string => {
    return "p1-" + p1Deck.join("-") + "-p2-" + p2Deck.join("-")
}

const playGame = (decks: number[][], gameNumber: number = 1, loggingEnabled = false): [number, number[]] => {
    let round = 1;
    const p1Deck = decks[0];
    const p2Deck = decks[1];
    const previousDecks = new Set<string>();

    log(loggingEnabled);
    log(loggingEnabled, `=== Game ${gameNumber} ===`)

    while (p1Deck.length > 0 && p2Deck.length > 0) {
        log(loggingEnabled);
        log(loggingEnabled, `-- Round ${round} (Game ${gameNumber}) --`)

        if (previousDecks.has(decksToString(p1Deck, p2Deck))) {
            return [0, p1Deck];
        }

        previousDecks.add(decksToString(p1Deck, p2Deck))

        log(loggingEnabled, `Player 1's deck: ${decks[0].join(', ')}`)
        log(loggingEnabled, `Player 2's deck: ${decks[1].join(', ')}`)

        const p1Card = p1Deck.splice(0, 1)[0];
        const p2Card = p2Deck.splice(0, 1)[0];
        
        log(loggingEnabled, `Player 1 plays: ${p1Card}`);
        log(loggingEnabled, `Player 2 plays: ${p2Card}`);

        let roundWinner: number = -1;
        if (hasEnoughCards(p1Deck, p1Card, p2Deck, p2Card)) {
            const newP1Deck = [...p1Deck.slice(0, p1Card)]
            const newP2Deck = [...p2Deck.slice(0, p2Card)]
            
            log(loggingEnabled, `Playing a sub-game to determine the winner...`)
            const [subGameWinner, _] = playGame([newP1Deck, newP2Deck], gameNumber + 1, loggingEnabled)
            
            log(loggingEnabled);
            log(loggingEnabled, `...anyway, back to game ${gameNumber}`)        
            roundWinner = subGameWinner
        } else {
            roundWinner = p1Card > p2Card ? 0 : 1
        }

        log(loggingEnabled, `Player ${roundWinner+1} wins round ${round} of game ${gameNumber}!`)

        if (roundWinner === 0) {
            p1Deck.push(p1Card, p2Card)
        } else {
            p2Deck.push(p2Card, p1Card)
        }
        round++;
    }

    const gameWinner = p1Deck.length > 0 ? 0 : 1;
    const winningDeck = p1Deck.length > 0 ? p1Deck : p2Deck;

    log(loggingEnabled, `The winner of game ${gameNumber} is player ${gameWinner + 1}`)

    return [gameWinner, winningDeck]
}

export const day22_step_1 = () => {
    const decks = createDecks();

    // Play the game
    while (decks[0].length > 0 && decks[1].length > 0) {
        const p1Card = decks[0].splice(0, 1)[0];
        const p2Card = decks[1].splice(0, 1)[0];
        
        if (p1Card > p2Card) {
            decks[0].push(p1Card, p2Card)
        } else {
            decks[1].push(p2Card, p1Card)
        }
    }

    // Calculate score
    const winningDeck = decks[0].length > 0 ? decks[0] : decks[1];
    let winningScore = 0;
    for (let i = 0; i < winningDeck.length; i++) {
        winningScore += winningDeck[i] * (winningDeck.length - i);
    }

    console.log('Step 1');
    console.log('------')
    console.log(`Winning score: ${winningScore}`) // 32102 is correct
}

export const day22_step_2 = () => {
    const decks = createDecks();
    const [_, winningDeck] = playGame(decks, 1, false);
    
    let winningScore = 0;
    for (let i = 0; i < winningDeck.length; i++) {
        winningScore += winningDeck[i] * (winningDeck.length - i);
    }

    console.log('Step 2');
    console.log('------')
    console.log(`Winning score: ${winningScore}`) // 34173 is correct
}