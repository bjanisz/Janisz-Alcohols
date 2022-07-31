import React, { useState } from "react";
import { GiCigar, GiWineBottle, GiLighter } from "react-icons/gi";
import { FaGlassWhiskey } from "react-icons/fa";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
  const [filter, setfilter] = useState("whisky");

  const [{ whiskyItems }, dispatch] = useStateValue();

  return (
    <section className="w-full p-4" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content-[''] before-w-32 before:h-1 before:-bottom-2 before:left-4 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Assortment
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => {
              if (category.name === "Cigars") {
                return (
                  <motion.div
                    whileTap={{ scale: 1.2 }}
                    key={category.id}
                    className={`group ${
                      filter === category.urlParamName
                        ? "bg-yellow-800"
                        : "bg-cardOverlay"
                    } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-yellow-800 border-solid border-2 border-yellow-800`}
                    onClick={() => setfilter(category.urlParamName)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${
                        filter === category.urlParamName
                          ? "bg-white"
                          : "bg-yellow-800"
                      } group-hover:bg-cardOverlay flex items-center justify-center`}
                    >
                      <GiCigar
                        className={`${
                          filter === category.urlParamName
                            ? "text-black"
                            : "text-white"
                        } group:hover-text-card w-6 h-6`}
                      />
                    </div>
                    <p className="text-sm text-black group-hover:text-white">
                      {category.name}
                    </p>
                  </motion.div>
                );
              } else if (category.name === "Whisky") {
                return (
                  <motion.div
                    whileTap={{ scale: 1.2 }}
                    key={category.id}
                    className={`group ${
                      filter === category.urlParamName
                        ? "bg-yellow-800"
                        : "bg-cardOverlay"
                    } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-yellow-800 border-solid border-2 border-yellow-800`}
                    onClick={() => setfilter(category.urlParamName)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${
                        filter === category.urlParamName
                          ? "bg-white"
                          : "bg-yellow-800"
                      } group-hover:bg-cardOverlay flex items-center justify-center`}
                    >
                      <FaGlassWhiskey
                        className={`${
                          filter === category.urlParamName
                            ? "text-black"
                            : "text-white"
                        } group:hover-text-card w-6 h-6`}
                      />
                    </div>
                    <p className="text-sm text-black group-hover:text-white">
                      {category.name}
                    </p>
                  </motion.div>
                );
              } else if (category.name === "Others") {
                return (
                  <motion.div
                    whileTap={{ scale: 1.2 }}
                    key={category.id}
                    className={`group ${
                      filter === category.urlParamName
                        ? "bg-yellow-800"
                        : "bg-cardOverlay"
                    } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-yellow-800 border-solid border-2 border-yellow-800`}
                    onClick={() => setfilter(category.urlParamName)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${
                        filter === category.urlParamName
                          ? "bg-white"
                          : "bg-yellow-800"
                      } group-hover:bg-cardOverlay flex items-center justify-center`}
                    >
                      <GiWineBottle
                        className={`${
                          filter === category.urlParamName
                            ? "text-black"
                            : "text-white"
                        } group:hover-text-card w-6 h-6`}
                      />
                    </div>
                    <p className="text-sm text-black group-hover:text-white">
                      {category.name}
                    </p>
                  </motion.div>
                );
              } else if (category.name === "Accessories") {
                return (
                  <motion.div
                    whileTap={{ scale: 1.2 }}
                    key={category.id}
                    className={`group ${
                      filter === category.urlParamName
                        ? "bg-yellow-800"
                        : "bg-cardOverlay"
                    } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-yellow-800 border-solid border-2 border-yellow-800`}
                    onClick={() => setfilter(category.urlParamName)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${
                        filter === category.urlParamName
                          ? "bg-white"
                          : "bg-yellow-800"
                      } group-hover:bg-cardOverlay flex items-center justify-center`}
                    >
                      <GiLighter
                        className={`${
                          filter === category.urlParamName
                            ? "text-black"
                            : "text-white"
                        } group:hover-text-card w-6 h-6`}
                      />
                    </div>
                    <p className="text-sm text-black group-hover:text-white">
                      {category.name}
                    </p>
                  </motion.div>
                );
              }
            })}
        </div>

        <div className="w-full ">
          <RowContainer
            flag={false}
            data={whiskyItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
