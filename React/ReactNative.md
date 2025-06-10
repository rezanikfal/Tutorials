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
## Light and Dark Mode
### 1. Create a `Colors` Theme File
* Organized as `light` and `dark` objects to match the system theme.
```js
// constants/Colors.js
export const Colors = {
  primary: "#6849a7",
  warning: "#cc475a",
  dark: {
    text: "#d4d4d4",
    title: "#fff",
    background: "#252231",
    navBackground: "#201e2b",
    iconColor: "#9591a5",
    iconColorFocused: "#fff",
    uiBackground: "#2f2b3d",
  },
  light: {
    text: "#625f72",
    title: "#201e2b",
    background: "#e0dfe8",
    navBackground: "#e8e7ef",
    iconColor: "#686477",
    iconColorFocused: "#201e2b",
    uiBackground: "#d6d5e1",
  },
};
```
### 2. Create a `ThemedView` Component
* Automatically uses light or dark theme based on user settings.
* `useColorScheme()` returns `"light"` or `"dark"` depending on device.
```js
// components/ThemedView.js
import { useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedView = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View
      style={[{ backgroundColor: theme.background }, style]}
      {...props}
    />
  );
};

export default ThemedView;
```
### 3. Use ThemedView in a Screen
* Replace normal `View` with `ThemedView` to auto-adjust to dark/light mode.
* Inherits all View props and allows custom styles as usual.
```js
// screens/About.js
import { Text, StyleSheet } from 'react-native';
import ThemedView from '../components/ThemedView';

export default function About() {
  return (
    <ThemedView style={styles.container}>
      <Text>about</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
```
### 4. Configure `app.json` for System Theme
* Tells Expo to follow the user’s system preference (light/dark).
* Works automatically in production without additional setup.
* Use `"dark"` or `"light"` instead if you want to force a specific mode.
```json
// app.json
{
  "expo": {
    "name": "shelfie_app",
    "scheme": "shelfieApp",
    "userInterfaceStyle": "automatic"
     ...
  }
}
```

## Implementing Navigation Layouts
### 1. Folder Structure

* Follows the recommended layout for `expo-router`.
* Uses two `_layout.jsx` files:

  * `app/_layout.jsx`: root stack layout for the whole app.
  * `app/(auth)/_layout.jsx`: nested layout for auth-related screens.

```
app/
├── _layout.jsx         → Root-level layout
├── index.jsx           → Home screen
├── (auth)/             → Auth stack (login, register)
│   ├── _layout.jsx     → Auth layout
│   ├── login.jsx
│   └── register.jsx
```

### 2. Root Layout: `app/_layout.jsx`

* Applies global theming and navigation style.
* Configures `StatusBar` and sets custom header styles (battery, WiFi, time light/dark mode).
* Keeps the back button but hides the title for the auth stack.

```js
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <>
      <StatusBar style='auto'} />
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.navBackground,
          },
          headerTintColor: theme.title,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: true,
            headerTitle: '',
            animation: 'none',
          }}
        />
      </Stack>
    </>
  );
}
```

### 3. Auth Layout: `app/(auth)/_layout.jsx`

* Used to group and manage the login/register stack.
* Hides headers and disables animation (when you navigate from one page to another) for simplicity.

```js
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    />
  );
}
```
## Tabs Layout
- building a tabbed layout for an authenticated area of the app using `expo-router`, `@expo/vector-icons`.
```js
// _layout.js
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { Colors } from '../../constants/Colors';
import { Ionicons } from "@expo/vector-icons";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <>
      <StatusBar style="auto" />
      <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          paddingTop: 10,
          height: 90,
        },
      }}>
        <Tabs.Screen name="profile" options={{
          title: 'Profile', tabBarIcon: ({ focused }) => {
            return <Ionicons
              size={24}
              name={focused ? "person" : "person-outline"}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />;
          }
        }} />
        <Tabs.Screen name="books"...
        <Tabs.Screen name="create" ...
      </Tabs>
    </>
  );
}
```
## Pressable 
`Pressable` is a core component in React Native used to detect press interactions.
- It detects press, long press, and hover (web)
- Supports dynamic styling via `style={({ pressed }) => ...}`
- Ideal for custom buttons, cards, or any touchable UI
- It's more flexible than `TouchableOpacity` or `TouchableHighlight`
```js
import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => alert('Button Pressed!')}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.text}>Press Me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

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
