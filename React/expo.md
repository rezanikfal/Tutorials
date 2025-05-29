### Create React project using ```expo``` :
- Here is the tutorial: [Expo Tutorial](https://docs.expo.dev/get-started/create-a-project/)
- Using `./` the `create-expo-app` directly creates the app in the folder & app name is the **folder name**:
```
npx create-expo-app@latest --template blank ./

```
### Tab/Layout/Stack 
Create a mobile app with two tabs:
✅ **Home**
✅ **About**

### Folder Structure

```
app/
├── _layout.jsx            ← Root layout (Stack)
├── (tabs)/                ← Tab navigator folder
│   ├── _layout.jsx        ← Tab layout with icons
│   ├── index.jsx          ← Home screen
│   └── about.jsx          ← About screen
```

### 1. Root Layout (Stack)

📄 `app/_layout.jsx`

```js
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
```

➡️ Starts the app with the tab navigator (hidden header).

---

## 🧭 2. Tab Layout with Icons

📄 `app/(tabs)/_layout.jsx`

```js
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={30} color="#000" />
          ),
          tabBarShowLabel: false,
          tabBarStyle: styles.tab,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: () => (
            <Ionicons name="settings-outline" size={30} color="#000" />
          ),
          tabBarShowLabel: false,
          tabBarStyle: styles.tab,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingTop: 10,
  },
});
```

➡️ Defines the tabs and their icons.

## 🏠 3. Home Screen

📄 `app/(tabs)/index.jsx`

* Shows an image and text
* Navigates to "About" using `router.push('/about')`

