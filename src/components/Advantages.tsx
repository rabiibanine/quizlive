"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import Real_Time_img from "/advantage_pics/Real_Time_img.png";
import mobile_qrcode from "/advantage_pics/Qrcode.jpeg";
import Podium from "/advantage_pics/Podium.jpeg";
import easy_quiz from "/advantage_pics/easy_quiz.jpg";


export default function ScrollHorizontal() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Move from first item centered to last item centered
    const totalDistance = (items.length - 1) * (ITEM_WIDTH + GAP)
    const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

    return (
        <div id="example">
            <section className="intro-section text-black">
                <h1 className="impact">Advantages</h1>
            </section>

            <div ref={containerRef} className="scroll-container">
                <div className="sticky-wrapper">
                    <motion.div className="gallery" style={{ x }}>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="gallery-item"
                                style={
                                    {
                                        "--item-color": item.color,
                                        "--item-image": `url(${item.image})`,
                                    } as React.CSSProperties
                                }
                            >
                                <div className="item-content">
                                    <span className="item-number">0{item.id}</span>
                                    <h2>{item.title}</h2>
                                    <p className="text-white">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
    return (
        <style>{`
            body {
                overflow-x: hidden;
            }

            #example {
                height: auto;
                overflow: visible;
            }

            .intro-section {
                height: 20vh;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                text-align: center;
            }

            .intro-section h1 {
                font-size: clamp(36px, 8vw, 72px);
                color:var(--text);
                margin: 0;
                text-transform: uppercase;
            }

            .scroll-container {
                height: 300vh;
                position: relative;
            }

            .sticky-wrapper {
                position: sticky;
                top: 0;
                height: 80vh;
                width: 400px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                overflow: visible;
            }

            .gallery {
                display: flex;
                gap: 30px;
                will-change: transform;
            }

            .gallery-item {
                flex-shrink: 0;
                width: 400px;
                height: 500px;
                border-radius: 12px;
                position: relative;
                overflow: hidden;
                background-image: var(--item-image);
                background-size: center;
                background-position: center;
                
            }

            .gallery-item::before {
                content: "";
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    to bottom,
                    transparent 60%,
                    black
                );
                mix-blend-mode: multiply;
            }

            .item-content {
                position: absolute;
                bottom: 30px;
                left: 30px;
                z-index: 1;
            }

            .item-number {
                font-size: 24px;
                color: var(--item-color);
                font-family: "Azeret Mono", monospace;
                display: block;
                margin-bottom: 8px;
            }

            .gallery-item h2 {
                font-size: 28px;
                font-weight: 600;
                color: #f5f5f5;
                margin: 0;
            }


            @media (max-width: 600px) {
                .sticky-wrapper {
                    width: 280px;
                }

                .gallery {
                    gap: 15px;
                }

                .gallery-item {
                    width: 280px;
                    height: 350px;
                }
                .intro-section {
                    height: 10vh;
                }

            }

            @media (prefers-reduced-motion: reduce) {
                .gallery {
                    transform: none !important;
                }
                .scroll-container {
                    height: auto;
                }
                .sticky-wrapper {
                    position: relative;
                    height: auto;
                    width: 100%;
                    overflow-x: auto;
                    padding: 50px 0;
                }
            }
        `}</style>
    )
}

/**
 * ==============   Data   ================
 */

const items = [
    { id: 1, color: "#ff0088",
      title:"Accès universel"  , 
      description:"Grâce à WebRTC + VPS, les étudiants peuvent rejoindre depuis n’importe quel réseau.", 
      image: Real_Time_img
    },
    
    { id: 2, 
      color: "#00ee34de", 
      title:"Mobile experience", 
      description:"Interface optimisée pour smartphone avec QR code instantané.",  
      image: mobile_qrcode 
    },
    
    { id: 3, 
      color: "#9911ff", 
      title:"Gamified learning", 
      description:"Podium animé, scoring dynamique, compétition en direct.", 
      image: Podium 
    },
    
    { id: 4, 
      color: "#0d63f8", 
      title:"Quiz instantanés", 
      description:"Éditeur simple + import JSON pour créer rapidement des quiz.", 
      image: easy_quiz
    },
]

const ITEM_WIDTH = 400
const GAP = 30


