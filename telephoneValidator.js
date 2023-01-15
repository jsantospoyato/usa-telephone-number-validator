// Number of digits the number without prefix must have
const numDig = 10;

/**
 * Checks if the phone number passed has a valid format
 */
function telephoneCheck(str) {
    // First we check if the string has a invalid non numeric combination
    if (!checkInvalid(str))
        return false;

    // We get the string without NaN and the possible array lens
    const ns = str
        .split(/[^0-9]/)
        .filter(d => d);
    switch (ns.length) {
        case 4:
            // If it has 4 groups of digits it has to have 1 as first
            // If it does, we check the number without that first digit
            return ns[0] != 1
                ? false
                : checkDigits(ns.slice(1));
        case 1:
        case 3:
            // If it has 1 or 3 groups of digits we check if these are valid
            return checkDigits(ns);
        default:
            return false;
    }
}

/**
 * Check if the group of digits is a valid number
 */
function checkDigits(nums) {
    // We join all the digits as a string
    const phone = nums.join("");

    // If it doesnt have 10 digits, is not a valid number
    if (phone.length != numDig) return false;

    return true;
}

/**
 * Initially checks wether the passed string has invalid non numeric combination
 */
function checkInvalid(str) {
    // If the first character is a - is not valid
    if (str[0] == "-") return false;

    // If it doesn't have correct parenthesis pairing, is invalid
    for (let i = 0; i < str.length; i++) {
        // Checks wether open parenthesis is grouped with closed
        if (str[i] == "(")
            return str[i + 4] == ")";

        // Checks if there's a closing parenthesis without opening
        if (str[i] == ")")
            return false;
    }

    return true;
}

// Examples of execution
console.log(telephoneCheck('1 (234) 567 890'));
console.log(telephoneCheck('1 234 567 8901'));
console.log(telephoneCheck('555-555-5555'));
console.log(telephoneCheck('555) 555-5555'));