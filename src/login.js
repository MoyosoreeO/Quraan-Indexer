export class Login {
  constructor() {}
  static cookieCheck(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return undefined;
  }
  static render() {
    const loginTemplate = document.querySelector(".login");
    const loginElements = document.importNode(loginTemplate.content, true);
    const loginEl = loginElements.querySelector(".login-box");
    return loginEl;
  }
  static customGreeting(name) {
    const customGreeting = document.querySelector("span");
    if (this.cookieCheck(name)) {
      customGreeting.textContent = this.cookieCheck(name);
    }
  }
  static loginHandler() {
    const loginInput = document.querySelector(".login-input");
    if (loginInput.value !== "") {
      const value = loginInput.value;
      value.trim();
      console.log(value);
      document.cookie = `NameQuraanApp=${value}`;
      this.customGreeting("NameQuraanApp");
      return true;
    }
  }
}
