export interface Food {
    incredients: string[];
    allergenics: string[];
}

export type AllergenicMap = { [allergenic: string]: string[] };

// Find all possible incredients for each allergenic
export const findPossibleIncredients = (allAllergenics: Set<string>, foods: Food[]): AllergenicMap => {
    const allergenicMap: AllergenicMap = {}

    allAllergenics.forEach((allergenic) => {
        let possibleIncredients: string[] = [];
        foods.forEach((food) => {
            if (food.allergenics.includes(allergenic)) {
                if (possibleIncredients.length === 0) {
                    possibleIncredients.push(...food.incredients);
                } else {
                    possibleIncredients = possibleIncredients.filter((incredient) => {
                        return food.incredients.includes(incredient)
                    });
                }
            }
        })
        allergenicMap[allergenic] = possibleIncredients;
    })

    return allergenicMap
}

// Find next allergenic that has only one possible incredient
export const findSingleIncredient = (possibleIncredients: AllergenicMap): [string, string] | null => {
    const length = Object.keys(possibleIncredients).length

    for (let i = 0; i < length; i++) {
        const allergenic = Object.keys(possibleIncredients)[i];
        if (possibleIncredients[allergenic].length === 1) {
            return [allergenic, possibleIncredients[allergenic][0]]
        }
    }

    return null;
}

// Remove incredient from the possible incredient list (because it is used)
export const removeUsedIncredient = (incToRemove: string, possibleIncredients: AllergenicMap) => {
    const length = Object.keys(possibleIncredients).length

    for (let i = 0; i < length; i++) {
        const allergenic = Object.keys(possibleIncredients)[i];
        possibleIncredients[allergenic] = possibleIncredients[allergenic].filter((incredient) => incredient !== incToRemove)
    }
}
