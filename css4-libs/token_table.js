let tokens = {
    init: ".document",       //BEGIN A DOCUMENT
    class_def: "class",
    element: "element",
    
    open_block: '{',
    close_block: '}',

    class_on: "on",
/*      class_hover: "hover",
        class_hover: "focus",
        class_hover: "visited",
        class_hover: "active",
*/
    alignment: 'alignment:',
    textcolor: 'text-color:',
    bgcolor: 'bg-color:',
    font: 'font:',
    fontweight: 'font-weight:',
    bgimg: 'bg-img:',
    
    width: 'max-width:',
    height: 'max-height:',
    
    margin_top: 'margin-top:',
    margin_bottom: 'margin-bottom:',
    margin_left: 'margin-left:',
    margin_right: 'margin-right:',
    margin_all: 'margin-all:',

    padding_top: 'padding-top:',
    padding_bottom: 'padding-bottom:',
    padding_left: 'padding-left:',
    padding_right: 'padding-right:',
    padding_all: 'padding-all:',
    

}


module.exports = { tokens }