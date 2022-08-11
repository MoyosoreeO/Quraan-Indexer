/* eslint-disable no-unused-vars */
import { Login } from "./login.js";

export class DomHelper {
  constructor() {
    this.input = document.querySelector(".search-input");
    this.input.addEventListener("click", this.welcome);
    this.loginBtn = document.querySelector(".login-btn");
    if (this.loginBtn) {
      this.loginBtn.addEventListener("click", this.removeloginModal.bind(this));
    }
  }
  static refreshHandler(counter) {
    if (counter > 0) {
      const node = document.querySelectorAll(".text");
      const audio = document.querySelector(".audio");
      const moreInfo = document.querySelector(".extra-info");
      if (audio || moreInfo) {
        audio.remove();
        moreInfo.remove();
      }
      node.forEach((node) => {
        node.remove();
      });
      counter = 0;
    }
  }
  welcome() {
    const welcomeText = document.querySelector(".welcome-text");
    if (welcomeText) {
      welcomeText.remove();
    }
  }

  removeloginModal() {
    if (Login.loginHandler()) {
      Login.loginHandler();
      document.querySelector("nav").classList.toggle("nav-display");
      document
        .querySelector(".container")
        .classList.toggle("container-display");
      document.querySelector(".login-box").remove();
    }
  }
}
