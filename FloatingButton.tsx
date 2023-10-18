import React, { useEffect, useState } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";

const FloatingButton = ({handlePress,size=50,top,bottom}:{handlePress:Function,size:number,top:number,bottom:number|null}) => {
  const [position, setPosition] = useState({ x: -size/2, y: 500 });
  const [pressStartTime, setPressStartTime] = useState(0);

  const screenWidth=Dimensions.get("window").width
  const screenHeight=Dimensions.get("window").height

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      let posX = gestureState.moveX - size/2;
      if(posX<0)posX=-size/2;
      else if(posX>screenWidth-size)posX=screenWidth-size/2;

      let posY = gestureState.moveY - size/2;
      if(posY<0)posY=-size/2;

      setPosition({
        x: posX,
        y: posY,
      });
    },
    onPanResponderGrant: () => {
      setPressStartTime(Date.now());
    },
    onPanResponderRelease: () => {
      const pressEndTime = Date.now();
      const pressDuration = pressEndTime - pressStartTime;

			//如果点击时间（松开时间与按下时间的差值）过短，则视作点击
      if (pressDuration < 200 /*时间阈值，可以根据实际情况调整*/) {
        handlePress();
      }

      let posX = position.x;
      if(posX<0)posX=-size/2;
      else if(posX>screenWidth-size) posX=screenWidth-size/2;
      else if(posX<(screenWidth-size)/2) posX=0;
      else if(posX>(screenWidth-size)/2) posX=screenWidth-size;

      let posY = position.y;
      if(posY<top)posY=top;
      else if(bottom && posY>bottom-size)posY=bottom-size; 

      setPosition({
        x: posX,
        y: posY,
      });

    },
  });

  useEffect(()=>{
    if(bottom && position.y>bottom-size) {
      setPosition({
        x: position.x,
        y: bottom - size,
      });
    }
  },[bottom])

  return (
    <>
      <View
        style={[styles.ball, { left: position.x, top: position.y, width: size, height: size, borderRadius: size/2,}]}
        {...panResponder.panHandlers} />
    </>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  ball: {
    backgroundColor: '#FFC88B',
    position: 'absolute',
    zIndex: 10000,
    borderColor: 'grey',
    borderWidth: 0.5,
    opacity: 0.6,
  },
});
