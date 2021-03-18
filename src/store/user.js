import { writable } from 'svelte/store';

 const CARS = { name: "Ford", email: "Taurus", year: "2015" };

 const { subscribe, set, update } = writable(CARS);

 const addCar = car => update(() => {
     return car;
 });

 const reset = () => {
     set(CARS);
 };

 export default {
     subscribe,
     addCar,
     reset
 }