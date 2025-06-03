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
Here’s a **step-by-step tutorial** for setting up a new Expo + Expo Router React Native app with a custom URI scheme (`shelfieApp`):

## Expo Router React Native app
- This creates a new project in the current directory using the blank template:
```bash
npx create-expo-app@latest --template blank ./
```
- Install Expo Router and Dependencies:
```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```
- Update `package.json`:
```json
"main": "expo-router/entry",
```
- Update `app.json`:
```json
"scheme": "shelfieApp"
```
### Folder Structure:
```
shelfie_app/
├── app/                    # All your route-based screens
│   ├── _layout.js          # Layout for navigation (e.g., Stack or Tabs)
│   ├── index.js            # Home screen (route: "/")
│   └── about.js            # Another screen (route: "/about")
│
├── assets/                 # Images, fonts, media files
│   └── icon.png
│
├── node_modules/
│
├── .gitignore
├── app.json                # Expo app configuration
├── package.json            # Project dependencies and config
├── README.md               # Project overview (optional)
```

## Add a Layout
- To use a consistent layout or **slot**/**stack**/**tabs** navigation, add `_layout.js`:

| Layout Type | Best For                                                |
| ----------- | ------------------------------------------------------- |
| `Stack`     | Navigation flow, modal-like pages                       |
| `Tabs`      | Bottom navigation bar apps                              |
| `Slot`      | Static layouts (custom headers, footers, layout groups) |

### Stack — Default Native Screen Transitions:
- `Stack.Screen` can accept options like title, headerShown, etc.
```js
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack />;
}
```
### Tabs — Bottom Tab Navigation:
- Shows a bottom tab bar.
- Each file like `home.js`, `settings.js` becomes a tab automatically.
```js
// app/_layout.js
import { Tabs } from 'expo-router';

export default function Layout() {
  return <Tabs />;
}
```
- You can customize with icons:
```js
<Tabs.Screen
  name="home"
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home" color={color} size={size} />
    ),
  }}
/>
```
### Slot — Custom Layout Wrapper:
- `<Slot />` is a placeholder. It renders whichever screen matches the current route (like `index.js`).
- Good for **custom headers**, **footers**, or static layouts (e.g., blog layout).
- No built-in navigation like Stack/Tabs.
```js
// app/_layout.js
import { Slot } from 'expo-router';
import { View, Text } from 'react-native';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Header</Text>
      <Slot /> {/* renders the current route screen */}
      <Text>Footer</Text>
    </View>
  );
}
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
