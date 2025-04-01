

This is a professional front-end template for building web apps and sites faster, without having to create the basic
setup on your own, every time you start a new project.

The template is based on the [Bootstrap Framework](http://getbootstrap.com/) in version 5 and
uses [Astro](https://astro.build/) for building websites faster. All common features for
front-end projects (like SCSS compilation, minifying of Assets, etc.) are included out of the box.

While developing, use the command `npm run dev` to serve the page with hot reloading enabled, 
so that you can see all changes in your code immediately. When you're done, just run 
the `npm run build` command and upload all files from the `dist` folder.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── svg/
│   │   └── logos/
│   │   └── icons/
│   │   └── illustrations/
│   └── images/
├── src/
│   ├── js/
│   │   └── components/
│   │   └── pages/
│   │   └── utils/
│   ├── scss/
│   │   └── abstracts/
│   │   │   └── functions/
│   │   │   └── mixins/
│   │   │   └── _variables.scss
│   │   └── base/
│   │   │   └── _base.scss
│   │   │   └── _fonts.scss
│   │   │   └── _helpers.scss
│   │   │   └── _typography.scss
│   │   │   └── ...
│   │   └── components/
│   │   │   └── _button.scss
│   │   │   └── ...
│   │   └── layout/
│   │   │   └── _header.scss
│   │   │   └── _footer.scss
│   │   │   └── ...
│   │   └── pages/
│   │   └── vendors/
│   │   │   └── _litepicker.scss
│   │   │   └── ...
│   │   └── main.scss
│   ├── components/
│   │   └── common/
│   │   │   └── Forms
│   │   │   │   └── Button.jsx
│   │   │   │   └── Input.jsx
│   │   │   │   └── Password.jsx
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── product-one/
│   │   │   └── common
│   │   │   └── product-one-feature-one/
│   │   │   └── product-one-feature-two/
│   ├── layouts/
│   │   └── Base.astro
│   │   └── Public.astro
│   │   └── Admin.astro
│   │   └── ...
│   └── pages/
│   │   └── product-one/
│   │   │   └── product-one-feature-one/
│   │   │   └── product-one-feature-two/
│   │   │   └── ...
│   │   └── product-two/
│   │   │   └── product-two-feature-one/
│   │   │   └── product-two-feature-two/
│   │   │   └── ...
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## 👀 Create new page

In `src/pages` create `index.astro` or `subpage/index.astro` to create new pages

## 👀 Create Components

To create new component create a new file inside components folder as `ComponentName.jsx` or `ComponentName.astro`.

## Import Component

Components can be imported as follow

`import ComponentName from 'path/to/component'`

## Coding Conventions

- Use 4 space indentation for html, js, and scss
- Install the [EditorConfig](https://editorconfig.org/) plugin for the editor/IDE you are using.
- Follow the [Sass Guidelines](https://sass-guidelin.es/). _(4 space indentation is an exception)_
