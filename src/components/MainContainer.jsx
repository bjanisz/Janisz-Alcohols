import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { CgPushLeft } from "react-icons/cg";
import { CgPushRight } from "react-icons/cg";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CardContainer from "./CardContainer";

const MainContainer = () => {
  const [{ whiskyItems, cardShow }, dispatch] = useStateValue();
  const [scrollValue, setscrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cardShow]);

  const handleOnClick = () => {
    console.log('click')
  }

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center 2xl:-mt-32">
      <HomeContainer />
      <section className="w-full p-4">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before-w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our Whisky
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg cursor-pointer bg-yellow-700 hover:bg-yellow-900 transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setscrollValue(-1850)}
            >
              <CgPushLeft className="text-lg text-white " />
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg cursor-pointer bg-yellow-700 hover:bg-yellow-900 transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setscrollValue(1850)}
            >
              <CgPushRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={whiskyItems}
        />
      </section>

      <MenuContainer />
      {cardShow && (
        <CardContainer />
      )}
    </div>
  );
};

export default MainContainer;
