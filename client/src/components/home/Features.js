import React, { Component } from 'react';
import TranslatedComponent from '../commons/TranslatedComponent';
import Feature from '../home/Feature';

class Features extends Component {
  render() {
    return (
      <section className="box special features">
        <div className="features-row">
            <Feature className="fas fa-bicycle accent2" title="Potenciómetro asequible" description="Prototipo en desarrollo de un potenciómetro asequible para ciclismo outdoor, intercambiable entre bicicletas en cuestión de segundos."/>
            <Feature className="fas fa-align-right accent3" title="Calibración de rodillos" description="Pioneros en el desarrollo de una técnica que crea copias virtuales de potenciómetros en rodillos de entrenamiento. Esta técnica permite usar cualquier rodillo calibrado como si de un potenciómetro se tratase."/>
        </div>
        <div className="features-row">
            <Feature className="fas fa-chart-bar accent4" title="Gráficas online" description="Plataforma online desde la que analizar el entrenamiento realizado, proporcionando métricas de interés para el entrenamiento por potencia como la potencia crítica y los niveles de fatiga y fitness."/>
            <Feature className="fas fa-users accent5" title="Entrenador online" description="La plataforma permite la comunicación en tiempo real entre entrenadores profesionales y deportistas."/>
        </div>
      </section>
    );
  }
}

export default TranslatedComponent(Features);
