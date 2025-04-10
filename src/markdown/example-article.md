[//]: # ({"title": "Example Article","creation": "01/01/1999", "author": "valaxin", "summary": "Covering most if not all of the available features when writing a markdown post in this enviroment."})

> This document is to outline some concepts employed within the project. Starting with the front and moving into the back covering the phalosphy in the design choices I've made.

# Heading H1

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Sit amet consectetur adipiscing elit pellentesque. Risus at ultrices mi tempus imperdiet nulla malesuada. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Posuere sollicitudin aliquam ultrices sagittis orci a. Mattis rhoncus urna neque viverra justo nec. Eu volutpat odio facilisis mauris sit amet. Ac turpis egestas maecenas pharetra convallis. Ut diam quam nulla porttitor.

Using two asterisks **this text is bold**.  
Two underscores __work as well__.  
Let's make it *italic now*.  
You guessed it, _one underscore is also enough_.  
Can we combine **_both of that_?** Absolutely.
What if I want to ~~strikethrough~~?
Also ==highlighted text== is supported

```javascript
console.log('hello world');
```

```shell
cat dictonary.txt | awk value > ./output.txt
```

## Heading h2
### Heading h3
#### Heading h4
##### Heading h5
###### Heading h6

---

::: warning
*here be dragons*
:::

::: information
*here be information*
:::

::: spoiler
*here be secrets*
:::

![alt text goes here](https://placehold.co/512x512)

![alt text goes here](https://placehold.co/1920x1080)

[[x]] + [[shift]]

[[ space ]]

## Something Else


Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Sit amet consectetur adipiscing elit pellentesque. Risus at ultrices mi tempus imperdiet nulla malesuada. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras.

## footnotes

#### I am working on a new project. [^1]
[^1]: Stack is: React, Typescript, Tailwind CSS  

Project is about music & movies.

##### Hope you will like it. [^see]
[^see]: Loading... ⌛️

>  Ac turpis egestas maecenas pharetra convallis. Ut diam quam nulla porttitor.

Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor orci eu lobortis elementum nibh tellus molestie nunc non, sit amet consectetur.

```go
package main

import (
  "fmt"
  "log"
  "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "Hello, World!")
}

func main() {
  http.HandleFunc("/", handler)
  log.Println("Server started on http://localhost:8080")
  log.Fatal(http.ListenAndServe(":8080", nil))
}
```

---

1. one
2. two
3. three

- another one
  - a nested one
- another one
- another one
  - nested again
    - nested again again

---

## embeded video

`@[youtube](dQw4w9WgXcQ)`

looks like 

@[youtube](dQw4w9WgXcQ)

## emojis

:smile: :wave: :dog: :cat: :laughing:

## a table

| Name  | Age |  City    |
|-------|-----|-------|
| Alice | 25  | New York |
| Bob   | 30  | London   |

## task list

- [x] Learn Markdown
- [ ] Learn Frontend Development
- [ ] Learn Full Stack Development
