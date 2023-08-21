#!/usr/bin/env node
const process = require('process')
const args = process.argv.slice(2)
const fs = require('fs')
const ast_lexer_parser = require('./css4-libs/ast-lexer-parser')
const codegen = require('./css4-libs/codegen')
const token_table = require('./css4-libs/token_table')
const { execSync } = require('child_process')


if (args[1] == '-ast') {
    console.log(ast_lexer_parser.GenerateAST(args[0]))

} else if (args[1] == '-o') {
    codegen.CodeGen(args[0], args[2]+'.css', 'normal')

} else {
    console.log("\n                   CSS 4")
    console.log("------------------------------------------------------")
    console.log("Syntax:       css4c  <options>")
    console.log("------------------------------------------------------\n\n")

    /*console.log("Plataformas suportadas:")
    console.log("linux               GNU/Linux")
    console.log("windows             Microsoft Windows")
    console.log("darwin              Apple MacOS X")
    console.log("openbsd             OpenBSD")
    console.log("netbsd              NetBSD")
    console.log("dragonfly           DragonflyBSD")
    console.log("solaris             SunOS/Solaris")
    console.log("android             Android")
    console.log("javascript          JS")
    console.log("aix                 AIX")
    console.log("illumos             Illumos")
    console.log("plan9               Plan9\n\n")


    console.log("Arquiteturas de processador suportadas:")
    console.log("386                 x86 (32-bit)")
    console.log("amd64               x86 (64-bit)")
    console.log("arm                 ARM (32-bit)")
    console.log("arm64               ARM (64-bit)\n")


    console.log("ppc                 PowerPC (32-bit)")
    console.log("ppc64               PowerPC (64-bit)")
    console.log("ppc64l3             PowerPC LE (64-bit)\n")


    console.log("sparc               SPARC (32-bit)")
    console.log("sparc64             SPARC (64-bit)\n")


    console.log("riscv               RISC-V (32-bit)")
    console.log("riscv64             RISC-V (64-bit)\n")

    console.log("s390                S390")
    console.log("s390x               S390x\n")

    console.log("sparc               SPARC (32-bit)\n")

    console.log("arm64be             ARM BE(64-bit)\n")

    console.log("loong64             LOONG (64-bit)\n")

    console.log("mips                MIPS (32-bit)")
    console.log("mips64              MIPS (64-bit)")
    console.log("mips64le            MIPS LE (64-bit)")
    console.log("mips64p32           MIPS P32 (64-bit)")
    console.log("mips64p32le         MIPS P32LE (64-bit)")
    console.log("mipsle              MIPS LE\n\n")

    console.log("wasm                WebAssembly\n\n")*/
    

    //console.log("--------------------------------------------------------------------------------\n\n")
    console.log("Options:\n")

    console.log("<filename>.css4   -o    <filename>            Output is a CSS 3 file (.css)\n")

    console.log("<filename>.css4   -ast                        Show Abstract Syntax Tree (AST)\n\n")

    console.log("--------------------------------------------------------------------------------\n\n")
}

