import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setitems] = useState([])

  const [{ cardItems }, dispatch] = useStateValue();

  const addToCard = () => {
      dispatch({
      type: actionType.SET_CARD_ITEMS,
      cardItems: items
    });
    //save information to local storage
    localStorage.setItem("cardItems", JSON.stringify(items))
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(()=> {
    addToCard()
  }, [items])

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3 my-12 bg-yellow-800 bg-opacity-30 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className="w-275 h-[225px] min-w-[275px] md:w-300 md:min-w-[300px] bg-yellow-800 bg-opacity-70 rounded-lg py-2 px-4 backdrop-blur-lg hover:drop-shadow-xl flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item?.imageURL}
                alt=""
                className="w-16  drop-shadow-2xl border-solid border-yellow-800 border-2"
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => setitems([...cardItems, item])}
              >
                <MdShoppingBag className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-black font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              {/* <p className="mt-1 text-sm text-white">1 liter</p> */}
              <div className="flex items-center gap-8">
                <p className="text-lg text-black font-semibold">
                  <span className="text-sm text-red-700">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
