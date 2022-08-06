import { useEffect, useState, useRef, useContext } from "react";

import { getAllWhiskyItems } from "../../utils/firebaseFunctions";
import { MdShoppingBag } from "react-icons/md";
import { motion } from "framer-motion";
import { ShoppingBagContext } from "../../context/ShoppingBagContext";

export const DashboardBestsellersProducts = ({scrollValue}) => {
    const shoppingBagProductsFromLocalStorage = JSON.parse(localStorage.getItem('shoppingBagProducts'))
    const [data, setData] = useState([]);
    const [shoppingBagProducts, setShoppingBagProducts] = useState(shoppingBagProductsFromLocalStorage ? shoppingBagProductsFromLocalStorage : []);
    const ref = useRef();

    useEffect(() => {
        getAllWhiskyItems().then((products) => {
            const bestsellers = products.filter((product) => product.bestseller);
            setData(bestsellers);
        });
    }, []);

    useEffect(() => {
        ref.current.scrollLeft += scrollValue;
      }, [scrollValue]);

      useEffect(() => {
        localStorage.setItem('shoppingBagProducts', JSON.stringify(shoppingBagProducts));
      }, [shoppingBagProducts])

      const [state123, setState123] = useState(1)
      console.log('state123', state123)
    return (
        <ShoppingBagContext.Provider value={{test: state123}}>
            <button onClick={() => setState123(state123 + 1)}>add</button>
        <div
          ref={ref}
          className={`w-full flex items-center gap-3 my-12 bg-yellow-800 bg-opacity-30 scroll-smooth ${
            true
              ? "overflow-x-scroll scrollbar-none"
              : "overflow-x-hidden flex-wrap justify-center"
          }`}
        >
          {data.length > 0 &&
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
                    onClick={() => setShoppingBagProducts([...shoppingBagProducts, item])}
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
        </ShoppingBagContext.Provider>
      );
}