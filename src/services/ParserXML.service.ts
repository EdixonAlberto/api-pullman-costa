import xml2js from 'xml2js'

class ParserXMLService {
  constructor(
    private parser: xml2js.Parser = new xml2js.Parser({
      trim: true, // Trim the whitespace at the beginning and end of text nodes.
      ignoreAttrs: true, // Ignore all XML attributes and only create text nodes.
      explicitArray: false //  Always put child nodes in an array if true; otherwise an array is created only if there is more than one.
    })
  ) {}

  private getAttr(endpoint: string): string {
    const start: number = endpoint.search(/\_/) + 1
    const end: number = endpoint.search(/\./)

    let attr: string = endpoint.substring(start, end)
    attr = `${attr}Response`

    return attr
  }

  public async js(xml: string, endpoint: string): Promise<object & TErrorSOAP> {
    const attr = this.getAttr(endpoint)

    const json = await this.parser.parseStringPromise(xml)
    const body = json['SOAP-ENV:Envelope']['SOAP-ENV:Body']
    const response = body[`ns1:${attr}`].return
    const js = JSON.parse(response)

    return js
  }

  public xml(params?: object): string {
    const { user, password } = global.config.credential
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
      <user>${user}</user>
      <password>${password}</password>
      ${XMLParams}
    </ciudades>
  </soap:Body>
</soap:Envelope>`

    return xml.trim()
  }
}

export { ParserXMLService }
