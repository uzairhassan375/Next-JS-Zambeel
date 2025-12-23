'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, description, index, totalCards, cta, link }) => {
    const cardRef = useRef(null);
    const containerRef = useRef(null);

    // Card background colors based on index
    const cardColors = [
        'rgb(231, 239, 252)',  // First card
        'rgb(255, 249, 230)',  // Second card
        'rgb(253, 232, 233)',  // Third card
        'rgb(230, 247, 245)'   // Fourth card
    ];

    const cardBackgroundColor = cardColors[index] || cardColors[0];

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container) return;

        const targetScale = 1 - (totalCards - index) * 0.05;

        // Set initial state - center origin for center-based stacking
        gsap.set(card, {
            scale: 1,
            transformOrigin: "center center"
        });

        // Create scroll trigger for stacking effect - centered in viewport
        ScrollTrigger.create({
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = gsap.utils.interpolate(1, targetScale, progress);

                gsap.set(card, {
                    scale: Math.max(scale, targetScale),
                    transformOrigin: "center center"
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [index, totalCards]);

    // Calculate container height for center-based stacking
    const cardHeight = 350;
    const cardHalfHeight = cardHeight / 2;
    const viewportCenter = '30%';
    // All containers need enough height for the scroll animation
    const containerHeight = 400;

    return (
        <div
            ref={containerRef}
            style={{
                height: `${containerHeight}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: `calc(${viewportCenter} - ${cardHalfHeight}px)`
            }}
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '350px',
                    borderRadius: '24px',
                    top: `${index * 25}px`,
                    transformOrigin: 'center center'
                }}
                className="card-content"
            >
                {/* Main Card Content */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '24px',
                    background: cardBackgroundColor,
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden'
                }}>
                    {/* Card Content */}
                    <div style={{
                        position: 'relative',
                        zIndex: 1,
                        padding: '10px 20px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#1e3a8a',
                            marginBottom: '1.5rem',
                            lineHeight: '1.2',
                            textAlign: 'center',
                            width: '100%'
                        }}>
                            {title}
                        </h2>
                        <p style={{
                            fontSize: '1rem',
                            color: '#4a5568',
                            lineHeight: '1.6',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            width: '100%'
                        }}>
                            {description}
                        </p>
                        {link ? (
                            <Link
                                href={link}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                                style={{
                                    backgroundColor: '#1e3a8a',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '12px 24px',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'opacity 0.2s',
                                    fontFamily: 'inherit',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                {cta || title}
                                <span style={{ fontSize: '1rem', color: '#FCD64C' }}>→</span>
                            </Link>
                        ) : (
                            <button style={{
                                backgroundColor: '#1e3a8a',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '12px 24px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'opacity 0.2s',
                                fontFamily: 'inherit'
                            }}
                                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                {cta || title}
                                <span style={{ fontSize: '1rem', color: '#FCD64C' }}>→</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const StackedCards = () => {
    const containerRef = useRef(null);
    const { t } = useTranslation();

    const cardData = [
        {
            id: 2,
            title: t('homepage.featureCards.dropshipping.title'),
            description: t('homepage.featureCards.dropshipping.desc'),
            color: "rgba(236, 72, 153, 0.8)",
            cta: t('homepage.featureCards.dropshipping.cta'),
            link: "/dropshipping"
        },
        {
            id: 1,
            title: t('homepage.featureCards.learnEcommerce.title'),
            description: t('homepage.featureCards.learnEcommerce.desc'),
            color: "rgba(99, 102, 241, 0.8)",
            cta: t('homepage.featureCards.learnEcommerce.cta'),
            link: "/learn-ecommerce"
        },
        {
            id: 3,
            title: t('homepage.featureCards.zambeel360.title'),
            description: t('homepage.featureCards.zambeel360.desc'),
            color: "rgba(34, 197, 94, 0.8)",
            cta: t('homepage.featureCards.zambeel360.cta'),
            link: "/zambeel-360"
        },
        {
            id: 4,
            title: t('homepage.featureCards.zambeel3PL.title'),
            description: t('homepage.featureCards.zambeel3PL.desc'),
            color: "rgba(251, 146, 60, 0.8)",
            cta: t('homepage.featureCards.zambeel3PL.cta'),
            link: "/zambeel-3pl"
        }
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    }, []);

    return (
        <main ref={containerRef} style={{ background: 'transparent' }}>
            {/* Cards Section */}
            <section style={{
                width: '100%'
            }}>
                {cardData.map((card, index) => {
                    return (
                        <Card
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            index={index}
                            totalCards={cardData.length}
                            cta={card.cta}
                            link={card.link}
                        />
                    );
                })}
            </section>
        </main>
    );
};
