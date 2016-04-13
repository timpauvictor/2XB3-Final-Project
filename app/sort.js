function swap(data, indexOne, indexTwo) {
	var temp = data[indexOne]
	data[indexOne] = data[indexTwo];
	data[indexTwo] = temp;
}

function partition(data, leftMost, rightMost) {
	var pivotLocation = data[Math.floor((rightMost+leftMost) /2)].code;
	var i = leftMost;
	var j = rightMost;

	while (i <= j) {
		while (data[i].code < pivotLocation) {
			i++;
		}

		while (data[j].code > pivotLocation) {
			j--;
		}

		if (i <= j) {
			swap(data, i, j);
			i++;
			j--;
		}
	}

	return i;
}

module.exports = {
	quickSortNumber: function(data, leftMost, rightMost) {
		var index;

		if ((data.length) > 1) {
			leftMost = typeof leftMost != "number" ? 0 : leftMost; //if we're not given the leftMost and rightMost, we can just make them here
			rightMost = typeof rightMost != "number" ? data.length - 1 : rightMost

			index = partition(data, leftMost, rightMost);

			if (leftMost < index - 1) {
				module.exports.quickSortNumber(data, leftMost, index - 1);
			}

			if (index < rightMost) {
				module.exports.quickSortNumber(data, index, rightMost);
			}
		}

		return data;
	},
	quickSortString: function() {

	}
}
