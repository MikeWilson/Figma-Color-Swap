let count = 0

function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function traverse(node) {
  if (node.fillStyleId) {
    let color

    switch (node.fillStyleId) {
      // 1B2A34 > 343A40
      case 'S:dff81812946212c317b97177bb016082617b3b72,19986:241':
        color = {"r":0.20392156862745098,"g":0.22745098039215686,"b":0.25098039215686274}
        break
      // 293F4D > 535B64
      case 'S:be2579cef193aff4deb582b3aa8fcfd799e2b71a,19986:242':
        color = {"r":0.3254901960784314,"g":0.3568627450980392,"b":0.39215686274509803}
        break
      // 536872 > 868E96
      case 'S:c4223635acc505f5209b910fa19978113c49c8d5,19986:243':
        color = {"r":0.5254901960784314,"g":0.5568627450980392,"b":0.5882352941176471}
        break
      // 92A2AB > 868E96
      case 'S:4493f17188a014e94a0f3b19f80041940787eb87,19986:244':
        color = {"r":0.5254901960784314,"g":0.5568627450980392,"b":0.5882352941176471}
        break
      // E2E2EB > CFD4DA
      case 'S:f65aeecbd871f945af75156d43da19e7a485b984,19986:247':
        color = {"r":0.8117647058823529,"g":0.8313725490196079,"b":0.8549019607843137}
        break
      // E7EBEE > F3F4F6
      case 'S:d49a13436e0303019cf5c9ef6cc81f7e81dd993a,24280:0':
        color = {"r":0.9529411764705882,"g":0.9568627450980393,"b":0.9647058823529412}
        break
      // F9F9FB > F3F4F6
      case 'S:3b4f841c1f3965a0e02588316f75cecc43df2183,19986:249':
        color = {"r":0.9529411764705882,"g":0.9568627450980393,"b":0.9647058823529412}
        break
      // FFFFFF > FFFFFF (why did I add this one)
      case 'S:73cb5732dd14fcab9d7ad723f071e5574528ad6b,19986:250':
        color = {"r":1,"g":1,"b":1}
        break
      default:
        break
    }

    if (color) {
      count++
      node.fillStyleId = '';
      const fills = clone(node.fills)
      fills[0].color = color
      node.fills = fills
    }
  }
  if ("children" in node) {
    for (const child of node.children) {
      traverse(child)
    }
  }
}

traverse(figma.currentPage)
figma.notify(`Adjusted ${count} layers`)
figma.closePlugin()