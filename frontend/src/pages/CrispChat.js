import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("8b569926-9304-4c16-8038-72fa17524254");
  }, []);

  return null;
};
