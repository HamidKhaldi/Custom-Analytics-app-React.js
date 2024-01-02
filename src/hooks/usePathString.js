import { useState, useEffect, useLocation } from "react";

const devPath = "sites/Creative-UK/Analytics/SiteAssets/Pages/analytics.aspx";
const livePath = "sites/Creative-UK/Analytics/SiteAssets/Pages/analytics.aspx";

export default function usePathString() {
  useEffect(() => {
    //console.log(livePath);
  }, []); // Empty array ensures that effect is only run on mount
  
  return livePath;
}
