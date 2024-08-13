import { Theme } from "@prisma/client";

export const products = [
    {
        id: 1111,
        imageLink:
            "https://iqunix.store/cdn/shop/files/20240530-110505.jpg?height=1200&v=1717038329",
        name: "Void Voyager Keyboard",
        description:
            "Embark on a cosmic typing journey with the Void Voyager Keyboard. Its sleek, all-black design mimics the depths of space, while responsive keys ensure smooth navigation through your digital universe. Customizable backlighting adds a stellar touch to your setup.",
        specifications: [
            "Full-size 104-key layout",
            "Cherry MX switches",
            "Aircraft-grade aluminum frame",
            "Customizable RGB backlighting",
            "N-key rollover",
        ],
        ratings: 4.5,
        quantity_available: 12,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1112,
        imageLink:
            "https://ih1.redbubble.net/image.3140992453.1543/ur,mouse_pad_small_lifestyle_gaming,wide_portrait,750x1000.jpg",
        name: "Quantum Flux Mousepad",
        description:
            "Experience precision at the quantum level with the Quantum Flux Mousepad. Its micro-textured surface ensures pinpoint accuracy for every mouse movement, while the non-slip base keeps it anchored in this reality. The abstract quantum-inspired design adds a touch of scientific elegance to your workspace.",
        specifications: [
            "900 x 400 mm size",
            "3 mm thickness",
            "Micro-textured cloth surface",
            "Non-slip rubber base",
            "Stitched edges for durability",
        ],
        ratings: 4.8,
        quantity_available: 20,
        theme: Theme.Quantum_Realm,
    },
    {
        id: 1113,
        imageLink:
            "https://neo4ic.com/cdn/shop/products/NEO4IC_RED_ZYPHR_ZIP_UP_JACKET97.jpg?v=1661491647",
        name: "Neon Horizon Hoodie",
        description:
            "Wrap yourself in the warmth of a distant future with the Neon Horizon Hoodie. Its sleek design and vibrant accents evoke the cityscape of tomorrow. Comfortable and stylish, it's perfect for those chilly nights spent stargazing or coding the next big app.",
        specifications: [
            "80% cotton, 20% polyester blend",
            "Unisex design",
            "Kangaroo pocket",
            "Ribbed cuffs and waistband",
            "Machine washable",
        ],
        ratings: 4.6,
        quantity_available: 30,
        theme: Theme.Human_Future,
    },
    {
        id: 1114,
        imageLink: "https://i.ebayimg.com/images/g/IQ4AAOSwPoZavmWQ/s-l1200.webp",
        name: "Cosmic Threads Beanie",
        description:
            "Keep your thoughts warm and your style cosmic with the Cosmic Threads Beanie. Knitted with a blend of earthly comfort and otherworldly design, this beanie features a subtle galaxy pattern that seems to shift as you move. Perfect for those who dream among the stars.",
        specifications: [
            "100% acrylic material",
            "One size fits most",
            "Stretchable ribbed knit",
            "Embroidered cosmic design",
            "Hand wash recommended",
        ],
        ratings: 4.3,
        quantity_available: 25,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1115,
        imageLink:
            "https://ih1.redbubble.net/image.532886615.4855/icr,iphone_15_tough,back,a,x600-pad,600x600,f8f8f8.u4.jpg",
        name: "Quantum Entanglement Phone Case",
        description:
            "Protect your device with the mind-bending Quantum Entanglement Phone Case. Its unique design visualizes the spooky action at a distance, making your phone stand out in any dimension. Durable and slim, it offers robust protection without compromising on style.",
        specifications: [
            "Compatible with latest phone models",
            "Shock-absorbing TPU material",
            "Raised bezel for screen protection",
            "Wireless charging compatible",
            "Easy snap-on design",
        ],
        ratings: 4.7,
        quantity_available: 40,
        theme: Theme.Featured,
    },
    {
        id: 1116,
        imageLink:
            "https://i.etsystatic.com/37605027/r/il/24e165/4990493428/il_fullxfull.4990493428_bl4m.jpg",
        name: "Cybernetic Sunrise Mug",
        description:
            "Start your day in the future with the Cybernetic Sunrise Mug. This temperature-sensitive mug reveals a futuristic cityscape as your beverage warms it up. It's not just a mug, it's a daily reminder of the amazing future we're building together.",
        specifications: [
            "11 oz capacity",
            "Ceramic material",
            "Dishwasher and microwave safe",
            "Color-changing thermochromic print",
            "Ergonomic handle design",
        ],
        ratings: 4.4,
        quantity_available: 35,
        theme: Theme.Human_Future,
    },
    {
        id: 1117,
        imageLink:
            "https://ih1.redbubble.net/image.1209864247.2514/sn,x1000-pad,750x1000,f8f8f8.u2.jpg",
        name: "Nano-Circuit Journal",
        description:
            "Record your thoughts for posterity with the Nano-Circuit Journal. Its cover features an intricate design inspired by futuristic nanotechnology, while the pages are made from sustainable materials. Let your ideas flow as smoothly as electrons through a quantum computer.",
        specifications: [
            "200 lined pages",
            "A5 size (5.8 x 8.3 inches)",
            "100 gsm acid-free paper",
            "Hardcover with nano-circuit design",
            "Elastic closure band",
        ],
        ratings: 4.6,
        quantity_available: 28,
        theme: Theme.Human_Future,
    },
    {
        id: 1118,
        imageLink:
            "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fretro-futuristic-setup-v0-psfge7weolba1.jpg%3Fwidth%3D3024%26format%3Dpjpg%26auto%3Dwebp%26s%3Dc4e1a06e88bdbe69b4db51ca871e84f251524ab0",
        name: "Singularity Shift Keyboard",
        description:
            "Type at the edge of a digital black hole with the Singularity Shift Keyboard. Its gradient keycaps mimic the intense gravitational pull of a singularity, while the responsive mechanical switches ensure every keystroke is felt across the universe.",
        specifications: [
            "Tenkeyless layout",
            "Hot-swappable switches",
            "PBT double-shot keycaps",
            "USB-C connectivity",
            "Programmable macro keys",
        ],
        ratings: 4.9,
        quantity_available: 15,
        theme: Theme.Highlights,
    },
    {
        id: 1119,
        imageLink:
            "https://ih1.redbubble.net/image.3840492293.6946/ur,mouse_pad_small_flatlay_prop,wide_portrait,750x1000.u1.jpg",
        name: "Nebula Drift Mousepad",
        description:
            "Navigate through star systems with the Nebula Drift Mousepad. Its expansive design showcases a breathtaking nebula, providing not just a surface for your mouse, but a window into the cosmos. The smooth texture ensures precise control for all your galactic maneuvers.",
        specifications: [
            "Extended size: 900 x 400 mm",
            "4 mm thickness for comfort",
            "Water-resistant surface",
            "Anti-fray stitched edges",
            "Natural rubber base",
        ],
        ratings: 4.7,
        quantity_available: 22,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1120,
        imageLink:
            "https://i0.wp.com/thehouseofrave.com/wp-content/uploads/2023/08/B0C9P4Y68V.PT01.webp?fit=640%2C800&ssl=1",
        name: "Holographic Data Beanie",
        description:
            "Store your thoughts in style with the Holographic Data Beanie. While it may look like a regular beanie, its special fibers are designed to interact with your brain waves, offering a glimpse into a future where our accessories become extensions of our minds.",
        specifications: [
            "Thermo-regulating smart fabric",
            "Reflective holographic thread details",
            "Wireless charging compatible",
            "Water and stain resistant",
            "Integrated bone conduction speakers",
        ],
        ratings: 4.2,
        quantity_available: 20,
        theme: Theme.Human_Future,
    },
    {
        id: 1121,
        imageLink:
            "https://i.etsystatic.com/21499050/r/il/13336f/2956697327/il_570xN.2956697327_b4n4.jpg",
        name: "Atomic Precision Mug",
        description:
            "Drink from the future with the Atomic Precision Mug. Its unique atomic structure-inspired design is not just for show - the mug uses advanced materials to keep your drinks at the perfect temperature for hours. It's science you can sip.",
        specifications: [
            "Double-wall vacuum insulation",
            "Made from aerospace-grade stainless steel",
            "Capacity: 14 oz",
            "Spill-proof lid with sliding lock",
            "Atomic structure etched design",
        ],
        ratings: 4.6,
        quantity_available: 25,
        theme: Theme.Human_Future,
    },
    {
        id: 1122,
        imageLink:
            "https://ih1.redbubble.net/image.1470282739.1813/hj,750x-pad,750x1000,f8f8f8.jpg",
        name: "Time Dilation Journal",
        description:
            "Capture ideas that transcend spacetime with the Time Dilation Journal. Its cover animates a mesmerizing time dilation effect as you move it, while the pages are designed to withstand the test of time. Perfect for recording your journey through life and theoretical physics.",
        specifications: [
            "Lenticular cover with time dilation animation",
            "240 pages of acid-free archival paper",
            "Embedded RFID chip for digital backup",
            "Expandable pocket in back cover",
            "Perennial calendar and time zone guide",
        ],
        ratings: 4.4,
        quantity_available: 20,
        theme: Theme.Human_Future,
    },
    {
        id: 1123,
        imageLink:
            "https://m.media-amazon.com/images/I/81SNH6VlQQL._AC_UF1000,1000_QL80_.jpg",
        name: "Gravity Wave Keyboard",
        description:
            "Type in harmony with the universe using the Gravity Wave Keyboard. Its undulating design mimics the ripples in spacetime caused by massive cosmic events. Each keystroke sends a satisfying wave through the board, connecting you to the fundamental forces of nature.",
        specifications: [
            "Ergonomic wave design",
            "Optical-mechanical hybrid switches",
            "Per-key RGB lighting with wave effects",
            "Detachable palm rest",
            "Dedicated media controls",
        ],
        ratings: 4.7,
        quantity_available: 18,
        theme: Theme.Highlights,
    },
    {
        id: 1124,
        imageLink:
            "https://ih1.redbubble.net/image.4179382447.4764/ur,mouse_pad_small_flatlay_prop,wide_portrait,750x1000.u3.jpg",
        name: "Dystopian Skyline Mousepad",
        description:
            "Mouse through a world of tomorrow with the Dystopian Skyline Mousepad. Featuring a haunting cityscape that glows in the dark, this mousepad turns your desk into a portal to a cyberpunk future. The textured surface ensures precise control in any lighting condition.",
        specifications: [
            "Large size: 800 x 300 mm",
            "Glow-in-the-dark ink",
            "Ultra-smooth microfiber surface",
            "5 mm thickness for wrist comfort",
            "Waterproof coating",
        ],
        ratings: 4.5,
        quantity_available: 22,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1125,
        imageLink:
            "https://m.media-amazon.com/images/I/616JREhu+1L._AC_UY1100_.jpg",
        name: "Exosuit Emulation Hoodie",
        description:
            "Experience the comfort of a future spacesuit with the Exosuit Emulation Hoodie. Designed with input from aerospace engineers, this hoodie features strategically placed seams and panels that mimic the mobility and protection of an advanced exosuit.",
        specifications: [
            "Moisture-wicking fabric with odor control",
            "Reinforced elbows and shoulders",
            "Multiple tech-friendly pockets",
            "Adjustable hood with built-in air filter",
            "Reflective piping for visibility",
        ],
        ratings: 4.3,
        quantity_available: 15,
        theme: Theme.Human_Future,
    },
    {
        id: 1126,
        imageLink:
            "https://i.etsystatic.com/20034847/r/il/6797ad/3982848257/il_570xN.3982848257_k63h.jpg",
        name: "Neural Link Beanie",
        description:
            "Upgrade your headwear with the Neural Link Beanie. While it doesn't actually connect to your brain, its unique textured pattern is designed to evoke the complex networks of a neural interface. Stay warm while looking like you're jacked into the matrix.",
        specifications: [
            "Conductive thread pattern for touch controls",
            "Built-in Bluetooth speaker",
            "Rechargeable battery with 8-hour life",
            "Washable with removable tech module",
            "Temperature-adaptive fabric",
        ],
        ratings: 4.1,
        quantity_available: 25,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1127,
        imageLink:
            "https://ih1.redbubble.net/image.4344546922.3712/icr,samsung_galaxy_s24_soft,back,a,x600-pad,600x600,f8f8f8.u2.jpg",
        name: "Hologram Projector Phone Case",
        description:
            "Turn your phone into a miniature sci-fi prop with the Hologram Projector Phone Case. Using clever optics, it creates the illusion of a floating hologram above your phone's screen. It's not just protection, it's a conversation starter from the future.",
        specifications: [
            "Compatible with most smartphone models",
            "Integrated micro-prism array",
            "Reinforced corners for drop protection",
            "Raised edges to protect screen and camera",
            "Smooth matte finish resistant to fingerprints",
        ],
        ratings: 4.6,
        quantity_available: 30,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1128,
        imageLink:
            "https://cdn.dsmcdn.com/mnresize/600/-/ty923/product/media/images/20230530/22/371857938/958826554/1/1_org_zoom.jpg",
        name: "Cryosleep Simulation Mug",
        description:
            "Wake up to the future every morning with the Cryosleep Simulation Mug. This mug uses advanced thermochromic technology to simulate the thawing process of cryogenic sleep as your hot beverage warms it up. It's a daily reminder of the amazing possibilities that await us in the future.",
        specifications: [
            "High-quality ceramic construction",
            "16 oz capacity",
            "Full-wrap thermochromic print",
            "Dishwasher safe, top rack recommended",
            "Comes with a 'cryopod' storage case",
        ],
        ratings: 4.4,
        quantity_available: 28,
        theme: Theme.Human_Future,
    },
    {
        id: 1129,
        imageLink:
            "https://ih1.redbubble.net/image.4680132624.9268/sn,x1000-pad,750x1000,f8f8f8.u4.jpg",
        name: "Quantum Encryption Journal",
        description:
            "Keep your thoughts secure with the Quantum Encryption Journal. While it doesn't actually use quantum encryption, its cover features a unique pattern inspired by quantum key distribution. The pages are designed with a special ink that becomes invisible when heated, adding a layer of privacy to your writings.",
        specifications: [
            "200 pages of thermal-sensitive paper",
            "Codex wheel on cover for simple encryption",
            "Includes UV light for reading 'invisible' ink",
            "Magnetic clasp closure",
            "Inner pocket for secure storage",
        ],
        ratings: 4.5,
        quantity_available: 20,
        theme: Theme.Quantum_Realm,
    },
    {
        id: 1130,
        imageLink:
            "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fy6cz7lw6h4f51.jpg",
        name: "Martian Terraform Keyboard",
        description:
            "Type your way to a new world with the Martian Terraform Keyboard. Its unique red gradient keycaps and dust-resistant design are inspired by the challenges of terraforming Mars. Each key press feels like you're shaping the future of human space colonization.",
        specifications: [
            "Full-size 104-key layout",
            "Dust and water-resistant construction",
            "Mars-themed gradient PBT keycaps",
            "Programmable RGB backlighting",
            "Dedicated macro keys for space commands",
        ],
        ratings: 4.8,
        quantity_available: 15,
        theme: Theme.Highlights,
    },
    {
        id: 1131,
        imageLink:
            "https://ih1.redbubble.net/image.2636348750.3641/ur,desk_mat_lifestyle_gaming,wide_portrait,750x1000.jpg",
        name: "Asteroid Belt Keyboard",
        description:
            "Navigate the treacherous spaces between planets with the Asteroid Belt Keyboard. Its keys are arranged in a unique, asteroid-inspired pattern that optimizes typing efficiency while evoking the beauty of our solar system's rocky expanse. The satisfying click of each key is reminiscent of space rocks colliding in the vast emptiness.",
        specifications: [
            "Ergonomic split design",
            "Custom asteroid-inspired keycap layout",
            "Mechanical switches with adjustable actuation",
            "Programmable OLED display",
            "Aerospace-grade aluminum construction",
        ],
        ratings: 4.9,
        quantity_available: 10,
        theme: Theme.Highlights,
    },
    {
        id: 1132,
        imageLink:
            "https://ih1.redbubble.net/image.5016929284.4673/fposter,medium,wall_texture,product,750x1000.u6.webp",
        name: "Quantum Foam Mousepad",
        description:
            "Experience the underlying fabric of spacetime with the Quantum Foam Mousepad. Its micro-textured surface is inspired by the quantum fluctuations theorized to exist at the smallest scales of the universe. Provides unparalleled precision for your mouse movements while reminding you of the fundamental nature of reality.",
        specifications: [
            "Extended size: 900 x 400 mm",
            "Quantum-inspired micro-texture surface",
            "Non-slip base with vacuum seal technology",
            "Spill-resistant coating",
            "Self-cleaning nanoparticle infusion",
        ],
        ratings: 4.7,
        quantity_available: 25,
        theme: Theme.Quantum_Realm,
    },
    {
        id: 1133,
        imageLink:
            "https://technostorm.de/cdn/shop/files/hoodieNormal_907827e3-a0b2-4c87-b86b-4645d37be713.jpg?v=1721857104",
        name: "Metropolis 2100 Hoodie",
        description:
            "Wrap yourself in the fashion of tomorrow with the Metropolis 2100 Hoodie. Its sleek lines and embedded LED accents capture the essence of a futuristic cityscape. The smart fabric adapts to your body temperature, ensuring comfort in any environment from neon-lit streets to climate-controlled megastructures.",
        specifications: [
            "Adaptive thermal regulation fabric",
            "Embedded LED light strips with app control",
            "Hidden tech pockets with RFID blocking",
            "Pollution filtering hood lining",
            "Sustainable bamboo-based textile blend",
        ],
        ratings: 4.6,
        quantity_available: 30,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1134,
        imageLink:
            "https://gobemagic.com/wp-content/uploads/2023/11/01COSMICBEANIEHAT_900x.jpg.webp",
        name: "Cosmic Microwave Beanie",
        description:
            "Tune into the echoes of the Big Bang with the Cosmic Microwave Beanie. Its unique pattern is derived from actual cosmic microwave background radiation data, allowing you to wear the oldest light in the universe. Keep your head warm while contemplating the origins of everything.",
        specifications: [
            "Data-inspired knit pattern",
            "Thermo-regulating smart yarn",
            "Integrated bone conduction headphones",
            "Wireless charging capability",
            "Hypoallergenic and moisture-wicking material",
        ],
        ratings: 4.4,
        quantity_available: 35,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1135,
        imageLink: "https://m.media-amazon.com/images/I/71RH6U74UHL.jpg",
        name: "Schrodinger's Phone Case",
        description:
            "Protect your device with quantum uncertainty using Schrodinger's Phone Case. Its unique design changes between two states when not directly observed, inspired by the famous thought experiment. Is your phone protected? You won't know until you look!",
        specifications: [
            "Quantum-inspired state-changing design",
            "Military-grade drop protection",
            "Anti-microbial nano-coating",
            "Compatible with wireless charging",
            "Entropy-reducing heat dissipation technology",
        ],
        ratings: 4.8,
        quantity_available: 20,
        theme: Theme.Quantum_Realm,
    },
    {
        id: 1136,
        imageLink:
            "https://www.esaspaceshop.com/media/catalog/product/cache/d2505ceda29a0c6ac6b652aa442f962c/m/u/mug_3fs_navy.jpg",
        name: "Dyson Sphere Mug",
        description:
            "Harness the power of a star with every sip from the Dyson Sphere Mug. This mug's design is inspired by the theoretical megastructure that could encapsulate a star. Its advanced insulation technology keeps your drinks at the perfect temperature, much like how a Dyson sphere would capture a star's energy.",
        specifications: [
            "Vacuum-insulated stainless steel construction",
            "360-degree drinking spout",
            "20 oz capacity",
            "Photovoltaic exterior for device charging",
            "Interactive temperature display",
        ],
        ratings: 4.5,
        quantity_available: 40,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1137,
        imageLink:
            "https://m.media-amazon.com/images/I/81iDbS+EbdL._AC_UF1000,1000_QL80_.jpg",
        name: "Simulation Hypothesis Journal",
        description:
            "Document your experiences in this reality (or is it a simulation?) with the Simulation Hypothesis Journal. Its cover features a mind-bending design that seems to glitch and shift as you move it, reminding you to question the nature of your existence with every entry.",
        specifications: [
            "Reality-warping lenticular cover",
            "Quantum random number generator page numbering",
            "Probability-encoding invisible ink pen included",
            "Anomaly-detecting bookmark",
            "200 pages of simulation-grade paper",
        ],
        ratings: 4.3,
        quantity_available: 30,
        theme: Theme.Human_Future,
    },
    {
        id: 1138,
        imageLink:
            "https://i.pinimg.com/736x/34/22/f5/3422f5429995a331669ec67ff5e0f318.jpg",
        name: "Supernova Mechanical Keyboard",
        description:
            "Ignite your typing experience with the Supernova Mechanical Keyboard. Each keypress triggers a brilliant display of light that ripples across the board, mimicking the awesome power of a star's explosive death. The tactile feedback is as satisfying as the gravitational collapse of a massive stellar core.",
        specifications: [
            "Supernova-inspired dynamic RGB backlighting",
            "Hot-swappable mechanical switches",
            "Aircraft-grade aluminum frame",
            "Programmable macro keys",
            "Detachable USB-C cable with custom coil",
        ],
        ratings: 4.9,
        quantity_available: 15,
        theme: Theme.Featured,
    },
    {
        id: 1139,
        imageLink:
            "https://ih1.redbubble.net/image.3449061958.9005/ur,mouse_pad_small_flatlay_prop,wide_portrait,750x1000.jpg",
        name: "Hyperlane Highway Mousepad",
        description:
            "Navigate your digital space as if traveling through the galaxy with the Hyperlane Highway Mousepad. Its design features an intricate map of theoretical interstellar trade routes, providing a smooth path for your mouse while inspiring thoughts of future space exploration.",
        specifications: [
            "Ultra-wide panoramic size: 1200 x 400 mm",
            "Smooth-glide nanofiber surface",
            "Non-slip rubber base with spaceship-grade adhesive",
            "Stitched anti-fray edges",
            "Glow-in-the-dark hyperlane accents",
        ],
        ratings: 4.7,
        quantity_available: 25,
        theme: Theme.Galactic_Urbanite,
    },
    {
        id: 1140,
        imageLink:
            "https://images-cdn.ubuy.co.in/6365ff173e1ab873e27f48b3-funstuff-boys-nasa-astronaut-shark-robot.jpg",
        name: "Cosmic Explorer Astronaut Hoodie",
        description:
            "Embark on your personal space mission with the Cosmic Explorer Astronaut Hoodie. Designed to mimic the look of a futuristic spacesuit, this hoodie features reflective patches, cushioned panels, and a visor-inspired hood. Experience the comfort of Earth with the style of an interplanetary traveler.",
        specifications: [
            "Oxygen-tank inspired hydration pack compatibility",
            "Reflective 'space agency' patches and piping",
            "Cushioned elbow and shoulder panels",
            "Temperature-regulating fabric",
            "Detachable visor-style hood attachment",
        ],
        ratings: 4.6,
        quantity_available: 20,
        theme: Theme.Human_Future,
    },
];