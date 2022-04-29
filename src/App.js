import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './logo.webp';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2em;
  scroll-behavior: smooth;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;

const Item = styled.div`
    grid-column: 2;
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 20px;
  margin-top: 10px;

  &::after {
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }

`;

function App() {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda , guardarCriptomoneda ] = useState('');
  const [ resultado, guardarResultado ] = useState({});
  const [ cargando, guardarCargando ] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {

      // evitamos la ejecucion la primera vex
      if ( moneda === '' ) return;
      // consultar la api para obtener la cotizacion
      const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptomoneda }&tsyms=${ moneda }`;
      const resultado = await axios.get(url);

      // mostrar el spinner
      guardarCargando(true);

      setTimeout(() => {
        // cambiar el estado de cargando
        guardarCargando(false);
        // guardar cotizacion
        guardarResultado( resultado.data.DISPLAY[criptomoneda][moneda] );
      }, 2000);
    }

    cotizarCriptomoneda();

  }, [ moneda, criptomoneda ]);

  const componente = ( cargando ) ?<Spinner /> :<Cotizacion resultado = { resultado } />;

  return (
    <Contenedor>
      {/* <div>
        <Imagen
          src={imagen}
          alt='imagen criptomonedas'
        />
      </div> */}
      <Item>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda = { guardarMoneda }
          guardarCriptomoneda = { guardarCriptomoneda }
        />
        { componente }
      </Item>
    </Contenedor>
  );
}

export default App;
