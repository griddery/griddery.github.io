/*=======================================================================

                ╔═╗  ╦═╗  ╦  ╔╦╗  ╔╦╗  ╔═╗  ╦═╗  ╦ ╦
                ║ ╦  ╠╦╝  ║   ║║   ║║  ║╣   ╠╦╝  ╚╦╝
                ╚═╝  ╩╚═  ╩  ═╩╝  ═╩╝  ╚═╝  ╩╚═   ╩ 

    A JavaScript plugin that organizes elements of the same selector
    into a grid without relying on height and position:absolute.

              © 2021-2026 glenthemes | git.new/griddery

========================================================================*/

//+++++++++++++++++++++++++++++++++++++++ GRIDDERY v1.0 ++++++++++++++++++
if(typeof($) !== "undefined"){
  var root = getComputedStyle(document.documentElement);
  var rootGET = root;
  var JQversion = jQuery.fn.jquery.replaceAll(".","");

  $(document).ready(function(){
    window.griddery = function(TT_TT, boobahz){
      TT_TT.addClass("col-item");

      var col_count = Number(root.getPropertyValue(boobahz));
        
      $(".col-item").each(function(){
        $(this).not(".col-item + .col-item").each(function(){
          if(JQversion >= "180"){
            $(this).nextUntil(":not(.col-item)").addBack().wrapAll('<div class="col-tr">');
          } else {
            $(this).nextUntil(":not(.col-item)").andSelf().wrapAll('<div class="col-tr">');
          }
        })
      })//end .col-item each
        
      for(smh=1; smh<col_count+1; smh++){
        $(".col-tr .col-item:nth-child(" + col_count + "n+" + smh + ")").each(function(){
          $(this).attr("col-id",smh)
        });
      }
        
      $(".col-tr").prepend("<div class='temp-cols'></div>");

      for(tytn=1; tytn<col_count+1; tytn++){
        $(".temp-cols").append("<div class='col-column' col-id='" + tytn + "'></div>");
      }
      
      $(".temp-cols").children().unwrap();

      $(".col-item").each(function(){
        var col_id = $(this).attr("col-id");
        $(this).appendTo($(this).parents(".col-tr").find(".col-column[col-id='" + col_id + "']"))
      })
      
      $(".col-column[col-id], .col-item[col-id]").removeAttr("col-id");
      
      $(".col-column").each(function(){
        if($.trim($(this).html()) == ""){
          $(this).remove();
        }
      }); 
    }//end griddery v1
  })//end jquery docReady
}//end jQuery exists (for v1)

//+++++++++++++++++++++++++++++++++++++++ GRIDDERY v2.0 ++++++++++++++++++
if(typeof($) !== "undefined"){
  $(document).ready(function(){
    window.gridderyV2 = function(gridiv, gridcols){
      gridiv = $.trim(gridiv);	
      gridcols = parseInt($.trim(rootGET.getPropertyValue($.trim(gridcols))));
        
      $(gridiv).each(function(){
        $(this).not(gridiv +"+"+ gridiv).each(function(){
          // group target divs next to e/o
          // and wrap them in [griddery-cont]
          if(JQversion >= "180"){
            $(this).nextUntil(":not(" + gridiv + ")").addBack().wrapAll("<div griddery-cont cols='" + gridcols + "'>");
          } else {
            $(this).nextUntil(":not(" + gridiv + ")").andSelf().wrapAll("<div griddery-cont cols='" + gridcols + "'>");
          }
            
          $(this).parent("[griddery-cont]").each(function(){
            // create griddery table-row
            $(this).wrapInner("<div griddery-tr/>");

            for(smh=1; smh<gridcols+1; smh++){
              // assign column IDs
              $(this).find(gridiv+":nth-of-type(" + gridcols + "n+" + smh + ")").each(function(){
                $(this).attr("col-id",smh)
              });

              // add column IDs to move to later
              $(this).find("[griddery-tr]").append("<div griddery-col='" + smh + "'></div>");
            }//end for loop
          })//end container each
        })//end andself/addback wrap script
      })// end item each
      
      // sort items into their assigned columns
      $("[griddery-col]").each(function(){
        var jgxwv = $(this).attr("griddery-col");

        $(this).parents("[griddery-cont]").find("[col-id]").filter(function(){
          return $(this).attr("col-id") == jgxwv
        }).appendTo($(this)).removeAttr("col-id");
      })
      
      // wrap each initial item in a flex cont
      // to center stuff (horizontally)
      $(gridiv).each(function(){
        $(this).wrap("<div griddery-item>");

        $(this).parents("[griddery-cont]").attr("griddery-id",gridiv)
      })
    }//end griddery v2
  })//end jquery docReady
}//end jQuery exists (for v1)

