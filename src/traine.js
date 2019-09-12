/*
 Палиндром v2.0
 */
const palindrom = str => {
    for (let i=0; i < str.length; i++ ) {
        if (i === str.length-1-i || i > str.length-1-i) {
            return true;
        }
        if (str.charAt(i).toLowerCase() !== str.charAt(str.length-1-i).toLowerCase()) {
            return false;
        }
    }
};

export {
    palindrom
}