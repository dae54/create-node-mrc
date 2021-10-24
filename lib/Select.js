const stdout = process.stdout
const stdin = process.stdin
const stderr = process.stderr
const rdl = require("readline")


module.exports = class Select {
    constructor(opts = {
        question: "",
        options: [],
        answers: [],
        pointer: ">",
        color: "blue"
    }) {
        let { question, options, answers, pointer, color } = opts
        this.question = question
        this.options = options
        this.answers = answers
        this.pointer = pointer
        this._color = color
        this.input
        this.cursorLocs = {
            x: 0,
            y: 0
        }
    }

    start() {
        stdout.write(this.question + '\n')
        for (let optIndex = 0; optIndex < this.options.length; optIndex++) {
            this.options[optIndex] = this.pointer + " " + this.options[optIndex]
            // if (optIndex === this.options.length - 1) {
            //     this.input = this.options.length - 1
            //     this.options[optIndex] += '\n'
            //     stdout.write('\n')

            //     stdout.write(this.color(this.options[optIndex], this._color))
            // } else {
            this.options[optIndex] += '\n'
            stdout.write(this.options[optIndex])
            // }
            this.cursorLocs.y = optIndex + 1
        }
        stdin.on("data", this.pn(this))
        stdin.setRawMode(true)
        stdin.resume()
        stdin.setEncoding('utf-8')
        this.hideCursor()
        // stdin.on("data", this.pn(this))
    }

    hideCursor() {
        stdout.write("\x1B[?25l")
    }

    showCursor() {
        stdout.write("\x1B[?25h")
    }

    pn(self) {
        return (c) => {
            switch (c) {
                case '\u0004': // Ctrl-d
                case '\r':
                case '\n':
                    return self.enter()
                case '\u0003': // Ctrl-c
                    return self.ctrlc()
                case '\u001b[A':
                    return self.upArrow()
                case '\u001b[B':
                    return self.downArrow()
            }
        }
    }

    upArrow() {
        let y = this.cursorLocs.y
        rdl.cursorTo(stdout, 0, y)
        stdout.write(this.options[y - 1])
        if (this.cursorLocs.y === 1) {
            this.cursorLocs.y = this.options.length
        } else {
            this.cursorLocs.y--
        }
        y = this.cursorLocs.y
        rdl.cursorTo(stdout, 0, y)
        stdout.write(this.color(this.options[y - 1], this._color))
        this.input = y - 1
    }

    downArrow() {
        let y = this.cursorLocs.y
        rdl.cursorTo(stdout, 0, y)
        stdout.write(this.options[y - 1])
        if (this.cursorLocs.y === this.options.length) {
            this.cursorLocs.y = 1
        } else {
            this.cursorLocs.y++
        }
        y = this.cursorLocs.y
        rdl.cursorTo(stdout, 0, y)
        stdout.write(this.color(this.options[y - 1], this._color))
        this.input = y - 1
    }

    color(str, colorName = "yellow") {
        const colors = {
            "yellow": [33, 89],
            "blue": [34, 89],
            "green": [32, 89],
            "cyan": [35, 89],
            "red": [31, 89],
            "magenta": [36, 89]
        }
        const _color = colors[colorName]
        const start = "\x1b[" + _color[0] + "m"
        const stop = "\x1b[" + _color[1] + "m\x1b[0m"
        return start + str + stop
    }


    enter() {
        stdin.removeListener('data', this.pn)
        stdin.setRawMode(false)
        stdin.pause()
        this.showCursor()
        rdl.cursorTo(stdout, 0, this.options.length + 1)
        l("\nYou selected: " + this.answers[this.input])
    }
    ctrlc() {
        stdin.removeListener('data', this.pn)
        stdin.setRawMode(false)
        stdin.pause()
        this.showCursor()
    }
}