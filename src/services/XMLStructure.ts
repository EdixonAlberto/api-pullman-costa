class XMLStructure {
  constructor(private credential: TCredential) {}

  create(params?: { [key: string]: string | number }): string {
    let XMLParams = ''

    if (params) {
      for (const key in params) {
        const value = params[key]
        XMLParams += `<${key}>${value}</${key}>`
      }
    } else XMLParams = ''

    const xml = /* XML */ `
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ciudades>
      <user>${this.credential.user}</user>
      <password>${this.credential.password}</password>
      ${XMLParams}
    </ciudades>
  </soap:Body>
</soap:Envelope>`

    return xml.trim()
  }
}

export { XMLStructure }
