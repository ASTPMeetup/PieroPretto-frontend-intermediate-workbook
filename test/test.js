'use strict';

var arr = [2, 6, 4, 8];
var i = 3;
// console.log(testArr);

function nearestLarger(arr, i){
    var distanceFromI = [];
    var allLargeNums = [];

    for (var n=0; n < arr.length; n++){
      if(arr[n] > arr[i]) {
        var distance = Math.abs(arr.indexOf(arr[n]) - arr.indexOf(arr[i]));
        var indexOfLargerNum = arr.indexOf(arr[n]);

        distanceFromI.push(distance);
        allLargeNums.push(indexOfLargerNum);
      }
    }

    if (allLargeNums.length === 0) {
    	return null;
    }
    else {
    	var valueOfNearest = Math.min.apply(Math, distanceFromI);
    	var nearestValueIndex = distanceFromI.indexOf(valueOfNearest);
    	var j = allLargeNums[nearestValueIndex];
    }
  console.log(j);
}

nearestLarger(arr, i);
