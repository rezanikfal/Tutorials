### Variables
- In SCSS (Sass), variables are used to store information that you want to reuse throughout your stylesheet.
```css
$primary-color: #3498db;
$font-size: 16px;
$border-radius: 4px;

body {
  background-color: $primary-color;
  font-size: $font-size;
}
```
- Global vs Local variables:
```css
$global-var: #333;

.container {
  $local-var: #f00; // Local variable
  background-color: $local-var; // Accessible within the .container scope
}

.other-element {
  background-color: $local-var; // Error! $local-var is not accessible here
  color: $global-var; // Accessible because $global-var is global
}
```
### Partials 
-  partials are files that contain snippets of CSS or SCSS code meant to be included in other SCSS file.
-  Partial files are typically named with a **leading underscore** (e.g., ```_partial.scss```), and they are not meant to be compiled into standalone CSS files.
-  You should use the imports in order, like first import variable partial and then the other partial that uses the variable.
-  No need to ```.scss``` when importing a partial.
```css
// _variables.scss

$primary-color: #3498db;
$font-size: 16px;
```
```css
// styles.scss

@import 'variables';

body {
  background-color: $primary-color;
  font-size: $font-size;
}
```
### Nesting
-  Nesting in Sass or SCSS is a way to write CSS rules in a more hierarchical and structured manner.
```css
nav {
  background-color: #333;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: inline-block;
      margin-right: 10px;

      a {
        text-decoration: none;
        color: white;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
```



<img src="../Pics/List.jpg" width="550"> 