//+++++++++++++++++++++++++++++++++++++++ GRIDDERY v3.0 ++++++++++++++++++
window.gridderyV3 = (o_o) => {
  if(
    typeof(o_o) !== "undefined" &&
    typeof(o_o.items) !== "undefined" &&
    typeof(o_o.columns) !== "undefined" &&
    o_o.items.toString().trim() !== "" &&
    o_o.columns.toString().trim() !== ""
  ){
    let items_str = o_o.items.toString().trim();
    let items = document.querySelectorAll(items_str);

    /*-----------------------*/

    let cols = o_o.columns

    // if columns param is not a number
    if(typeof(cols) !== "number"){
      if(isNaN(Number(cols))){
        cols = cols.toString().trim();

        // find :root variable if columns param
        // starts with "--" or "var(--"
        if(cols.slice(0,2) == "--" || cols.slice(0,6) == "var(--"){
          let wtCols = getComputedStyle(document.documentElement).getPropertyValue("--" + cols.split("--").slice(1).join().replaceAll(")",""));
          wtCols = wtCols.replaceAll('"','',"'","");
          if(wtCols !== ""){
            if(typeof(wtCols) == "number"){
              cols = wtCols;
            } else if(!isNaN(Number(wtCols))){
              cols = Number(wtCols)
            }

            else {
              console.error("【 griddery 】 error — columns count must be a number (integer).")
            }
          }
        }
      } else {
        cols = Number(cols)
      }
    }

    /*-----------------------*/

    items?.forEach((item, idex) => {
      let prevEl = item.previousElementSibling;
        if(!prevEl?.matches(items_str)){

        // make grid containers
        let cont = document.createElement("div");
        cont.setAttribute("griddery-cont","");
        cont.setAttribute("griddery-id",items_str);
        item.before(cont);

        // move grid items inside grid container
        let apres = cont.nextElementSibling;
        while(apres && apres.matches(items_str)){
          cont.appendChild(apres);
          apres = cont.nextElementSibling;
        }

        // make grid row
        let row = document.createElement("div");
        row.setAttribute("griddery-tr","");
        cont.prepend(row);

        // make grid cols
        for(let i=0; i<cols; i++){
          let makeCol = document.createElement("div");
          makeCol.setAttribute("griddery-col",i+1);
          row.append(makeCol)
        }
      }

      // do stuff with the items
      // needs setTimeout() even if it's 0s
      setTimeout(() => {
        // wrap items in an item wrapper
        let itemWrapper = document.createElement("div");
        itemWrapper.setAttribute("griddery-item","");
        item.before(itemWrapper);
        itemWrapper.appendChild(item);

        // sort items into designated columns
        idex += 1;
        let mod = idex % cols;
        if (mod == 0) mod = cols;
        itemWrapper.setAttribute("col",mod);

        let gridParent = item.closest("[griddery-cont]");
        if(gridParent){
          let gridCol = gridParent.querySelector(`[griddery-col="${mod}"]`);
          if(gridCol){
            gridCol.append(itemWrapper)
          }
        }
      },0)
    })//end item each
  } else {
    console.error("【 griddery 】 error — Please specify the items selector AND the number of columns.")
  }
}//end gridderyv3

