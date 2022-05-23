import { createApp } from 'vue'

createApp({
  data() {
    return {
      one: [],
      searchquery: '',
      sends: false,
      count: 0,
    }
  },
  methods: {
    btn(event) {
      this.count = event.target.value //смена табов, выбора услуг
      this.push()
    },
    async push() {
      try {
        let send = this.searchquery //значение запроса из импута
        let requestURL =
          'https://corporate-marketing-backend.skyeng.ru/landing/public/v2/prices/by-preferred-link/' +
          send
        const response = await axios.get(requestURL) // запрос на сервер через axios
        const arr = response.data.data //фильтр массива по клчам
        const newArr = arr.filter(
          (el) =>
            el.serviceTypeKey == 'english_adult_not_native_speaker' ||
            el.serviceTypeKey == 'english_adult_native_speaker' ||
            el.serviceTypeKey == 'english_adult_not_native_speaker_premium' ||
            el.serviceTypeKey ==
              'english_adult_not_native_speaker_partial_auto_lesson'
        ) //динамическое изменение карточек
        this.one = newArr[this.count].positions
        this.sends = true
      } catch (e) {
        console.error(e)
        alert('Вы точно написали верный запрос?')
      }
    },
    declOfNum(n, text_forms) {
      n = Math.abs(n) % 100
      var n1 = n % 10
      if (n > 10 && n < 20) {
        return text_forms[2]
      }
      if (n1 > 1 && n1 < 5) {
        return text_forms[1]
      }
      if (n1 == 1) {
        return text_forms[0]
      }
      return text_forms[2]
    },
  },
}).mount('#app')
