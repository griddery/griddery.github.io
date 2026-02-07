### GRIDDERY (v3.0)

#### Greetings; as of February 2026 there's a new version of Griddery (v4) that supports screen responsiveness / media query breakpoints, please view [the new README](https://github.com/griddery/griddery.github.io#readme) for details!

​
​
​
​
​
​
​

---

**Instructions for v3:**

If you are still using the old versions, you do not have to do anything extra.  
If you prefer the old version or still need to support it:
- [griddery v1.0 – docs](https://dub.sh/griddery-v1)
- [griddery v2.0 – docs](https://dub.sh/griddery-v2)

---

#### 🔹&ensp;━━━&ensp;ABOUT&hairsp;:

Inspired by David DeSandro's [masonry](https://masonry.desandro.com/), GRIDDERY is a script that automatically  
organizes divs of the same selector into a grid without relying on `.height()` and `position:absolute`,  
instead utilizing `table-row`, `table-cell`, and `:nth-child` to mimic a grid by sorting the divs into columns.

Heads-up:
> If you're a theme user from tumblr and are looking to turn your theme from 1 column to 2 columns,  
  **ask your theme's maker if it's okay to do that first.**

---

#### 🔹&ensp;━━━&ensp;DEMO & PREVIEW&hairsp;:

〚&ensp;[jsfiddle.net/glenthemes/cw5en8q4](https://jsfiddle.net/glenthemes/cw5en8q4/)&ensp;〛
\
\
<sup>**DEMO DESCRIPTION:**</sup>  
* firstly, a group of cats (`<img>`s with the attribute `cat`), placed in alphabetical order to show that when griddery is applied, the cats will line up from left to right, though they're still sorted into columns.
* next, a piece of unrelated code that won't be grouped
* then, a group of dogs (`<img>`s with the attribute `dog`), once again placed in alphabetical order to show that they retain their left-to-right order.

\
<sup>**REQUIREMENTS:**</sup>  
* basic HTML/CSS knowledge

---

#### 🔹&ensp;━━━&ensp;HOW TO INSTALL&hairsp;:

**STEP 1: ADDING THE ESSENTIALS**  

Paste the following under `<head>`:

```html
<!--✻✻✻✻✻✻  griddery by @glenthemes  ✻✻✻✻✻✻-->
<script src="//griddery.github.io/grid.js"></script>
<link href="//griddery.github.io/basics.css" rel="stylesheet">
<script>
document.addEventListener("DOMContentLoaded", () => {
	gridderyV3({
		items: ".posts",
		columns: 2
	})
})
</script>
```

| Option Name | What it is |
| ------ | ------ |
| `items` | The selector name of what you want to be wrapped; consider this as the "grid item". |
| `columns`&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; | The number of grid columns for your elements. *Can either be an integer or a [`:root` CSS variable](https://codeburst.io/css-variables-explained-with-5-examples-84adaffaa5bd).* Valid examples: `2` or `"var(--Post-Columns)"` or `"--Post-Columns"` |

\
How to use griddery more than once:  
<sub>Example:</sub>
```javascript
document.addEventListener("DOMContentLoaded", () => {
	gridderyV3({
		items: ".some-div",
		columns: 2
	})

	gridderyV3({
		items: ".another-div",
		columns: 3
	})
})
</script>
```

---

**STEP 2: GRID SPACING (CSS)**  

Assuming that we want a grid spacing of `15px`,  
paste this somewhere between `<style>` and `</style>`:
```css
/* grid column spacing */
[griddery-id=".posts"]
[griddery-col] + [griddery-col]{
    padding-left: 15px;
}

/* grid row spacing */
[griddery-id=".posts"]
[griddery-item] + [griddery-item]{
    margin-top: 15px;
}
```

| Selector Name | What it is |
| ------ | ------ |
| `[gallery-id=".posts"]` | Change `.posts` to the name of the selector you're using. The full selector name goes between the quotation marks `""`. If the selector name has any `.` or `[]` or `()`, please include them. |
| `margin-top`&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; | "Row" spacing. |
| `padding-left`&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; | "Column" spacing. We use `padding-left` instead of `margin-left` because CSS tables don't work with the `margin` property. |

---

#### 🔹&ensp;━━━&ensp;TROUBLESHOOTING&hairsp;:
💌 Discord: [discord.gg/RcMKnwz](https://discord.gg/RcMKnwz)
  > Remember to include your project code when asking for help!  
    If for any reason you can't, DM me and we can figure something out.
    
---

#### 🔹&ensp;━━━&ensp;FOUND GRIDDERY USEFUL? 💖
☕ tip/donation jar: [ko-fi.com/glenthemes](https://ko-fi.com/glenthemes)
