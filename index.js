import Axios from 'axios'
const argv = require('minimist')(Bun.argv)

class Bulletin {
  _id = null

  _host = 'https://ud05zawv78.execute-api.ap-northeast-1.amazonaws.com/prod/bulletin'

  _events = []


  constructor (id) {
    this._id = id
  }

  _update = async () => {
    await Axios.get(`${this._host}/check?ID=${this._id}`).then(({ data: { event, record }}) => {
      this._events = event.filter(({ KeyName, RU }) => RU && !record.find(({ EventID }) => EventID === KeyName))
    }).catch(e => {
      console.error('取得佈告欄失敗')
    })
  }

  _read = (key) => Axios.post(`${this._host}/add`, {
      EVENT_ID: `${key}`,
      ID: `${this._id}`
    })

  readAll = async () => {
    await this._update()
    console.log(`員編：${this._id}有${this._events.length}筆需要閱讀。`)
    for (const event of this._events) {
      const { TX, KeyName } = event
      await this._read(KeyName).then(() => {
        console.log(`閱讀:${TX}成功`)
      }).catch(e => {
        console.log(`閱讀:${TX}失敗`)
      })
    }
  }
}

const users = String(argv.users).split(',')

for (const id of users) {
  const bulletin = new Bulletin(id)
  await bulletin.readAll()
}




