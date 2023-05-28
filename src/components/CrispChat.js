import React from "react";

import { Crisp } from "crisp-sdk-web";


export default function CrispChat(){
  React.useEffect(() => {
    Crisp.configure("MY_CRISP_WEBSITE_ID");
  }, [])
  
  return null;
  
}