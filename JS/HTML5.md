# HTML 5
### HTML 4.01 vs HTML 5
- HTML5 introduces new semantic elements like ```<article>, <section>, <header>, <nav>, <footer>```.
- HTML5 Introduces the ```<canvas>``` element for drawing graphics and the ```<svg>```.
- HTML5 Introduces the **localStorage** and **sessionStorage** APIs vs HTML 4.01 **cookies**.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML5 Sample</title>
</head>
<body>

    <header>
        <h1>Welcome to My Website</h1>
    </header>

    <section id="about">
        <h2>About Section</h2>
        <p>This is the main content of the about section.</p>
    </section>

    <footer>
        <p>&copy; 2023 My Website. All rights reserved.</p>
    </footer>

</body>
</html>
```
### meta tag (single tag)
- SEO meta tags are HTML tags that provide information about a web page to search engines and website visitors.
- The most important one:
  - Meta **title** Tag
  - Meta **name/content** Tag
  - Meta **Keywords** Tag
```html
<title>Your Page Title</title>
<meta name="description" content="This is a brief description of your webpage.">
<meta name="keywords" content="SEO, meta tags, web development">
```
