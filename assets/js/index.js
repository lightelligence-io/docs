require("typeface-muli")
import '../scss/main.scss';
import './anchorforid.js'
import './clipboardjs.js'
import './codeblocks.js'
import './hljs.js'
import './lazysizes.js'
import './menutoggle.js'
import './menumobile.js'
import './scrolldir.js'
import './smoothscroll.js'
import './tabs.js'
import './nojs.js'

import Fuse from 'fuse.js';

const searchInput = document.querySelector('input[id=search-input]')
const fuzzyList = document.querySelector('.fuzzy-list')

const fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  tokenize: true,
    matchAllTokens: true,
    threshold: 0.0,
    location: 0,
    distance: 100,
    maxPatternLength: 64,
    minMatchCharLength: 3,
    keys: [
      {name:"title",weight:0.8},
      {name:"tags",weight:0.5},
      {name:"categories",weight:0.5},
      {name:"contents",weight:0.4}
    ]
  };
  
  searchInput.addEventListener('input', () => {
    while (fuzzyList.hasChildNodes()) {
        fuzzyList.removeChild(fuzzyList.lastChild);
      }

      getData(searchInput.value)
      
      if (searchInput.value.length !== 0){
        fuzzyList.style.display = 'block'
      }

    if (searchInput.value.length === 0){
        while (fuzzyList.hasChildNodes()) {
        fuzzyList.removeChild(fuzzyList.lastChild);
      }
    }
})


function getData(value) {
    fetch("./search/index.json").
    then((response) => {
        response.json().
    then((data)=> {
        const fuse = new Fuse(data, fuseOptions);
        const result = fuse.search(value);

        result.map((res) => {
            const listitem = document.createElement('option')
            listitem.value = res.item.title
            listitem.innerText = res.item.title
            listitem.classList.add('fuzzy-item')

            fuzzyList
              .appendChild(listitem)
              .addEventListener('click', (event)=> {

              searchInput.value = event.target.value
              searchInput.focus()

            })
          })
        })
      })   

    }    
    
