document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '43180061-973ef604cd46546001ec050a5'; 
  
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.querySelector('.search-results');
    const showMoreButton = document.getElementById('show-more-button');
    let page = 1;
  
    // form submission
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      page = 1;
      const query = searchInput.value;
      searchImages(query);
    });
  
    // Show more" button
    showMoreButton.addEventListener('click', function () {
      page++; // Increment page number before fetching next page of results
      const query = searchInput.value;
      searchImages(query, page); // Pass current page number to fetch next page of results
    });
  
    // images from Pixabay API
    function searchImages(query, page = 1, perPage = 20) {
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (page === 1) {
              searchResults.innerHTML = ''; 
            }
        
            data.hits.forEach(image => {
              
              const resultItem = document.createElement('div');
              resultItem.classList.add('search-result');
        
              // image details
              const imageDetails = document.createElement('div');
              imageDetails.classList.add('image-details');
              imageDetails.innerHTML = `
                <h2>${image.tags}</h2>
                <p><strong>Views:</strong> ${image.views}</p>
                <p><strong>Downloads:</strong> ${image.downloads}</p>
                <p><strong>Likes:</strong> ${image.likes}</p>
                <p><strong>Comments:</strong> ${image.comments}</p>
                <p><strong>User:</strong> ${image.user}</p>
                <a href="${image.largeImageURL}" download>Download</a>
              `;
        
              // image preview
              const imagePreview = document.createElement('img');
              imagePreview.src = image.previewURL;
              imagePreview.alt = image.tags;
        
              // search results container
              resultItem.appendChild(imagePreview);
              resultItem.appendChild(imageDetails);
        
              searchResults.appendChild(resultItem);
            });
        
            if (data.totalHits > page * perPage) {
              showMoreButton.style.display = 'block';
            } else {
              showMoreButton.style.display = 'none';
            }
          })
          .catch(error => console.error('Error fetching images:', error));
      }
});
