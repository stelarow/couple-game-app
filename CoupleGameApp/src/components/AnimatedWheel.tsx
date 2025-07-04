import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { Activity } from '../types';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.8;
const RADIUS = WHEEL_SIZE / 2;

interface AnimatedWheelProps {
  activities: Activity[];
  onSpinComplete: (activity: Activity) => void;
  isSpinning: boolean;
}

const AnimatedWheel: React.FC<AnimatedWheelProps> = ({
  activities,
  onSpinComplete,
  isSpinning,
}) => {
  const rotation = useSharedValue(0);
  const selectedActivity = useRef<Activity | null>(null);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  ];

  const spinWheel = () => {
    if (activities.length === 0 || isSpinning) return;

    // Calculate random rotation (multiple full spins + random angle)
    const randomAngle = Math.random() * 360;
    const fullSpins = 5 + Math.random() * 3; // 5-8 full spins
    const totalRotation = fullSpins * 360 + randomAngle;

    // Calculate which activity will be selected
    const segmentAngle = 360 / activities.length;
    const normalizedAngle = (360 - (randomAngle % 360)) % 360;
    const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
    selectedActivity.current = activities[selectedIndex];

    rotation.value = withSequence(
      withTiming(totalRotation, {
        duration: 3000,
        easing: Easing.out(Easing.cubic),
      }),
      withTiming(totalRotation, {
        duration: 100,
        easing: Easing.linear,
      }, (finished) => {
        if (finished && selectedActivity.current) {
          runOnJS(onSpinComplete)(selectedActivity.current);
        }
      })
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const createWheelSegments = () => {
    if (activities.length === 0) return null;

    const segmentAngle = 360 / activities.length;
    const segments = [];

    for (let i = 0; i < activities.length; i++) {
      const startAngle = i * segmentAngle;
      const endAngle = (i + 1) * segmentAngle;
      
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      
      const x1 = RADIUS + (RADIUS - 20) * Math.cos(startAngleRad);
      const y1 = RADIUS + (RADIUS - 20) * Math.sin(startAngleRad);
      const x2 = RADIUS + (RADIUS - 20) * Math.cos(endAngleRad);
      const y2 = RADIUS + (RADIUS - 20) * Math.sin(endAngleRad);
      
      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${RADIUS} ${RADIUS}`,
        `L ${x1} ${y1}`,
        `A ${RADIUS - 20} ${RADIUS - 20} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      // Text position (middle of segment)
      const textAngle = startAngle + segmentAngle / 2;
      const textAngleRad = (textAngle * Math.PI) / 180;
      const textX = RADIUS + (RADIUS - 60) * Math.cos(textAngleRad);
      const textY = RADIUS + (RADIUS - 60) * Math.sin(textAngleRad);

      segments.push(
        <React.Fragment key={i}>
          <Path
            d={pathData}
            fill={colors[i % colors.length]}
            stroke="#fff"
            strokeWidth="3"
          />
          <SvgText
            x={textX}
            y={textY}
            fontSize="12"
            fill="#000"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontWeight="bold"
          >
            {activities[i].name.length > 15 
              ? activities[i].name.substring(0, 12) + '...' 
              : activities[i].name}
          </SvgText>
        </React.Fragment>
      );
    }

    return segments;
  };

  if (activities.length === 0) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', height: WHEEL_SIZE }}>
        <Text style={{ fontSize: 18, color: '#666', textAlign: 'center' }}>
          Adicione algumas atividades para usar a roleta!
        </Text>
      </View>
    );
  }

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Pointer */}
      <View
        style={{
          position: 'absolute',
          top: -10,
          zIndex: 1,
          width: 0,
          height: 0,
          borderLeftWidth: 15,
          borderRightWidth: 15,
          borderBottomWidth: 30,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#FF4757',
        }}
      />
      
      {/* Wheel */}
      <Animated.View style={[{ width: WHEEL_SIZE, height: WHEEL_SIZE }, animatedStyle]}>
        <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
          {createWheelSegments()}
        </Svg>
      </Animated.View>

      {/* Spin Button */}
      <TouchableOpacity
        onPress={spinWheel}
        disabled={isSpinning}
        style={{
          position: 'absolute',
          top: WHEEL_SIZE / 2 - 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: isSpinning ? '#95a5a6' : '#e74c3c',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          {isSpinning ? '...' : 'GIRA'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimatedWheel;