# Frontmatter

## lang

- Type: `string`

- Details:

  Language for the page.

  This will override the `lang` option in your site config.

- Also see:
  - [Config > lang](./config.md#lang)

## title

- Type: `string`

- Details:

  Title for the page.

  If you don't specify `title` in frontmatter, content of the first level-one header (i.e. `# title`) will be used as the title.

## description

- Type: `string`

- Details:

  Description for the page.

  This will override the `description` option in your site config.

- Also see:
  - [Config > description](./config.md#description)

## head

- Type: `HeadConfig[]`

- Details:

  Extra tags in `<head>` tag for the page.

- Example:

```md
---
head:
  - - meta
    - name: foo
      content: bar
  - - link
    - rel: canonical
      href: foobar
---
```

  Rendered as:

```html
<head>
  <meta name="foo" content="bar" />
  <link rel="canonical" href="foobar" />
</head>
```

- Also see:
  - [Config > head](./config.md#head)

## date

- Type: `string`

- Details:

  Created date for the page.

  You should specify the date in the form of `yyyy-MM-dd`, or follow the [YAML Timestamp Type](https://yaml.org/type/timestamp.html). 

## permalink

- Type: `string`

- Details:

  Permalink for the page.

  This will override the default route path that determined by the file path of the page.

- Also see:
  - [Frontmatter > permalinkPattern](#permalinkpattern)
  - [Guide > Page > Routing](../guide/page.md#routing)

## permalinkPattern

- Type: `string`

- Details:

  Pattern to generate permalink for the page.

  This won't take effect if the `permalink` frontmatter has been set.

- Usage:

  |  Pattern  |         Description         |
  |-----------|-----------------------------|
  | `:year`   | Year part of created date   |
  | `:month`  | Month part of created date  |
  | `:day`    | Day part of created date    |
  | `:slug`   | Slug of page filename       |
  | `:raw`    | Raw route path              |

  The `:year`, `:month` and `:day` patterns are resolved according to the following priority:

  - The `date` frontmatter.
  - The filename that matches the date pattern `yyyy-MM-dd-foobar.md` or `yyyy-MM-foobar.md`.
  - The dirname that matches the date pattern `yyyy/MM/dd/foobar.md` or `yyyy/MM/foobar.md`.
  - Fallback to `1970-01-01`.

- Example:

  - Case 1:

    The page filename is `foo-bar.md`.

    The page frontmatter is:

```md
---
date: 2021-01-03
permalinkPattern: :year/:month/:day/:slug.html
---
```

    Then the permalink of the page would be `2021/01/03/foo-bar.html`.

  - Case 2:

    The page filename is `2021-01-03-bar-baz.md`.

    The page frontmatter is:

```md
---
permalinkPattern: :year/:month/:day/:slug.html
---
```

    Then the permalink of the page would be `2021/01/03/bar-baz.html`.

- Also see:
  - [Frontmatter > date](#date)
  - [Frontmatter > permalink](#permalink)

## layout

- Type: `string`

- Details:

  Layout for the page.
