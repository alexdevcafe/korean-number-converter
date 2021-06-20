class Converter {
  constructor({ num = '', showLog = false }) {
    this.number = num.toString().split('').reverse();
    this.showLog = showLog;
  }

  koNumbers = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  smallUnits = ['', '십', '백', '천'];
  bigUnits = ['', '만', '억', '조'];

  output = [];
  log = [];
  visitedBigIndex = [];

  printLog() {
    if (!this.showLog) return;
    console.table(this.log);
  }

  stripTemp(curKoNum, index) {
    return index === 0 ? curKoNum : curKoNum === '일' ? '' : curKoNum;
  }

  run() {
    this.number.forEach((curDigit, index) => {
      const curKoNum = this.koNumbers[Number(curDigit)];
      const smIndex = index % 4;
      const bigIndex = Math.floor(index / 4);
      let temp = '';

      if (curKoNum) {
        temp = this.stripTemp(curKoNum, index) + this.smallUnits[smIndex];
        if (!this.visitedBigIndex[bigIndex]) {
          this.visitedBigIndex[bigIndex] = 1;
          temp += this.bigUnits[bigIndex];
        }
      }

      this.output = [temp, ...this.output];
      this.log.push({
        curDigit: Number(curDigit),
        curKoNum,
        smIndex,
        smallUnit: this.smallUnits[smIndex],
        bigIndex,
        bigUnit: this.bigUnits[bigIndex],
        temp,
        output: this.output.join(''),
      });
    });
    this.printLog();
    return this.output.join('');
  }
}

module.exports = Converter;
