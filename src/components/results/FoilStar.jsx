import React from 'react';
import foilStar from '../../assets/foil-star.png';



const FoilStar = () => {
   return (
     <div className="foil-star-img-container">
       <img className="foil-star-img" src={foilStar} alt={"Foil star icon"} />
     </div>
   )
};

export default FoilStar;
