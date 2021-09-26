const unmodifiedHash = "28442fa1661b6177a14ac6f82930922b895ae65e";
const canvas = document.getElementById("canvas");
const desc = document.getElementById("description");

const failText = "Your browser is returning the same data from the\
                  canvas element as was originally entered. As\
                  currently configured, your browser may not be\
                  fingerprintable with this method.\n\n\
                  If you want to test the fingerprinting technique,\
                  make sure you have enabled full color management and\
                  set a non-sRGB ICC color profile, and try again.";

const successText = "The above probably represents a unique string which\
                     identifies you across sites and profiles.\
                     This string was generated entirely in your browser\
                     and not uploaded to the Internet.";

async function getHash(ctx, sz) {
    // we know the image is square
    const buffer = ctx.getImageData(0, 0, sz, sz).data;
    const hash = await crypto.subtle.digest("SHA-1", buffer);
    const hashArray = Array.from(new Uint8Array(hash));
    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hex;
}

function updateDescription(hash) {
    desc.innerHTML = "";
    const par = document.createElement("p");
    par.innerText = hash;
    par.style = "margin: 0 auto; font-weight: bold;";
    desc.appendChild(par);
    const explain = document.createElement("p");
    if (hash == unmodifiedHash) {
        explain.innerText = failText;
        explain.style = "color: green;";
    } else {
        explain.innerText = successText;
        explain.style = "color: red;";
    }
    desc.appendChild(explain);
}

const url = "palette.png";
const im = new Image();
im.src = url;
im.onload = function() {
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);
    
    getHash(ctx, this.width).then(hash => {
        updateDescription(hash);
    });
}
