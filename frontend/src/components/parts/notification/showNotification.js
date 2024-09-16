import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function showNotification(message, theme) {
  Toastify({
    text: message,
    duration: 4000,
    gravity: "top",
    close: true,
    position: "right",
    style: {
      background: theme == "normal" ? "black" : "red",
      color: theme == "normal" ? "white" : "black",
    },
  }).showToast();
}
