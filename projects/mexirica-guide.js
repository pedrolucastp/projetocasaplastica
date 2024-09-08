document.addEventListener('DOMContentLoaded', function () {
    const guideContent = document.getElementById('guide-content');
    const guideHTML = `
        <article id="why-we-do-this">
            <h3>1.1 Why We Do This</h3>
            <p>Plastic pollution is a significant environmental challenge, particularly in oceans. At Ilha Grande, we combat this issue by collecting ocean plastic and transforming it into valuable products like beams and sheets.</p>
        </article>

        <article id="how-it-started">
            <h3>1.2 How It Started</h3>
            <p>The "Mexirica Navegante" was born out of a collaboration between Casa Plástica and the NGO Somos Natureza, inspired by the Precious Plastic project. This initiative empowers the local community to recycle ocean waste and create sustainable solutions.</p>
        </article>

        <article id="work-safe">
            <h3>1.3 Work Safe</h3>
            <p>Operating the machine involves sharp blades and high temperatures. Always wear protective gear and follow safety procedures.</p>
        </article>

        <article id="materials">
            <h3>2.1 List of Materials</h3>
            <ul>
                <li>Ocean plastic waste</li>
                <li>Protective gear</li>
                <li>Cleaning tools</li>
                <li>Cutting tools</li>
                <li>Molds</li>
                <li>Toolbox</li>
            </ul>
        </article>

        <article id="troubleshooting">
            <h3>2.2 Troubleshooting</h3>
            <ul>
                <li><strong>Machine Won’t Start:</strong> Check the power supply and emergency stop button.</li>
                <li><strong>Plastic Not Shredding Properly:</strong> Pre-cut plastic, check for sharp blades and blockages.</li>
                <li><strong>Extrusion Issues:</strong> Adjust temperature and ensure cleanliness.</li>
            </ul>
        </article>

        <article id="plastic-info">
            <h3>2.3 Some Plastic Info</h3>
            <p>Familiarize yourself with different plastic types: PE, PP, PS, and PET. Proper sorting ensures high-quality products.</p>
        </article>

        <article id="pickup">
            <h3>3.1 Pick-Up</h3>
            <p>Organize beach clean-up efforts to collect plastic waste for recycling.</p>
        </article>

        <article id="first-sorting">
            <h3>3.2 First Sorting</h3>
            <p>Sort collected plastic by size and type, separating large items from microplastics.</p>
        </article>

        <article id="second-sorting">
            <h3>3.3 Second Sorting</h3>
            <p>Perform a more detailed sorting of plastic by polymer type (PE, PP, PS, PET).</p>
        </article>

        <article id="microplastic">
            <h3>4.1 Microplastic</h3>
            <p>Microplastics are harmful pollutants. They can be processed to create smaller beams or unique products.</p>
        </article>

        <article id="beams">
            <h3>4.2 Beams</h3>
            <p>Plastic beams are created through extrusion and used for various applications.</p>
        </article>

        <article id="sheets">
            <h3>4.3 Sheets</h3>
            <p>Sheets are made by evenly distributing shredded plastic in trays and baking them in the oven.</p>
        </article>

        <article id="wash">
            <h3>5.1 Wash</h3>
            <p>Clean the plastic thoroughly before shredding to ensure smooth operation and high-quality results.</p>
        </article>

        <article id="pre-cut">
            <h3>5.2 Pre-Cut</h3>
            <p>Pre-cut large pieces of plastic to fit into the shredder.</p>
        </article>

        <article id="shred">
            <h3>5.3 Shred</h3>
            <p>Feed plastic into the shredder to break it into small, uniform pieces.</p>
        </article>

        <article id="mexirica">
            <h3>6.1 The "Mexirica Navegante"</h3>
            <p>A 2-in-1 shredder and extruder designed to process ocean plastic and transform it into useful products.</p>
        </article>

        <article id="shredding">
            <h3>6.2 Shredding</h3>
            <p>The shredding process breaks down the plastic into smaller pieces, ready for extrusion.</p>
        </article>

        <article id="extruding">
            <h3>6.3 Extruding</h3>
            <p>Extrusion melts the shredded plastic and forces it through a mold to form beams or sheets.</p>
        </article>

        <article id="baking">
            <h3>6.4 Baking</h3>
            <p>Baking is used to create sheets by placing the plastic in an oven, where it melts into a smooth, durable surface.</p>
        </article>

        <article id="toolbox">
            <h3>7.1 Toolbox</h3>
            <p>Maintain a well-stocked toolbox for machine maintenance.</p>
        </article>

        <article id="molds">
            <h3>7.2 The Molds</h3>
            <p>Molds determine the shape of the final product. Clean and lubricate them before use.</p>
        </article>

        <article id="how-tos">
            <h3>8.1 How-Tos</h3>
            <p>Step-by-step instructions for cleaning, maintaining, and troubleshooting the machine.</p>
        </article>

        <article id="fun-facts">
            <h3>8.2 Fun Facts</h3>
            <p>The "Mexirica Navegante" gets its name from its bright orange color and versatility in recycling various plastic types.</p>
        </article>
    `;

    guideContent.innerHTML = guideHTML;
});
