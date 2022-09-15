import React from 'react';
// Importing Showcase CSS
import '../css/showcase.css'


function Showcase() {
    return(
        <section className="hero-container">
            <div className="hero-wrapper">
                <section className="hero-section">
                <a target="_blank" href='https://search.rakuten.co.jp/search/mall/%E3%82%B9%E3%83%97%E3%83%A9%E3%83%88%E3%82%A5%E3%83%BC%E3%83%B3+3/'>
                <img
                    src="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/s/splatoon-3-switch/hero"
                    alt="Splaaton 3"
                /></a>
                </section>
                <section className="hero-section">
                <a target="_blank" href='https://search.rakuten.co.jp/search/mall/NBA2K23/'>
                <img
                    src="https://assets.2k.com/1a6ngf98576c/4U4GYMHXMK4xU1qOckpwh6/287a9191fb0ea88d13200140ae291bb1/NBA23-WEBSITE-PRE_ORDER-HOMPAGE-MODULE1-BOOKER_EMBEDDED_STD_KEYART-DESKTOP-1920x1080.jpg"
                    alt="NBA 2k"
                /></a>
                </section>
                <section className="hero-section">
                <a target="_blank" href='https://search.rakuten.co.jp/search/mall/FIFA23/'>
                <img
                    src="https://cdn1.epicgames.com/offer/f5deacee017b4b109476933f7dd2edbd/EGS_EASPORTSFIFA23StandardEdition_EACanada_S1_2560x1440-aaf9c5273c27a485f2cce8cb7e804f5c"
                    alt="FIFA 23"
                /></a>
                </section>
                <section className="hero-section">
                <a target="_blank" href='https://event.rakuten.co.jp/nba/?l-id=top_normal_gmenu_d_nba_golf'>
                <img
                    src="https://image.nba.rakuten.co.jp/media/news/7d6/8659/cover.jpg?1663116435"
                    alt="RAKUTEN BARCELONA"
                /></a>
                </section>
            </div>
        </section>
    )
}

export default Showcase