import React from "react";
import { FaShippingFast } from "react-icons/fa";
import background from "../../img/background.jpg";
import { productsData } from "../../utils/data";

export const DashboardShopInfo = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 py-2 w-full h-screen bg-cardOverlay"
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center">
          <p className="text-base text-yellow-700 font-semibold">
            Fastest delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <FaShippingFast className="w-full h-full object-contain" />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4rem] font-bold text-left tracking-wide text-headingColor">
          Fancy a{" "}
          <span className="text-yellow-700 text-[2.6rem] lg:text-[4rem]">
            drink? <br></br>
          </span>
          We deliver in an{" "}
          <span className="text-yellow-700 text-[2.6rem] lg:text-[4rem]">
            eye blink!
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%] lg:text-justify">
          {" "}
          Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit,
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
          eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est,
          qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit,
                    sed quia non numquam eius modi tempora incidunt, ut labore et dolore
          magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur? Quis autem vel eum iure
          reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae
          consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla
          pariatur?{" "}
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-yellow-600 to-yellow-900 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>

      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={background}
          className="ml-auto h-510 w-full lg:w-full lg:h=650 border-solid border-2 border-yellow-600 mr-2 bg-cover opacity-80"
          alt="background"
        ></img>
        <div className="w-full h-full absolute top-0 left-0 flex flex-wrap items-center justify-evenly sl:px-12 md:py-60 md:px-8 xl:py-32 2xl:px-52 2xl:py-36">
          {productsData &&
            productsData.map((i) => (
              <div
                key={i.id}
                className=" lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl  flex flex-col items-center justify-center border-solid border-2 border-yellow-600"
              >
                <img
                  src={i.imageSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 rounded-lg border-solid border-2 border-yellow-600"
                  alt="whisky-glass"
                ></img>
                <p className="text-base lg:text-xl font-semibold text-yellow-800 mt-2 lg:mt-4">
                  {i.name}
                </p>

              {/*description - should i leave it? */}
                {/* <p className="text-sm text-gray-100 font-semibold my-1 lg:my-3">
                  {i.desc}
                </p> */}

                <p className="text-[12px] lg:text-sm font-semibold text-headingColor">
                  {i.price}
                  <span className="text-xs text-yellow-800">$</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
