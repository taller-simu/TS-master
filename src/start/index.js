import React from 'react';
import App from "../App.css";
import covid from "../covid-19.jpg";
import facebook from "../facebook-new.png";
import youtube from "../youtebe.png"
import twitter from "../twitter.jpg";
import { Image } from 'semantic-ui-react';


function start() {
  return (
    <div className="home">
      
        <div className="subtitle">

              <h1>#QUEDATEENCASA</h1>
        </div>
              <div className="autor">
                <address>
                Escrito por: Estudiantes SISTEMAS.<br />
                Email: <a href="mailto:villca.fuentes23@gmail.com">villca.fuentes23@gmail.com</a><br />
                Email: <a href="mailto:portugalm6@gmail.com">portugalm6@gmail.com</a><br />
                Email: <a href="mailto:alevargasmory@gmail.com">alevargasmory@gmail.com</a><br />
                Email: <a href="mailto:arnol01233@gmail.com">arnol01233@gmail.com</a><br />
                Sitio web: <a href="https://InformacionCBBA.com" target="black">Informacion Covid.</a>                       
                </address>
                        <div className="fech">
                                    <time datetime="08-07-2020" class="fecha-articulo"> 
                                        8 de julio del 2020
                                    </time>
                                    
                         </div>
              </div>

                                <div className="imag">
                                    
                                    <Image className="log" src={covid}  bordered style={{with:"550px",height:"450px"}} />

                                </div>

                                        <div className="info">     
                                              <h1 className="h2"> ¿ Por que los brotes como el coronavirus <br />
                                                  crecen exponencialmente y <br />
                                                  como aplanar la curva de contagios ?
                                              </h1>
                                        </div>
                                        <div className="nifo2">                  
                                              <h2 className="h3">
                                                    <strong>El primer caso en Cochabamba llego desde Oruro es el hijo <br />
                                                             de la mujer de 65 años,</strong>que vino de Italia trayendo <br />
                                                             la enfermedad a este tipo de transmisión el ministro de salud 
                                                             denomino caso local
                                              </h2>     
                                        </div>
                              <div className="redesociales">
                                      
                                                      
                                                      <Image className="log" src={facebook}  bordered style={{with:"80px",height:"80px"}} />
                                                      
                                                      <Image className="log" src={youtube}  bordered style={{with:"80px",height:"80px"}} />
                                                      
                                                      <Image className="log" src={twitter}  bordered style={{with:"80px",height:"80px"}} />
                                  
                                  
                              </div>
                <footer className="foter-pag">
                  <div className="contener">
                        <div className=" mod-pie-pag pie-pag-izq">
                          <span className="pie-nombre-marca">Simulador De Pandemia</span><br />
                          <span className="pie-derecho-aut">61929 Nombre Marca, todos los derechos sobre las marcas. Imagenes y contenidos estan protegidos</span>

                        </div>
                        <div className="mod-pie-pag pie-pag-der">
                          <address>
                                      Pais, Ciudad: COCHABAMBA<br />
                                      Instituto: UMSS<br />
                                      Telf: 77829248
                          </address>
                        </div>

                  </div>
                </footer>
                      
      </div>
              
  );
}

export default start;