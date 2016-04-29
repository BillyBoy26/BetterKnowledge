/**
 * Created by Ben on 29/04/2016.
 */
var replaceAll = function replaceAll(originalString,toFind,toReplace) {
    return originalString.replace(new RegExp(escapeRegExp(toFind), 'g'), toReplace);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

module.exports = {
    replaceAll:replaceAll
}