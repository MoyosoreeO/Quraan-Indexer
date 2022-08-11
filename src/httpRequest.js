/* eslint-disable no-unused-vars */
export class HttpRequest {
  static async sendHttpRequest(number, type) {
    const response = await fetch(
      // eslint-disable-next-line quotes
      `https://api.alquran.cloud/v1/${type}/${number}/editions/quran-uthmani,en.asad,ar.alafasy`
    );
    const data = response.json();
    return data;
  }
}
