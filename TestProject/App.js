import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Dimensions, Pressable, TextInput } from "react-native";
import { useState, useEffect } from 'react'
import { api } from './config.js'

const API_BASE = api

export default function App() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		const GetTodos = async () => {
			await fetch(API_BASE + '/todo')
				.then(res => res.json())
				.then(data => setTodos(data))
				.catch(err => console.error('Error: ', err))
		}

		GetTodos();
	}, [])

	const completeTodo = async id => {
		const data = await fetch(API_BASE + '/todo/complete/' + id, {
			method: 'PUT'
		}).then(res => res.json());
		
		setTodos(todos => todos.map(todo => {
			if (todo._id == data._id){
				todo.complete = data.complete;
			}

			return todo;
		}))
	}

	const deleteTodo = async id => {
		const data = await fetch(API_BASE + '/todo/delete/' + id, {
			method: 'DELETE'
		}).then(res => res.json());

		setTodos(todos => todos.filter(todo => todo._id !== data._id));
	}

	const addTodo = async () => {
		if(!newTodo){
			return;
		}
		const data = await fetch(API_BASE + '/todo/new', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				text: newTodo
			})
		}).then(res => res.json());

		setTodos([...todos, data]);
		setPopupActive(false);
		setNewTodo(null);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>This is a header</Text>
			<Text style={styles.subHeader}>This is a sub header</Text>

			<View style={styles.todoList}>
				{todos.map(todo => (
					<TouchableHighlight key={todo._id} underlayColor='transparent' onPress={() => completeTodo(todo._id)}>
						<View style={styles.todo}>
							<View style={[styles.checkBox, (todo.complete ? styles.isComplete : null)]}></View>
							<Text style={[styles.todoText, (todo.complete ? styles.textComplete : null)]}> {todo.text} </Text>
							<Pressable style={styles.deleteBox} onPress={() => deleteTodo(todo._id)}>
								<Text style={styles.todoText}>
									x
								</Text>
							</Pressable>
						</View>
					</TouchableHighlight>
				))}
			</View>

			<TouchableHighlight style = {styles.addPopup} onPress={() => setPopupActive(true)}>
				<Text style = {styles.popupX}> + </Text> 
			</TouchableHighlight>

			{popupActive ? (
				<View style = {styles.popup}>
					<TouchableHighlight style = {styles.closePopup} onPress={() => setPopupActive(false)}>
						<Text style = {styles.popupText}> x </Text> 
					</TouchableHighlight>
					
					<View style = {styles.content}>
						<Text style = {styles.subHeader}> Add Task </Text>
						<TextInput
							style={styles.addTodoInput}
							onChange={e => setNewTodo(e.target.value)}
							value={newTodo}
							placeholder="Type in a todo ..."
							keyboardType="numeric"
						/>
						<Pressable style = {styles.button} onPress = {addTodo}>
							<Text style = {styles.popupX}> Submit </Text> 
						</Pressable>
					</View>
				</View>
			) : null}
		</View>
	)
}

const colors = {
	primary: '#D81E5B',
	secondary: '#8A4EFC',
	light: '#EEE',
	lightAlt: '#61759b',
	dark: '#131A26',
	darkAlt: '#202B3E',
}

const width = Dimensions.get('window').width;

console.log(width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkAlt,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 32
    },
    header: {
        fontSize: 40,
        color: colors.light,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.lightAlt,
        textTransform: "uppercase",
        marginBottom: 16,
    },
    todo: {
        position: "relative",
        alignSelf: "center",
        backgroundColor: colors.dark,
        padding: 16,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    todoText: {
        color: colors.light
    },
    checkBox: {
        width: 20,
        height: 20,
        marginRight: 16,
        borderRadius: 10,
        backgroundColor: colors.darkAlt,
        borderWidth: 1,
        borderColor: 'transparent',
        overflow: 'hidden',
        transitionDuration: 400,
    },
    isComplete: {
        backgroundColor: colors.primary,
    },
    textComplete: {
        textDecorationLine: "line-through"
    },
    deleteBox: {
        alignItems: 'flex-end',
        color: colors.light,
        backgroundColor: "#AF1E2D",
        width: 24,
        height: 24,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        marginLeft: 16
    },
    addPopup: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.primary
    },
    popupX: {
        fontSize: 28,
        fontWeight: '900',
        color: colors.light,
    },
    popup: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -175 }],
		width: 400,
		backgroundColor: '#F5F5F5',
		padding: 32,
		borderRadius: 16,
		shadowColor: '#000',
		shadowOpacity: 0.8,
		shadowRadius: 32,
		elevation: 8,
    },
    closePopup: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 20,
        height: 20,
        fontSize: 20,
        color: '#000',
        cursor: 'pointer',
    },
    popupText: {
        color: '#000',
        marginBottom: 16,
        fontWeight: '400',
        textTransform: 'uppercase',
    },
    addTodoInput: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.24,
        shadowRadius: 24,
        fontSize: 20,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 999,
        backgroundColor: colors.primary,
        fontWeight: '700',
        textTransform: 'uppercase',
        fontSize: 18,
        marginTop: 16,
        textAlign: 'center',
        cursor: 'pointer',
    },
});