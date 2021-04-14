import { writable } from "svelte/store"

const USER = writable({
  fname: "Didier",
  lname: "Munezero",
  year: "2021",
  type: "ADMIN",
  photo:
    "https://avatars.githubusercontent.com/u/52195?s=460&u=08bcafa24337a298e1b874279fde515e2fb8f81d&v=4",
})

const updateUser = (user) => {
  USER.set(user)
}

export default {
  USER,
  updateUser,
}
