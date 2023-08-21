# CSS 4 - Gabriel Margarido
Version 4.0<br>

<br>
<center><img src="css4.png" width="40%"></center>

### Build from sources
Apple MacOS (M1/M2) and Intel: `./configure`  
Linux: `./configure`  
Windows: `configure`  

### Uninstall HTML6 and CSS4
Apple MacOS (M1/M2) and Intel: `./uninstall`  
Linux: `./uninstall`  
Windows: `uninstall`  


### Compile to CSS 3
Compile to CSS 3: `css4c style.css4 -o style`  
Show generated AST: `css4c style.css4 -ast`  

### Basic CSS 4 black screen
```
    .document

    element body {
        bg-color: #000
    }
    
```

### Start a document
```
    .document
```

### A sample class code
```
    class example {

    }
```

### A sample HTML 6 element select
```
    element * {
        
    }

    element h1 {

    }
```

### A composite HTML 6 elements select
```
    element h1,h2,h3,h4,h5 {

    }

    element p,h1,h3 {

    }
```

### Text Alignment
```
    alignment: center
    alignment: right
    alignment: left
```


### Define text color
```
    text-color: #000
    text-color: black
```

### Define background color
```
    bg-color: #fff
    bg-color: white
```

### Define text weight
```
    font-weight: bold
    font-weight: italic
    font-weight: normal
```

### Define font
```
    font: 'Arial'
    font: "Times New Roman", Times, serif
    font: Arial, Helvetica, sans-serif
```

### Define background wallpaper image
```
    bg-img: ".../testing.png"
```

### Define class or element(s) maximum width
```
    max-width: 100%
    max-width: 500px
```

### Define class or element(s) maximum height
```
    max-height: 125px
    max-height: 40%
```

### Define class or element(s) margins
```
    margin-top: 500px
    margin-bottom: 500px

    margin-left: 100px
    margin-right: 100px
```

### Define same values for all on margins
```
    margin-all: 600px
```


### Define class or element(s) padding
```
    padding-top: 500px
    padding-bottom: 500px

    padding-left: 100px
    padding-right: 100px
```

### Define same values for all on padding
```
    padding-all: 600px
```