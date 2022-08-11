/* eslint-disable no-unused-vars */
import { Menu } from "./menu.js";
import { Search } from "./search.js";
import { DomHelper } from "./DomHelper";
import { Login } from "./login.js";

class App {
  static init() {
    document.addEventListener("touchmove", (event) => {
      event.scale !== 1 && event.preventDefault(), { passive: false };
    });
    if (Login.cookieCheck("NameQuraanApp") === undefined) {
      const loginEl = Login.render();
      const body = document.querySelector("body");
      body.prepend(loginEl);
    } else if (Login.cookieCheck("NameQuraanApp")) {
      const loginModal = document.querySelector(".login-box");
      if (loginModal) {
        loginModal.remove();
      }
      document.querySelector("nav").classList.toggle("nav-display");
      document
        .querySelector(".container")
        .classList.toggle("container-display");
      Login.customGreeting("NameQuraanApp");
    }
    const menu = new Menu();
    const search = new Search();
    const domHelper = new DomHelper();
  }
}
App.init();
