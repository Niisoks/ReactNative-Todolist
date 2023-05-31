import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style = {styles.header}>This is a header</Text>
			<Text style = {styles.subHeader}>This is a sub header</Text>
			
			<View style = {styles.todoList}>
				<View style = {styles.todo}>
					<Button style = {styles.checkBox}></Button>
					<Text style = {styles.todoText}> test </Text>
					<Button style = {styles.deleteBox}> X </Button>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 32
	},
	header: {
		fontSize: 40,
		fontWeight: 'bold',
		marginBottom: 32,
	},
	subHeader: {
		fontSize: 18,
		textTransform: "uppercase",
		marginBottom: 16
	}
});
