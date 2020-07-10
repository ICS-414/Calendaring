const Ics = require('./ics');
const Vevents = require('./vevents');

let ev1 = new Vevents('Public' , '21.2969', '157.8171', 'UH Manoa', '1', 'Test 1', '20200703', '20200704');
let ev2 = new Vevents('Public' , '19.7241', '155.0868', 'UH Hilo' ,'1' ,'Test 2', '20200705', '20200706');
let ev3 = new Vevents('Public' , '20.7984', '156.3319', 'UH Maui' ,'1', 'Test 3', '20200706', '20200707');
let ev4 = new Vevents('Public' , '21.3552', '158.0561', 'UH West Oahu', '1', 'Test 4', '20200708', '20200709');

const evArray = [ev1, ev2, ev3, ev4];

const IcsCal = new Ics(evArray);

console.log(IcsCal.build());