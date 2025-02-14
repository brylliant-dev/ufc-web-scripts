const runFn = () => {

    const bathroomCounterWrappers = document.querySelectorAll('.bathroom-counter-wrapper')

    bathroomCounterWrappers.forEach(bcw => {
        const counterText = bcw.querySelector('.bathroom-counter').textContent

        bcw.querySelector('.bathroom-counter-text').textContent = `bathroom${parseInt(counterText) > 1 ? 's' : ''}`
    })

    // Finsweet Attribute code
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
      'cmsload',
      (listInstances) => {
        console.log('cmsload Successfully loaded!');
        // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
        const [listInstance] = listInstances;
        // The `renderitems` event runs whenever the list renders items after switching pages.
        listInstance.on('renderitems', (renderedItems) => {
          console.log(renderedItems);
          // Add code that will run each time new items are rendered on the page
        });
      },
    ]);
    // Finsweet Attribute code

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


  // We'll use this function to wait for certain query selectors before we run a callback
const startObservingElements = ({ selectors, callback }) => {
    const observer = new MutationObserver((_mutations, obs) => {
      let foundSelectors = []
  
      selectors.forEach((selector) => {
        // Use jQuery to select the element
        const element = $(selector)
        if (element.length > 0 && !foundSelectors.includes(selector)) {
          // Element exists and is not already in the found list, mark as found
          foundSelectors.push(selector)
  
          // Check if all selectors have been found
          if (foundSelectors.length === selectors.length) {
            // All elements are found, run the callback
            callback()
  
            // Disconnect the observer as its job is done
            obs.disconnect()
          }
        }
      })
    })
  
    observer.observe($('body')[0], {
      childList: true,
      subtree: true,
    })
  }

  startObservingElements({
    selectors: [
        '.pop-out-wrapper',
      '#Accommodation-Type',
      '#No-of-Bedroom',
      '#Funding-Type',
      "#Accommodation-Type-1",
      "#Accommodation-Type-2",
      "#No-of-Bedroom-3", 
      "#No-of-Bedroom-4", 
      "#No-of-Bedroom-5",
      "#Funding-Type-1", 
      "#Funding-Type-2", 
      "#Funding-Type-3"
    ],
    callback: () => {
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
    },
  })
  