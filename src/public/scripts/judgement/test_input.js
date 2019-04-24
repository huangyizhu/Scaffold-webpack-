import Dom from 'dom';
import error from 'error';

const emojiRegex = require('emoji-regex');

//在[]内使用^以取反

class TestInput {
    constructor() {
        this.stuID = /^201[\d]{8}/;
        this.name = /^[\u4E00-\u9FA5]{2,5}$/;
        this.chinese = /[\u4e00-\u9fa5]/;
        this.nonChinese = /[^\u4e00-\u9fa5]*$/;
        this.number = /[0-9]*$/;
        this.nonNumber = /[^0-9]*$/;
        this.english = /[A-Za-z]+$/;
        this.nonEnglish = /^[A-Za-z]+$/;
        this.CNSymbol = /[^%&',;=?$\x22]/;
        this.nonCNSymbol = /^[^%&',;=?$\x22]/;
        this.emoji = emojiRegex();
        this.email = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        this.phone = /(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        this.phonePrefix = /^1[3|4|5|7|8][0-9]*$/;
        this.enterNotIndent = /^\r|\n\S$/;
    };
    testChinese(text) {
        if (this.chinese.test(text)) {
            return true;
        } else {
            return false;
        }
    };
    testNumber(text) {
        if (this.number.test(text)) {
            return true;
        } else {
            return false;
        }
    };
    testEnglish(text) {
        if (this.english.test(text)) {
            return true;
        } else {
            return false;
        }
    };
    testCNSymbol(text) {
        if (this.CNSymbol.test(text)) {
            return true;
        } else {
            return false;
        }
    };
    testPhone(text) {
        if (this.phone.test(text)) {
            return true;
        } else {
            return false;
        }
    };
    testLength(text, length) {
        if (text || length) {
            error(text + " or " + " is undefined");
        }
        return length >= text.length;
    }
    keepChinese(text) {
        if (typeof (text) !== 'string') {
            error(text + " is not a string");
        }
        return text.replace(this.nonChinese, "");
    }
    keepNumber(text) {
        if (typeof (text) !== 'string') {
            error(text + " is not a string");
        }
        return text.replace(this.nonNumber, "");
    }
    keepEnglish(text) {
        if (typeof (text) !== 'string') {
            error(text + " is not a string");
        }
        return text.replace(this.nonEnglish, "");
    }
    keepLength(text, length) {
        if (typeof (text) !== 'string') {
            error(text + " is not a string");
        }
        if (typeof (length) !== 'number') {
            error(length + " is not a number");
        }
        return text.substring(0, length + 1);
    }
    replace(text, regex) {
        if (typeof (text) !== 'string') {
            error(text + " is not a string");
        }

        if (typeof (regex) !== 'string') {
            error(regex + " is not a string");
        }
        return text.replace(regex, '');
    }
    notIllegal(text) {
        if (typeof (text) !== 'string') {
            error(text + " is not a string");
        }
        return text.replace(this.emoji, '');
    };
    addIndent(text) {
        if (typeof (text) !== 'string') {
            error(text + " is not a string");
        }
        return text.replace(this.enterNotIndent, '\n  ');
    };
    judgeStudentID(text, hintTag) {
        let errorType = "学号只能为纯数字",
            errorYear = "必须是在校学生",
            errorFormat = "学号格式错误",
            date = new Date(),
            year = date.getUTCFullYear(),
            month = date.getMonth() + 1,
            cardYear = text.substring(0, 4);
        if (hintTag && !hintTag instanceof Dom) {
            error(hintTag + " is not a instanceof Dom");
        }
        if (!this.number.test(text)) {
            if (hintTag) {
                hintTag.setValue(errorType);
            } else {
                alert(errorType);
            }
            return false;
        } else {
            cardYear = parseInt(cardYear);
            year = month < 9 ? year - 1 : year;
            if (!(year - 3 <= cardYear && cardYear <= year)) {
                errorYear = errorYear + (year - 3) + " ~ " + year;
                if (hintTag) {
                    hintTag.setValue(errorYear);
                } else {
                    alert(errorYear);
                }
                return false;
            }
        }
        if (!this.stuID.test(text)) {
            if (hintTag) {
                hintTag.setValue(errorFormat);
            } else {
                alert(errorFormat);
            }
            return false;
        } else {
            if (hintTag) {
                hintTag.setValue("");
            }
            return true;
        }
    }
    judgeName(text, hintTag) {
        const errorLength = "只能输入完整姓名,两个字到四个字",
            errorType = "姓名必须为中文";
        if (hintTag && !hintTag instanceof Dom) {
            error(hintTag + " is not a instanceof Dom");
        }
        if (text.length < 2 || text.length > 4) {
            if (hintTag) {
                hintTag.setValue(errorLength);
            } else {
                alert(errorLength);
            }
            return false;
        } else {
            if (!this.name.test(text)) {
                if (hintTag) {
                    hintTag.setValue(errorType);
                } else {
                    alert(errorType);
                }
                return false;
            } else {
                if (hintTag) {
                    hintTag.setValue("");
                }
                return true
            }
        }
    };
    judgePhone(text, hintTag) {
        const errorType = "手机号必须纯数字",
            errorFormat = "手机号码格式错误，请重新输入";
        if (hintTag && !hintTag instanceof Dom) {
            error(hintTag + " is not a instanceof Dom");
        }
        if (!this.number.test(text)) {
            if (hintTag) {
                hintTag.setValue(errorType);
            } else {
                alert(errorType);
            }
            return false;
        } else if (text.length >= 3 && !this.phonePrefix.test(text)) {
            if (hintTag) {
                hintTag.setValue(errorFormat);
            } else {
                alert(errorFormat);
            }
            return false;
        } else if (this.phone.test(text)) {
            if (hintTag) {
                hintTag.setValue("");
            }
            return true;
        } else {
            if (hintTag) {
                hintTag.setValue("");
            }
        }
    };
    judgeEmail(text, hintTag) {
        const errorType = "邮箱格式错误，请重新输入";
        if (hintTag && !hintTag instanceof Dom) {
            error(hintTag + " is not a instanceof Dom");
        }
        if (!this.email.test(text)) {
            if (hintTag) {
                hintTag.setValue(errorType);
            } else {
                alert(errorType);
            }
            return false;
        } else if (this.email.test(text)) {
            if (hintTag) {
                hintTag.setValue("");
            }
            return true;
        } else {
            if (hintTag) {
                hintTag.setValue("");
            }
        }
    };
}

export default new TestInput()