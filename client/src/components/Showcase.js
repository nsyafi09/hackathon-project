import React from 'react';
// Importing Showcase CSS
import '../css/showcase.css'


function Showcase() {
    return(
        <section class="hero-container">
            <div class="hero-wrapper">
                <section class="hero-section">
                <img
                    src="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/s/splatoon-3-switch/hero"
                    alt=""
                />
                </section>
                <section class="hero-section">
                <img
                    src="https://assets.2k.com/1a6ngf98576c/4U4GYMHXMK4xU1qOckpwh6/287a9191fb0ea88d13200140ae291bb1/NBA23-WEBSITE-PRE_ORDER-HOMPAGE-MODULE1-BOOKER_EMBEDDED_STD_KEYART-DESKTOP-1920x1080.jpg"
                    alt=""
                />
                </section>
                <section class="hero-section">
                <img
                    src="https://cdn1.epicgames.com/offer/f5deacee017b4b109476933f7dd2edbd/EGS_EASPORTSFIFA23StandardEdition_EACanada_S1_2560x1440-aaf9c5273c27a485f2cce8cb7e804f5c"
                    alt=""
                />
                </section>
                <section class="hero-section">
                </section>
            </div>
        </section>
    )
}

export default Showcase