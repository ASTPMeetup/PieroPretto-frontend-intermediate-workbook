'use strict';

class Pet {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
    this.makeSound = function(volume) {
      return 'My name is ' + this.name + ' and I love to ' + this.sound + ' ' + volume + '!!!';
    }
  }
}

function Me() {
	var privateAge = 26;
	
	return {
		name : "Piero",
		job: "Developer",
		phone: "936-215-2363",
		getAge: function() {
			return privateAge;
		}
	}
}

// var Billy = new Pet('Hemi', 'bark');
// console.log(Billy.makeSound('loudly'));

var test = Me();

console.log('test object: ' + test.getAge());
console.log('test name: ' + test.name);
console.log('test phone: ' + test.phone);