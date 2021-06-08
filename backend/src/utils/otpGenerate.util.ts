export class OTP {
  private static digits = '0123456789';

  private static genRandomInt(max: number): number {
    const random = Math.random();
    return Math.floor(random * (max - 0) + 0);
  }

  static createOtp(length = 5): string {
    let otp = '';
    while (otp.length < length) {
      const charIndex = this.genRandomInt(this.digits.length);
      otp += this.digits[charIndex];
    }
    return otp;
  }
}
