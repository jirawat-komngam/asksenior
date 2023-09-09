import dotenv from 'dotenv'
import { setupInfoMessage } from '../helpers/logger-helper.js'

const loadDotEnvConfig = () => {
    console.log(setupInfoMessage('initializing .env config'))
    dotenv.config()
    console.log(setupInfoMessage('initialized .env config successfully'))

    const fileName = `.env.${process.env.NODE_ENV}`
    console.log(setupInfoMessage(`initializing ${fileName} config`))
    dotenv.config({ path: fileName, override: true })
    console.log(setupInfoMessage(`initialized ${fileName} config successfully`))
}
export default loadDotEnvConfig
