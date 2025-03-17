# Thermal Bluetooth Printer Library

A lightweight JavaScript library that enables web applications to connect to a Bluetooth thermal printer using the Web Bluetooth API and send print commands. This library is published on [npm](https://www.npmjs.com/package/escpos-printer-bt) and is built with modularity in mind by separating Bluetooth connection from printing logic.

## Features

- 📡 Connect to Bluetooth thermal printers
- 🖨️ Send text data to the printer
- 🏷️ Format and align printed text

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the library via npm:

```bash
npm i escpos-printer-bt
```

## Usage

### How to connect the printer

To connect the printer to the Bluetooth API you need to create a new instance of ThermalPrinter and apply the method of connexion. 

```html
const printer = new ThermalPrinter('your-sufix-of-uuid')

document.querySelector('#conectBtn').addEventListener('click', async () => {
    await printer.conect('your-prefix-of-uuid')
})
```

if you don't know your uuid sufix and prefix you can less umpty the field.

### How to print your first ticket

For print your first objet, you need to create an objet Print and add line at print, and in last give your objet at print to the method print of the printer. 

```html
const ticket = new Print()
ticket
    .alignCenter()
    .addText("Your first printing")
    .newLine()
    .fullCut()
await printer.printText('your-prefix-connexion', 'your-prefix-print', ticket)
```

if you don't know the two information you can just put an null for the default information.
## Contributing

## License
