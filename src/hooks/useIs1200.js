import { useState, useEffect } from "react";

const useIs1200 = () => {
  const [is1200, setIs1200] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    const handleResize = () => setIs1200(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return is1200;
};

export default useIs1200;