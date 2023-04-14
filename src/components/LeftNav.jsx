import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { categories } from "../utils/constants";
import { LevelContext } from "../context/contextApi";
import LeftNavbarItems from "./LeftNavbarItems";

const LeftNav = () => {
  const { selectedCategory, setSelectedCategory, mobileMenu } =
    useContext(LevelContext);
  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
        return setSelectedCategory(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <div
      className={`w-[240px] md:block overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all + ${
        mobileMenu ? "translate-x-0" : ""
      }`}
    >
      <div className="flex flex-col px-5">
        {categories.map((el) => {
          return (
            <React.Fragment key={el.name}>
              <LeftNavbarItems
                text={el.type === "home" ? "Home" : el.name}
                icon={el.icon}
                action={() => {
                  clickHandler(el.name, el.type);
                  navigate("/");
                }}
                className={`${
                  selectedCategory === el.name ? "bg-white/[0.15]" : ""
                }`}
              ></LeftNavbarItems>
              {el.divider && <hr className="my-5 border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">Clone by Sachin</div>
      </div>
    </div>
  );
};

export default LeftNav;
