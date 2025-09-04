---
title: Code
published: 08/2025
tags: hello-world testing tag
summary: The first entry on this website, most content is for testing purposes.
thumbnail: '@images/resources/castle.jpg'
author: '@valaxin'
visible: true
---

# code

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