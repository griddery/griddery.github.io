/*---------------------------------------------------

    griddery (v3) by @glenthemes [tumblr]
    github.com/griddery/griddery.github.io#readme
    
---------------------------------------------------*/

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