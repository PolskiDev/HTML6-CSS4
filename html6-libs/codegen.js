const process = require('process')
const args = process.argv.slice(2)
const util = require('util')
const dump = util.inspect
const fs = require('fs')
const lexer = require('./ast-lexer-parser')
const { tokens } = require('./token_table')


function CodeGen(input, output, mode='normal') {
    let codegen = lexer.GenerateAST(input)
    for (var i = 0; i < codegen?.length; i++) {
        if (codegen[i].type == 'html') {
            fs.writeFileSync(output, '<!DOCTYPE html><html>')
        }
        else if (codegen[i].type == 'endhtml') {
            fs.appendFileSync(output, '</html>')
        }
        
        else if (codegen[i].type == 'head') {
            fs.appendFileSync(output, '<head>')
        }
        else if (codegen[i].type == 'endhead') {
            fs.appendFileSync(output, '</head>')
        }

        else if (codegen[i].type == 'body') {
            fs.appendFileSync(output, '<body>')
        }
        else if (codegen[i].type == 'endbody') {
            fs.appendFileSync(output, '</body>')
        }

        else if (codegen[i].type == 'div') {
            if (codegen[i].id) {
                fs.appendFileSync(output, `<div id="${codegen[i].id}" class=${codegen[i].class}>`)
            } else {
                fs.appendFileSync(output, `<div class=${codegen[i].class}>`)
            }
        }
        else if (codegen[i].type == 'enddiv') {
            fs.appendFileSync(output, '</div>')
        }

        else if (codegen[i].type == 'link') {
            if (codegen[i].content) {
                fs.appendFileSync(output, `<a href=${codegen[i].href} class=${codegen[i].class}>${codegen[i].content}</a>`)
            } else {
                fs.appendFileSync(output, `<a href=${codegen[i].href} class=${codegen[i].class}>`)
            }
        }
        else if (codegen[i].type == 'endlink') {
            fs.appendFileSync(output, '</a>')
        }

        else if (codegen[i].type == 'nav') {
            if (codegen[i].id) {
                fs.appendFileSync(output, `<nav id="${codegen[i].id}" class=${codegen[i].class}>`)
            } else {
                fs.appendFileSync(output, `<nav class=${codegen[i].class}>`)
            }
        }
        else if (codegen[i].type == 'endnav') {
            fs.appendFileSync(output, '</nav>')
        }

        else if (codegen[i].type == 'title') {
            if (codegen[i].id) {
                fs.appendFileSync(output, `<title id="${codegen[i].id}">${codegen[i].content}</title>`)
            } else {
                fs.appendFileSync(output, `<title>${codegen[i].content}</title>`)
            }
        }
        else if (codegen[i].type == '@import') {
            if (codegen[i].content == 'css') {
                fs.appendFileSync(output, `<link rel="stylesheet" href=${codegen[i].url}>`)
            } else if (codegen[i].content == 'javascript') {
                fs.appendFileSync(output, `<script src=${codegen[i].url}></script>`)
            }
        }

        else if (codegen[i].type == 'text') {
            fs.appendFileSync(output, `${codegen[i].content}`)
        }
        else if (codegen[i].type == 'p') {
            if (codegen[i].class) {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<p id="${codegen[i].id}" class=${codegen[i].class}>${codegen[i].content}</p>`)
                } else {
                    fs.appendFileSync(output, `<p class=${codegen[i].class}>${codegen[i].content}</p>`)
                }
            } else {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<p id="${codegen[i].id}">${codegen[i].content}</p>`)
                } else {
                    fs.appendFileSync(output, `<p>${codegen[i].content}</p>`)
                }
            }
        }
        else if (codegen[i].type == 'h1') {
            if (codegen[i].class) {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h1 id="${codegen[i].id}" class=${codegen[i].class}>${codegen[i].content}</h1>`)
                } else {
                    fs.appendFileSync(output, `<h1 class=${codegen[i].class}>${codegen[i].content}</h1>`)
                }
            } else {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h1 id="${codegen[i].id}">${codegen[i].content}</h1>`)
                } else {
                    fs.appendFileSync(output, `<h1>${codegen[i].content}</h1>`)
                }
            }
        }
        else if (codegen[i].type == 'h2') {
            if (codegen[i].class) {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h2 id="${codegen[i].id}" class=${codegen[i].class}>${codegen[i].content}</h2>`)
                } else {
                    fs.appendFileSync(output, `<h2 class=${codegen[i].class}>${codegen[i].content}</h2>`)
                }
            } else {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h2 id="${codegen[i].id}">${codegen[i].content}</h2>`)
                } else {
                    fs.appendFileSync(output, `<h2>${codegen[i].content}</h2>`)
                }
            }
        }
        else if (codegen[i].type == 'h3') {
            if (codegen[i].class) {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h3 id="${codegen[i].id}" class=${codegen[i].class}>${codegen[i].content}</h3>`)
                } else {
                    fs.appendFileSync(output, `<h3 class=${codegen[i].class}>${codegen[i].content}</h3>`)
                }
            } else {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h3 id="${codegen[i].id}">${codegen[i].content}</h3>`)
                } else {
                    fs.appendFileSync(output, `<h3>${codegen[i].content}</h3>`)
                }
            }
        }
        else if (codegen[i].type == 'h4') {
            if (codegen[i].class) {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h4 id="${codegen[i].id}" class=${codegen[i].class}>${codegen[i].content}</h4>`)
                } else {
                    fs.appendFileSync(output, `<h4 class=${codegen[i].class}>${codegen[i].content}</h4>`)
                }
            } else {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h4 id="${codegen[i].id}">${codegen[i].content}</h4>`)
                } else {
                    fs.appendFileSync(output, `<h4>${codegen[i].content}</h4>`)
                }
            }
        }
        else if (codegen[i].type == 'h5') {
            if (codegen[i].class) {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h5 id="${codegen[i].id}" class=${codegen[i].class}>${codegen[i].content}</h5>`)
                } else {
                    fs.appendFileSync(output, `<h5 class=${codegen[i].class}>${codegen[i].content}</h5>`)
                }
            } else {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<h5 id="${codegen[i].id}">${codegen[i].content}</h5>`)
                } else {
                    fs.appendFileSync(output, `<h5>${codegen[i].content}</h5>`)
                }
            }
        }
        else if (codegen[i].type == 'unlist') {
            if (codegen[i].class) {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<ul id="${codegen[i].id}" class=${codegen[i].class}>`)
                } else {
                    fs.appendFileSync(output, `<ul class=${codegen[i].class}>`)
                }
            } else {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<ul id="${codegen[i].id}">`)
                } else {
                    fs.appendFileSync(output, `<ul>`)
                }
            }
        }
        else if (codegen[i].type == 'orlist') {
            if (codegen[i].class) {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<ol id="${codegen[i].id}" class=${codegen[i].class}>`)
                } else {
                    fs.appendFileSync(output, `<ol class=${codegen[i].class}>`)
                }
            } else {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<ol id="${codegen[i].id}">`)
                } else {
                    fs.appendFileSync(output, `<ol>`)
                }
            }
        }
        else if (codegen[i].type == 'item') {
            if (codegen[i].class) {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<li id="${codegen[i].id}" class=${codegen[i].class}>`)
                } else {
                    fs.appendFileSync(output, `<li class=${codegen[i].class}>`)
                }
            } else {
                if (codegen[i].id) {
                    fs.appendFileSync(output, `<li id="${codegen[i].id}">`)
                } else {
                    fs.appendFileSync(output, `<li>`)
                }
            }
        }
        else if (codegen[i].type == 'unlist') {
            fs.appendFileSync(output, `</ul>`)
        }
        else if (codegen[i].type == 'orlist') {
            fs.appendFileSync(output, `</ol>`)
        }
        else if (codegen[i].type == 'enditem') {
            fs.appendFileSync(output, `</li>`)
        }

        else if (codegen[i].type == 'input') {
            fs.appendFileSync(output, `<input type=${codegen[i].typex} class=${codegen[i].class}>`)
        }

        else if (codegen[i].type == 'label') {
            fs.appendFileSync(output, `<label>`)
        }
        else if (codegen[i].type == 'endlabel') {
            fs.appendFileSync(output, `</label>`)
        }

        else if (codegen[i].type == 'form') {
            if (codegen[i].method) {
                fs.appendFileSync(output, `<form action=${codegen[i].action} method=${codegen[i].method}>`)
            } else {
                fs.appendFileSync(output, `<form action=${codegen[i].action}>`)
            }
        }
        else if (codegen[i].type == 'endform') {
            fs.appendFileSync(output, `</form>`)
        }

        else if (codegen[i].type == 'submit') {
            if (codegen[i].class) {
                fs.appendFileSync(output, `<button type="submit" class=${codegen[i].classx}>${codegen[i].content}</button>`)
            } else {
                fs.appendFileSync(output, `<button type="submit">${codegen[i].content}</button>`)
            }
        }
        else if (codegen[i].type == 'break') {
            fs.appendFileSync(output, `<br>`)
        }
        else if (codegen[i].type == 'center') {
            fs.appendFileSync(output, `<center>`)
        }
        else if (codegen[i].type == 'endcenter') {
            fs.appendFileSync(output, `</center>`)
        }
        else if (codegen[i].type == 'video') {
            if (codegen[i].id) {
                fs.appendFileSync(output, `<video id="${codegen[i].id}" width=${codegen[i].width} controls="controls"><source src=${codegen[i].href} type="video/${codegen[i].media}"></video>`)
            } else {
                fs.appendFileSync(output, `<video width=${codegen[i].width} controls="controls"><source src=${codegen[i].href} type="video/${codegen[i].media}"></video>`)
            }
        }
        else if (codegen[i].type == 'audio') {
            if (codegen[i].id) {
                fs.appendFileSync(output, `<audio id="${codegen[i].id}" controls="controls">
                <source src=${codegen[i].href} type="audio/${codegen[i].media}" />
                </audio>`)
            } else {
                fs.appendFileSync(output, `<audio controls="controls">
                <source src=${codegen[i].href} type="audio/${codegen[i].media}" />
                </audio>`)
            }
        }
        else if (codegen[i].type == 'header') {
            if (codegen[i].id) {
                fs.appendFileSync(output, `<th id="${codegen[i].id}">${codegen[i].content}</th>`)
            } else {
                fs.appendFileSync(output, `<th>${codegen[i].content}</th>`)
            }
        }
        else if (codegen[i].type == 'data') {
            if (codegen[i].id) {
                fs.appendFileSync(output, `<td id="${codegen[i].id}">${codegen[i].content}</td>`)
            } else {
                fs.appendFileSync(output, `<td>${codegen[i].content}</td>`)
            }
        }
        else if (codegen[i].type == 'row') {
            fs.appendFileSync(output, `<tr>`)
        }
        else if (codegen[i].type == 'endrow') {
            fs.appendFileSync(output, `</tr>`)
        }
        else if (codegen[i].type == 'table') {
            fs.appendFileSync(output, `<table>`)
        }
        else if (codegen[i].type == 'endtable') {
            fs.appendFileSync(output, `</table>`)
        }

        else if (codegen[i].type == 'section') {
            if (codegen[i].id) {
                fs.appendFileSync(output, `<section id="${codegen[i].id}">`)
            } else {
                fs.appendFileSync(output, `<section>`)
            }
        }
        else if (codegen[i].type == 'endsection') {
            fs.appendFileSync(output, `</section>`)
        }
        
        //console.log("DEBUGGING: "+dump(codegen[i]))
    }
    if (mode == 'debugging') {
        console.log(codegen)
    }
    
    
}

module.exports = { CodeGen }
