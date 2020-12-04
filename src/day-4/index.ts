import { readInputAsString } from '../helpers';

const inputFile = `${__dirname}/input.txt`;

const hasRequiredFields = (passport: any): boolean => {
    return Object.keys(passport).length === 7
}

const parsePassportData = (rawData: string): string[] => {
    const passports = []
    let currentPassport:any = {}
    
    const passportParts = rawData.replace(/\n\r/g, "\n").replace(/\r/g, "\n").split("\n")
    for (let i = 0; i < passportParts.length; i++) {
        if (passportParts[i] === "") {
            passports.push(Object.assign({}, currentPassport))
            currentPassport = {};
            continue;
        }
        const keyValues = passportParts[i].split(" ")
        keyValues.forEach((kv) => {
            const [key, value] = kv.split(":")
            switch (key) {
                case "byr":
                case "iyr":
                case "eyr":
                    currentPassport[key] = parseInt(value, 10);
                    break;
                case "cid":
                    break;
                default:
                    currentPassport[key] = value;
            }
            
        })
    }
    passports.push(Object.assign({}, currentPassport))
    return passports
}

export const day4_step_1 = () => {
    const passports = parsePassportData(readInputAsString(inputFile))
    const validPassports = passports.filter(hasRequiredFields);
    
    console.log('Step 1');
    console.log('------');
    console.log(`Valid passports: ${validPassports.length}`); // 196 is correct
}

export const day4_step_2 = () => {
    const passports = parsePassportData(readInputAsString(inputFile))
    const passportsWithValidFields = passports.filter(hasRequiredFields);

    const isValidBirthYear = (year: number): boolean => {
        return year >= 1920 && year <= 2002
    }

    const isValidIssueYear = (year: number): boolean => {
        return year >= 2010 && year <= 2020
    }

    const isValidExpirationYear = (year: number): boolean => {
        return year >= 2020 && year <= 2030
    }

    const isValidHeight = (height: string): boolean => {
        const unit = height.slice(-2);
        const value = parseInt(height.replace(unit, "").trim(), 10);

        if (unit !== "cm" && unit !== "in") {
            return false;
        }

        switch (unit) {
            case "cm":
                return value >= 150 && value <= 193;
                break;
            case "in":
                return value >= 59 && value <= 76
        }
    }

    const isValidPID = (pid: string): boolean => {
        return /^[0-9]{9}$/i.test(pid)
    }

    const isValidHairColor = (hairColor: string): boolean => {
        return /^#[0-9a-z]{6}$/i.test(hairColor);
    }

    const isValidEyeColor = (eyeColor: string): boolean => {
        const validColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        return validColors.includes(eyeColor);
    }

    const isValid = (passport: any): boolean => {
        return isValidBirthYear(passport["byr"])
        && isValidIssueYear(passport["iyr"])
        && isValidExpirationYear(passport["eyr"])
        && isValidHeight(passport["hgt"])
        && isValidHairColor(passport["hcl"])
        && isValidEyeColor(passport["ecl"])
        && isValidPID(passport["pid"])
    }

    const validPassports = passportsWithValidFields.filter(isValid);
    console.log('Step 2');
    console.log('------');
    console.log(`Valid passports: ${validPassports.length}`); // 114 is correct
}