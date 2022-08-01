import React, { useEffect, useState } from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyBasket from "../img/emptyBasket.png";
import CardItem from "./CardItem";

const CardContainer = () => {
  const [{ cardShow, cardItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const showCard = () => {
    dispatch({
      type: actionType.SET_CARD_SHOW,
      cardShow: !cardShow,
    });
  };

  useEffect(()=> {
    let totalPrice = cardItems.reduce(function (accumulator, item){
      return accumulator + item.quantity * item.price;
   }, 0);
   setTot(totalPrice);
  }, [tot, flag]);

  const clearCard = () => {
    dispatch({
      type: actionType.SET_CARD_ITEMS,
      cardItems: []
    });

    localStorage.setItem("cardItems", JSON.stringify([]));
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-slate-200 drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCard}>
          <BsArrowBarLeft className="text-black text-3xl" />
        </motion.div>
        <p className="text-black text-lg font-semibold">Card</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-slate-200 rounded-md hover:shadow-md cursor-pointer text-black text-base"
          onClick={clearCard}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cardItems && cardItems.length > 0 ? (
        <div className="w-full h-full bg-slate-700 rounded-t-[2rem] flex flex-col border-solid border-2 border-yellow-800">
          {/* card items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* card item */}
            {cardItems && cardItems.length > 0 &&
              cardItems.map((item) => (<CardItem key={item.id} item={item} setFlag={setFlag} flag={flag} />))}
          </div>

          {/* card total section */}

          <div className="w-full flex-1 bg-cardOverlay rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-white text-lg">Sub Total</p>
              <p className="text-white text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-white text-lg">Delivery</p>
              <p className="text-white text-lg">$ 5</p>
            </div>
            <div className="w-full border-b border-yellow-800 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-white text-xl font-semibold">Total</p>
              <p className="text-white text-xl font-semibold">$ {tot + 5}</p>
            </div>
            {/*if the user is not logged in, check out button is unclickable*/}
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-900 text-black text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-900 text-black text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyBasket} className="w-300" alt="" />
          <p className="text-xl text-black font-semibold">
            Add items to your card
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CardContainer;
