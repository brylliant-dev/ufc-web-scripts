const runFn = () => {
    // This is for the counter
    const resourceProps = ["accommodation-type", "no-of-bedroom", "funding-type"]
    const codeWrapper = document.querySelector(".code-wrapper")
  
    const toKebabCase = (str) => str.toLowerCase().replace(/\s+/g, "-")
    const formatNumberPrefix = (input) =>
      input.replace(/^\d+/, (match) => `\\3${match} `)
  
    resourceProps.forEach((prop) => {
      let totalCount = 0
      const totalCountElem = document.querySelector(`#all-${prop}-counter`)
  
      if (!totalCountElem) return
      // Try checking $('#all-type-counter')
      codeWrapper
        .querySelectorAll(".accommodation-code-collection-list-wrapper")
        .forEach((wrapper) => {
          const attrValue = wrapper.getAttribute(prop)
          // Check the hidden HTML via $('.code-wrapper')
          // Get this from collection-list-wrapper
  
          if (attrValue) {
            const count =
              wrapper.querySelectorAll(
                ".accommodation-code-wrapper-collection-list-item",
              )?.length ?? 0
  
            // Update the text of the element with the corresponding ID
            // Render the counter
            const targetId = `#${formatNumberPrefix(toKebabCase(attrValue))}`
            const targetElement = document.querySelector(targetId)
            if (targetElement) {
              targetElement.textContent = count
              totalCount += count
            }
          }
        })
      totalCountElem.textContent = totalCount
    })
  }
  
  const runCheckBoxToggles = ({ viewAllId, ids }) => {
    // This is for the checkbox-radio effect for check all and check select
    const serializedIds = ids.map((id) => id.split(" ").join("\\ "))
  
    const viewAll = document.querySelector(viewAllId)
    const validateViewAll = () => {
      return viewAll.parentElement
        .querySelector(".w-checkbox-input")
        .classList.contains("w--redirected-checked")
    }
  
    const resetSelectedProp = () => {
      serializedIds.forEach((id) => {
        const checkbox = document.querySelector(`#${id}`)
        const parent = checkbox.parentElement
        const isChecked = parent.classList.contains("fs-cmsfilter_active")
  
        if (isChecked) {
          checkbox.click()
        }
      })
    }
  
    serializedIds.forEach((id) => {
      const checkbox = document.querySelector(`#${id}`)
      const parent = checkbox.parentElement
  
      parent.querySelector(".w-checkbox-input").addEventListener("click", () => {
        if (validateViewAll()) {
          viewAll.click()
        }
      })
    })
  
    viewAll.addEventListener("click", () => {
      resetSelectedProp()
    })
  }
  
  setTimeout(() => {
    runFn()
    
    runCheckBoxToggles({
      viewAllId: "#Accommodation-Type",
      ids: [
        "Accommodation-Type-1",
        "Accommodation-Type-2"
      ],
    })
  
    runCheckBoxToggles({
      viewAllId: "#No-of-Bedroom",
      ids: ["No-of-Bedroom-3", "No-of-Bedroom-4", "No-of-Bedroom-5"],
    })
  
    runCheckBoxToggles({
      viewAllId: "#Funding-Type",
      ids: ["Funding-Type-1", "Funding-Type-2", "Funding-Type-3"],
    })
  }, 500)
