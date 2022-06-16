// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import "./SplashSlideShow.css";

function SplashSlideShow() {
  // const dispatch = useDispatch();
  const slideImages = [
    "https://i.postimg.cc/VstStYCP/spraytan-product.jpg",
    "https://i.postimg.cc/nL5zs5VL/spray-tan-results.jpg",
    "https://i.postimg.cc/Mp9XwHhV/ninatrill-bed2.jpg",
    "https://i.postimg.cc/TYXKqZVL/ninatrill-lash-lift.jpg",
    "https://i.postimg.cc/VstStYCP/spraytan-product.jpg",
    "https://i.postimg.cc/nL5zs5VL/spray-tan-results.jpg",
    "https://i.postimg.cc/Mp9XwHhV/ninatrill-bed2.jpg",
    "https://i.postimg.cc/TYXKqZVL/ninatrill-lash-lift.jpg",
  ];
  let count = 0;
  // const [img, setImg] = useState(slideImages[count]);

  //

  // useEffect(() => {
  //   setInterval(() => {
  //     count += 1;

  //     if (count === slideImages.length + 1) {
  //       count = 0;
  //     }

  //     setImg(slideImages[count]);
  //     // } else {
  //     //   setImage(slideImages[count]);
  //     // }
  //   }, 4500);
  // }, [dispatch]);
  return (
    <div className="splash__slide__show__container">
      <div className="splash__slide__show__header">WELCOME TO NINATRILL ESTHETICS</div>
      <div className="splash__slide__show__image__container">
        <img className="splash__slide__show__image" src="https://i.postimg.cc/VstStYCP/spraytan-product.jpg"></img>
      </div>
    </div>
  );
}

export default SplashSlideShow;
