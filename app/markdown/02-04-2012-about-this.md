[//]: # ({ "title": "About This Project", "creation": "03/30/2022", "summary": "This document is to outline some concepts employed within the project. Starting with the front and moving into the back covering the phalosphy in the design choices I've made" })

> This document is to outline some concepts employed within the project. Starting with the front and moving into the back covering the phalosphy in the design choices I've made.


### Markup, Markdown & Styles

---

The front end is handled by a `webpack` build script that works to generate the "big three" needed for the creation of a website. Before compilation these different dependencies are abstracted away from the default language/syntax to give us additonal flexability and functionality. For starters the markup is written in the `pug` templating language, reasons for this include the ability to preform "light" mutations on the template at complie time, and to leverage the `:filter()` option for ingesting markdown article files, along with the use of partial files makes isolating/reusing code trival. Being able to write posts in markdown was a core motivator for choosing pug as the template language. I was able to learn more about the internals of webpack by writing my own plugin to dynamically add pug filtered markdown to the website, you can see the code for this within `/lib/markdown-pug-plugin`.

There are some pre-requisites needed for this build process to begin successfully. A configuration object is required within the webpack config itself

```javascript

const config = {
  mode: true,
  paths: {
    _: './src',
    static: 'assets',
    templates: 'views',
    markdown: 'markdown'
  },
  output: ['./dist', 'bundle.js']
}

```
#### Key/Value Overview:

`mode`: This can be overwritten from the CLI to have the build operate either in development or production mode with the `MODE` flag, defaults to `true(development)`.

`paths`: An object that contains the directory names that need to be understood and handed to webpack and plugins within. they're rather straight forward but: 
  - `./src/views` > pug template partials.
  - `./src/static` > static assets copied to the output directory.
  - `./src/markdown` > location of all markdown posts later ingested into pug template markup.

`output`: where to save the compiled content index zero is the path relative to project root, and index one is the file name webpack will use for the main bundle.

#### Styles:

The projects stylesheets are ingested via an `import` statment in our `./src/index.js` written in `scss/sass` syntax, when production flag is present `main.css` is created and placed in the output directory in this case `./dist` otherwise it's served via webpack dev server for hot reloading.

### Built for Netlify

This project, from the beginning is intended to be run on Netlify "serverless" stack, Because of this a `netlify.toml` configuration file is required. you can check the spec for these files [here](https://docs.netlify.com/configure-builds/file-based-configuration/) not many options are required consider the following example:

```toml

[build]
  command = "npm run build"
  functions = "./functions"
  publish = "./dist"
  pretty_urls = true

[[redirects]]
  from = '/index.html'
  to = '/'

[[headers]]
  for = "/*"
  [headers.values]
    Permissions-Policy = "interest-cohort=()"

```

As you'll notice we declare a `./functions` path for use with Netlify's lambda functions, they're code that runs like a restful API accessable via `.netlify/functions/%FUNCTION_NAME%` to keep our feedback loop as small as possible this project makes use of the `netlify-lambda` tool for `node.js` to mimic our live enviroment as closely as possible. To set this up we create a proxy rule within the webpack dev server. `netlify-lamba` runs it's own at `localhost:9000` so we write a rewrite rule to redirect our traffic there as to preserve our uri sechema. the proxy should look something like this

``` javascript

proxy: {
    '/.netlify': {
      target: 'http://localhost:9000',
      pathRewrite: {
        '^/.netlify/functions': ''
      }
    }
  }

```

The last bit I'll mention about the markdown documents is that there is comment support, but it behaves differently when comparied to something like jeckle or hugo. the comment structure is almost literal JSON within the document, typically at the top of the document but can be placed anywhere. here is an example of this here:

```
[//]: # ({"static": { "title": "About This Project", "creation": "03/30/2022" }})`
```

---
