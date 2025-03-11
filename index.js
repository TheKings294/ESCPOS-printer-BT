class ThermalPrinter {
    constructor(text) {
        this.divice = null
        this.server = null
        this.sufix = text != null ? text : "-0000-1000-8000-00805f9b34fb"
        this.parameters = []
    }
    async conect(prefixConexion) {
        try {
            this.divice = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [prefixConexion != null ? prefixConexion + this.sufix : "000018f0" + this.sufix],
            })

            this.server = await this.divice.gatt.connect()
            return true
        } catch (error) {
            console.error("Error connecting:\"", error)
            return false
        }
    }
    async printText(prefixConexion, prefixSendData) {
        if (!this.server) {
            console.error("Not connected to a printer.");
            return
        }
        try {
            const service = await this.server.getPrimaryService(prefixConexion != null ? prefixConexion + this.sufix : "000018f0" + this.sufix)
            const characteristic = await service.getCharacteristic(prefixSendData != null ? prefixSendData + this.sufix : "00002af1" + this.sufix)
            const encoder = new TextEncoder()
        } catch (error) {
            console.error("Error sending data:", error);
            return
        }
    }
    async disconnect() {
        if (this.divice && this.divice.gatt.connected) {
            this.divice.gatt.disconnect();
        }
    }
    alignCenter() {
        this.parameters['align'] = [0x1B, 0x61, 0x01]
        return this
    }
    alignLeft() {
        this.parameters['align'] = [0x1B, 0x61, 0x00]
        return this
    }
    alignRight() {
        this.parameters['align'] = [0x1B, 0x61, 0x02]
        return this
    }
}

export default ThermalPrinter