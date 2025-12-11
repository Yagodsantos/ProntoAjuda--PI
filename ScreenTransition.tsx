import React from "react";
import Animated, { 
  FadeInRight, 
  FadeOutLeft 
} from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
};

export default function ScreenTransition({ children }: Props) {
  return (
    <Animated.View 
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
      style={{ flex: 1 }}
    >
      {children}
    </Animated.View>
  );
}
