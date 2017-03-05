import React from 'react';
import { Animated, Dimensions } from 'react-native';
import Map from './map.jpg';

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: new Animated.Value(0),
      pan: new Animated.ValueXY(),
      rotate: new Animated.Value(0),
    };
  }

  render() {
    return (
      <Animated.Image
        source={Map}
        resizeMode="contain"
        style={{
          flex: 1,
          height,
          width,
          transform: [
            { scale: this.state.zoom },
            {
              rotate: this.state.rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
            ...this.state.pan.getTranslateTransform(),
          ]
        }}
      />
    );
  }

  componentDidMount() {
    this.state.zoom.setValue(1.5);
    Animated.spring(
      this.state.zoom,
      {
        toValue: 0.8,
        friction: 1,
      }
    ).start();

    setTimeout(() => {
      Animated.spring(
        this.state.pan,
        { toValue: { x: 100, y: -50 } }
      ).start();
      Animated.spring(
        this.state.zoom,
        { toValue: 2.5 }
      ).start();
    }, 2000);

    setTimeout(() => {
      Animated.spring(
        this.state.pan,
        { toValue: { x: -100, y: 0 } }
      ).start();
      Animated.spring(
        this.state.zoom,
        { toValue: 3 }
      ).start();
      Animated.spring(
        this.state.rotate,
        { toValue: 0.2 }
      ).start();
    }, 4000);
  }
}