//+++++++++++++++++++++++++++++++++++++++ GRIDDERY v4.0 ++++++++++++++++++
window.gridderyV4 = (opts,action) => {
  if(!opts || !opts.items || !opts.columns) return;

  let grid = opts.container || document.body
  let itemsStr = opts.items
  let cols = opts.columns

  // polyfill for Resize Observer
  // from: github.com/que-etc/resize-observer-polyfill
  !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ResizeObserver=e()}(this,(function(){"use strict";var t=function(){if("undefined"!=typeof Map)return Map;function t(t,e){var n=-1;return t.some((function(t,r){return t[0]===e&&(n=r,!0)})),n}return function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(e){var n=t(this.__entries__,e),r=this.__entries__[n];return r&&r[1]},e.prototype.set=function(e,n){var r=t(this.__entries__,e);~r?this.__entries__[r][1]=n:this.__entries__.push([e,n])},e.prototype.delete=function(e){var n=this.__entries__,r=t(n,e);~r&&n.splice(r,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var n=0,r=this.__entries__;n<r.length;n++){var i=r[n];t.call(e,i[1],i[0])}},e}()}(),e="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,n="undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),r="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(n):function(t){return setTimeout((function(){return t(Date.now())}),1e3/60)};var i=["top","right","bottom","left","width","height","size","weight"],o="undefined"!=typeof MutationObserver,s=function(){function t(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t,e){var n=!1,i=!1,o=0;function s(){n&&(n=!1,t()),i&&a()}function c(){r(s)}function a(){var t=Date.now();if(n){if(t-o<2)return;i=!0}else n=!0,i=!1,setTimeout(c,e);o=t}return a}(this.refresh.bind(this),20)}return t.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},t.prototype.removeObserver=function(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},t.prototype.updateObservers_=function(){var t=this.observers_.filter((function(t){return t.gatherActive(),t.hasActive()}));return t.forEach((function(t){return t.broadcastActive()})),t.length>0},t.prototype.connect_=function(){e&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),o?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},t.prototype.disconnect_=function(){e&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},t.prototype.onTransitionEnd_=function(t){var e=t.propertyName,n=void 0===e?"":e;i.some((function(t){return!!~n.indexOf(t)}))&&this.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),c=function(t,e){for(var n=0,r=Object.keys(e);n<r.length;n++){var i=r[n];Object.defineProperty(t,i,{value:e[i],enumerable:!1,writable:!1,configurable:!0})}return t},a=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||n},h=l(0,0,0,0);function u(t){return parseFloat(t)||0}function f(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return e.reduce((function(e,n){return e+u(t["border-"+n+"-width"])}),0)}function d(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return h;var r=a(t).getComputedStyle(t),i=function(t){for(var e={},n=0,r=["top","right","bottom","left"];n<r.length;n++){var i=r[n],o=t["padding-"+i];e[i]=u(o)}return e}(r),o=i.left+i.right,s=i.top+i.bottom,c=u(r.width),d=u(r.height);if("border-box"===r.boxSizing&&(Math.round(c+o)!==e&&(c-=f(r,"left","right")+o),Math.round(d+s)!==n&&(d-=f(r,"top","bottom")+s)),!function(t){return t===a(t).document.documentElement}(t)){var p=Math.round(c+o)-e,v=Math.round(d+s)-n;1!==Math.abs(p)&&(c-=p),1!==Math.abs(v)&&(d-=v)}return l(i.left,i.top,c,d)}var p="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof a(t).SVGGraphicsElement}:function(t){return t instanceof a(t).SVGElement&&"function"==typeof t.getBBox};function v(t){return e?p(t)?function(t){var e=t.getBBox();return l(0,0,e.width,e.height)}(t):d(t):h}function l(t,e,n,r){return{x:t,y:e,width:n,height:r}}var _=function(){function t(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=l(0,0,0,0),this.target=t}return t.prototype.isActive=function(){var t=v(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),b=function(t,e){var n,r,i,o,s,a,h,u=(r=(n=e).x,i=n.y,o=n.width,s=n.height,a="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,h=Object.create(a.prototype),c(h,{x:r,y:i,width:o,height:s,top:i,right:r+o,bottom:s+i,left:r}),h);c(this,{target:t,contentRect:u})},m=function(){function e(e,n,r){if(this.activeObservations_=[],this.observations_=new t,"function"!=typeof e)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=e,this.controller_=n,this.callbackCtx_=r}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof a(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new _(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof a(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach((function(e){e.isActive()&&t.activeObservations_.push(e)}))},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map((function(t){return new b(t.target,t.broadcastRect())}));this.callback_.call(t,e,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),y="undefined"!=typeof WeakMap?new WeakMap:new t,g=function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=s.getInstance(),r=new m(e,n,this);y.set(this,r)};return["observe","unobserve","disconnect"].forEach((function(t){g.prototype[t]=function(){var e;return(e=y.get(this))[t].apply(e,arguments)}})),void 0!==n.ResizeObserver?n.ResizeObserver:g}));

  function gridderyVPDims(e,t){e&&new ResizeObserver(e=>{for(let n of e){let{top:o,left:c,width:f,height:i}=n.contentRect;t({top:o,left:c,width:f,height:i})}}).observe(e)}

  // wrap item + item into grid
  function wrapItemsIntoGrid(e,t,l,n){let r=[],i=e.querySelectorAll(`${t}:not(${t} ${t})`),a=0,m=i.length;i?.forEach(e=>{if(!e.previousElementSibling?.matches(t)){let i=document.createElement(l.tag);i.setAttribute(l.attr,""),e.before(i);let o=i.nextElementSibling;for(o&&(!o||o.matches(t))||i.remove(),o&&r.push(i);o&&o.matches(t);)i.append(o),o=i.nextElementSibling}++a===m&&n?.(r)})}

  // Number() the cols input
  // if it's a css variable, clean it
  function getColsNum(t){let r=parseInt(t);if(!isNaN(r))return r;let e=t.trimStart().startsWith("var(")&&t.trimEnd().endsWith(")")?t.trim().slice(4,-1):t.trimStart().startsWith("--")?t.trim():null;return e&&(r=parseInt(getComputedStyle(document.documentElement).getPropertyValue(e))),isNaN(r)?1:r}

  // clean cols input
  cols = getColsNum(cols)

  // make cols
  function makeCols(grid,cols,items){
    // assign number of columns
    grid.style.setProperty("--Griddery-Columns",cols)

    // create number of columns
    let colDex = 1
    for(let i=0; i<cols; i++){
      let col = document.createElement("div")
      col.dataset.col = colDex++
      col.setAttribute("griddery-column","")
      grid.append(col)
    }

    items?.forEach((item,i) => {
      !item.matches("[griddery-item]") && item.setAttribute("griddery-item","")

      // track original order
      !item.matches("[data-id]") ? item.dataset.id = i+1 : null

      // track column id
      let order = (i % cols) + 1
      item.dataset.col = order

      // push into col
      grid.querySelector(`[griddery-column][data-col="${order}"]`)?.append(item)
    })
  }//end makeCols func

  // unwrap cols
  function destroyCols(grid){
    if(grid.querySelector("[griddery-column] > [griddery-item]")){
      grid.querySelectorAll("[griddery-column]")?.forEach(col => {
        if(col.firstElementChild.matches("[griddery-item]")){
          col.replaceWith(...col.childNodes)
        }
      })
    }
  }

  // grid alignments
  let gridVAlignList = ["top","middle","center","bot","bottom"]

  // actual griddery actions start here
  let gridderyV4Init = (opts) => {

    let gridEls = typeof grid === "string" ? document.querySelectorAll(grid) :
                  grid instanceof Element  ? [grid] :
                  grid instanceof NodeList ? grid :
                  []

    gridEls?.forEach(grid => {
      // store old "grid" just in case (of what? I'm not sure)
      let oldGrid = grid

      // wrap grid
      wrapItemsIntoGrid(grid, itemsStr, {
        tag: "div",
        attr: "griddery-container"
      }, (newGrids) => {
        // run griddery on the new griddery cont
        newGrids?.forEach(grid => {
          // show/attach grid id/selector
          !grid.matches("[griddery-id]:not([griddery-id=''])") && grid.setAttribute("griddery-id",itemsStr)

          // grid v-alignment
          if(opts.gridAlign && typeof opts.gridAlign == "string"){
            if(gridVAlignList.find(x => x == opts.gridAlign)){
              grid.setAttribute(`griddery-align-${opts.gridAlign.toLowerCase()}`,"")
            }
          }

          // add viewport width watcher if it doesn't already have one
          let vp
          let findVP = document.querySelector("div[griddery-viewport-watcher]")
          if(!findVP){
            let obsvr = document.createElement("div")
            obsvr.setAttribute("griddery-viewport-watcher","")
            obsvr.ariaHidden = true
            obsvr.tabIndex = -1
            document.body.append(obsvr)
            vp = obsvr
          } else {
            vp = findVP
          }

          // wrap items and use its new wrapper as The Item(s)
          grid.querySelectorAll(`${itemsStr}:not(${itemsStr} ${itemsStr})`)?.forEach(item => {
            if(!item.closest("[griddery-item]")){
              let itemWrapper = document.createElement("div")
              itemWrapper.setAttribute("griddery-item","")
              item.before(itemWrapper)
              itemWrapper.append(item)
            }
          })

          // reassign [griddery-item]s as THE items (i.e. the wrapper instead of the actual thing)
          let itemEls = Array.from(grid.querySelectorAll("[griddery-item]"))

          makeCols(grid,cols,itemEls)
          
          // run [optional] further action if so specified
          action?.(grid)
          
          // responsive/resize stuff
          if(opts.responsive && opts.responsive.breakpoints){

            let breakpoints = opts.responsive?.breakpoints

            let triggered = false

            gridderyVPDims(vp, () => {
              for(let bp in breakpoints){
                if(window.matchMedia(`(${bp})`).matches){
                  // is true
                  if(triggered === false){
                    triggered = true

                    let newCols = getColsNum(breakpoints[bp])
                    destroyCols(grid)
                    makeCols(grid,newCols,itemEls)

                    grid.style.setProperty("--Griddery-Columns",newCols)

                    triggered = false
                  }
                }
              }
            })
          }//end: yes, responsive
        })//end newGrids each
      })//end wrapItemsIntoGrid
    })//end grid forEach
  }//end gridderyV4Init

  document.readyState == "loading" ?
  document.addEventListener("DOMContentLoaded", () => gridderyV4Init(opts)) :
  gridderyV4Init(opts)
}//end gridderyV4 main func