const checkForOccurrences = (listOfItems, itemName) => {
	if (!listOfItems instanceof Array) {
		throw new Error('ListOfItems is not array, please provide array');
	}
	if (!typeof(itemName) === 'string') {
		throw new Error('itemName is not string, please provide string');
	}
	const arrayLength = listOfItems.length();
	const hasOccurred = false;

	for (let i = 0; i < arrayLength; i++) {
		if (listOfItems[i] === itemName) {
			hasOccurred = true;
		}
 }
 return hasOccurred;
}

export default checkForOccurrences;