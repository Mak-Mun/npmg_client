import { writable } from 'svelte/store';

 const USER = {fname: "Didier", lname: "Munezero", year: "2015", type:"RANGER", photo:"https://avatars.githubusercontent.com/u/52195?s=460&u=08bcafa24337a298e1b874279fde515e2fb8f81d&v=4" };

 const { subscribe, set, update } = writable(USER);

 const addUser = user => update(() => {
     return user;
 });

 const reset = () => {
     set(USER);
 };

 export default {
     subscribe,
     addUser,
     reset
 }