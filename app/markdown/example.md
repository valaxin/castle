[//]: # ({"title": "Example Article","creation": "01/01/1999","summary": "Covering most if not all of the available features when writing a markdown post in this enviroment."})

> This document is to outline some concepts employed within the project. Starting with the front and moving into the back covering the phalosphy in the design choices I've made.

# Heading H1

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Sit amet consectetur adipiscing elit pellentesque. Risus at ultrices mi tempus imperdiet nulla malesuada. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Posuere sollicitudin aliquam ultrices sagittis orci a. Mattis rhoncus urna neque viverra justo nec. Eu volutpat odio facilisis mauris sit amet. Ac turpis egestas maecenas pharetra convallis. Ut diam quam nulla porttitor.

## Heading H2

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Heading H3

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Sit amet consectetur adipiscing elit pellentesque.

#### Heading H4

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

##### Heading H5

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

###### Heading H6

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Examples

### Horizontal Rules

___

---

***

### Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'

### Emphasis

**This is bold text**

**This is bold text**

*This is italic text*

*This is italic text*

~~Strikethrough~~

### Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

### Lists

#### Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  + Marker character change forces new list start:
    + Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    + Nulla volutpat aliquam velit
+ Very easy!

#### Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

You can start numbering with offset:

57. foo
1. bar

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::

::: spoiler
*here be spoilers*
:::

::: information
*here be information*
:::

### Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

### Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link <https://github.com/nodeca/pica> (enable linkify to see)

### Images

![Perched Birds - James Frid > Pexels](https://images.pexels.com/photos/2569232/pexels-photo-2569232.jpeg)

![Oleg Prachuk > Pexels](https://images.pexels.com/photos/21419467/pexels-photo-21419467/free-photo-of-view-of-red-toyota-crown-comfort-taxis-on-a-street-in-hong-kong-china.jpeg "Oleg Prachuk > Pexels")

Like links, Images also have a footnote style syntax

![Famicom - Stas Knop > Pexels][id]

With a reference later in the document defining the URL location:

[id]: https://images.pexels.com/photos/9100862/pexels-photo-9100862.jpeg  "Famicom - Stas Knop > Pexels"

### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.

### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

+ 19^th^
+ H~2~O

### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++

### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==

### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

*Compact style:*

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b

### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language
