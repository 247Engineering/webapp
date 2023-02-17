import React, { useRef, useState } from "react";

const MapModal = ({ children }: { children: any }) => {
  const [top, setTop] = useState<number>();
  const dragbarRef = useRef(null);

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const pageStart = document.querySelector("nav.main")!.clientHeight;
    const pageEnd = document.querySelector("#root")!.clientHeight;
    let dragPos = event.pageY;

    const top =
      dragPos <= pageStart
        ? 0
        : dragPos >= pageEnd
        ? pageEnd - pageStart - 16
        : dragPos - pageStart;

    setTop(top);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = () => {
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (event: TouchEvent) => {
    const pageStart = document.querySelector("nav.main")!.clientHeight;
    const pageEnd = document.querySelector("#root")!.clientHeight;
    let dragPos = event.touches[0].clientY;

    const top =
      dragPos <= pageStart
        ? 0
        : dragPos >= pageEnd
        ? pageEnd - pageStart - 16
        : dragPos - pageStart;

    setTop(top);
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div
      className="bg-white shadow-sm-alt rounded-tl-[10px] rounded-tr-[10px] z-10 absolute w-full bottom-0 flex flex-col overflow-hidden"
      style={{ ...(top !== undefined && { top: `${top}px` }) }}
    >
      <div
        className="pt-2 mb-6 flex justify-center"
        ref={dragbarRef}
        //@ts-ignore
        onMouseDown={handleMouseDown}
        //@ts-ignore
        onTouchStart={handleTouchStart}
      >
        <span className="rounded-[30px] w-[3rem] h-[0.5rem] bg-grey-light-300 cursor-row-resize"></span>
      </div>
      {children}
    </div>
  );
};

export default MapModal;
