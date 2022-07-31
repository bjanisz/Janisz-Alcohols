import React, { useEffect, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

let items = [];

const CardItem = ({ item, setFlag, flag }) => {
  const [{ cardItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cardDispatch = () => {
    localStorage.setItem("cardItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARD_ITEMS,
      cardItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cardItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cardDispatch();
    } else {
        //initial state value is 1 -> check if it equals to 1 and then remove it
      if (qty === 1) {
        items = cardItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cardDispatch();
      } else {
        setQty(qty - 1);
        cardItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cardDispatch();
      }
    }
  };

  useEffect(() => {
    items = cardItems;
  }, [qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cardOverlay flex items-center gap-2">
      <img
        src={item?.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain "
        alt=""
      />
      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-yellow-500 pl-4"> {item?.title}</p>
        <p className="text-sm block text-white font-semibold pl-4">
          {" "}
          $ {parseFloat(item?.price) * qty}
        </p>
      </div>
      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <AiFillMinusCircle className="text-yellow-800 w-8 h-8" />
        </motion.div>

        <p className="w-5 h-5 rounded-sm text-white flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <AiFillPlusCircle className="text-yellow-800 w-8 h-8" />
        </motion.div>
      </div>
    </div>
  );
};

export default CardItem;
