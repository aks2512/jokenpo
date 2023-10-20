import './style.css';

import video_game from 'assets/images/video_game.png';

export function Home() {

    return (
        <section className="home">
            <div className="container">
                <div className="banner">
                    <div className="image">
                        <img src={video_game} alt="Video Games Imagem" />
                    </div>
                    <div className="content">
                        <h1>Lorem ipsum dolor sit amet consectetur. Fusce odio quis </h1>
                    </div>
                </div>
            </div>
        </section>
    )
}