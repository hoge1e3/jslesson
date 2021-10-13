/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const mesg_ja = {
    Connect: "接続",
    Disconnect: "切断",
};
class SerialControl {
    constructor() {
        this.mesg = mesg_ja;
        this.portCounter = 1;
        this.encoder = new TextEncoder();
        this.toFlush = '';
    }
    /**
     * Returns the option corresponding to the given SerialPort if one is present
     * in the selection dropdown.
     *
     * @param {SerialPort} port the port to find
     * @return {PortOption}
     */
    findPortOption(port) {
        for (let i = 0; i < this.portSelector.options.length; ++i) {
            const option = this.portSelector.options[i];
            if (option.value === 'prompt') {
                continue;
            }
            const portOption = option;
            if (portOption.port === port) {
                return portOption;
            }
        }
        return null;
    }
    /**
     * Adds the given port to the selection dropdown.
     *
     * @param {SerialPort} port the port to add
     * @return {PortOption}
     */
    addNewPort(port) {
        const portOption = document.createElement('option');
        portOption.textContent = `Port ${this.portCounter++}`;
        portOption.port = port;
        this.portSelector.appendChild(portOption);
        return portOption;
    }
    /**
     * Adds the given port to the selection dropdown, or returns the existing
     * option if one already exists.
     *
     * @param {SerialPort} port the port to add
     * @return {PortOption}
     */
    maybeAddNewPort(port) {
        const portOption = this.findPortOption(port);
        if (portOption) {
            return portOption;
        }
        return this.addNewPort(port);
    }
    /**
     * Sets |port| to the currently selected port. If none is selected then the
     * user is prompted for one.
     */
    async getSelectedPort() {
        if (this.portSelector.value == 'prompt') {
            try {
                this.port = await navigator.serial.requestPort({});
                //this.doPortReady();
            }
            catch (e) {
                return;
            }
            const portOption = this.maybeAddNewPort(this.port);
            portOption.selected = true;
        }
        else {
            const selectedOption = this.portSelector.selectedOptions[0];
            this.port = selectedOption.port;
            //this.doPortReady();
        }
    }
    doPortReady() {
        if (this.onPortReady && this.port) {
            this.onPortReady(this.port);
        }
    }
    /**
     * @return {number} the currently selected baud rate
     */
    getSelectedBaudRate() {
        if (this.baudRateSelector.value == 'custom') {
            return Number.parseInt(this.customBaudRateInput.value);
        }
        return Number.parseInt(this.baudRateSelector.value);
    }
    /**
     * Resets the UI back to the disconnected state.
     */
    markDisconnected() {
        //term.writeln('<DISCONNECTED>');
        console.log('<DISCONNECTED>');
        this.portSelector.disabled = false;
        this.connectButton.textContent = this.mesg.Connect;
        this.baudRateSelector.disabled = false;
        this.customBaudRateInput.disabled = false;
        this.dataBitsSelector.disabled = false;
        this.paritySelector.disabled = false;
        this.stopBitsSelector.disabled = false;
        this.flowControlCheckbox.disabled = false;
        this.port = undefined;
    }
    /**
     * Initiates a connection to the selected port.
     */
    async connectToPort() {
        await this.getSelectedPort();
        if (!this.port) {
            return;
        }
        const options = {
            baudRate: this.getSelectedBaudRate(),
            dataBits: Number.parseInt(this.dataBitsSelector.value),
            parity: this.paritySelector.value,
            stopBits: Number.parseInt(this.stopBitsSelector.value),
            flowControl: this.flowControlCheckbox.checked ?
                'hardware' : 'none',
            // Prior to Chrome 86 these names were used.
            baudrate: this.getSelectedBaudRate(),
            databits: Number.parseInt(this.dataBitsSelector.value),
            stopbits: Number.parseInt(this.stopBitsSelector.value),
            rtscts: this.flowControlCheckbox.checked,
        };
        console.log(options);
        await this.port.open(options);
        this.portSelector.disabled = true;
        this.connectButton.textContent = this.mesg.Disconnect; //'Disconnect';
        this.baudRateSelector.disabled = true;
        this.customBaudRateInput.disabled = true;
        this.dataBitsSelector.disabled = true;
        this.paritySelector.disabled = true;
        this.stopBitsSelector.disabled = true;
        this.flowControlCheckbox.disabled = true;
        //term.writeln('<CONNECTED>');
        console.log('<CONNECTED>');
        this.doPortReady();
        while (this.port && this.port.readable) {
            try {
                this.reader = this.port.readable.getReader();
                if (!this.reader)
                    throw new Error("Cannot get Reader");
                for (;;) {
                    const { value, done } = await this.reader.read();
                    if (value) {
                        //term.writeUtf8(value);
                        //const wnd: any = window;
                        //if (wnd.onEcho) wnd.onEcho(value);
                        if (this.onEcho)
                            this.onEcho(value);
                        console.log(value);
                    }
                    if (done) {
                        break;
                    }
                }
                this.reader.releaseLock();
                this.reader = undefined;
            }
            catch (e) {
                console.error(e);
                //term.writeln(`<ERROR: ${e.message}>`);
            }
        }
        if (this.port) {
            try {
                await this.port.close();
            }
            catch (e) {
                console.error(e);
                //term.writeln(`<ERROR: ${e.message}>`);
            }
            this.markDisconnected();
        }
    }
    /**
     * Closes the currently active connection.
     */
    async disconnectFromPort() {
        // Move |port| into a local variable so that connectToPort() doesn't try to
        // close it on exit.
        const localPort = this.port;
        this.port = undefined;
        if (this.reader) {
            await this.reader.cancel();
        }
        if (localPort) {
            try {
                await localPort.close();
            }
            catch (e) {
                console.error(e);
                //term.writeln(`<ERROR: ${e.message}>`);
            }
        }
        this.markDisconnected();
    }
    async render(dom) {
        const gid = (Math.random() + "").replace(/\./g, "");
        dom.innerHTML = `
        <div class="options">
          <label for="ports">Port:</label>
          <select id="${gid}ports">
            <option value="prompt">Add a port...</option>
          </select>
          <button id="${gid}connect">${this.mesg.Connect}</button>
          <div id="${gid}collapsedDetail">
            <button id="${gid}expandButton">Show Options</button>
          </div>
          <div id="${gid}expandedDetail">
              <button id="${gid}collapseButton">Hide Options</button>
              <label for="baudrate">Baud rate:</label>
              <select id="${gid}baudrate">
                <option value="9600">9600</option>
                <option value="14400">14400</option>
                <option value="19200">19220</option>
                <option value="28800">28800</option>
                <option value="38400">38400</option>
                <option value="57600">57600</option>
                <option value="115200" selected>115200</option>
                <option value="230400">230400</option>
                <option value="460800">460800</option>
                <option value="921600">921600</option>
                <option value="custom">Custom</option>
              </select>
              </br>
              <input id="${gid}custom_baudrate" type="number" min="1" placeholder="Enter baudrate..." hidden>
              <label for="databits">Data bits:</label>
              <select id="${gid}databits">
                <option value="7">7</option>
                <option value="8" selected>8</option>
              </select>
              <label for="parity">Parity:</label>
              <select id="${gid}parity">
                <option value="none" selected>None</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </select>
              <label for="stopbits">Stop bits:</label>
              <select id="${gid}stopbits">
                <option value="1" selected>1</option>
                <option value="2">2</option>
              </select>
              <input id="${gid}rtscts" type="checkbox">
              <label for="rtscts">Hardware flow control</label>
              <input id="${gid}echo" type="checkbox">
              <label for="echo">Local echo</label>
              <input id="${gid}enter_flush" type="checkbox">
              <label for="enter_flush">Flush on enter</label>
            </div>
        </div>
        `;
        function byid(id) {
            const r = document.getElementById(`${gid}${id}`);
            if (!r)
                throw new Error(`${id} not found`);
            return r;
        }
        //const download = byid('download') as HTMLSelectElement;
        //download.addEventListener('click', downloadTerminalContents);
        this.portSelector = byid('ports');
        this.connectButton = byid('connect');
        this.connectButton.addEventListener('click', () => {
            if (this.port) {
                this.disconnectFromPort();
            }
            else {
                this.connectToPort();
            }
        });
        this.baudRateSelector = byid('baudrate');
        this.baudRateSelector.addEventListener('input', () => {
            if (this.baudRateSelector.value == 'custom') {
                this.customBaudRateInput.hidden = false;
            }
            else {
                this.customBaudRateInput.hidden = true;
            }
        });
        this.customBaudRateInput =
            byid('custom_baudrate');
        this.dataBitsSelector = byid('databits');
        this.paritySelector = byid('parity');
        this.stopBitsSelector = byid('stopbits');
        this.flowControlCheckbox = byid('rtscts');
        this.echoCheckbox = byid('echo');
        this.flushOnEnterCheckbox =
            byid('enter_flush');
        this.expandedDetail = byid("expandedDetail");
        this.collapsedDetail = byid("collapsedDetail");
        this.expandButton = byid("expandButton");
        this.expandButton.onclick = () => {
            this.expandedDetail.style.display = "inline";
            this.collapsedDetail.style.display = "none";
        };
        this.collapseButton = byid("collapseButton");
        this.collapseButton.onclick = () => {
            this.expandedDetail.style.display = "none";
            this.collapsedDetail.style.display = "inline";
        };
        this.collapseButton.onclick({});
        const ports = await navigator.serial.getPorts();
        ports.forEach((port) => this.addNewPort(port));
        navigator.serial.addEventListener('connect', (event) => {
            this.addNewPort(event.port || event.target);
        });
        navigator.serial.addEventListener('disconnect', (event) => {
            const portOption = this.findPortOption(event.port || event.target);
            if (portOption) {
                portOption.remove();
            }
        });
    }
}
//# sourceMappingURL=SerialControl.js.map
