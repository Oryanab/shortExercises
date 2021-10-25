"use strict";

class Cat {
  constructor(tiredness, hunger, lonliness, happiness) {
    this.tiredness = tiredness;
    this.hunger = hunger;
    this.lonliness = lonliness;
    this.happiness = happiness;
  }
  feed() {
    this.tiredness++;
    this.hunger--;
    this.lonliness--;
    this.happiness++;
    return new Cat(this.tiredness, this.hunger, this.lonliness, this.happiness);
  }

  sleep() {
    this.tiredness--;
    this.hunger++;
    this.lonliness++;
    this.happiness--;
    return new Cat(this.tiredness, this.hunger, this.lonliness, this.happiness);
  }

  status() {
    if (this.tiredness >= 5) {
      console.log("cat very tired");
    } else {
      console.log("cat not tired");
    }
    if (this.hunger >= 5) {
      console.log("cat not hungey");
    } else {
      console.log("cat very hungry");
    }
    if (this.lonliness >= 5) {
      console.log("cat very lonely");
    } else {
      console.log("cat not lonley");
    }
    if (this.happiness >= 5) {
      console.log("cat very happy");
    } else {
      console.log("cat not happy");
    }
  }
}

let body = new Cat(4, 4, 4, 4);
console.log(body.status());
console.log(body.feed());
