window.utils = {
  xx: (date) => {
    const format = new Intl.DateTimeFormat('zh-Hans-CN', {
      calendar: 'chinese',
      timeZone: 'Asia/Shanghai'
    })
    format.format(date)
  }
}