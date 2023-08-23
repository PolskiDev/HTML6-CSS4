# HTML 6 - Gabriel Margarido
Version 6.0<br>

HTML6 is a markup language that focus on simplify HTML5's syntax, avoiding "<" and ">" characters and speedly transpiling HTML6 source code to HTML5 target code, to use it on the Web Browser or even [Electron.js](http://electronjs.org)  
<br>
For CSS 4 documentation, see: [README-CSS4.md](README-CSS4.md)  
For HTML6 Studio IDE documentation, see: [README-IDE.md](README-IDE.md)  
<br>

Copy HTML 6 / CSS 4 VSCode extension `./html6-vse` to:  
**Linux/macOS**: `~/.vscode/extensions/html6-vse`  
**Windows**: `%USERPROFILE%\.vscode\extensions\html6-vse`  

<br><br>

<center><img src="html6.png" width="40%"></center>  

### Build and install HTML 6 and CSS 4 from sources
Apple MacOS Intel: `./configure`  
Apple MacOS (M1/M2): `./configure-aarch64`    
Linux: `./configure`   
Windows: `configure`   


### Uninstall HTML6 and CSS4
Apple MacOS (M1/M2) and Intel: `./uninstall-aarch64`  
Linux: `./uninstall`  
Windows: `uninstall`  


### Compile to HTML 5
Compile to HTML 5: `html6c index.html6 -o index`
Show generated AST: `html6c index.html6 -ast`


### A sample page code

```
html
    head
        title content="My window"
        ...
    endhead

    body
        ...
    endbody

endhtml
```

#### Printing Hello World
```
    h1 content="Hello World"

    h2 content="Hello World"
    h3 content="Hello World"
    h4 content="Hello World"
    h5 content="Hello World"

    p content="Hello World"
```

#### Adding unformated/free text
```
    text content="Hello world"
```

#### Adding classes
```
    h1 class="example-class" content="Hello World"
```

#### Importing CSS and Javascript external files
```
    @import type="css" url="style.css"
    @import type="javascript" url="script.js"
```

#### Creating links
```
    link href="http://..." class="example-class" content="Click here"


    link href="http://..." class="example-class"
            ...
    endlink
```


#### Adding images to the page
```
    img src="foo.png" width="80%" height="40%"
    img src="foo.png" width="80%" height="40%" class="example-class"
```


#### Creating Unordered list
```
    unlist
        item class="example-class"
            ....
        enditem
        ....
    endunlist
```

#### Creating Ordered list
```
    orlist
        item class="example-class"
            ....
        enditem
        ....
    endorlist
```


#### Adding input types
**The use of attribute `class=xxx` is strongly recommended, in order to avoid compilation errors**

Some input types atr:
```
type="button"
type="checkbox"
type="color"
type="date"
type="datetime-local"
type="email"
type="file"
type="hidden"
type="month"
type="number"
type="password"
type="radio"
type="range"
type="reset"
type="search"
type="submit"
type="tel"
type="text"
type="time"
type="url"
type="week"
```

Syntax:  
```
    input type="text" class="example-class"
    input type="password" class="example-class"
    input type="button" class="example-class" content="Click me"
```

#### Creating DIVs
```
    div class="example-class"
        ...
    enddiv
```

#### Creating NAVs
```
    nav class="example-class"
        ...
    endnav
```

#### Creating Formularies
```
    form action="..." method="POST"
        ....
    endform


    form action="..." method="GET"
        ....
    endform
```


#### Adding labels
```
    label
        ....
    endlabel
```

#### Centralizing elements
```
    center
        ....
    endcenter
```

#### Jumping a line (\n)
`break`

#### Adding videos and audios
```
    (vid) video href="v1.mp4" type="mp4" width="80%"
    (aud) audio href="a1.mp3" type="mp3"
```

#### Creating visual tables
```
    table
        row
            (id) header content="This is the table header"
        endrow
        row
            (id) data content="This is the context"
        endrow
    endtable
```

#### Setting an ID for element
Supported ID components: `h1, h2, h3, h4, h5, p, link, img, div, nav, title`
```
    Syntax: (myid) COMMAND

    (msg) h1 content="Hello world"
    (msg) p content="Hello world"

    (mtl) title content="My Window"


    (ln) link href="#" class="example-class" content="Click here"

    (ln) link href="#" class="example-class"
        ...
    endlink

    (image) img src="foo.png" w="30%" h="50%"
    (image) img src="foo.png" w="30%" h="50%" class="example-class"

    (group1) div class="example-class"
        ...
    enddiv

    (group1) nav class="example-class"
        ...
    endnav
```


##### Javacript file
And inside your javascript file,  
use: `let x = window.document.getElementById('...')`  
or: `let y = window.document.getElementsByClass('...')`  
and make references using arrays: `let y = window.document.getElementsByClass('...')[i]`
<br>  
<br>
  
  
# Javascript events on HTML 6
Mix the better of HTML 6 with the better of Javascript, including: events, properties and CSS 3 properties.  
  
  
<img src="js.png" width="250px" height="250px"><br>

**Replace `element_id` with corresponding element id**  

In the following case: `(photox) img src="foo.png" width="250px" height="250px"`, **`element_id`** is **`photox`**.  
<br>
<br>

#### HTML 6 element onclick attribute

```
document.getElementById("element_id").onclick = function() {
    // ONCLICK EVENT HERE
    ...
}
```

### HTML 6 element when mouse enter attribute
```
document.getElementById("element_id").addEventListener("onmouseenter", function() {
    // ON MOUSE ENTER EVENT HERE
    ...
})
```

```
document.getElementById("element_id").onmouseenter = function() {
    // ON MOUSE ENTER EVENT HERE
    ...
}
```

### HTML 6 element when any mouse button is clicked attribute
```
document.getElementById("element_id").onmousedown = function() {
    // ON MOUSE DOWN EVENT HERE
    ...
}
```

### HTML 6 element when mouse leaves attribute
```
document.getElementById("element_id").onmouseleave = function() {
    // ON MOUSE DOWN EVENT HERE
    ...
}
```

### HTML 6 element when mouse moves attribute
```
document.getElementById("element_id").onmousemove = function() {
    // ON MOUSE MOVE EVENT HERE
    ...
}
```

### HTML 6 element when mouse out attribute
```
document.getElementById("element_id").onmouseout = function() {
    // ON MOUSE OUT EVENT HERE
    ...
}
```

### HTML 6 element when mouse button is released attribute
```
document.getElementById("element_id").onmouseup = function() {
    // ON MOUSE UP EVENT HERE
    ...
}
```

### HTML 6 element right-click attribute
```
document.getElementById("element_id").addEventListener("contextmenu", function() {
    // RIGHT-CLICK EVENT HERE
    ...
})
```

### HTML 6 element double-click attribute
```
document.getElementById("element_id").addEventListener("dblclick", function() {
    // DOUBLE-CLICK EVENT HERE
    ...
})
```



