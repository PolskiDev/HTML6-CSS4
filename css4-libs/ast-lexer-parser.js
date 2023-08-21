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
    let regex = /[A-Za-z0-9\_$++::\.,@*#?\-><>=<=>===\{\}:=\[\]]+|"[^"]+"|'[^']+'|\([^)]*\)|\[[^\]]*\]|\/[^)/]*\/|(:)|(=)/g
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
                    type: 'document'
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.class_def) {
                let mode
                if (stack[i+2] == token_table.tokens.class_on) {
                    mode = stack[i+3]
                }
                let data = {
                    token: token_table.tokens.class_def,
                    type: 'class',
                    name: stack[i+1],
                    mode: mode

                }
                json.push(data);
            }
            // ELEMENT I
            if (stack[i] == token_table.tokens.element && stack[i+2] == token_table.tokens.open_block) {
                let mode
                if (stack[i+2] == token_table.tokens.class_on) {
                    mode = stack[i+3]
                }
                let data = {
                    token: token_table.tokens.element,
                    type: 'element',
                    name: line.slice(line.indexOf(token_table.tokens.element)+token_table.tokens.element.length+1).replace(token_table.tokens.open_block,""),
                    mode: mode
                }
                json.push(data);
            }

            // ELEMENT II
            if (stack[i] == token_table.tokens.element && stack[i+2] == token_table.tokens.class_on && stack[i+4] == token_table.tokens.open_block) {
                let mode = stack[i+3]
                let data = {
                    token: token_table.tokens.element,
                    type: 'element',
                    name: stack[i+1],
                    mode: mode
                }
                json.push(data);
            }


            if (stack[i] == token_table.tokens.close_block) {
                let data = {
                    token: token_table.tokens.close_block,
                    type: 'end'
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.alignment) {
                let data = {
                    token: token_table.tokens.alignment,
                    type: 'alignment',
                    value: line.slice(line.indexOf(token_table.tokens.alignment)+token_table.tokens.alignment.length+1)
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.textcolor) {
                let data = {
                    token: token_table.tokens.textcolor,
                    type: 'textcolor',
                    value: line.slice(line.indexOf(token_table.tokens.textcolor)+token_table.tokens.textcolor.length+1)
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.bgcolor) {
                let data = {
                    token: token_table.tokens.bgcolor,
                    type: 'bgcolor',
                    value: line.slice(line.indexOf(token_table.tokens.bgcolor)+token_table.tokens.bgcolor.length+1)
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.font) {
                let data = {
                    token: token_table.tokens.font,
                    type: 'font',
                    value: line.slice(line.indexOf(token_table.tokens.font)+token_table.tokens.font.length+1)
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.fontweight) {
                let data = {
                    token: token_table.tokens.fontweight,
                    type: 'fontweight',
                    value: line.slice(line.indexOf(token_table.tokens.fontweight)+token_table.tokens.fontweight.length+1)
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.bgimg) {
                let data = {
                    token: token_table.tokens.bgimg,
                    type: 'bgimg',
                    value: line.slice(line.indexOf(token_table.tokens.bgimg)+token_table.tokens.bgimg.length+1)
                }
                json.push(data);
            }


            // WIDTH & HEIGHT
            if (stack[i] == token_table.tokens.width) {
                let data = {
                    token: token_table.tokens.width,
                    type: 'width',
                    value: line.slice(line.indexOf(token_table.tokens.width)+token_table.tokens.width.length+1)
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.height) {
                let data = {
                    token: token_table.tokens.height,
                    type: 'height',
                    value: line.slice(line.indexOf(token_table.tokens.height)+token_table.tokens.height.length+1)
                }
                json.push(data);
            }

            // MARGIN
            if (stack[i] == token_table.tokens.margin_all) {
                let data = {
                    token: token_table.tokens.margin_all,
                    type: 'margin_all',
                    value: stack[i+1]
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.margin_top) {
                let data = {
                    token: token_table.tokens.margin_top,
                    type: 'margin_top',
                    value: stack[i+1]
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.margin_bottom) {
                let data = {
                    token: token_table.tokens.margin_bottom,
                    type: 'margin_bottom',
                    value: stack[i+1]
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.margin_left) {
                let data = {
                    token: token_table.tokens.margin_left,
                    type: 'margin_left',
                    value: stack[i+1]
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.margin_right) {
                let data = {
                    token: token_table.tokens.margin_right,
                    type: 'margin_right',
                    value: stack[i+1]
                }
                json.push(data);
            }

            // PADDING
            if (stack[i] == token_table.tokens.padding_all) {
                let data = {
                    token: token_table.tokens.padding_all,
                    type: 'padding_all',
                    value: stack[i+1]
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.padding_top) {
                let data = {
                    token: token_table.tokens.padding_top,
                    type: 'padding_top',
                    value: stack[i+1]
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.padding_bottom) {
                let data = {
                    token: token_table.tokens.padding_bottom,
                    type: 'padding_bottom',
                    value: stack[i+1]
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.padding_left) {
                let data = {
                    token: token_table.tokens.padding_left,
                    type: 'padding_left',
                    value: stack[i+1]
                }
                json.push(data);
            }
            if (stack[i] == token_table.tokens.padding_right) {
                let data = {
                    token: token_table.tokens.padding_right,
                    type: 'padding_right',
                    value: stack[i+1]
                }
                json.push(data);
            }

        }
    })
    return json
    console.log(dump(json, {depth: null}))
    
}

module.exports = { GenerateAST, var_collection, func_collection, import_collection }