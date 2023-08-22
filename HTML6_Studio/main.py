#!/usr/local/bin/python3

from tkinter import *
#import ctypes
import re
import os
#from fontTools.ttLib import TTFont
import tkinter.font as tkfont
from tkinter.filedialog import asksaveasfile
from tkinter.filedialog import askopenfilename
from tkinter import simpledialog
from tkinter import filedialog
from tkinter import messagebox
import subprocess
import platform
# Increas Dots Per inch so it looks sharper
#ctypes.windll.shcore.SetProcessDpiAwareness(True)

global filename_global

# Setup Tkinter
root = Tk()
root.geometry('1800x900+50+50')
root.iconbitmap("html6studio.png")
root.title("HTML6 Studio")


openx = None

# Register Changes made to the Editor Content
def changes(event=None):
    global previousText

    # If actually no changes have been made stop / return the function
    if editArea.get('1.0', END) == previousText:
        return

    # Remove all tags so they can be redrawn
    for tag in editArea.tag_names():
        editArea.tag_remove(tag, "1.0", "end")

    # Add tags where the search_re function found the pattern
    i = 0
    for pattern, color in repl:
        for start, end in search_re(pattern, editArea.get('1.0', END)):
            editArea.tag_add(f'{i}', start, end)
            editArea.tag_config(f'{i}', foreground=color)

            i+=1

    previousText = editArea.get('1.0', END) 

def search_re(pattern, text, groupid=0):
    matches = []

    text = text.splitlines()
    for i, line in enumerate(text):
        for match in re.finditer(pattern, line):

            matches.append(
                (f"{i + 1}.{match.start()}", f"{i + 1}.{match.end()}")
            )

    return matches


def rgb(rgb):
    return "#%02x%02x%02x" % rgb


previousText = ''

# Define colors for the variouse types of tokens
normal = rgb((234, 234, 234))
keywords = rgb((234, 95, 95))
#comments = rgb((128, 128, 128))
string = rgb((233, 195, 56))
function = rgb((95, 211, 234))
background = rgb((42, 42, 42))
modifiers = rgb((102, 178, 255))
digits = rgb((204,153,255))
secondary = rgb((204,118,209))
#boolean = rgb((16,155,131))


#TTF = TTFont("mono.ttf")
font_name = "Monaco"
font_size = 21
font = font_name+' '+str(font_size)


# Define a list of Regex Pattern that should be colored in a certain way
repl = [
    ['(.document|html|head|body|endhtml|endbody|endhead|title|div|nav|enddiv|endnav|form|endform|hover|visited|active|break)', keywords],
    ['".*?"', string],
    ['\'.*?\'', string],
    #['//.*?$', comments],
    ['([0-9]|h1|h2|h3|h4|h5|p |px|center|bold|italic|normal)', digits],
    ['(link|endlink|img|input|orlist|unlist|endorlist|endunlist|item|enditem|@import|text)', secondary],
    ['(content=|class=|type=|url=|src=|width=|height=|action=|method=|href=|center|right|left|normal|endcenter|label=)', modifiers],
    
    ['(class|element|on)', modifiers],
    ['(alignment|text-color|bg-color|font-weight|font|margin-all|margin-top|margin-bottom|margin-left|margin-right|padding-all|padding-top|padding-bottom|padding-left|padding-right|max-width|max-height|bg-img)', function]
]

# Make the Text Widget
# Add a hefty border width so we can achieve a little bit of padding
editArea = Text(
    root,
    background=background,
    foreground=normal,
    insertbackground=normal,
    relief=FLAT,
    borderwidth=30,
    font=font
)
font = tkfont.Font(font=editArea['font'])
tab = font.measure('    ')
editArea.config(tabs=tab)

# Place the Edit Area with the pack method
editArea.pack(
    fill=BOTH,
    expand=1
)

# Insert some Standard Text into the Edit Area
#editArea.insert('1.0', code.llc)



# Ferramentas
def save():
    answer = messagebox.askokcancel(title="HTML6 Studio",message="Save File?")
    if answer:
        # Verify if the saving file exists inside the directory
        if os.path.exists('temp'):
            # Write the Content to the Temporary File
            x = editArea.get('1.0', END)
            file = open(Arq,'w')
            file.write(str(x))
            file.close()
            
        else:
            # Ask for filename
            Arq = asksaveasfile(filetypes=[("HTML6","*.html6"),("CSS4","*.css4")]).name
            x = editArea.get('1.0', END)
            print(Arq)

            # Write the Content to the Temporary File
            file = open(Arq,'w')
            file.write(str(x))
            file.close()

