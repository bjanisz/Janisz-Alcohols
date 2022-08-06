import React, { useState } from "react";

import { DashboardShopInfo } from "./DashboardShopInfo";
import { DashboardBestsellers } from "./DashboardBestsellers";


export const Dashboard = () => {
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center 2xl:-mt-32">
          <DashboardShopInfo />
          <DashboardBestsellers />
          
    
          {/* <MenuContainer />
          {cardShow && (
            <CardContainer />
          )} */}
        </div>
      );
}