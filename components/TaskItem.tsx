import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Task } from '../types';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void; // will be called after animation
  color: string;
  background: string;
};

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete, color, background }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // Animate checkbox bounce
  useEffect(() => {
    Animated.spring(scale, {
      toValue: task.completed ? 1.05 : 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  }, [task.completed]);

  // Shrink and fade on delete
  const handleDelete = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete(task.id);
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Task deleted',
          position: 'bottom',
          visibilityTime: 1500,
        });
      }, 50);
    });
  };

  return (
    <Animated.View
      style={[
        styles.itemWrapper,
        {
          opacity,
          transform: [{ scaleY }],
        },
      ]}
    >
      <View style={[styles.item, { backgroundColor: background }]}>
        <TouchableOpacity
          onPress={() => onToggle(task.id)}
          style={styles.labelTouchable}
          activeOpacity={0.6}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Feather
              name={task.completed ? 'check-square' : 'square'}
              size={20}
              color={color}
              style={styles.checkbox}
            />
          </Animated.View>

          <Text
            style={[
              styles.text,
              {
                color,
                opacity: task.completed ? 0.5 : 1,
              },
              task.completed && styles.completed,
            ]}
          >
            {task.title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.deleteIcon}>
          <Feather name="trash-2" size={20} color={color} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  deleteIcon: {
    paddingLeft: 10,
    padding: 4,
  },
});

export default TaskItem;
