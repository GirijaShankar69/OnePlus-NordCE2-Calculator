"use client";

import Image from "next/image";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaBackspace, FaEquals } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { RiDivideLine } from "react-icons/ri";

export default function Home() {
  const numbers = ["00", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."];

  const [solve, setSolve] = useState("");
  const [count, setCount] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  var result = null;
  const clear = async () => {
    let arr = solve.split("");
    let x = arr.pop();
    if (x === ".") {
      setCount(0);
    }
    setSolve(arr.join(""));
  };

  const operations = [
    {
      icon: <RiDivideLine />,
      value: "/",
    },
    {
      icon: <IoCloseSharp />,
      value: "*",
    },
    {
      icon: <AiOutlineMinus />,
      value: "-",
    },
    {
      icon: <AiOutlinePlus />,
      value: "+",
    },
  ];

  const cacluatePercentage = () => {
    let arr = solve.split("%");
    let x = 1;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i] / 100;
      setSolve(solve + "" + arr[i]);
    }
  };

  return (
    <main className="pt-24 pb-20 flex w-full items-center justify-center h-screen bg-[#ffb515]">
      <div className="mx-auto w-[320px] md:w-[420px] bg-black pb-5 overflow-hidden shadow-2xl shadow-[#000000] rounded-3xl">
        <div className=" bg-[#808080] rounded-b-3xl w-full h-[200px] md:h-[250px] overflow-y-hidden overflow-x-auto flex justify-end items-end p-5 text-4xl font-[600] relative">
          <p
            className={
              solve?.length
                ? "absolute top-5 left-5 font-[300] scale-y-0 transition-all duration-500"
                : "absolute top-5 left-5 font-[300] transition-all duration-500"
            }
          >
            Calculator
          </p>
          <span className={solve?.length > 16 ? "text-xl" : ""}>{solve}</span>
        </div>
        <div className="w-full flex px-[10px] py-5 items-start text-white font-[600] text-3xl">
          <div className="w-[80%] flex items-center flex-wrap">
            <button
              onClick={() => {
                setSolve("");
                setCount(0);
              }}
              className="m-[10px] w-[50px] md:w-[80px] h-[50px] md:h-[80px] rounded-full hover:bg-[#3e3e3e] transition-all duration-500"
            >
              AC
            </button>
            <button
              onClick={clear}
              className="m-[10px] w-[50px] md:w-[80px] h-[50px] md:h-[80px] rounded-full hover:bg-[#3e3e3e] transition-all duration-500 flex items-center justify-center text-3xl"
            >
              <FaBackspace />
            </button>
            <button
              onClick={() => {
                setSolve(solve / 100 + "*");
              }}
              className="m-[10px] w-[50px] md:w-[80px] h-[50px] md:h-[80px] rounded-full hover:bg-[#3e3e3e] transition-all duration-500"
            >
              %
            </button>
            {numbers
              ?.sort((a, b) => {
                return b - a;
              })
              ?.map((num, index) => (
                <button
                  onClick={() => {
                    if (isSolved) {
                      setSolve("");
                      setCount(0);
                      setIsSolved(false);
                      setSolve(num + "");
                      return;
                    }
                    if (num === ".") {
                      if (count === 0) {
                        setCount(count + 1);
                        setSolve(solve + "" + num);
                      }
                    } else {
                      setSolve(solve + "" + num);
                    }
                  }}
                  key={index}
                  className="m-[10px] w-[50px] md:w-[80px] h-[50px] md:h-[80px] rounded-full hover:bg-[#3e3e3e] transition-all duration-500"
                >
                  {num}
                </button>
              ))}
          </div>
          <div className="space-y-5">
            {operations?.map((op, index) => (
              <button
                key={index}
                onClick={() => {
                  let arr = solve.toString().split("");
                  if (
                    arr[arr.length - 1] !== "+" &&
                    arr[arr.length - 1] !== "-" &&
                    arr[arr.length - 1] !== "*" &&
                    arr[arr.length - 1] !== "/"
                  ) {
                    setCount(0);
                    setSolve(solve + op?.value);
                  } else if (
                    (arr[arr.length - 1] === "*" ||
                      arr[arr.length - 1] === "/") &&
                    op.value === "-"
                  ) {
                    setCount(0);
                    setSolve(solve + op?.value);
                  } else if (
                    !(
                      arr[arr.length - 1] !== "+" &&
                      arr[arr.length - 1] !== "-" &&
                      arr[arr.length - 1] !== "*" &&
                      arr[arr.length - 1] !== "/"
                    )
                  ) {
                    setCount(0);
                    arr[arr.length - 1] = op.value;
                    setSolve(arr.join(""));
                  }
                }}
                className="m-[10px] w-[50px] md:w-[80px] h-[50px] bg-[#3e3e3e] flex text-4xl items-center justify-center md:h-[80px] rounded-full"
              >
                {op.icon}
              </button>
            ))}

            <button
              onClick={() => {
                let arr = solve.toString().split("");
                try {
                  if (
                    arr[arr.length - 1] !== "+" &&
                    arr[arr.length - 1] !== "-" &&
                    arr[arr.length - 1] !== "*" &&
                    arr[arr.length - 1] !== "/" &&
                    solve?.length > 0
                  ) {
                    setIsSolved(true);
                    result = eval(solve);
                    setSolve(result.toString());
                  } else {
                    alert("Invalid input operation!");
                  }
                } catch (err) {
                  alert("Invalid input operation!");
                }
              }}
              className="m-[10px] w-[50px] md:w-[80px] h-[50px] bg-orange-500 flex items-center justify-center md:h-[80px] rounded-full"
            >
              <FaEquals />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
