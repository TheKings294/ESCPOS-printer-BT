export class Print {
    constructor() {
        this.parameters = []
    }
    alignCenter() {
        this.parameters.push([0x1B, 0x61, 0x01])
        return this
    }
    alignLeft() {
        this.parameters.push([0x1B, 0x61, 0x00])
        return this
    }
    alignRight() {
        this.parameters.push([0x1B, 0x61, 0x02])
        return this
    }
    newLine() {
        this.parameters.push([0x0A])
        return this
    }
    bold(yes) {
        let hexa = 0x00
        if (yes) {
            hexa = 0x01
        }
        this.parameters.push([0x1B, 0x45, hexa])
        return this
    }
    fontSize(yes) {
        let hexa = 0x00
        if (yes) {
            hexa = 0x01
        }
        this.parameters.push([0x1B, 0x4D, hexa])
        return this
    }
    underline(style) {
        let hexa = 0x00
        if (style === 1) {
            hexa = 0x01
        } else if (style === 2) {
            hexa = 0x02
        }
        this.parameters.push([0X1B, 0x2D, hexa])
        return this
    }
    upsideDown(yes) {
        let hexa = 0x00
        if (yes) {
            hexa = 0x01
        }
        this.parameters.push([0x1B, 0x7B, hexa])
        return this
    }
    resetLineSpacing() {
        this.parameters.push([0x1B, 0x32])
        return this
    }
    setLineSpacing(dots) {
        const hexa = "0x" + dots

        this.parameters.push([0x1B, 0x33, hexa])
        return this
    }
    partialCut() {
        this.parameters.push([0x1B, 0x69])
        return this
    }
    fullCut() {
        this.parameters.push([0x1B, 0x6D])
    }
    addText(text) {
        this.parameters.push(text)
        return this
    }
}

export default Print