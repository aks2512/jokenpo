import './style.css';
import github from 'assets/images/github.png';
import linkedin from 'assets/images/linkedin.png';

export function Footer() {
    return (
        <footer>
            <div className="container">
                <ul className="social_media">
                <li>
                    <img src={github} alt="Github Icon" />
                </li>
                <li>
                    <img src={linkedin} alt="Linkedin Icon" />
                </li>
                </ul>
                <div className="buttons">
                    <button className="button">Regras</button>
                    <button className="button">Ranking</button>
                </div>
            </div>
        </footer>
    )
}


