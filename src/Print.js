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
    codeBar(type, data) {
        switch (type) {
            case 0: // UPC-A (11 or 12 digits)
                if (data.length < 11 || data.length > 12) {
                    return;
                }
                break;
            case 1: // UPC-E (6 to 8 digits)
                if (data.length < 6 || data.length > 8) {
                    return;
                }
                break;
            case 2: // EAN-13 (12 or 13 digits)
                if (data.length < 12 || data.length > 13) {
                    return;
                }
                break;
            case 3: // EAN-8 (7 or 8 digits)
                if (data.length < 7 || data.length > 8) {
                    return;
                }
                break;
            case 4: // CODE39 (1 to 48 characters)
                if (data.length < 1 || data.length > 48) {
                    return;
                }
                break;
            case 5: // ITF (Interleaved 2 of 5) (Even number of digits, max 48)
                if (data.length % 2 !== 0 || data.length > 48) {
                    return;
                }
                break;
            case 6: // NW-7 (Codabar) (2 to 48 characters)
                if (data.length < 2 || data.length > 48) {
                    return;
                }
                break;
            case 7: // CODE93 (1 to 48 characters)
                if (data.length < 1 || data.length > 48) {
                    return;
                }
                break;
            case 8: // CODE128 (1 to 48 characters)
                if (data.length < 1 || data.length > 48) {
                    return;
                }
                break;
            default:
                return; // Invalid barcode type
        }
        const encodedData = new TextEncoder().encode(data);
        const codeBarType = [0x1D, 0x6D, "0x" + type.toString(16)]

        this.parameters.push(codeBarType)
        this.parameters.push([...encodedData, 0x00])
        return this
    }
    qrCode(size, correction, data) {
        const sizeQr = [0x1D, 0x28, 0x6B, 0x03, 0x00, 0x31, 0x43, "0x" + size.toString(16)]
        const corQR = [0x1D, 0x28, 0x6B, 0x03, 0x00, 0x31, 0x45, "0x" + correction.toString(16)]

        this.parameters.push(sizeQr)
        this.parameters.push(corQR)
        this.parameters.push([0x1D, 0x28, 0x6B, 0x0D, 0x00, 0x31, 0x50, 0x30])
        this.parameters.push(data)
        this.parameters.push([0x00])
        this.parameters.push([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x31, 0x51, 0x30])

        return this
    }
}

export default Print