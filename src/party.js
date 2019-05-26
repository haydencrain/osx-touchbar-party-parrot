const path = require('path');
const {app, BrowserWindow, TouchBar} = require('electron');

const {TouchBarButton} = TouchBar;

const types = {
    congaParrot: 'congaparrot',
    parrot: 'parrot',
    corgi: 'corgi'
}

const defaultType = types.parrot;
const typePath = `/${defaultType}/${defaultType}`;
const fileType = 'png';

const numOfParrotsToDisplay = 9;
const parrots = [];

const initParrots = () => {
    for (let x = 0; x < numOfParrotsToDisplay; x++) {
        parrots.push(new TouchBarButton({
            icon: path.join(__dirname, `${typePath}000.${fileType}`),
            backgroundColor: '#000'
        }));
    }
    return parrots;
};

const touchBar = new TouchBar(initParrots());

let parrotFrame = 0;

const updateParrotsFrames = () => {
    if (parrotFrame > 7) {
        parrotFrame = 0;
    } else {
        parrotFrame += 1;
    }

    const parrotPath = path.join(__dirname, `${typePath}00${parrotFrame}.${fileType}`);
    for (let x = 0; x < numOfParrotsToDisplay; x++) {
        parrots[x].icon = parrotPath;
    }
}

const animateParrots = () => {
    setInterval(updateParrotsFrames, 30)
};

let window;

app.once('ready', () => {
    window = new BrowserWindow({
        width: 70,
        height: 20,
        x: 0,
        y: 0
    });
    window.setTouchBar(touchBar);
    animateParrots();
})

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
    app.quit();
});
