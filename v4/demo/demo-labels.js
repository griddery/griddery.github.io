document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll("[griddery-container] [griddery-item] img[name]")?.forEach(img => {
      let name = img.getAttribute("name")
      if(name.trim() !== ""){
        let label = document.createElement("div")
        label.classList.add("label")
        label.textContent = name
        img.after(label)
      }
    })
  },1)
})