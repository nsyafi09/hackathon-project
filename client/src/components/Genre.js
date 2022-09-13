import React from 'react';
// Importing genre CSS
import '../css/genre.css'



function Genre () {
    return (
        <section class="cards-section">
      <header class="header-block">
        <h2>CHOOSE YOUR GENRE</h2>
      </header>
      <div class="cards-content">
        
        <div class="cards-list">
          <div class="card 1">
            <div class="card_image">
              <img
                src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/0687f378-87a7-427b-8e23-c9cc684c1076/%E3%83%8A%E3%82%A4%E3%82%AD-%E3%83%90%E3%82%B9%E3%82%B1%E3%83%83%E3%83%88%E3%83%9C%E3%83%BC%E3%83%AB.jpg"
              />
            </div>
            <div class="card_title title-white">
              <p>Basketball</p>
            </div>
          </div>

          <div class="card 2">
            <div class="card_image">
              <img
                src="https://img.olympicchannel.com/images/image/private/t_social_share_thumb/f_auto/primary/qjxgsf7pqdmyqzsptxju"
              />
            </div>
            <div class="card_title title-white">
              <p>Football(Soccer)</p>
            </div>
          </div>

          <div class="card 3">
            <div class="card_image">
              <img
                src="https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/pwmyxhud4bfauldamlhb"
              />
            </div>
            <div class="card_title title-white">
              <p>Baseball</p>
            </div>
          </div>

          <div class="card 4">
            <div class="card_image">
              <img
                src="https://cdn-japantimes.com/wp-content/uploads/2020/02/p9-collis-a-20200216.jpg"
              />
            </div>
            <div class="card_title title-white">
              <p>Esports</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Genre