class Logger {
    constructor(context = '') {
        this.context = context
        this.timers = new Map()
    }

    now() {
        return new Date().toLocaleString()
    }

    format(message) {
        return this.context
            ? `[${this.now()}] [${this.context}] ${message}`
            : `[${this.now()}] ${message}`
    }

    log(...args) {
        console.log(`[Order Manager API][log]${this.format(args.join(' '))}`)
    }

    info(...args) {
        console.info(`[Order Manager API][info]${this.format(args.join(' '))}`)
    }

    warn(...args) {
        console.warn(`[Order Manager API][WARN]${this.format(args.join(' '))}`)
    }

    error(...args) {
        console.error(`[Order Manager API][ERROR]${this.format(args.join(' '))}`)
    }

    time(label) {
        this.timers.set(label, process.hrtime.bigint())
        console.log(`[Order Manager API][start]${this.format(`${label}`)}`)
    }

    timeEnd(label) {
        const start = this.timers.get(label)

        if (!start) {
            console.warn(`[Order Manager API][WARN]${this.format(`Timer '${label}' not found`)}`)
            return
        }

        const end = process.hrtime.bigint()
        const durationMs = Number(end - start) / 1_000_000

        console.log(
            this.format(`[Order Manager API][end]${label} | ${durationMs.toFixed(2)} ms`)
        )

        this.timers.delete(label)
    }
}

const logger = new Logger()
export default logger;