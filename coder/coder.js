class Reader {
  constructor(array) {
    this.buffer = new Uint8Array(array).buffer
    this.length = new Uint8Array(array).length
    this.view = new DataView(this.buffer)
    this.offset = 0
  }
  u8() {
    const val = this.view.getUint8(this.offset)
    this.offset += 1
    return val
  }
  u16() {
    const val = this.view.getUint16(this.offset, true)
    this.offset += 2
    return val
  }
  u32() {
    const val = this.view.getUint32(this.offset, true)
    this.offset += 4
    return val
  }
  i8() {
    const val = this.view.getInt8(this.offset)
    this.offset += 1
    return val
  }
  i16() {
    const val = this.view.getInt16(this.offset, true)
    this.offset += 2
    return val
  }
  i32() {
    const val = this.view.getInt32(this.offset, true)
    this.offset += 4
    return val
  }
  f32() {
    const val = this.view.getFloat32(this.offset, true)
    this.offset += 4
    return val
  }
  f64() {
    const val = this.view.getFloat64(this.offset, true)
    this.offset += 8
    return val
  }
  string() {
    let finishedString = ""

    while (true) {
      const currentCharCode = this.u16();
      if (currentCharCode === 0) break // keep going until a null char

      finishedString += String.fromCharCode(currentCharCode)
    }

    return finishedString
  }
}

class Writer {
  constructor() {
    this.arraybuffer = new ArrayBuffer(4096);
    this.view = new DataView(this.arraybuffer);
    this.offset = 0;
  }
  u8(value) {
    this.view.setUint8(this.offset, value);
    this.offset += 1;
  }
  u16(value) {
    this.view.setUint16(this.offset, value, true);
    this.offset += 2;
  }
  u32(value) {
    this.view.setUint32(this.offset, value, true);
    this.offset += 4;
  }
  i8(value) {
    this.view.setInt8(this.offset, value);
    this.offset += 1;
  }
  i16(value) {
    this.view.setInt16(this.offset, value, true);
    this.offset += 2;
  }
  i32(value) {
    this.view.setUint32(this.offset, value, true);
    this.offset += 4;
  }
  f32(value) {
    this.view.setFloat32(this.offset, value, true);
    this.offset += 4;
  }
  f64(value) {
    this.view.setFloat64(this.offset, value, true);
    this.offset += 8;
  }
  string(value) {
    for (let i = 0; i < value.length; i++) this.u16(value.charCodeAt(i));
    this.u16(0);
  }
  get packet() {
    return new Uint8Array(this.arraybuffer).slice(0, this.offset).buffer;
  }
}

module.exports = { Reader, Writer };