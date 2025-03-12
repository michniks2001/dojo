"use client";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Image } from "next/image";

// Create context outside the component
const MouseEnterContext = createContext();

// Custom hook for mouse enter state
const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

// Utility function to merge classes
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const CardContainer = ({ children, className, containerClassName }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateZ(50px)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (containerRef.current) {
      containerRef.current.style.transition =
        "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1)";
      containerRef.current.style.transform =
        "perspective(1000px) translateZ(50px)";
    }
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transition =
      "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1)";
    containerRef.current.style.transform =
      "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-6 flex items-center justify-center",
          containerClassName
        )}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-300 ease-out will-change-transform",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className }) => {
  return (
    <div
      className={cn(
        "w-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `perspective(1000px) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = "translateZ(0px)";
    }
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "w-fit transition-transform duration-300 ease-out will-change-transform",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const FloatingCard = () => {
  // Main Component Render
  return (
    <div className='w-full h-full bg-black flex items-center justify-center'>
      <CardContainer className='inter-var'>
        <CardBody className='bg-black relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-white/[0.2] rounded-xl p-6 border h-[400px]'>
          <CardItem translateZ='50' className='text-xl font-bold text-white'>
            Pre-Workout Plus
          </CardItem>
          <CardItem
            as='p'
            translateZ='60'
            className='text-neutral-300 text-sm max-w-sm mt-2'
          >
            Energy & Focus
          </CardItem>
          <CardItem translateZ='100' className='w-full mt-4'>
            <Image
              src='https://images.unsplash.com/photo-1594882645126-14020914d58d?w=500&h=500&fit=crop'
              className='h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl opacity-90'
              alt='Pre-workout'
            />
          </CardItem>
          <div className='flex justify-between items-center mt-4'>
            <CardItem
              translateZ={20}
              as='p'
              className='text-xl font-bold text-white'
            >
              $49.99
            </CardItem>
            <CardItem
              translateZ={20}
              as='button'
              className='px-4 py-2 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200'
            >
              Buy Now
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default FloatingCard;
