import Ics from './ics';
import Vevents from './Vevents';

let ev1 = new Vevents('Test1', 'Private', 'To test');
let ev2 = new Vevents('Test1', 'Private', 'To test');
let ev3 = new Vevents('Test1', 'Private', 'To test');
let ev4 = new Vevents('Test1', 'Private', 'To test');

const evArray = [ev1, ev2, ev3, ev4];

const IcsCal = new Ics(evArray);

console.log(IcsCal.build())