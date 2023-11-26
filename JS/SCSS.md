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
### Numeric operations (```$debug``` and ```sass:math```)
- The ```@debug``` directive in Sass allows you to output debugging information to the console.
- You can use ```@debug``` to check if you math calculation is correct.
- Unlike other mathematical operations (```+ - *```), division in Sass is done with the math.div() function
```css
@use "sass:math";

@debug 15px / 30px; // 15px/30px
@debug math.div(15px, 3) //5px
@debug math.div(15px, 3px) //5
@debug (10px + 5px) / 30px; // 0.5
@debug math.$pi; // 3.1415926536
@debug math.ceil(4.2); // 5
@debug math.floor(4.9); // 4
@debug math.max(1px, 4px); // 4px
@debug math.round(4.9); // 5
@debug math.is-unitless(100); // true
```
### map
- In Sass, a map is a data structure that allows you to store key-value pairs.
- You can create a map using the ```()``` syntax:
```css
$colors: (
  primary: #3498db,
  secondary: #e74c3c,
  accent: #27ae60
);
```
```css
$primary-color: map-get($colors, primary);
$secondary-color: map-get($colors, secondary);
```
### ```@each``` and ```@for``` Directive
- The ```@each``` directive is used for iterating over lists or maps.
- The ```@for``` directive is used for numerical iteration.
- Notice this syntax: ```#{$variable}```
```css
$colors: (red, blue, green);

@each $color in $colors {
  .#{$color}-box {
    background-color: $color;
  }
}
```
```css
@for $i from 1 through 3 {
  .box-#{$i} {
    width: 50px * $i;
  }
}
```
- Equals to:
```css
.box-1 {
  width: 50px;
}

.box-2 {
  width: 100px;
}

.box-3 {
  width: 150px;
}
```



<img src="../Pics/List.jpg" width="550"> 