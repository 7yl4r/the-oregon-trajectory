module.exports = function formatN (n) {
    // formats number using SI prefixes
    // based off of https://gist.github.com/cho45/9968462
	var nn = n.toExponential(2).split(/e/);
	var u = Math.floor((+nn[1]) / 3);
	return Math.round(nn[0] * Math.pow(10, +nn[1] - u * 3))
            + ['p', 'n', 'u', 'm', '', 'k', 'M', 'G', 'T'][u+4];
}
