import React from "react";
import styled from "styled-components";
import {
  FlickingEvent,
  SelectEvent,
  ChangeEvent,
  NeedPanelEvent,
} from "@egjs/flicking";
import Flicking from "@egjs/react-flicking";

const Item = styled.div`
  background-color: red;
  height: 140px;
  width: 230px;
  background-image: url(https://image.tmdb.org/t/p/w500//sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg);

  background-size: cover;
`;

const Flick = () => {
  return (
    <div className="px-8">
      <FlickingConfig>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
        <Item> 1</Item>
      </FlickingConfig>
    </div>
  );
};

const FlickingConfig = ({ children }) => {
  return (
    <Flicking
      tag="div"
      gap={20}
      viewportTag="div"
      cameraTag="div"
      onNeedPanel={(e) => {}}
      onMoveStart={(e) => {}}
      onMove={(e) => {}}
      onMoveEnd={(e) => {}}
      onHoldStart={(e) => {}}
      onHoldEnd={(e) => {}}
      onRestore={(e) => {}}
      onSelect={(e) => {}}
      onChange={(e) => {}}
      classPrefix="eg-flick"
      deceleration={0.0075}
      horizontal={true}
      circular={false}
      infinite={false}
      infiniteThreshold={0}
      lastIndex={Infinity}
      threshold={40}
      duration={100}
      panelEffect={(x) => 1 - Math.pow(1 - x, 3)}
      defaultIndex={0}
      inputType={["touch", "mouse"]}
      thresholdAngle={45}
      bounce={10}
      autoResize={false}
      adaptive={false}
      zIndex={2000}
      bound={true}
      overflow={false}
      hanger={"0%"}
      anchor={"50%"}
      moveType={{ type: "freeScroll" }}
      collectStatistics={true}
    >
      {children}
    </Flicking>
  );
};

export default Flick;
