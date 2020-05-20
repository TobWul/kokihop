// Joins multiple classnames with space
export const cn = (...classes) => classes.join(" ");

// export const textAreaAutoHeight = () => {
//   var textareas = document.getElementsByTagName("textarea");

//   function OnInput() {
//     this.style.height = "auto";
//     this.style.height = this.scrollHeight + "px";
//   }

//   function setAllEventListeners(textareas, add) {
//     for (var i = 0; i < textareas.length; i++) {
//       textareas[i].setAttribute(
//         "style",
//         "height:" + textareas[i].scrollHeight + "px;overflow-y:hidden;"
//       );
//       if (add) {
//         textareas[i].addEventListener("input", OnInput, false);
//       } else {
//         textareas[i].removeEventListener("input", OnInput, false);
//       }
//     }
//   }

//   setAllEventListeners(textareas, true);

//   return () => setAllEventListeners(textareas, false);
// };

export function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export const getUrlElementAtIndex = (url, index) => url.split("/")[index];

export const changeurlElementAtIndex = (url, index, newValue) =>
  url.split("/").slice(0, index).join("/") + "/" + newValue;
