/* eslint-disable no-unused-vars */
import { HttpRequest } from "./httpRequest.js";
import { DomHelper } from "./DomHelper.js";
import { Menu } from "./menu.js";
let value;
let counter = 0;
let name = "ayah";
const menu = new Menu();
const input = document.querySelector(".search-input");
export class Search {
  constructor() {
    this.suraahBtn = document.querySelector("li button");
    this.ayahBtn = document.querySelector(".by-ayah");
    this.ayahBtn.addEventListener("click", () => {
      name = "ayah";
      input.value = "";
      menu.backDropHandler();
      input.placeholder = "Ayah format: 262 or 2:255";
    });
    this.suraahBtn.addEventListener("click", () => {
      name = "surah";
      input.value = "";
      menu.backDropHandler();
      input.placeholder = "enter surah number";
    });
    this.searchBtn = document.querySelector(".search-btn");
    this.searchBtn.addEventListener("click", this.render);
  }
  async render() {
    if (value === input.value) {
      return;
    } else {
      value = input.value;
    }
    const spiner = document.querySelector(".loader");
    const searchTem = document.querySelector(".search-template");
    const container = document.querySelector(".container");
    spiner.classList.add("show-loader");
    container.append(spiner);

    DomHelper.refreshHandler(counter);
    if (value !== "" && parseInt(value) <= 6236) {
      value = encodeURI(value);
      name = encodeURI(name);

      let data = await HttpRequest.sendHttpRequest(value, name);
      data = data.data;

      for (let type of data) {
        const search = document.importNode(searchTem.content, true);
        const searchElements = search.querySelector(".text");
        if (name === "ayah") {
          if (type.audio) {
            const searchElAudio = search.querySelector(".audio");
            searchElAudio.id = "audio";
            const extraInfo = search.querySelector(".extra-info");
            extraInfo.id = "extra-info";
            search.querySelector(".audio audio").src = type.audio;
            search.querySelector(".extra-info .revelation ").textContent =
              type.surah.revelationType;
            search.querySelector(".extra-info .juzh ").textContent = type.juz;
            search.querySelector(".extra-info .sajadah ").textContent =
              type.sajda;
            search.querySelector(".extra-info .en-name ").textContent =
              type.surah.englishName + "-" + type.surah.englishNameTranslation;
            container.append(searchElAudio);
            container.append(extraInfo);
            return;
          }
          let text = search.querySelector(".text p");
          text.textContent = ` ${type.text}\n \n \n.......Click here to copy Text`;
          text.addEventListener("click", (event) => {
            if (navigator.clipboard) {
              // const textToCopy = event.target.textContent;
              navigator.clipboard.writeText(type.text);
              alert("Text Copied");
            } else {
              alert("Your browser does not support auto-copy, copy manually");
            }
          });
          container.append(searchElements);

          counter++;
        } else if (name === "surah") {
          console.log(data);
          search.querySelector(
            ".text p"
          ).textContent = `${type.name}:${type.englishName}\n revelation: ${type.revelationType} \n No of ayat: ${type.numberOfAyahs}`;

          container.append(searchElements);
          spiner.classList.remove("show-loader");

          return;
        }
        spiner.classList.remove("show-loader");
      }
    }
  }
}
