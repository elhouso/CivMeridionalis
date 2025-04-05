# Guide to Editing the Yoahtl Website

## General Goals

A list of the current goals and objectives for the website can be found on the [GitHub Project](https://github.com/orgs/CivYoahtl/projects/3/views/1).

## Requirements

::: tip
If you only want to do a quick edit, and don't need to preview your changes, you don't need the following requirements. Using a simple text editor or GitHub's website to edit the Markdown files is fine.
:::

- [Node.js](https://nodejs.org/en/) (Use lts version)
- [Yarn](https://yarnpkg.com/getting-started/install) (Only install don't init or anything else)

## How to edit a page

Its really simple. All the content for the site is in the `docs` folder and are `Markdown` files. (If you need to learn Markdown, use the [Markdown Guide](https://www.markdownguide.org/).) Then, just add the content you want to the file. If you want to use extra Markdown features, refer to [Vitepress's Markdown Extensions](https://vitepress.vuejs.org/guide/markdown.html).

## Creating a page

To make a new page on the website, you need to decide on which section it falls under, the make the file under that folder in the `docs` folder. Make sure to name the file in [Camel Case](https://en.wikipedia.org/wiki/Camel_case) similar to what you intend to title the page. (If the title is long, you can shorten the file name.)

For example the title of `The Great War` would become the filename of `greatWar.md`. The reason the `.md` is added to the end of the name, is so that programs know that the file is a Markdown file.

Now that you have made the file, its time to make it accessible via the sidebar. Open up the `config.js` file in the `docs/.vitepress` folder. Scroll down until you see the `sidebar` section, then scroll until you see the section you put the file under. Then within that section, find an applicable sub section to put a link to the page.

For example a sub section may generically look like:

```json
{
    text: "Sub section",
    items: [
        { text: "First link", link: "/FOLDER/fileName" },
    ],
},
```

Now for example if you wanted to add a file under the `culture` section, with a full filename of `test.md`, and a title of `Test` it would be:

```json
{
    text: "Great Sub Section Name",
    items: [
        { text: "Test", link: "/culture/test" },
    ],
},
```

Now notice how the path for `link` is similar to the structure of how the files are laid out in the `docs` folder? Thats because your telling the website to go into the `culture` folder and find the file with the of `test`. Also notice how the `.md` wasn't included. Thats because **only** `.md` files should be placed within those folders, and it assumes as such.

## WTF is Git?

You can learn more about Git & Github on [Github's Git Guide](https://github.com/git-guides).

## Advanced Usage

> For advanced users only

Optimize pdfs using: https://github.com/pts/pdfsizeopt

Get Discord profile from id: https://toolscord.com/