

import Fuse from 'fuse.js';

const form = document.querySelector('#site-search-form')
const searchInput = document.querySelector('input[id=search-input]')
const fuzzyList = document.querySelector('.fuzzy-list')

const width = window.innerWidth

if(width <= 959 && searchInput) {
    window.addEventListener('scroll', () => {
            const height = form.getBoundingClientRect().top
    
            if(height === 56) {
                form.style.width = '100%'
            } else {
                form.style.width = '90%'
            }
        }
    )
} 

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
      fuzzyList.style.display = 'none'
    }
})

function getData(value) {
    fetch("./search/index.json").
    then((response) => {
        response.json().
    then((data)=> {
        const fuse = new Fuse(data, fuseOptions);
        const result = fuse.search(value);

        
        function groupBy(arr, key) {
        var newArr = [],
            types = {},
            newItem, i, j, cur;

        for (i = 0, j = arr.length; i < j; i++) {
            cur = arr[i].item;
            if (!(cur[key] in types)) {
                types[cur[key]] = { type: cur[key], data: [] };
                newArr.push(types[cur[key]]);
            }
            types[cur[key]].data.push(cur);
        }
        return newArr;
      }

      const sortedResults = groupBy(result, 'categories')
    
        console.log(sortedResults)
           
        sortedResults.map((res) => {
            const listitem = document.createElement('div')
            const itemCategory = document.createElement('div')

            console.log(res)

            itemCategory.classList.add('fuzzy-item--category')
            itemCategory.innerText = res.type[0]
              
            listitem.value = res.type[0]
            listitem.classList.add('fuzzy-item')

            fuzzyList
            .appendChild(itemCategory)

            fuzzyList.appendChild(listitem)
              .addEventListener('click', (event)=> {
                searchInput.value = event.target.value
                searchInput.focus()
                fuzzyList.style.display = 'none'
            })

            res.data.map((res => {
              const listItems = document.querySelectorAll('.fuzzy-item')
              const listLink = document.createElement('a')
  
              const itemTitle = document.createElement('h4')
              const itemText =  document.createElement('p')
              
                itemTitle.innerText = res.title
                itemTitle.classList.add('fuzzy-item--title')
              
                const textPrevue =  res.contents.substring(0, 60)
              
                itemText.innerText = textPrevue + '...'
                itemText.classList.add('fuzzy-item--text')
              
                listItems.forEach(item => {
                   item.appendChild(itemTitle)
                   item.appendChild(itemText)
                })

            }))


          })

         })
      })   

    }    
    