def build_html6():
    save()
    answer = messagebox.askokcancel(title="HTML6 Studio",message="Build HTML 6 File?")
    if answer:
        # Ask for filename
        # Arq = asksaveasfile(defaultextension=".por", filetypes=[("PortugolC Studio","*.por")]).name
        messagebox.showinfo("Warning","Select file you want to build")
        selected_file = filedialog.askopenfilename()
        Arq = '.html6-swap'    #simpledialog.askstring("Main binary", "Main source name", parent=root)
        x = editArea.get('1.0', END)
        print(Arq)

        # Write the Content to the Temporary File
        file = open(Arq,'w')
        file.write(str(x))
        file.close()

        # if platform.system() == 'Windows':


        # COMPILE AND EXECUTE BINARY
        # cmd = "cd "+selected_folder+" && portugolc "+Arq+" -o "+Arq.replace(".por","")+" && ./"+Arq.replace(".por","")
        # os.system(cmd)

        # ONLY COMPILE TO BINARY
        cmd = "html6c "+selected_file+" -o "+selected_file.replace(".html6","")
        os.system(cmd)
        messagebox.showinfo("Build Success","Successfully build HTML 6 source-file")

def build_css4():
    save()
    answer = messagebox.askokcancel(title="HTML6 Studio",message="Build CSS 4 File?")
    if answer:
        # Ask for filename
        # Arq = asksaveasfile(defaultextension=".por", filetypes=[("PortugolC Studio","*.por")]).name
        messagebox.showinfo("Warning","Select file you want to build")
        selected_file = filedialog.askopenfilename()
        Arq = '.css4-swap'    #simpledialog.askstring("Main binary", "Main source name", parent=root)
        x = editArea.get('1.0', END)
        print(Arq)

        # Write the Content to the Temporary File
        file = open(Arq,'w')
        file.write(str(x))
        file.close()

        # if platform.system() == 'Windows':


        # COMPILE AND EXECUTE BINARY
        # cmd = "cd "+selected_folder+" && portugolc "+Arq+" -o "+Arq.replace(".por","")+" && ./"+Arq.replace(".por","")
        # os.system(cmd)

        # ONLY COMPILE TO BINARY
        cmd = "css4c "+selected_file+" -o "+selected_file.replace(".css4","")
        os.system(cmd)
        messagebox.showinfo("Build Success","Successfully build CSS 4 source-file")



def open_source():
    answer = messagebox.askokcancel(title="HTML6 Studio",message="Open source-file")
    if answer:
        #selected_folder = filedialog.askdirectory()
        answer = messagebox.showinfo(title="HTML6 Studio",message="Select the file you want to open")
        openx = filedialog.askopenfilename()
        x = open(openx,'r')
        x1 = x.read()
        x.close()
        editArea.delete('1.0', END)
        editArea.insert('1.0', x1)
        #my_label.config(text = my_text)
        ##filename_global = answer



def new_source():
    answer = messagebox.askokcancel(title="HTML6 Studio",message="New Project?")
    if answer:
        selected_folder = filedialog.askdirectory()
        created_project = simpledialog.askstring("New Project", "Write the name of the source-file",
                                    parent=root)
        #fs = open(selected_folder+'/'+created_project, "w")
        fs.write('')
        fs.flush()
        fs.close()
        open_source()


# Botoes
painel = Frame(root)
painel.pack(side=TOP, fill = BOTH)


Titulo = Label(painel, text="HTML6 Studio")
Titulo.config(font=("Arial", 15))
Titulo.pack(expand=True, fill=BOTH)

dir_path = os.path.dirname(os.path.realpath(__file__))

executar = PhotoImage(file=os.path.join(dir_path, 'executar.png'))
css4 = PhotoImage(file=os.path.join(dir_path, 'css4.png'))
abrir = PhotoImage(file=os.path.join(dir_path, 'abrir.png'))
novo = PhotoImage(file=os.path.join(dir_path, 'novo.png'))
armazenar = PhotoImage(file=os.path.join(dir_path, 'salvar.png'))

NewProject = Button(painel, image=novo, command=new_source, borderwidth=0)
NewProject.pack(side=LEFT, expand=True, fill=BOTH)


OpenProject = Button(painel, image=abrir,command=open_source, borderwidth=0)
OpenProject.pack(side=LEFT, expand=True, fill=BOTH)

SaveBtn = Button(painel, image=armazenar, command=save)
SaveBtn.pack(side=LEFT, expand=True, fill=BOTH)


SaveAndBuild = Button(painel, image=executar,command=build_html6, borderwidth=0)
SaveAndBuild.pack(side=LEFT, expand=True, fill=BOTH)

SaveAndBuild_CSS = Button(painel, image=css4,command=build_css4, borderwidth=0)
SaveAndBuild_CSS.pack(side=LEFT, expand=True, fill=BOTH)


# Bind the KeyRelase to the Changes Function
editArea.bind('<KeyRelease>', changes)


changes()
root.mainloop()
