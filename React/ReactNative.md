## React Native Basic Component
- Basic functional React Native component that displays the text **"Hello World"** with custom styling.
```js
import React from "react";
import { Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return <Text style={styles.text}>Hello World</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
```
## FlatList 
- Displays a scrollable list using `FlatList` in React Native.
- Unlike Web, the default list here is column based.
- We can use `horizontal` and `showsHorizontalScrollIndicator` booleans to make the list **horizontal** and remove the scroll bar.
```js
import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler"; // You can also use FlatList from "react-native"

const ListScreen = () => {
  // Sample data array with name and age
  const friends = [
    { name: 'Friend #1', age: 21 },
    { name: 'Friend #2', age: 22 },
    ...
  ];

  return (
    <FlatList
      // The list data to render
      data={friends}

      // Function to uniquely identify each item (required)
      keyExtractor={friend => friend.name}

      // Function that renders each item
      renderItem={({ item }) => {
        return (
          <Text style={styles.text}>
            {item.name} - Age: {item.age}
          </Text>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 80, // Adds space between list items
  },
});

export default ListScreen;

```
## Button /  TouchableOpacity
 - `Button`: basic button, no custom styling.
 - `TouchableOpacity`: flexible button with custom styles.
 - `props.navigation.navigate`('Components'): navigates to another screen (requires props passed in).
```js
import React from "react";
import { Text, StyleSheet, Button, View, TouchableOpacity } from "react-native";

const HomeScreen = (props) => {
  return (
    <View>
      <Button
        onPress={() => console.log('Hi')}
        title="Components Screen"         // Button label
      />
      <TouchableOpacity onPress={() => props.navigation.navigate('Components')}>
        <Text style={styles.text}>Fot test</Text>  // Button label
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    ...
  },
});
```
