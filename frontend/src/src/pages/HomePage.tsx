/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import SearchBar from "../components/SearchBar.tsx";
import "./css/homePage.scss";

function HomePage()
{
  return (
      // <div>

      <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title ">Les services de location à long terme au Québec</h1>
          <p className="">
            Aider les municipalités à mieux planifier le développement d'habitation ou les citoyens à faire un meilleur choix de lieux, permettre d'optimiser et trouver des unités d'habitations à l'aide des différents jeux de données
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>1+</h1>
              <h2>D'experience</h2>
            </div>
            <div className="box">
              <h1>10+</h1>
              <h2>Prix Décernés</h2>
            </div>
            <div className="box">
              <h1>100+</h1>
              <h2>Propriétés Prêtes</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/rent.png" alt="" />
      </div>

        {/*<Map/>*/}
    </div>
    // </div>
  );
}

export default HomePage;
