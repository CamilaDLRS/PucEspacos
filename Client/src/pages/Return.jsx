import { useEffect } from "react";

function Return() {
  useEffect(() => {
    localStorage.getItem("userType") ? (window.location = "/reservations") : (window.location = "/");
  }, []);
}

export default Return;
