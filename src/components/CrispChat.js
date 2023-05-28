import React from "react";

import { Crisp } from "crisp-sdk-web";


export default function CrispChat(){
  React.useEffect(() => {
    Crisp.configure("8e924de9-b949-4719-9c01-7cbec1bf4602");
  }, [])
  
  return null;
  
}