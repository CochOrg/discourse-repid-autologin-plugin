import {withPluginApi} from "discourse/lib/plugin-api";
export default {
  name: 'init-repid-autologin',

  initialize(container) {
    const userControllerService = container.lookup("controller:user");
    const hasUser = !!userControllerService?.currentUser

    if (!hasUser){
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = 'https://repid.org/silent-check';

      iframe.onload = function() {
        window.addEventListener("message", authCheck, false);
        function authCheck(event){
          if (event.origin !== "https://repid.org") return;
          if (event.data.status === "authorized") {
            document.querySelector('.login-button')?.click()
            // window.location.href = '/social/repid/redirect'
          }
        }
      };

      document.body.appendChild(iframe);
    }
  }
};
