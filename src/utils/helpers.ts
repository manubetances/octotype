
//
export const formatPercentage = (percentage: number) => {
    return percentage.toFixed(0) + "%";
}

//
export const countErrors = ( actual: string, expected: string ) => {
    const expectedCharacters = expected.split('');

    //
    return expectedCharacters.reduce((errors, expectedChar, i) => {
        const actualChar = actual[i];

        if (actualChar !== expectedChar) {
            errors++;
        }
        return errors;
    }, 0);
}

//
export const calculateAccuracy = ( errors: number, total: number ) => {
    if (total > 0) {
        const corrects = total - errors;
        return (corrects / total) * 100;
    }

    return 0;
};

//
export const calculateWPM = ( total: number, errors: number ) => {
    const netCharacters = total - errors;
    // Average word length of 5 characters, a standard metric in typing tests.
    const words = netCharacters / 5;
    const timeInMinutes = 30 / 60;
    // Return Words per Minute
    return words / timeInMinutes;
}