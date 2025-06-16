import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Button,
  FlatList, Keyboard,
  Platform, SafeAreaView, StyleSheet, Text,
  TextInput, useColorScheme, View
} from 'react-native';
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';
import TaskItem from '../components/TaskItem';
import { darkTheme, lightTheme, Theme } from '../theme';
import { Task } from '../types';

const toastConfig: ToastConfig = {
  custom: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#444' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
      }}
    />
  ),
};

export default function HomeScreen() {
  const scheme = useColorScheme();
  const theme: Theme = scheme === 'dark' ? darkTheme : lightTheme;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: input,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInput('');
    Keyboard.dismiss();
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const styles = StyleSheet.create({
    fullScreen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      padding: 20,
      paddingTop: Platform.OS === 'web' ? 40 : 20,       // Extra top padding for web
      paddingLeft: Platform.OS === 'web' ? 40 : 20,      // Extra horizontal padding for web
      paddingRight: Platform.OS === 'web' ? 40 : 20,
    },
    header: {
      fontSize: 28,
      textAlign: 'center',
      marginBottom: 16,
      color: theme.text,
    },
    inputRow: {
      flexDirection: 'row',
      marginBottom: 14,
      alignItems: 'center',
      gap: 10,
    },
    input: {
      flex: 1,
      backgroundColor: theme.inputBackground,
      borderWidth: 1,
      borderColor: theme.borderColor,
      padding: 10,
      borderRadius: 6,
      fontSize: 16,
      color: theme.text,
    },
  });

  return (
    <View key={scheme} style={styles.fullScreen}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Task Manager</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Add a new task"
            value={input}
            onChangeText={setInput}
            style={styles.input}
            placeholderTextColor={scheme === 'dark' ? '#888' : '#aaa'}
            returnKeyType="done"
            onSubmitEditing={addTask}
          />
          <Button title="Add" onPress={addTask} />
        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          contentContainerStyle={{ backgroundColor: theme.background }}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={toggleTask}
              onDelete={deleteTask}
              color={theme.text}
              background={theme.inputBackground}
            />
          )}
        />
      </SafeAreaView>

      {/* ✅ Toast renderer */}
      <Toast config={toastConfig} />
    </View>
  );
}
