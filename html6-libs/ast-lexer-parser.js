#!/usr/local/bin/node



/*
 * WARNING!
 * AST: This program translates sources to AST.
 * Gabriel Margarido - BSD 2-clause license
 */
const fs = require('fs')
const process = require('process')
const util = require('util')
const dump = util.inspect
const token_table = require('./token_table')
const { stopCoverage } = require('v8')
const { type } = require('os')



/* Generate AST from text source-file */
let var_collection = []
let typedef_colection = []
let func_collection = [ // Put all custom functions here, first!
    'escreval','escreva','entrada','leia'
]


let import_collection = []
let linecounter = 0     // Used for error handling!
let err_handling = false
let err_handling_name


function GenerateAST(input) {
    let regex = /[A-Za-z0-9_$++::\.,@*#?><>=<=>===\{\}:=\[\]]+|"[^"]+"|'[^']+'|\([^)]*\)|\[[^\]]*\]|\/[^)/]*\/|(:)|(=)/g
    let source = fs.readFileSync(input,'utf8')
    let json = []

    source.split(/\r?\n/).forEach(line =>  {
        linecounter = linecounter +1
        let stack = line.match(regex)

        /**
         * @error  stack.lenght
         * @fix    stack?.length
         */
        //console.log("Lines:")
        //console.log(" ->"+stack+" ")

        for (let i = 0; i < stack?.length; i++) {
            process.stdout.write("("+stack[i]+")  ")

            // BEGIN AND END
            if (stack[i] == token_table.tokens.init) {
                let data = {
                    token: token_table.tokens.init,
                    type: 'html'
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.final) {
                let data = {
                    token: token_table.tokens.final,
                    type: 'endhtml'
                }
                json.push(data);
            }

            // HEAD AND END HEAD
            if (stack[i] == token_table.tokens.head) {
                let data = {
                    token: token_table.tokens.head,
                    type: 'head'
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.head_close) {
                let data = {
                    token: token_table.tokens.head_close,
                    type: 'endhead'
                }
                json.push(data);
            }

            // BODY AND END BODY
            if (stack[i] == token_table.tokens.body) {
                let data = {
                    token: token_table.tokens.body,
                    type: 'body'
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.body_close) {
                let data = {
                    token: token_table.tokens.body_close,
                    type: 'endbody'
                }
                json.push(data);
            }

            // TITLE
            if (stack[i] == token_table.tokens.title) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.content_key) {
                    let msg = stack[i+2]
                    let data = {
                        token: token_table.tokens.title,
                        type: 'title',
                        content: msg.slice(1,-1),
                        id: id
                    }
                    json.push(data)
                }
            }

            // IMPORT
            if (stack[i] == token_table.tokens.import) {
                if (stack[i+1] == token_table.tokens.type_key) {
                    let msg = stack[i+2]
                    let url = stack[i+4]
                    let data = {
                        token: token_table.tokens.import,
                        type: '@import',
                        content: msg.slice(1,-1),
                        url: url
                    }
                    json.push(data)
                }
            }

            // DIV
            if (stack[i] == token_table.tokens.div) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                let classx = stack[i+2]
                let data = {
                    token: token_table.tokens.div,
                    type: 'div',
                    class: classx,
                    id: id
                }
                json.push(data)
            }
            if (stack[i] == token_table.tokens.div_close) {
                let data = {
                    token: token_table.tokens.div_close,
                    type: 'enddiv',
                }
                json.push(data)
            }

            // NAV
            if (stack[i] == token_table.tokens.nav) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                let classx = stack[i+2]
                let data = {
                    token: token_table.tokens.nav,
                    type: 'nav',
                    class: classx,
                    id: id
                }
                json.push(data)
            }
            if (stack[i] == token_table.tokens.nav_close) {
                let data = {
                    token: token_table.tokens.nav_close,
                    type: 'endnav',
                }
                json.push(data)
            }

            // A-LINK
            if (stack[i] == token_table.tokens.a) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                let classx = stack[i+4]
                let msg = stack[i+6]
                let addr = stack[i+2]
                let data = {
                    token: token_table.tokens.a,
                    type: 'link',
                    href: addr,
                    content: msg,
                    class: classx,
                    id: id
                }
                json.push(data)
            }
            if (stack[i] == token_table.tokens.a_close) {
                let data = {
                    token: token_table.tokens.a_close,
                    type: 'endlink',
                }
                json.push(data)
            }

            // PARAGRAPH
            if (stack[i] == token_table.tokens.p) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.content_key) {
                    let msg = stack[i+2]
                    let data = {
                        token: token_table.tokens.p,
                        type: 'p',
                        content: msg.slice(1,-1),
                        id: id
                    }
                    json.push(data)
                } else if (stack[i+1] == token_table.tokens.class_key && stack[i+3] == token_table.tokens.content_key) {
                    let classx = stack[i+2]
                    let msg = stack[i+4]
                    let data = {
                        token: token_table.tokens.p,
                        type: 'p',
                        content: msg.slice(1,-1),
                        class: classx,
                        id: id
                    }
                    json.push(data)
                }
            }

            // TEXT
            if (stack[i] == token_table.tokens.text) {
                if (stack[i+1] == token_table.tokens.content_key) {
                    let msg = stack[i+2]
                    let data = {
                        token: token_table.tokens.text,
                        type: 'text',
                        content: msg.slice(1,-1)
                    }
                    json.push(data)
                }
            }

            // HEADER 1
            if (stack[i] == token_table.tokens.h1) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.content_key) {
                    let msg = stack[i+2]
                    let data = {
                        token: token_table.tokens.h1,
                        type: 'h1',
                        content: msg.slice(1,-1),
                        id: id
                    }
                    json.push(data)
                } else if (stack[i+1] == token_table.tokens.class_key && stack[i+3] == token_table.tokens.content_key) {
                    let classx = stack[i+2]
                    let msg = stack[i+4]
                    let data = {
                        token: token_table.tokens.h1,
                        type: 'h1',
                        content: msg.slice(1,-1),
                        class: classx,
                        id: id
                    }
                    json.push(data)
                }
            }

            // HEADER 2
            if (stack[i] == token_table.tokens.h2) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.content_key) {
                    let msg = stack[i+2]
                    let data = {
                        token: token_table.tokens.h2,
                        type: 'h2',
                        content: msg.slice(1,-1),
                        id: id
                    }
                    json.push(data)
                } else if (stack[i+1] == token_table.tokens.class_key && stack[i+3] == token_table.tokens.content_key) {
                    let classx = stack[i+2]
                    let msg = stack[i+4]
                    let data = {
                        token: token_table.tokens.h2,
                        type: 'h2',
                        content: msg.slice(1,-1),
                        class: classx,
                        id: id
                    }
                    json.push(data)
                }
            }

            // HEADER 3
            if (stack[i] == token_table.tokens.h3) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.content_key) {
                    let msg = stack[i+2]
                    let data = {
                        token: token_table.tokens.h3,
                        type: 'h3',
                        content: msg.slice(1,-1),
                        id: id
                    }
                    json.push(data)
                } else if (stack[i+1] == token_table.tokens.class_key && stack[i+3] == token_table.tokens.content_key) {
                    let classx = stack[i+2]
                    let msg = stack[i+4]
                    let data = {
                        token: token_table.tokens.h3,
                        type: 'h3',
                        content: msg.slice(1,-1),
                        class: classx,
                        id: id
                    }
                    json.push(data)
                }
            }

            // HEADER 4
            if (stack[i] == token_table.tokens.h4) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.content_key) {
                    let msg = stack[i+2]
                    let data = {
                        token: token_table.tokens.h4,
                        type: 'h4',
                        content: msg.slice(1,-1),
                        id: id
                    }
                    json.push(data)
                } else if (stack[i+1] == token_table.tokens.class_key && stack[i+3] == token_table.tokens.content_key) {
                    let classx = stack[i+2]
                    let msg = stack[i+4]
                    let data = {
                        token: token_table.tokens.h4,
                        type: 'h4',
                        content: msg.slice(1,-1),
                        class: classx,
                        id: id
                    }
                    json.push(data)
                }
            }

            // HEADER 5
            if (stack[i] == token_table.tokens.h5) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.content_key) {
                    let msg = stack[i+2]
                    let data = {
                        token: token_table.tokens.h5,
                        type: 'h5',
                        content: msg.slice(1,-1),
                        id: id
                    }
                    json.push(data)
                } else if (stack[i+1] == token_table.tokens.class_key && stack[i+3] == token_table.tokens.content_key) {
                    let classx = stack[i+2]
                    let msg = stack[i+4]
                    let data = {
                        token: token_table.tokens.h5,
                        type: 'h5',
                        content: msg.slice(1,-1),
                        class: classx,
                        id: id
                    }
                    json.push(data)
                }
            }

            // UNORDERED LIST
            if (stack[i] == token_table.tokens.unlist) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.class_key) {
                    let classx = stack[i+3]
                    let data = {
                        token: token_table.tokens.unlist,
                        type: 'unlist',
                        class: classx,
                        id: id
                    }
                    json.push(data)
                }
            }
            // END UNORDERED LIST
            if (stack[i] == token_table.tokens.endunlist) {
                let data = {
                    token: token_table.tokens.unlist,
                    type: 'endunlist',
                }
                json.push(data)
            }

            // ORDERED LIST
            if (stack[i] == token_table.tokens.orlist) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.class_key) {
                    let classx = stack[i+3]
                    let data = {
                        token: token_table.tokens.orlist,
                        type: 'orlist',
                        class: classx,
                        id: id
                    }
                    json.push(data)
                }
            }

            // END ORDERED LIST
            if (stack[i] == token_table.tokens.endorlist) {
                let data = {
                    token: token_table.tokens.endorlist,
                    type: 'endorlist',
                }
                json.push(data)
            }

            // LIST ITEM
            if (stack[i] == token_table.tokens.item) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                // LOGIC
                if (stack[i+1] == token_table.tokens.class_key) {
                    let classx = stack[i+2]
                    let data = {
                        token: token_table.tokens.item,
                        type: 'item',
                        class: classx,
                        id: id
                    }
                    json.push(data)
                } else {
                    let data = {
                        token: token_table.tokens.item,
                        type: 'item',
                        id: id
                    }
                    json.push(data)
                }
            }

            if (stack[i] == token_table.tokens.enditem) {
                let data = {
                    token: token_table.tokens.enditem,
                    type: 'enditem'
                }
                json.push(data)
            }

            if (stack[i] == token_table.tokens.input) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                let classx = stack[i+2]
                let typex = stack[i+4]

                // LOGIC
                if (stack[i+1] == token_table.tokens.class_key) {
                    let data = {
                        token: token_table.tokens.input,
                        typex: typex,
                        type: 'input',
                        class: classx,
                        id: id
                    }
                    json.push(data)
                } else {
                    let data = {
                        token: token_table.tokens.input,
                        typex: typex, 
                        type: 'input'
                    }
                    json.push(data)
                }

                
            }

            // IMG
            if (stack[i] == token_table.tokens.img) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                let src = stack[i+2]
                let width = stack[i+4]
                let height = stack[i+6]
                let classx = stack[i+8]

                // LOGIC
                if (stack[i+7] == token_table.tokens.class_key) {
                    let data = {
                        token: token_table.tokens.img,
                        src: src,
                        type: 'img',
                        class: classx,
                        width: width,
                        height: height,
                        id: id
                    }
                    json.push(data)
                } else {
                    let data = {
                        token: token_table.tokens.img,
                        src: src, 
                        type: 'img',
                        width: width,
                        height: height
                    }
                    json.push(data)
                }  
            }

            // LABEL
            if (stack[i] == token_table.tokens.label) {
                let data = {
                    token: token_table.tokens.label,
                    type: 'label',
                }
                json.push(data)
            }
            if (stack[i] == token_table.tokens.endlabel) {
                let data = {
                    token: token_table.tokens.endlabel,
                    type: 'endlabel',
                }
                json.push(data)
            }

            // FORM
            if (stack[i] == token_table.tokens.form) {
                let action = stack[i+2]
                let method = stack[i+4]

                if (stack[i+3] == token_table.tokens.method_key) {
                    let data = {
                        token: token_table.tokens.form,
                        action: action,
                        method: method, 
                        type: 'form',
                    }
                    json.push(data)
                } else {
                    let data = {
                        token: token_table.tokens.form,
                        action: action,
                        type: 'form',
                    }
                    json.push(data)
                }
            }
            if (stack[i] == token_table.tokens.endform) {
                let data = {
                    token: token_table.tokens.endform,
                    type: 'form',
                }
                json.push(data)
            }

            //SUBMIT
            if (stack[i] == token_table.tokens.submit) {
                let classx = stack[i+2]
                let content = stack[i+4]

                if (stack[i+1] == token_table.tokens.class_key) {
                    let data = {
                        token: token_table.tokens.submit,
                        type: 'submit',
                        class: classx,
                        content: content.slice(1,-1)
                    }
                    json.push(data)

                } else if (stack[i+1] == token_table.tokens.content_key) {
                    let data = {
                        token: token_table.tokens.submit,
                        type: 'submit',
                        content: classx.slice(1,-1)
                    }
                    json.push(data)
                                    
                }
            }

            if (stack[i] == token_table.tokens.break) {
                let data = {
                    token: token_table.tokens.break,
                    type: 'break',
                }
                json.push(data)
            }
            if (stack[i] == token_table.tokens.center) {
                let data = {
                    token: token_table.tokens.center,
                    type: 'center',
                }
                json.push(data)
            }
            if (stack[i] == token_table.tokens.endcenter) {
                let data = {
                    token: token_table.tokens.endcenter,
                    type: 'endcenter',
                }
                json.push(data)
            }

            if (stack[i] == token_table.tokens.video) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                let href = stack[i+2]
                let media = stack[i+4]
                let width = stack[i+6]

                let data = {
                    token: token_table.tokens.video,
                    type: 'video',
                    href: href,
                    media: media.slice(1,-1),
                    width: width,
                    id: id
                }
                json.push(data)

            }

            if (stack[i] == token_table.tokens.audio) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                let href = stack[i+2]
                let media = stack[i+4]

                let data = {
                    token: token_table.tokens.audio,
                    type: 'audio',
                    href: href,
                    media: media.slice(1,-1),
                    id: id
                }
                json.push(data)

            }


            if (stack[i] == token_table.tokens.table) {
                let data = {
                    token: token_table.tokens.table,
                    type: 'table'
                }
                json.push(data)

            }
            if (stack[i] == token_table.tokens.endtable) {
                let data = {
                    token: token_table.tokens.endtable,
                    type: 'endtable'
                }
                json.push(data)

            }
            if (stack[i] == token_table.tokens.row) {
                let data = {
                    token: token_table.tokens.row,
                    type: 'row'
                }
                json.push(data)

            }
            if (stack[i] == token_table.tokens.endrow) {
                let data = {
                    token: token_table.tokens.endrow,
                    type: 'endrow'
                }
                json.push(data)

            }
            if (stack[i] == token_table.tokens.header) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                let content = stack[i+2]

                let data = {
                    token: token_table.tokens.header,
                    type: 'header',
                    content: content.slice(1,-1),
                    id: id
                }
                json.push(data)

            }
            if (stack[i] == token_table.tokens.data) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                let content = stack[i+2]

                let data = {
                    token: token_table.tokens.data,
                    type: 'data',
                    content: content.slice(1,-1),
                    id: id
                }
                json.push(data)

            }

            if (stack[i] == token_table.tokens.section) {
                // DEFINE ID
                let id
                if (
                    stack[i-1] &&
                    stack[i-1].slice(0,1) == token_table.tokens.id_key.slice(0,1)
                    && stack[i-1].slice(-1) == token_table.tokens.id_key.slice(-1)
                ) {
                    id = stack[i-1].slice(1,-1)
                }

                let data = {
                    token: token_table.tokens.section,
                    type: 'section',
                    id: id
                }
                json.push(data)

            }

            if (stack[i] == token_table.tokens.endsection) {
                let data = {
                    token: token_table.tokens.endsection,
                    type: 'endsection',
                }
                json.push(data)

            }
        }
    })
    return json
    console.log(dump(json, {depth: null}))
    
}

module.exports = { GenerateAST, var_collection, func_collection, import_collection }