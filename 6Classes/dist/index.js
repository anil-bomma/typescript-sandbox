"use strict";
class Robot {
    constructor(_name) {
        this._name = _name;
        this._color = '';
    }
    static isColorAvailable(color) {
        return Robot.availableColors.includes(color);
    }
    askName() {
        console.log(`My name is ${this.name}`);
    }
    move(distance) {
        console.log(`${this.name} moved ${distance} meters`);
    }
    set color(color) {
        if (!Robot.isColorAvailable(color)) {
            throw new Error(`Color ${color} is not available`);
        }
        this._color = color;
    }
    set name(value) {
        this._name = 'PREFIX_' + value;
    }
    get name() {
        return this._name + '_SUFFIX';
    }
}
Robot.availableColors = ['green', 'yellow'];
class FlyingRobot extends Robot {
    constructor(name, jetpackSize) {
        super(name);
        this.jetpackSize = jetpackSize;
    }
    move(distance) {
        console.log(`${this.name} is flying`);
        super.move(distance);
    }
}
const robot = new Robot('John');
robot.askName();
const flyingRobot = new FlyingRobot('Jim', 2);
flyingRobot.move(10);
console.log(`Flying robot's jetpack size is`, flyingRobot.name);
flyingRobot.name = 'Kevin';
console.log(`My name is ${flyingRobot.name}`);
