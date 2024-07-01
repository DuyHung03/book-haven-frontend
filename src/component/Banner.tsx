import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import styles from '../style/Banner.module.scss';

const slideImages = [
    {
        //to cart
        url: 'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/slider_1.jpg?1719328894255',
        to: '/',
    },
    {
        url: 'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/slider_2.jpg?1719328894255',
        to: '/',
    },
    {
        url: 'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/slider_3.jpg?1719328894255',
        to: '/login',
    },
];

const Banner = () => {
    return (
        <Slide cssClass={styles.wrapper} canSwipe={false} duration={3000}>
            {slideImages.map((slideImage, index) => (
                <Link to={slideImage.to} key={index}>
                    <div>
                        <img className={styles.image} src={slideImage.url} />
                    </div>
                </Link>
            ))}
        </Slide>
    );
};

export default Banner;
