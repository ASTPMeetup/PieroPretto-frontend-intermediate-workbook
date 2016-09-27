function test(start, end) {
	var killPosition = ((Number(start) + Number(end)) / 2).toString().split('');
	console.log(killPosition);
}

test(30, 42);