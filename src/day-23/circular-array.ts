class LinkedItem {
    label: number;
    next: number;

    constructor(item: number, next: number) {
        this.label = item;
        this.next = next;
    }

    setNext(next: number) {
        this.next = next;
    }
}

export class CircularArray {
    data: LinkedItem[];
    removedItems: LinkedItem[];
    
    constructor(numbers: number[]) {
        this.data = [];
        this.removedItems = [];

        for (let i = 0; i < numbers.length; i++) {
            if (i < numbers.length - 1) {
                this.data[numbers[i]] = new LinkedItem(numbers[i], numbers[i+1])
            } else {
                this.data[numbers[i]] = new LinkedItem(numbers[i], numbers[0])
            }
        }
    }

    public move = (value: number): number => {
        const destinationCup = this.removeThreeAfterValue(value);
        this.insertRemovedItemsAfter(destinationCup);
        return this.selectNext(value);
    }

    private removeThreeAfterValue = (value: number): number => {
        const origin: LinkedItem = this.data[value];
        const next1 = this.data[origin.next];
        const next2 = this.data[next1.next];
        const next3 = this.data[next2.next];

        // Set origin to be next to item that was next to 3rd removable object
        origin.setNext(next3.next);

        // Store removed items
        this.removedItems = [next1, next2, next3]
        const removedValues = this.removedItems.map((o) => o.label);

        // Figure out the next destination
        let nextDestination = value - 1 || this.data.length - 1;
        while (removedValues.includes(nextDestination)) {
            nextDestination--
            if (nextDestination < 1) {
                nextDestination = this.data.length - 1;
            }
        }
        return nextDestination
    }

    private insertRemovedItemsAfter = (value: number) => {
        let currentItem = this.data[value];
        const originalNext = this.data[value].next;
        

        while(this.removedItems.length > 0) {
            const nextItem = this.removedItems.shift();
            if (nextItem) {
                currentItem.setNext(nextItem.label)
                currentItem = nextItem;
            }
        }
        
        currentItem.setNext(originalNext);
    }

    private selectNext = (value: number): number => {
        return this.data[value].next;
    }

    public getNextTwo = (value: number): [number, number] => {
        const number1 = this.data[value].next;
        const number2 = this.data[number1].next;
        return [number1, number2];
    }

    public itemsToString = (): string => {
        const startingItem = this.data[1];
        let result: string = startingItem.label.toString();

        let currentItem = this.data[startingItem.next];
        while(currentItem.label !== startingItem.label) {
            result += " " + currentItem.label;
            currentItem = this.data[currentItem.next];
        }

        return result;
    }

}