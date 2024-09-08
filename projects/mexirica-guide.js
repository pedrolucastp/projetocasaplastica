document.addEventListener("DOMContentLoaded", function () {
  const guideContent = document.getElementById("guide-content");
  const summaryList = document.getElementById("summary-list");

  // Array of objects representing sections and articles

  const guideSections = [
    {
      id: "why-we-do-this",
      title: "1.1 Why We Do This",
      content:
        "Plastic pollution is one of the most significant environmental challenges of our time, particularly in the oceans. On Ilha Grande, we strive to combat this issue by collecting ocean plastic from our beaches and giving it a new purpose. This machine, the 'Mexirica Navegante,' empowers the local community to transform ocean waste into valuable materials like plastic beams and sheets, contributing to the preservation of our planet and the empowerment of people.",
    },
    {
      id: "how-it-started",
      title: "1.2 How It Started",
      content:
        "The 'Mexirica Navegante' is a direct outcome of the Casa Plastica Project and the NGO Somos Natureza partnership. Both are dedicated to creating solutions for sustainable living. Inspired by the Precious Plastic project, we adapted the shredder-extrusion machine to meet local needs. The journey began with a shared vision of turning the plastic problem into an opportunity for change.",
    },
    {
      id: "work-safe",
      title: "1.3 Work Safe",
      content:
        "Operating this machine involves dealing with sharp blades, high temperatures, and electrical components. Safety is our top priority. Before operating the machine, it's crucial to familiarize yourself with the safety procedures. Always wear protective gear, such as gloves, safety glasses, and heat-resistant clothing, and ensure the machine is maintained properly to avoid accidents.",
    },
    {
      id: "list-of-materials",

      title: "2.1 List of Materials",
      content: `
                Before starting any process with the 'Mexirica Navegante,' make sure you have the following materials and tools on hand:
                <ul>
                    <li>Ocean plastic waste: Collected from beaches, including microplastics, bottles, containers, fishing nets, and other debris.</li>
                    <li>Protective gear: Heat-resistant gloves, safety glasses, and protective clothing.</li>
                    <li>Cleaning tools: Brushes, water source, and biodegradable detergent for washing plastics.</li>
                    <li>Cutting tools: Scissors, knives, or a small saw for pre-cutting large plastic pieces.</li>
                    <li>Shredding container: A receptacle to catch shredded plastic.</li>
                    <li>Molds: For shaping the extruded plastic into beams or sheets.</li>
                    <li>Toolbox: Including basic tools for machine maintenance and emergency fixes (screwdrivers, wrenches, etc.).</li>
                </ul>
            `,
    },
    {
      id: "troubleshooting",

      title: "2.2 Troubleshooting",
      content: `
                Even with proper care, problems can arise when using the machine. Here’s a quick guide to some common issues and how to resolve them:
                <ul>
                    <li><strong>Machine Won’t Start:</strong> Check if the power supply is connected properly. Ensure the emergency stop button is not engaged. Inspect the power switch and fuses for any damage.</li>
                    <li><strong>Plastic Not Shredding Properly:</strong> Ensure the plastic pieces are adequately pre-cut. Check if the blades are sharp. Dull blades can affect performance. Inspect the machine for any blockages in the shredding chamber.</li>
                    <li><strong>Extrusion Issues:</strong> If the plastic isn't extruding smoothly, the temperature may be too low. Adjust the heat settings accordingly. Ensure the plastic is clean and free from contaminants, as this can clog the extruder. Check for any obstructions in the extrusion nozzle.</li>
                    <li><strong>Overheating:</strong> If the machine overheats, stop the operation immediately and allow it to cool. Ensure proper ventilation around the machine and avoid running it for extended periods without breaks.</li>
                </ul>
            `,
    },
    {
      id: "plastic-info",

      title: "2.3 Some Plastic Info",
      content: `
                Understanding the different types of plastics is crucial for achieving the best results in recycling. Here are the most common types of plastic you will encounter:
                <ul>
                    <li><strong>Polyethylene (PE):</strong> Found in plastic bags, bottles, and containers. It is flexible and easy to shred and extrude.</li>
                    <li><strong>Polypropylene (PP):</strong> Used in bottle caps, straws, and food containers. PP melts at a higher temperature and is suitable for making durable products.</li>
                    <li><strong>Polystyrene (PS):</strong> Commonly found in disposable cutlery, cups, and packaging. It is lightweight but can be tricky to work with due to its brittleness.</li>
                    <li><strong>PET (Polyethylene Terephthalate):</strong> Widely used in drink bottles. PET is strong but needs to be properly sorted and cleaned before processing.</li>
                </ul>
                Each plastic type behaves differently in the shredding and extrusion processes, so proper sorting is key to ensuring the quality of the final product.
            `,
    },
    {
      id: "pick-up",

      title: "3.1 Pick-Up",
      content:
        "The first step in the recycling process is collecting ocean plastic from the beaches. This includes various types of plastic waste, such as bottles, fishing nets, and microplastics. Organize your collection, separating larger items from smaller debris, and be mindful of any potential hazardous materials.",
    },
    {
      id: "first-sorting",

      title: "3.2 First Sorting",
      content:
        "Once the plastic has been collected, it needs to be sorted. The first sorting focuses on separating plastic waste by size and condition. Large plastic pieces can be kept aside for pre-cutting, while smaller fragments should be cleaned and prepared for shredding.",
    },
    {
      id: "second-sorting",

      title: "3.3 Second Sorting",
      content:
        "This step is more meticulous. You will now sort the plastic according to type, look for the ones with the recycling symbol <strong>2</strong> or <strong>5</strong>, separating Polyethylene (PE) and Polypropylene (PP) plastics. Sorting by type ensures better-quality extrusion and final products. Plastics that are too degraded should be discarded as they may affect the extrusion process.",
    },
    {
      id: "microplastics",

      title: "4.1 Microplastics",
      content:
        "Microplastics are tiny particles that often end up on our beaches. While these cannot be shredded or extruded, they can be embedded into sheets during the baking process to create decorative or textured surfaces. Collect microplastics separately and clean them thoroughly before using them in the sheet-making process.",
    },
    {
      id: "beams",

      title: "4.2 Beams",
      content:
        "Beams are made by extruding shredded plastic into molds. They are strong and durable, ideal for construction, furniture, or other practical applications. Each type of plastic will create beams with slightly different properties, so experiment with combinations based on your needs.",
    },
    {
      id: "sheets",

      title: "4.3 Sheets",
      content:
        "The baking process is used to create plastic sheets. After shredding the plastic, it is placed into an oven-safe tray that fits into our machine’s oven. The plastic melts and spreads evenly across the tray, creating a flat, durable sheet that can be used for a variety of applications, from surfboards to signage. Depending on the thickness and texture desired, you can adjust the oven temperature and baking time.",
    },
    {
      id: "wash",

      title: "5.1 Wash",
      content:
        "Clean plastic is essential for successful recycling. After sorting, the plastic should be washed to remove sand, dirt, and other contaminants. Use biodegradable detergent and scrub the plastics with brushes. Rinse thoroughly and let them dry before moving to the next steps.",
    },
    {
      id: "pre-cut",

      title: "5.2 Pre-Cut",
      content:
        "Larger plastic pieces, such as bottles and containers, need to be pre-cut before shredding. This ensures the pieces fit easily into the shredder and reduces the risk of clogging. Use a saw or heavy-duty scissors for cutting plastics into smaller, manageable pieces.",
    },
    {
      id: "shred",

      title: "5.3 Shred",
      content:
        "Once the plastic has been washed and pre-cut, it’s ready for shredding. Feed the pieces into the shredder portion of the 'Mexirica Navegante.' The shredded plastic will fall into a container, where it can be collected and prepared for either extrusion or baking. Ensure the plastic is shredded into small, uniform pieces for the best results.",
    },
    {
      id: "mexirica-navegante",

      title: "6.1 The 'Mexirica Navegante'",
      content:
        "The 'Mexirica Navegante' is a 2-in-1 shredder and extrusion machine, designed to simplify the recycling process. Its versatility allows it to transform shredded plastic into new materials like beams and sheets, using simple yet effective techniques.",
    },
    {
      id: "shredding",

      title: "6.2 Shredding",
      content:
        "The shredding process begins by feeding the pre-cut plastic into the machine’s shredder. The sharp blades inside chop the plastic into small pieces. It’s important to check for blockages and ensure the blades are sharp for efficient shredding.",
    },
    {
      id: "extruding",

      title: "6.3 Extruding",
      content:
        "The shredded plastic can be fed into the extrusion section of the machine. The plastic is heated and forced through a mold, which shapes it into beams. These beams can be used for various construction purposes, depending on the type of plastic and the mold used.",
    },
    {
      id: "baking",

      title: "6.4 Baking",
      content:
        "To create plastic sheets, you will use the baking process. Place shredded plastic into a baking tray that fits into the machine’s oven. Adjust the temperature depending on the plastic type. Once melted, the plastic will spread and solidify into sheets. Be careful when removing the hot tray, and let the sheets cool before handling.",
    },
    {
      id: "toolbox",

      title: "7.1 Toolbox",
      content:
        "A basic toolbox is essential for operating and maintaining the 'Mexirica Navegante.' Make sure to have screwdrivers, wrenches, and a blade sharpener handy for any minor repairs or adjustments.",
    },
    {
      id: "molds",

      title: "7.2 The Molds",
      content:
        "Molds are used to shape the extruded plastic. Depending on the product you want to create (beams, sheets, etc.), different molds can be swapped in. Always ensure the molds are clean and free of debris before starting the extrusion process.",
    },
    {
      id: "how-tos",

      title: "8.1 How-Tos",
      content: `
                <ul>
                    <li><strong>How to Clean the Machine:</strong> After each use, ensure that all plastic residues are removed. Clean the blades and extrusion nozzle to avoid buildup.</li>
                    <li><strong>How to Change the Blades:</strong> Make sure the machine is powered off before changing the shredder blades. Use a wrench to loosen the screws, remove the old blades, and install new ones. Tighten the screws securely before starting the machine again.</li>
                    <li><strong>How to Adjust the Oven Temperature:</strong> Each type of plastic requires a different temperature for baking. Refer to the temperature chart in the machine’s manual to set the appropriate heat for the plastic type you're working with.</li>
                </ul>
            `,
    },
    {
      id: "fun-facts",
      title: "8.2 Fun Facts",
      content: `
                <ul>
                    <li>The "Mexirica Navegante" got its name due to its bright orange color, reminiscent of a tangerine ("mexirica" in Brazilian Portuguese), and its ability to "navigate" through different plastic types!</li>
                    <li>The machine can process up to 2 kilograms of plastic per hour, depending on the plastic type and condition.</li>
                    <li>The recycled plastic beams and sheets have been used in everything from park benches to community art projects!</li>
                </ul>
            `,
    },
  ];

  // Function to build and insert the summary and guide content
  function buildGuideContent() {
    let htmlContent = "";
    let summaryContent = "";

    guideSections.forEach((section) => {
      // Generate guide content
      htmlContent += `
                <article id="${section.id}">
                    <h3>${section.title}</h3>
                    <p>${section.content}</p>
                </article>
            `;

      // Generate summary content
      summaryContent += `
                <li><a href="#${section.id}">${section.title}</a></li>
            `;
    });

    guideContent.innerHTML = htmlContent;
    summaryList.innerHTML = summaryContent;

    // Enable smooth scrolling
    document.querySelectorAll("#summary-list a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  // Call the function to insert the content
  buildGuideContent();
});
