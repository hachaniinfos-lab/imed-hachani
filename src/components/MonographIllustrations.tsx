import React from 'react';

interface IllustrationProps {
  type: 'landscape' | 'agriculture' | 'craft' | 'mountain' | 'energy' | 'market';
  className?: string;
}

export const MonographIllustration: React.FC<IllustrationProps> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'landscape':
      return (
        <svg viewBox="0 0 800 450" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="50%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
            <linearGradient id="mountainBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9a3412" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="mountainMid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b45309" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="plainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e5c07b" />
              <stop offset="40%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#a98467" />
            </linearGradient>
          </defs>
          {/* Sky with soft desert atmosphere */}
          <rect width="800" height="450" fill="url(#skyGrad)" />
          {/* Sun low on horizon */}
          <circle cx="560" cy="180" r="55" fill="#fef08a" opacity="0.85" filter="blur(1px)" />
          <circle cx="560" cy="180" r="75" fill="#fef08a" opacity="0.3" />

          {/* Distant mountain silhouette (Jebel Kchem Meriem & Asker) */}
          <polygon points="0,290 85,250 190,265 270,225 360,250 480,210 590,240 680,215 800,260 800,320 0,320" fill="url(#mountainBack)" />
          <polygon points="0,310 130,260 240,285 340,240 430,270 550,230 650,270 760,245 800,280 800,360 0,360" fill="url(#mountainMid)" />

          {/* Rolling Steppe Plains */}
          <path d="M0,330 Q200,310 400,335 T800,320 L800,450 L0,450 Z" fill="url(#plainGrad)" />
          <path d="M0,370 Q250,350 500,375 T800,360 L800,450 L0,450 Z" fill="#997b66" opacity="0.5" />

          {/* Resilient Olive Trees & Esparto Tufts */}
          <g fill="#2d5a27" stroke="#1b3818" strokeWidth="1">
            {/* Tree 1 */}
            <path d="M120,380 C110,365 115,350 135,345 C155,340 170,355 165,370 C160,385 140,390 120,380 Z" fill="#3f6212" />
            <line x1="140" y1="375" x2="142" y2="400" stroke="#573a08" strokeWidth="4" />
            {/* Tree 2 */}
            <path d="M280,365 C265,350 275,335 295,330 C315,325 330,340 325,355 C320,370 295,375 280,365 Z" fill="#365314" />
            <line x1="300" y1="360" x2="302" y2="385" stroke="#573a08" strokeWidth="3" />
            {/* Tree 3 */}
            <path d="M620,375 C605,358 615,342 638,338 C660,334 675,350 670,365 C665,380 635,386 620,375 Z" fill="#4d7c0f" />
            <line x1="642" y1="370" x2="643" y2="398" stroke="#573a08" strokeWidth="4" />
          </g>

          {/* Esparto grass (حلفاء) clusters */}
          <g stroke="#a16207" strokeWidth="1.5" strokeLinecap="round">
            <path d="M70,410 L65,395 M72,410 L72,390 M75,410 L82,396" />
            <path d="M210,420 L205,405 M212,420 L213,400 M216,420 L223,406" />
            <path d="M480,415 L475,398 M482,415 L483,392 M487,415 L495,400" />
            <path d="M720,425 L715,408 M722,425 L724,402 M728,425 L736,410" />
          </g>

          {/* Steppe road trail winding into distance */}
          <path d="M380,450 C385,410 400,380 430,340 C450,310 460,290 465,275" stroke="#d5bdaf" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M380,450 C385,410 400,380 430,340 C450,310 460,290 465,275" stroke="#f0ead2" strokeWidth="3" strokeDasharray="6 6" fill="none" opacity="0.8" />
        </svg>
      );

    case 'agriculture':
      return (
        <svg viewBox="0 0 600 450" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pastureSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="70%" stopColor="#fef3c7" />
            </linearGradient>
            <linearGradient id="earthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#8c6239" />
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#pastureSky)" />
          {/* Low plateau */}
          <polygon points="0,210 180,185 360,205 520,175 600,195 600,450 0,450" fill="url(#earthGrad)" />
          <path d="M0,260 Q300,230 600,270 L600,450 L0,450 Z" fill="#a47148" opacity="0.6" />

          {/* Olive tree row in background */}
          <g fill="#4d7c0f">
            <circle cx="80" cy="210" r="28" />
            <circle cx="170" cy="200" r="24" />
            <circle cx="260" cy="215" r="26" />
            <circle cx="480" cy="205" r="30" />
            <circle cx="560" cy="220" r="25" />
          </g>

          {/* Flock of Barbarine Sheep (قطيع الأغنام البربرية) */}
          <g id="sheep-flock">
            {/* Sheep 1 */}
            <g transform="translate(180, 290)">
              <ellipse cx="35" cy="25" rx="30" ry="20" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="2" />
              <ellipse cx="15" cy="18" rx="10" ry="8" fill="#573a08" />
              <circle cx="12" cy="17" r="1.5" fill="#ffffff" />
              {/* Thick fat tail (لية الأغنام البربرية) */}
              <ellipse cx="62" cy="27" rx="9" ry="12" fill="#e7e5e4" />
              {/* Legs */}
              <line x1="20" y1="40" x2="20" y2="58" stroke="#44403c" strokeWidth="4" strokeLinecap="round" />
              <line x1="30" y1="42" x2="31" y2="59" stroke="#44403c" strokeWidth="4" strokeLinecap="round" />
              <line x1="45" y1="42" x2="45" y2="58" stroke="#44403c" strokeWidth="4" strokeLinecap="round" />
              <line x1="55" y1="40" x2="56" y2="57" stroke="#44403c" strokeWidth="4" strokeLinecap="round" />
            </g>
            {/* Sheep 2 */}
            <g transform="translate(290, 310)">
              <ellipse cx="38" cy="25" rx="34" ry="22" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="2" />
              <ellipse cx="15" cy="18" rx="11" ry="9" fill="#44403c" />
              <circle cx="12" cy="17" r="1.5" fill="#ffffff" />
              <ellipse cx="68" cy="28" rx="10" ry="14" fill="#e7e5e4" />
              <line x1="22" y1="42" x2="22" y2="62" stroke="#292524" strokeWidth="4" strokeLinecap="round" />
              <line x1="34" y1="44" x2="35" y2="63" stroke="#292524" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="44" x2="50" y2="62" stroke="#292524" strokeWidth="4" strokeLinecap="round" />
              <line x1="62" y1="42" x2="63" y2="61" stroke="#292524" strokeWidth="4" strokeLinecap="round" />
            </g>
            {/* Sheep 3 (grazing) */}
            <g transform="translate(420, 320)">
              <ellipse cx="32" cy="22" rx="26" ry="18" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="2" />
              <ellipse cx="8" cy="30" rx="9" ry="7" fill="#78350f" />
              <ellipse cx="56" cy="24" rx="8" ry="11" fill="#e7e5e4" />
              <line x1="18" y1="36" x2="17" y2="50" stroke="#44403c" strokeWidth="3" strokeLinecap="round" />
              <line x1="28" y1="38" x2="28" y2="52" stroke="#44403c" strokeWidth="3" strokeLinecap="round" />
              <line x1="42" y1="38" x2="42" y2="51" stroke="#44403c" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="36" x2="51" y2="49" stroke="#44403c" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>

          {/* Traditional Shepherd silhouette */}
          <g transform="translate(100, 240)">
            <ellipse cx="20" cy="14" rx="7" ry="8" fill="#78350f" />
            {/* Shepherd cloak / kachabiya */}
            <path d="M12,22 L28,22 L36,90 L4,90 Z" fill="#a16207" />
            {/* Shepherd staff */}
            <line x1="38" y1="5" x2="38" y2="98" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
            <path d="M38,5 C38,0 45,0 45,7" stroke="#451a03" strokeWidth="3" fill="none" />
          </g>

          {/* Steppe shrubs */}
          <g stroke="#ca8a04" strokeWidth="2" fill="none">
            <path d="M140,410 C145,395 155,400 160,390" />
            <path d="M380,420 C385,405 395,410 405,400" />
            <path d="M520,410 C525,390 535,395 545,385" />
          </g>
        </svg>
      );

    case 'craft':
      return (
        <svg viewBox="0 0 600 450" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="loomBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fdfbf7" />
              <stop offset="100%" stopColor="#f3eee3" />
            </linearGradient>
            <pattern id="klimPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,0 40,20 20,40 0,20" fill="#9a3412" opacity="0.8" />
              <polygon points="20,8 32,20 20,32 8,20" fill="#facc15" />
              <polygon points="20,14 26,20 20,26 14,20" fill="#1e3a8a" />
            </pattern>
          </defs>
          <rect width="600" height="450" fill="url(#loomBg)" />

          {/* Carpet / Mergoum Showcase */}
          <rect x="70" y="40" width="300" height="370" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="6" />
          {/* Inner carpet border */}
          <rect x="90" y="60" width="260" height="330" fill="#b45309" />
          <rect x="105" y="75" width="230" height="300" fill="url(#klimPattern)" />
          {/* Carpet fringe (شراشيب الصوف) */}
          <g stroke="#f5f5f4" strokeWidth="2.5">
            {[...Array(20)].map((_, i) => (
              <React.Fragment key={i}>
                <line x1={80 + i * 14} y1="36" x2={80 + i * 14} y2="40" />
                <line x1={80 + i * 14} y1="410" x2={80 + i * 14} y2="425" />
              </React.Fragment>
            ))}
          </g>

          {/* Esparto Grass Woven Basket (قفة الحلفاء التقليدية) */}
          <g transform="translate(400, 160)">
            <ellipse cx="80" cy="50" rx="65" ry="30" fill="#d97706" stroke="#92400e" strokeWidth="3" />
            <path d="M15,50 C15,160 30,190 80,190 C130,190 145,160 145,50 Z" fill="#b45309" stroke="#78350f" strokeWidth="4" />
            {/* Esparto texture weave lines */}
            <path d="M25,75 Q80,105 135,75" stroke="#fef3c7" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M30,110 Q80,140 130,110" stroke="#fef3c7" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M40,145 Q80,170 120,145" stroke="#fef3c7" strokeWidth="2" fill="none" opacity="0.6" />
            {/* Basket Handle */}
            <path d="M45,50 C45,-15 115,-15 115,50" stroke="#78350f" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M45,50 C45,-15 115,-15 115,50" stroke="#fcd34d" strokeWidth="2" fill="none" strokeDasharray="6 4" />
          </g>

          {/* Spindle / Wool Yarn (مغزل الصوف) */}
          <g transform="translate(420, 360)">
            <circle cx="70" cy="30" r="28" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="3" />
            <line x1="10" y1="60" x2="130" y2="0" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <circle cx="70" cy="30" r="8" fill="#d6d3d1" />
          </g>
        </svg>
      );

    case 'mountain':
      return (
        <svg viewBox="0 0 800 450" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="desertSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="cliffRock" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9a3412" />
              <stop offset="50%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill="url(#desertSky)" />
          {/* Intense North African Sun */}
          <circle cx="200" cy="110" r="40" fill="#ffffff" opacity="0.9" />
          <circle cx="200" cy="110" r="70" fill="#fef08a" opacity="0.35" />

          {/* Distant Hills */}
          <polygon points="0,260 140,220 280,245 420,210 560,230 700,215 800,240 800,320 0,320" fill="#b45309" opacity="0.35" />

          {/* Jebel Kchem Meriem Massive Limestone Ridge */}
          <polygon points="120,260 210,170 330,140 450,130 540,165 670,220 780,260 800,450 60,450" fill="url(#cliffRock)" />

          {/* Geological strata & escarpment lines */}
          <path d="M210,170 L330,140 L450,130 L540,165" stroke="#fcd34d" strokeWidth="4" fill="none" opacity="0.7" />
          <path d="M190,200 L320,175 L460,165 L570,195 L680,240" stroke="#ea580c" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M170,230 L300,210 L440,198 L590,225 L720,270" stroke="#f97316" strokeWidth="3" fill="none" opacity="0.5" />
          <path d="M150,265 L280,245 L420,235 L610,260 L750,300" stroke="#fdba74" strokeWidth="2.5" fill="none" opacity="0.4" />

          {/* Talus scree & boulders at base */}
          <polygon points="0,320 220,300 480,310 800,295 800,450 0,450" fill="#92400e" opacity="0.75" />
          <polygon points="0,360 280,345 580,350 800,340 800,450 0,450" fill="#78350f" />

          {/* Boulders */}
          <ellipse cx="260" cy="385" rx="35" ry="18" fill="#573a08" />
          <ellipse cx="480" cy="395" rx="45" ry="22" fill="#451a03" />
          <ellipse cx="650" cy="380" rx="30" ry="15" fill="#573a08" />

          {/* Desert acacia / rtem bush */}
          <g stroke="#166534" strokeWidth="2">
            <line x1="140" y1="420" x2="135" y2="390" />
            <circle cx="135" cy="388" r="14" fill="#15803d" />
            <line x1="560" y1="430" x2="565" y2="400" />
            <circle cx="568" cy="398" r="16" fill="#166534" />
          </g>
        </svg>
      );

    case 'energy':
      return (
        <svg viewBox="0 0 600 450" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="solarSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="70%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="pvPanel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#172554" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#solarSky)" />
          {/* Golden sun rays */}
          <circle cx="300" cy="90" r="45" fill="#fef08a" />
          <line x1="300" y1="20" x2="300" y2="40" stroke="#fef08a" strokeWidth="3" />
          <line x1="350" y1="40" x2="335" y2="55" stroke="#fef08a" strokeWidth="3" />
          <line x1="370" y1="90" x2="350" y2="90" stroke="#fef08a" strokeWidth="3" />
          <line x1="230" y1="90" x2="250" y2="90" stroke="#fef08a" strokeWidth="3" />

          {/* Horizon terrain */}
          <polygon points="0,210 200,200 400,205 600,195 600,450 0,450" fill="#d4a373" />

          {/* Rows of Solar PV Arrays in perspective (حقول الطاقة الفولطوضوئية) */}
          {/* Row 1 (back) */}
          <g opacity="0.8">
            <polygon points="60,240 180,240 170,270 40,270" fill="url(#pvPanel)" stroke="#38bdf8" strokeWidth="1" />
            <polygon points="210,240 330,240 320,270 190,270" fill="url(#pvPanel)" stroke="#38bdf8" strokeWidth="1" />
            <polygon points="360,240 480,240 470,270 340,270" fill="url(#pvPanel)" stroke="#38bdf8" strokeWidth="1" />
          </g>
          {/* Row 2 (mid) */}
          <g>
            <polygon points="50,285 210,285 195,335 25,335" fill="url(#pvPanel)" stroke="#60a5fa" strokeWidth="1.5" />
            <polygon points="245,285 405,285 390,335 220,335" fill="url(#pvPanel)" stroke="#60a5fa" strokeWidth="1.5" />
            <polygon points="440,285 590,285 575,335 415,335" fill="url(#pvPanel)" stroke="#60a5fa" strokeWidth="1.5" />
          </g>
          {/* Row 3 (front dominant) */}
          <g>
            <polygon points="30,355 260,355 240,430 0,430" fill="url(#pvPanel)" stroke="#93c5fd" strokeWidth="2" />
            <polygon points="290,355 570,355 550,430 260,430" fill="url(#pvPanel)" stroke="#93c5fd" strokeWidth="2" />
            {/* Solar panel grid lines */}
            <line x1="85" y1="355" x2="60" y2="430" stroke="#60a5fa" strokeWidth="1" />
            <line x1="145" y1="355" x2="120" y2="430" stroke="#60a5fa" strokeWidth="1" />
            <line x1="205" y1="355" x2="180" y2="430" stroke="#60a5fa" strokeWidth="1" />
            <line x1="360" y1="355" x2="335" y2="430" stroke="#60a5fa" strokeWidth="1" />
            <line x1="430" y1="355" x2="405" y2="430" stroke="#60a5fa" strokeWidth="1" />
            <line x1="500" y1="355" x2="475" y2="430" stroke="#60a5fa" strokeWidth="1" />
          </g>

          {/* Clean energy transmission pylon symbol */}
          <g transform="translate(520, 160)" stroke="#1e293b" strokeWidth="2" fill="none">
            <line x1="25" y1="0" x2="10" y2="90" />
            <line x1="25" y1="0" x2="40" y2="90" />
            <line x1="5" y1="30" x2="45" y2="30" />
            <line x1="10" y1="55" x2="40" y2="55" />
            <line x1="15" y1="30" x2="35" y2="55" />
            <line x1="35" y1="30" x2="15" y2="55" />
          </g>
        </svg>
      );

    case 'market':
    default:
      return (
        <svg viewBox="0 0 600 450" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="marketSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#ffedd5" />
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#marketSky)" />

          {/* Traditional Market Canopies (خيام ومظلات السوق الأسبوعية) */}
          <g transform="translate(50, 120)">
            <polygon points="20,80 140,80 160,110 0,110" fill="#dc2626" />
            <polygon points="40,80 80,80 90,110 30,110" fill="#fef2f2" />
            <polygon points="100,80 140,80 150,110 90,110" fill="#dc2626" />
            <line x1="10" y1="110" x2="10" y2="240" stroke="#78350f" strokeWidth="4" />
            <line x1="150" y1="110" x2="150" y2="240" stroke="#78350f" strokeWidth="4" />
          </g>

          <g transform="translate(220, 100)">
            <polygon points="20,80 170,80 190,115 0,115" fill="#2563eb" />
            <polygon points="40,80 90,80 100,115 30,115" fill="#eff6ff" />
            <polygon points="110,80 160,80 170,115 100,115" fill="#2563eb" />
            <line x1="10" y1="115" x2="10" y2="260" stroke="#78350f" strokeWidth="4" />
            <line x1="180" y1="115" x2="180" y2="260" stroke="#78350f" strokeWidth="4" />
          </g>

          <g transform="translate(420, 130)">
            <polygon points="20,80 130,80 150,110 0,110" fill="#16a34a" />
            <polygon points="40,80 80,80 90,110 30,110" fill="#f0fdf4" />
            <line x1="10" y1="110" x2="10" y2="230" stroke="#78350f" strokeWidth="4" />
            <line x1="140" y1="110" x2="140" y2="230" stroke="#78350f" strokeWidth="4" />
          </g>

          {/* Market Ground */}
          <rect y="280" width="600" height="170" fill="#e7d5c0" />
          <path d="M0,280 Q300,260 600,280 L600,450 L0,450 Z" fill="#d4b996" opacity="0.6" />

          {/* Market goods baskets & crates */}
          <g fill="#92400e">
            <rect x="70" y="270" width="45" height="30" rx="4" />
            <circle cx="140" cy="285" r="18" fill="#b45309" />
            <circle cx="165" cy="290" r="14" fill="#a16207" />
            <rect x="250" y="275" width="50" height="35" rx="3" fill="#78350f" />
            <rect x="310" y="275" width="40" height="35" rx="3" fill="#854d0e" />
          </g>

          {/* Merchant and visitor silhouettes */}
          <g fill="#451a03">
            <circle cx="200" cy="240" r="10" />
            <path d="M190,252 L210,252 L216,330 L184,330 Z" />
            <circle cx="230" cy="245" r="9" />
            <path d="M222,256 L238,256 L242,330 L218,330 Z" fill="#78350f" />
            <circle cx="380" cy="240" r="10" />
            <path d="M370,252 L390,252 L395,330 L365,330 Z" fill="#365314" />
          </g>
        </svg>
      );
  }
};
