import React, { Component } from 'react';
import { TODOS } from '../data.js';
import { Text, View, Alert, StyleSheet, TouchableOpacity, TextInput, ScrollView,  ImageBackground,
  KeyboardAvoidingView } from 'react-native';



const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
  };
  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onPress={() => props.onToggleTodo(props.todo.id,props.idx+1)}
      onLongPress={() => props.onDeleteTodo(props.todo.id, props.todo)}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};
const addItem = props => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={todoBody}
        style={styles.todoInput}
        onChangeText={text => setTodoBody(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default class AllScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: TODOS,
      todoBody: ""
    }
  }

  onToggleTodo = (id,idx) => {
    const todo = this.state.todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = this.state.todoList.findIndex(todo => todo.id === id);
    this.state.todoList[foundIndex] = todo;
    const newTodoList = [...this.state.todoList];
    setTimeout(() => {
      this.props.navigation.navigate('SingleTodo', {
        updatedTodo: todo,
        idx: idx
      });
    }, 300);
    this.setState({ todoList: newTodoList });
  };
  onDeleteTodo = (id, todo) => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            const newTodoList = this.state.todoList.filter(todo => todo.id !== id);
            this.setState({ todoList: newTodoList });
          }
        }
      ],
      { cancelable: true }
    );

  };

  onSubmitTodo = () => {
    const newTodo = {
      body: this.state.todoBody,
      status: 'Active',
      id: this.state.todoList.length + 1
    };
    const newTodoList = [...this.state.todoList, newTodo];
    this.setState({ todoList: newTodoList, todoBody: "" });
  };


  render() {
    return (
      <ImageBackground style={styles.container} source={{uri:"https://i.pinimg.com/236x/8b/c0/c1/8bc0c125982b67bcdd30b4e56fcfce3e.jpg"}}>
      <KeyboardAvoidingView
      enabled
      behavior="padding"
      style={{flex:1}}
    >
      <ScrollView style={{flex:1}}>
        {this.state.todoList.map((todo, idx) => {
          return (
            <TodoItem
              idx={idx}
              todo={todo}
              key={todo.body}
              onToggleTodo={this.onToggleTodo}
              onDeleteTodo={this.onDeleteTodo}
            />
          );
        })}
        <View style={styles.inputContainer}>
          <TextInput
            value={this.state.todoBody}
            style={styles.todoInput}
            onChangeText={text => this.setState({todoBody:text})}
          />
          <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

AllScreen.navigationOptions = {
  title: 'All Todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  todoItem: {
    margin: 5,
    padding: 10,
    minHeight: 50,
    width: '95%',
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'white',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1,
    paddingTop: 1000
  }
});