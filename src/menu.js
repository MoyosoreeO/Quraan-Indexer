/* eslint-disable no-unused-vars */
import { DomHelper } from "./DomHelper";
export class Menu {
  constructor() {
    this.menuBtn = document.querySelector(".menu-label");
    this.backdrop = document.querySelector(".backdrop");
    this.backdrop.addEventListener("click", this.backDropHandler.bind(this));
    this.menuBtn.addEventListener("click", this.toggleMenu.bind(this));
  }
  backDropHandler() {
    if (!this.backdrop.classList.contains("visible")) {
      this.backdrop.classList.remove("visible");
    } else {
      this.backdrop.classList.remove("visible");
      const list = document.querySelector("ul");
      if (list.id === "menu") {
        list.classList.remove("open");
        list.id = "";
      }
    }
  }
  toggleMenu() {
    const welcome = document.querySelector(".welcome-text");
    const text = document.querySelector(".text");
    if (text) {
      const counter = 1;
      DomHelper.refreshHandler(counter);
    }
    if (welcome) {
      welcome.remove();
    }

    const menuList = document.querySelector("ul");
    menuList.classList.add("open");
    this.backdrop.classList.add("visible");
    menuList.id = "menu";
  }
}
