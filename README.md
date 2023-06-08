### ₊⁺ GRIDDERY ⁺₊

<sup>**LAST UPDATED: 2022-12-21 18:50 GMT-7**</sup>  

---

✨ **version 2.0 is out now!** ✨  
🎉 **you can now use griddery() on __as many elements as you want__!**\
\
If you are still using griddery v1.0, you do not have to do anything extra; the same script now supports both old and new versions.  
However if you prefer the old version / still need to support it, its documentation can be found here: [dub.sh/griddery_v1](https://dub.sh/griddery_v1)

---

Inspired by David DeSandro's [masonry](https://masonry.desandro.com/), GRIDDERY is a script that automatically  
organizes divs of the same selector into a grid without relying on `.height()` and `position:absolute`,  
instead utilizing `table-row`, `table-cell`, and `:nth-child` to mimic a grid by sorting the divs into columns.

Currently relies on jQuery, but a pure-JS version has been added to my roadmap.

> If you're a theme user from tumblr and are looking to turn your theme from 1 column to 2 columns,  
  **ask your theme's maker if it's okay to do that first.**

### [🍹  DEMO HERE  🍹](https://jsfiddle.net/glenthemes/uw25aoc4/)  
<sup>**DEMO DESCRIPTION:**</sup>  
* firstly, a group of cats (`<img>`s with the attribute `cat`), placed in alphabetical order to show that when griddery is applied, the cats will line up from left to right, though they're still sorted into columns.
* next, a piece of unrelated code that won't be grouped
* then, a group of dogs (`<img>`s with the attribute `dog`), once again placed in alphabetical order to show that they retain their left-to-right order.

<sup>**REQUIREMENTS:**</sup>  
* jQuery (any version should work)

---

#### HOW TO INSTALL:

**STEP 1: ADDING THE ESSENTIALS**  

Paste the following under `<head>`:

```html
<!-- jquery -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<script src="//griddery.github.io/grid.js"></script>
<link href="//griddery.github.io/basics.css" rel="stylesheet">

<script>
$(document).ready(function(){
    gridderyV2(".posts", "--Post-Columns");
});
</script>
```
<sub>**NOTES:**</sub>  
* `".posts"` is just an example div. Change this to whatever item you want wrapped.  
  ⭐ please make sure you only use the child div, instead of e.g. `".parent .child"`; this will not work.  
  ⭐ make sure you **do not** insert the div name as a jQuery selector.  
  ╰— instead of `$(".posts")`, you need to put `".posts"`
* `--Post-Columns` is a [`:root` CSS variable](https://codeburst.io/css-variables-explained-with-5-examples-84adaffaa5bd) for **how many columns you want your grid to consist of.**  
  you can name it anything you like, just remember that whatever you change it to, this parameter needs to change along with it:
  
<img width="380" alt="image" src="https://user-images.githubusercontent.com/97827977/167314312-842a2fe1-252e-4b28-b88b-4a5bb5e9d0a8.png">

<sup>**HOW TO USE GRIDDERY MORE THAN ONCE:**</sup>
```
gridderyV2(".some-div", "--A-Columns");
gridderyV2(".another-div", "--B-Columns");
```

---

**STEP 2: ADDING THE CSS**  
Next, paste this somewhere between `<style>` and `</style>`:

```css
:root {
    --Post-Columns:2;
    --Post-Columns-Spacing:10px;
    --Post-Rows-Spacing:10px;
}

/* grid column spacing */
[griddery-id=".posts"]
[griddery-col] + [griddery-col]{
    padding-left:var(--Post-Columns-Spacing);
}

/* grid "row" spacing */
[griddery-id=".posts"]
[griddery-item] + [griddery-item]{
    margin-top:var(--Post-Rows-Spacing);
}
```

<sub>**NOTES:**</sub>  
* `[gallery-id=".posts"]` — change `.posts` to the div name you're using.  
  ✧ don't remove the `" "`  
  ✧ if your div name contains `.` (class), `div[some-attr]` (attribute) etc, please include them.
* feel free to change the spacing CSS var names to anything you like;  the spacing is separate from the `gridderyV2()` function so you don't need to update anything there

Reminder: if you change the CSS var name for the **column count**, change it in the `gridderyV2()` function as well:
<img width="380" alt="image" src="https://user-images.githubusercontent.com/97827977/167314312-842a2fe1-252e-4b28-b88b-4a5bb5e9d0a8.png">

---

#### TROUBLESHOOTING:
💌 Discord: [discord.gg/RcMKnwz](https://discord.gg/RcMKnwz)
  > remember to include your project code when asking for help!  
    if for any reason you can't, DM me and we can figure something out.
    
---

#### FOUND GRIDDERY() USEFUL? 💖
☕ tip/donation jar: [ko-fi.com/glenthemes](https://ko-fi.com/glenthemes)
