const container = document.querySelector(".container");
const refreshBtn = document.querySelector(".refresh-btn");

const maxPaletteBoxes = 32;

const generatePalette = () => {
  container.innerHTML = ""; // creating rhe container
  for (let i = 0; i < maxPaletteBoxes; i++) {
    //generating a random hex color code
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    randomHex = `#${randomHex.padStart(6, "0")}`;

    // creating a new "li" element and inserting it to the container
    const color = document.createElement("li");
    color.classList.add("color");
    color.innerHTML = `<div class="rect-box" style="background: ${randomHex}"></div>
                      <span class="hex-value">${randomHex}</span>`;
    // adding click event to current li element to copy the color
    color.addEventListener("click", () => copyColor(color, randomHex));
    container.appendChild(color);
  }
}

generatePalette();

const copyColor = (elem, hexVal) => {
  const colorElement = elem.querySelector(".hex-value");
  if (navigator.clipboard) {
    navigator.clipboard.writeText(hexVal).then(() => {
      colorElement.innerText = "Copied";
      setTimeout(() => {
        colorElement.innerText = hexVal;
      }, 1000); // Reset back to the original hex after 1 second
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  } else {
    // Fallback for browsers that do not support Clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = hexVal;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    colorElement.innerText = "Copied";
    setTimeout(() => {
      colorElement.innerText = hexVal;
    }, 1000); // Reset back to the original hex after 1 second
  }
}



refreshBtn.addEventListener("click", generatePalette);