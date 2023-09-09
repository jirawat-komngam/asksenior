import winston, { createLogger, format, transports } from 'winston'

const loadLoggerConfig = (): winston.Logger => {
    return createLogger({
        format: format.combine(
            format.errors({ stack: true }),
            format.timestamp({
                format: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
            }),
            format.json()
        ),
        transports: [new transports.Console()],
    })
}
export default loadLoggerConfig
