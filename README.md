## ₊⁺ GRIDDERY ⁺₊

![Promo banner for the griddery plugin that reads 'Introducing an alternative masonry grid' at the top, followed by the word 'griddery', both stylized in all uppercase. What follows is a screenshot of how a group of 9 images shows when griddery has been applied; they appear in 3 columns, and the images are all related to the desert or have a desert color scheme. Helper text appears on the side that reads 'Unsplash images: dub.sh/griddery-images' which links to the Unsplash collection of images used in said banner. The footer reads 'Written by glenthemes', also stylized in all uppercase.](https://cdn.jsdelivr.net/gh/griddery/griddery.github.io/imgs/banner_r.png)

**Author:** @glenthemes  
**Version:** 4.0  
**Last updated:** 2026-03-03 12:26PM UTC-8

---

### Table of Contents:
- 👋 [About](#about)
- 👁️ [Demo + Preview](#️demo--preview)
- 🚀 [How to install](#how-to-install)
- 🛠️ [Options](#️options)
- ✨ [Multiple gridderies](#multiple-gridderies)
- 📝 [Further notes](#further-notes)
- 🫶 [Credits](#credits)
- 💖 [Attribution](#attribution)
- 🙋 [Questions?](#questions)

---

### 👋 About:

Inspired by David DeSandro's [masonry](https://masonry.desandro.com/), GRIDDERY is a script that automatically organizes elements of the same selector into a grid without relying on `height` and `position:absolute`, instead utilizing nested grids and `:nth-child` to sort elements into columns while retaining their left-to-right order.

**Requirements:**
- basic CSS/HTML knowledge
- basic JavaScript syntax knowledge

> [!TIP]
> 🎉 **VERSION 4.0 is out now!** 🎉<br>
> If you are still using the old versions, you do not have to do anything extra; the existing griddery script and stylesheets should still function properly.<br>
> If you prefer the old version(s) or still need to support them:<br>
> • [griddery v1.0 – docs](https://git.new/griddery-v1)<br>
> • [griddery v2.0 – docs](https://git.new/griddery-v2)<br>
> • [griddery v3.0 – docs](https://git.new/griddery-v3)

> [!IMPORTANT]  
> If you're a theme user from Tumblr and are looking to turn your theme from 1 column to e.g. 2 columns, **please ask your theme's maker if it's okay to do that first.**

---

### 👁️ Demo + Preview:

[**jsfiddle.net/glenthemes/axpzvhmb**](https://jsfiddle.net/glenthemes/axpzvhmb)

<details>
<summary>👉 Expand for demo description.</summary>
<br>

Firstly, a group of cats (`<img>`s with the attribute `cat`) placed in alphabetical order to show that when griddery is applied, they line up from left to right, though they're still sorted into columns.
- When the screen size is `500px` or above, the cats appear in 3 columns.
- When the screen size is between `400px` and `500px`, the cats appear in 2 columns.
- When the screen size is `400px` or below, the cats appear in 1 column.
- You can resize the preview window to see this in action.

Next, an unrelated piece of code that griddery won't intfere with.

Lastly, a group of dogs (`<img>`s with the attribute `dog`) placed in alphabetical order to show that when griddery is applied, they line up from left to right, though they're still sorted into columns.
- When the screen size is `500px` or above, the dogs appear in 2 columns.
- When the screen size is `375px` or below, the dogs appear in 1 column.
- You can resize the preview window to see this in action.

<sup>[/end demo description.]</sup>

</details>

---

### 🚀 How to install:

**1.** Add the following under `<head>` of your HTML:

```html
<!--✻✻✻✻✻✻  griddery by @glenthemes  ✻✻✻✻✻✻-->
<script src="//griddery.github.io/grid.min.js"></script>
<link href="//griddery.github.io/basics.min.css" rel="stylesheet">
<script>
document.addEventListener("DOMContentLoaded", () => {
    gridderyV4({
        items: ".posts", // change this to your grid item's selector
        columns: 2, // number of columns

        // optional responsiveness below:
        responsive: {
            breakpoints: {
                "min-width: 720px": 2,
                "max-width: 720px": 1,
            },
            basedOnGrid: false,
        }
    })
})
</script>
```

**2.** Add the following CSS (paste this somewhere between `<style>` and `</style>`):
```css
:root {
    --Griddery-Gap: 10px; /* change this to your grid spacing */
}
```

---

### 🛠️ Options:

| Name | Required or optional? | Accepted type(s) | Details |
| --- | --- | --- | --- |
| `container`&emsp; | optional | • `string`<br>• single element, e.g. `document.querySelector(".container")`<br>• multiple elements, e.g. `document.querySelectorAll(".container")` | The wrapper for your items; doesn't have to be the immediate parent. Defaults to `body` if not specified. |
| `gridAlign` | optional | `string`:<br>• `"top"`<br>• `"middle"`<br>• `"bottom"` | The vertical alignment of your grid items. Defaults to `"top"` if not specified. |
| `items` | **required** | `string` | The selector name of what you want to be wrapped; consider this as the "grid item". |
| `columns` | **required** | • `number`<br>• [`:root` CSS variable](https://codeburst.io/css-variables-explained-with-5-examples-84adaffaa5bd)<br>(e.g. `"var(--Columns)"` or `"--Columns"`) | Number of columns. |
| `responsive` | optional | `object` | 🖥️ Must be included if you want to change the number of columns based on screen size.<br><br>Holds the `breakpoints` objects within. |
| `breakpoints`   | optional | `object` | 🖥️ Must be included if you want to change the number of columns based on screen size.<br><br>Each line is a [CSS media query](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries) paired with the number of columns you want displayed at said screen size.<br><br>• e.g.`"min-width: 500px": 3` would display 3 columns when the screen is *at least* 500px wide.<br>• e.g. `"max-width:400px": 1` would display 1 column when the screen is *at most* 400px wide.<br><br>You can include as many breakpoints as you want.<br><br>💡**Tip:** Start with wide screens e.g. desktop sizes first, then decrease as you go.<br><br>💡**Tip:** For the first breakpoint, I suggest having the same column number as the fixed one assigned in the `columns` option above. You can see this in my [demo](https://jsfiddle.net/glenthemes/axpzvhmb). |
| `basedOnGrid` | optional | `true` or `false` | • `true`: your `breakpoints` option's media queries will be **based on the grid's width** rather than the screen width.<br>• `false`: your `breakpoints` option's media queries will be based on **the screen width** rather than the grid's width.<br><br>Useful if you wish to use griddery on a container that doesn't take up most of the screen width (e.g. an accompanying sidebar exists). |

---

### ✨ Multiple gridderies:

Assuming that we want to use griddery as follows:
- `.posts` with 2 columns and a grid spacing of `35px`
- `.photos` with 3 columns and a grid spacing of `10px`

We would call `gridderyV4()` for each instance like so:
```javascript
gridderyV4({
    items: ".posts",
    columns: 2
})

gridderyV4({
    items: ".photos",
    columns: 3
})
```

And our grid spacing would be assigned in the CSS like so:
```css
[griddery-id=".posts"]{
    --Griddery-Gap:35px;
}

[griddery-id=".photos"]{
    --Griddery-Gap:10px;
}
```
☝️ The full selector names go between the quotation marks `""` and supports [HTML attributes](https://www.sitepoint.com/how-why-use-html5-custom-data-attributes/#faq-question-1503130000006). If your selector name has any `#` or `.` or `[]` or `()`, please include them.

---

### 📝 Further notes:

The above files (i.e. [the JavaScript](https://griddery.github.io/grid.min.js) and [CSS](https://griddery.github.io/basics.min.css) files) include all past and current versions of griddery. If you only want to include version 4 (the newest version), you can use these files instead:
```html
<script src="//griddery.github.io/v4/grid.min.js"></script>
<link href="//griddery.github.io/v4/basics.min.css" rel="stylesheet">
```

If you want to perform further actions once the grid has initialized, you can do so like this:
```javascript
gridderyV4({
    // ... your griddery settings
}, (grid) => {
    grid.classList.add("griddery-done") // or any action that you wish to do
})
```

If you want to destroy griddery (destroys the griddery layout and reverts all items back to their individual states):
```javascript
gridderyV4({
    // ... your griddery settings
}, (grid, { destroyGriddery }) => {
    if(/* some condition here */){
        destroyGriddery()
    }
})
```

---

### 🫶 Credits:

[Resize Observer polyfill](https://github.com/que-etc/resize-observer-polyfill) for the responsiveness.

---

### 💖 Attribution:

You are welcome to use griddery in both free and commercial projects! In either case, please leave a credit; you can [link to this repository](https://github.com/griddery/griddery.github.io) or [link to my Tumblr post](https://glenthemes.tumblr.com/post/673598526813536256/griddery).

---

### 🙋 Questions?

Please include your project code and site link!

⊹ Discord: [discord.gg/RcMKnwz](https://discord.gg/RcMKnwz)<br>
⊹ Tumblr: [tumblr.com/new/ask/glenthemes](https://tumblr.com/new/ask/glenthemes)

---

If you found griddery useful, please consider donating!<br>
☕ [ko-fi.com/glenthemes](https://ko-fi.com/glenthemes)