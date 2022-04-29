import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
    margin: 30px auto 0 auto;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    background: rgba(0,0,0,.09);
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;
    span {
        font-weight: bold;
    }
`;

const Cotizacion = ({ resultado }) => {

    if ( Object.keys( resultado ).length === 0 ) return null;
    // console.log( resultado );

    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{ resultado.PRICE }</span> </Precio>
            <Info>El precio más alto del día : <span>{ resultado.HIGHDAY }</span> </Info>
            <Info>El precio más bajo del día : <span>{ resultado.LOWDAY }</span> </Info>
            <Info>Variacíon últimas 24 horas : <span>{ resultado.CHANGEPCT24HOUR }</span></Info>
            <Info>Última Actualización : <span>{ resultado.LASTUPDATE }</span> </Info>
        </ResultadoDiv>
    );
}

Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Cotizacion;