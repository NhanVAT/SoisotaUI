export class iFunction {
    storage: any = localStorage;
    dtThangNam: Date;

    getStorage(name: string): any {
        if (typeof (Storage) !== 'undefined') {
            if (this.storage.getItem(name)) {
                return this.storage.getItem(name);
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    setStorage(name: string, value: string) {
        if (typeof (Storage) !== 'undefined') {
            this.storage.setItem(name, value);
        }
    }

    //lấy giá trị cookies theo tên
    getCookie(name: string) {
        return localStorage.getItem(name);
    }

    deleteCookie(name: any) {
        this.setCookie(name, "", -1);
    }

    //Gán giá trị cho 1 cookie
    setCookie(name: string, value: string, expireDays: number, path: string = "") {
        let d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires: string = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
    }

    //Focus vào 1 control dạng input nào đó (y/c html base phải có hàm focus)
    setFocus(id: string) {
        var el = document.getElementById(id);
        if (el) {
            (<any>el).focus();
        }
    }

    //Chọn tất cả dòng text của 1 input nào đó (y/c html base phải có hàm select text)
    setSelect(id: string) {
        var el = document.getElementById(id);
        if (el) {
            (<any>el).select();
        }
    }

    getSystemDateByName(strPhanHe: String): any {
        let jsonArray = this.getSystemDate();
        if (jsonArray && jsonArray.length > 0) {
            let rt = {THANG: 1, NAM: 2017};
            for (let i = 0; i < jsonArray.length; i++) {
                if (strPhanHe == jsonArray[i]["PHAN_HE"]) {
                    rt.THANG = jsonArray[i]["THANG"];
                    rt.NAM = jsonArray[i]["NAM"];
                }

            }
            return rt;
        }
    }

    //đảo chọn trên lưới
    CheckReverse(lstSo: any[], arrSo: any[]) {
        for (let x of lstSo) {
            if (arrSo.length > 0) {
                if (arrSo.indexOf(x) < 0)
                    arrSo.push(x);
                else
                    arrSo.splice(arrSo.indexOf(x), 1);
            } else {
                arrSo.push(x);
            }
        }
    }

    baseCalendar_Blur(event: any) {
        let val = event.path[0].value.split('/');
        if (val.length == 2)
            this.dtThangNam = new Date(<number>val[1], <number>val[0] - 1, this.dtThangNam ? this.dtThangNam.getDate() : 1);
        else if (val.length == 3)
            this.dtThangNam = new Date(<number>val[2], <number>val[1] - 1, <number>val[0]);
        //Có thể bổ sung thêm hàm kiểm tra sai định dạng ở đây, để sau

    }

    baseCalendar_Select(event: any) {
        this.dtThangNam = event;
    }

    getUserInformation(): any {
        try {
            let strResult = this.getCookie("USER_INFO");
            if (strResult)
                var json = JSON.parse(strResult);
            return json;
        } catch (e) {
            console.log(e);
            let strReturn = [{
                "SUBDIVISIONID": "PC06AA",
                "SUBDIVISIONNAME": "",
                "SUBDIVISIONLEVEL": -1,
                "SUBDIVISIONID_U": "",
                "SUBDIVISIONNAME_U": "",
                "SUBDIVISIONLEVEL_U": -1,
                "USERID": 1,
                "USERNAME": "daotao",
                "PASSWORD": "****",
                "FULLNAME": "hoacua",
                "EMAIL": "hoacuat@yahoo.com.vn",
                "PHONE": "0422100106",
                "MOBILE": " ",
                "STATE": 0,
                "ISUSED": 2,
                "DEPT": "HNPC",
                "SESSIONID": "123456789"
            }];
            return strReturn;
        }
    }

    getSystemDate(): any[] {
        try {
            let strResult = this.getCookie("THANG_NAM_HT");
            if (strResult)
                var json = JSON.parse(strResult);
            return json;
        } catch (e) {
            console.log(e);
            let strReturn = [{"MA_DVIQLY": "PC06AA", "PHAN_HE": "CD", "THANG": 6, "NAM": 2017}];
            return strReturn;
        }
    }

    getSystemParam(): any[] {
        try {
            let strResult = this.getCookie("THAM_SO_HT");
            if (strResult)
                var json = JSON.parse(strResult);
            return json;
        } catch (e) {
            console.log(e);
            let strReturn = [{
                "NAME": "G_PHANHE_CHOTSL",
                "VALUE": "BC;BT;CN;HD;KH;TT;CD",
                "PHAN_HE": "AL"
            }, {"NAME": "G_INCHUNGRIENG", "VALUE": "R", "PHAN_HE": "HD"}];
            return strReturn;
        }
    }

    getMenuInfo(): any[] {
        try {
            let strResult = this.getCookie("MENU_INFO");
            if (strResult)
                var json = JSON.parse(strResult);
            return json;
        } catch (e) {
            console.log(e);
            let strReturn = [{
                "MENUID": 1,
                "HEADER": "Ghi chỉ số lập hóa đơn",
                "LIBID": -1,
                "MENU_PARAM": " ",
                "ORDERNUMBER": 0,
                "PARENTMENUID": 0,
                "NAMESPACE": "",
                "ASSEMBLYNAME": "",
                "LIBNAME": "",
                "PRJNAME": ""
            }];
            return strReturn;
        }
    }

    DocSoThanhChu(inumber: string): string {
        let strReturn = "";
        let s = inumber;
        while (s.length > 0 &&
        s.substring(0, 1) == "0") {
            s = s.substring(1);
        }
        console.log(s);
        let
            so = ["không",
                "một", "hai",
                "ba", "bốn",
                "năm", "sáu",
                "bảy", "tám",
                "chín"];
        let
            hang = ["",
                "nghìn", "triệu",
                "tỷ"];
        let
            i = 0;
        let
            j = 0;
        let
            donvi = 0;
        let
            chuc = 0;
        let
            tram = 0;
        let
            booAm = false;
        let
            decS = 0;
        decS = parseInt(s.toString());
        if (decS <
            0) {
            decS = -decS;
            booAm = true;
        }
        i = s.length;

        if (i == 0)
            strReturn = so[0] + strReturn;
        else {
            j = 0;
            while (i > 0) {
                donvi = parseInt(s.substr(i - 1, 1));
                i = i - 1;
                if (i > 0)
                    chuc = parseInt(s.substr(i - 1, 1));
                else
                    chuc = -1;
                i = i - 1;
                if (i > 0)
                    tram = parseInt(s.substr(i - 1, 1));
                else
                    tram = -1;
                i = i - 1
                if ((donvi > 0) || (chuc > 0) || (tram > 0) || (j == 3))
                    strReturn = hang[j] + strReturn;
                j = j + 1;
                if (j > 3)
                    j = 1;
                //Tránh lỗi, nếu dưới 13 số thì không có vấn đề.
                //Hàm này chỉ dùng để đọc đến 9 số nên không phải bận tâm
                if ((donvi == 1) && (chuc > 1))
                    strReturn = "mốt " + strReturn;
                else {
                    if ((donvi == 5) && (chuc > 0))
                        strReturn = "lăm " + strReturn;
                    else if (donvi > 0)
                        strReturn = so[donvi] + " " + strReturn;
                }
                if (chuc < 0)
                    break;//Hết số
                else {
                    if ((chuc == 0) && (donvi > 0))
                        strReturn = "linh " + strReturn;
                    if (chuc == 1)
                        strReturn = "mười " + strReturn;
                    if (chuc > 1)
                        strReturn = so[chuc] + " mươi " + strReturn;
                }
                if (tram < 0)
                    break;//Hết số
                else {
                    if ((tram > 0) || (chuc > 0) || (donvi > 0))
                        strReturn = so[tram] + " trăm " + strReturn;
                }
                strReturn = " " + strReturn;
            }
        }
        if (booAm)
            strReturn = "Âm " + strReturn;
        else if (strReturn.length > 0)
            strReturn = strReturn.trim();
        strReturn = strReturn.charAt(0).toUpperCase() + strReturn.substr(1).toLowerCase();
        return strReturn;
    }

    ConvertCurrencyToEnglish(inumber: string): string {
        let Temp: any;
        let Dollars = "", Cents: string = "";
        let DecimalPlace, Count: any;
        let Place: any[] = [];
        Place[0] = " ";
        Place[1] = " Thousand ";
        Place[2] = " Million ";
        Place[3] = " Billion ";
        Place[4] = " Trillion ";
        DecimalPlace = inumber.indexOf(".");
        if (DecimalPlace > 0) {
            let thapphan = inumber.substring(DecimalPlace + 1) + "00";
            Temp = this.Left(this.MidStart(inumber, DecimalPlace + 1) + "00", 2);
            Cents = this.ConvertTens(Temp);
            inumber = (this.Left(inumber, DecimalPlace)).trim();
        }
        Count = 0;
        while (inumber != "") {
            Temp = this.ConvertHundreds(this.Right(inumber, 3));
            if (Temp != "") {
                Dollars = Temp + Place[Count] + Dollars
            }
            if (inumber.length > 3) {
                inumber = this.Left(inumber, inumber.length - 3)
            } else {
                inumber = "";
            }
            Count = Count + 1;
        }
        if (Dollars == "") {
            Dollars = "No Dollars";
        }
        if (Dollars == "One") {
            Dollars = "One Dollar";
        } else {
            Dollars = Dollars + " Dollars";
        }
        if (Cents == "") {
            Cents = " And No Cents";
        } else if (Cents == "One") {
            Cents = " And One Cent";
        } else {
            Cents = " And " + Cents + " Cents";
        }
        return Dollars + Cents;
    }

    ConvertDollarsToVN(inumber: string): string {
        let Temp: any;
        let Dollars = "", Cents: string = "";
        let DecimalPlace, Count: any;
        let Place: any[] = [];
        Place[0] = " ";
        Place[1] = " nghìn ";
        Place[2] = " triệu ";
        Place[3] = " tỷ ";
        Place[4] = " nghìn tỷ ";
        DecimalPlace = inumber.indexOf(".");
        if (DecimalPlace > 0) {
            let thapphan = inumber.substring(DecimalPlace + 1) + "00";
            Temp = this.Left(this.MidStart(inumber, DecimalPlace + 1) + "00", 2);
            Cents = this.ConvertTensVN(Temp);
            inumber = (this.Left(inumber, DecimalPlace)).trim();
        }
        Count = 0;
        while (inumber != "") {
            Temp = this.ConvertHundredsVN(this.Right(inumber, 3));
            if (Temp != "") {
                Dollars = Temp + Place[Count] + Dollars
            }
            if (inumber.length > 3) {
                inumber = this.Left(inumber, inumber.length - 3)
            } else {
                inumber = "";
            }
            Count = Count + 1;
        }
        if (Dollars == "") {
            Dollars = "";
        }
        if (Dollars == "Một") {
            Dollars = "Một đô la Mỹ";
        } else {
            Dollars = Dollars + " đô la Mỹ";
        }
        if (Cents == "") {
            Cents = " ";
        } else if (Cents == "Một") {
            Cents = " và Một xen Mỹ";
        } else {
            Cents = " và " + Cents + " xen Mỹ";
        }
        return Dollars + Cents;
    }

    ConvertHundreds(MyNumber: string) {
        let Result: string = "";
        if (Number(MyNumber) == 0) return MyNumber;
        MyNumber = this.Right("000" + MyNumber, 3);
        if (this.Left(MyNumber, 1) != "0") {
            Result = this.ConvertDigit(this.Left(MyNumber, 1)) + " Hundred ";
        }
        if (this.MidStartEnd(MyNumber, 1, 1) != "0") {
            Result = Result + this.ConvertTens(this.MidStart(MyNumber, 1));
        } else {
            Result = Result + this.ConvertDigit(this.MidStart(MyNumber, 2));
        }
        return Result.trim();
    }

    ConvertHundredsVN(MyNumber: string) {
        let Result: string = "";
        if (Number(MyNumber) == 0) return MyNumber;
        MyNumber = this.Right("000" + MyNumber, 3);
        if (this.Left(MyNumber, 1) != "0") {
            Result = this.ConvertDigitVN(this.Left(MyNumber, 1)) + " Trăm ";
        }
        if (this.MidStartEnd(MyNumber, 1, 1) != "0") {
            Result = Result + this.ConvertTensVN(this.MidStart(MyNumber, 1));
        } else {
            Result = Result + this.ConvertDigitVN(this.MidStart(MyNumber, 2));
        }
        return Result.trim();
    }

    MidStartEnd(MyNumber: string, start: any, length: any) {
        return MyNumber.substr(start, length);
    }

    MidStart(MyNumber: string, start: any) {
        return MyNumber.substr(start);
    }

    PadRight(MyNumber: string, CharReplace: string, size: any) {
        if (MyNumber.length < size) {
            let temp = "";
            for (let j = 0; j < size - MyNumber.length; j++) {
                temp = temp + CharReplace;
            }
            return MyNumber + temp;
        } else {
            return MyNumber;
        }
    }

    PadLeft(MyNumber: string, CharReplace: string, size: any) {
        if (MyNumber.length < size) {
            let temp = "";
            for (let j = 0; j < size - MyNumber.length; j++) {
                temp = temp + CharReplace;
            }
            return temp + MyNumber;
        } else {
            return MyNumber;
        }
    }

    ConvertTens(MyTens: string) {
        let Result: string = "";
        if (Number(this.Left(MyTens, 1)) == 1) {
            let tempVal = Number(MyTens);
            if (tempVal == 10) Result = "Ten";
            if (tempVal == 11) Result = "Eleven";
            if (tempVal == 12) Result = "Twelve";
            if (tempVal == 13) Result = "Thirteen";
            if (tempVal == 14) Result = "Fourteen";
            if (tempVal == 15) Result = "Fifteen";
            if (tempVal == 16) Result = "Sixteen";
            if (tempVal == 17) Result = "Seventeen";
            if (tempVal == 18) Result = "Eighteen";
            if (tempVal == 19) Result = "Nineteen";
        } else {
            let tempVal = Number(this.Left(MyTens, 1));
            if (tempVal == 2) Result = "Twenty ";
            if (tempVal == 3) Result = "Thirty ";
            if (tempVal == 4) Result = "Forty ";
            if (tempVal == 5) Result = "Fifty ";
            if (tempVal == 6) Result = "Sixty ";
            if (tempVal == 7) Result = "Seventy ";
            if (tempVal == 8) Result = "Eighty ";
            if (tempVal == 9) Result = "Ninety ";
            Result = Result + this.ConvertDigit(this.Right(MyTens, 1));
        }
        return Result;
    }

    ConvertTensVN(MyTens: string) {
        let Result: string = "";
        if (Number(this.Left(MyTens, 1)) == 1) {
            let tempVal = Number(MyTens);
            if (tempVal == 10) Result = "Mười";
            if (tempVal == 11) Result = "Mười một";
            if (tempVal == 12) Result = "Mười hai";
            if (tempVal == 13) Result = "Mười ba";
            if (tempVal == 14) Result = "Mười bốn";
            if (tempVal == 15) Result = "Mười lăm";
            if (tempVal == 16) Result = "Mười sáu";
            if (tempVal == 17) Result = "Mười bảy";
            if (tempVal == 18) Result = "Mười tám";
            if (tempVal == 19) Result = "Mười chín";
        } else {
            let tempVal = Number(this.Left(MyTens, 1));
            if (tempVal == 2) Result = "Hai mươi ";
            if (tempVal == 3) Result = "Ba mươi ";
            if (tempVal == 4) Result = "Bốn mươi ";
            if (tempVal == 5) Result = "Năm mươi ";
            if (tempVal == 6) Result = "Sáu mươi ";
            if (tempVal == 7) Result = "Bảy mươi ";
            if (tempVal == 8) Result = "Tám mươi ";
            if (tempVal == 9) Result = "Chín mươi ";
            Result = Result + this.ConvertDigitVN(this.Right(MyTens, 1));
        }
        return Result;
    }

    Left(num: any, size: any) {
        if (size == 0) return "";
        return num.toString().substr(0, size);
    }

    Right(num: any, size: any) {
        if (size == 0) return "";
        if (num.toString().length < size) return num.toString();
        return num.toString().substr(num.toString().length - size, size);
    }

    ConvertDigit(MyDigit: any) {
        if (Number(MyDigit) == 1) return "One";
        if (Number(MyDigit) == 2) return "Two";
        if (Number(MyDigit) == 3) return "Three";
        if (Number(MyDigit) == 4) return "Four";
        if (Number(MyDigit) == 5) return "Five";
        if (Number(MyDigit) == 6) return "Six";
        if (Number(MyDigit) == 7) return "Seven";
        if (Number(MyDigit) == 8) return "Eight";
        if (Number(MyDigit) == 9) return "Nine";
        else return "";
    }

    ConvertDigitVN(MyDigit: any) {
        if (Number(MyDigit) == 1) return "Một";
        if (Number(MyDigit) == 2) return "Hai";
        if (Number(MyDigit) == 3) return "Ba";
        if (Number(MyDigit) == 4) return "Bốn";
        if (Number(MyDigit) == 5) return "Năm";
        if (Number(MyDigit) == 6) return "Sáu";
        if (Number(MyDigit) == 7) return "Bảy";
        if (Number(MyDigit) == 8) return "Tám";
        if (Number(MyDigit) == 9) return "Chín";
        else return "";
    }

    RemoveMark(s: string) {
        let chold: string = "";
        let chnew: string = "";
        if (s.length != 0) {
            let char1: string = "â, ă, ấ, ầ, ậ, ẫ, ẩ, ắ, ằ, ẵ, ẳ, ặ, á, à, ả, ã, ạ";
            let char2: string = "Â, Ă, Ấ, Ầ, Ậ, Ẫ, Ẩ, Ắ, Ằ, Ẵ, Ẳ, Ặ, Á, À, Ả, Ã, Ạ";
            let char3: string = "ó, ò, ỏ, õ, ọ, ô, ố, ồ, ổ, ỗ, ộ, ơ, ớ, ờ, ợ, ở, ỡ";
            let char4: string = "Ó, Ò, Ỏ, Õ, Ọ, Ô, Ố, Ồ, Ổ, Ỗ, Ộ, Ơ, Ớ, Ờ, Ợ, Ở, Ỡ";
            let char5: string = "ư, ứ, ừ, ự, ử, ữ, ù, ú, ủ, ũ, ụ";
            let char6: string = "Ư, Ứ, Ừ, Ự, Ử, Ữ, Ù, Ú, Ủ, Ũ, Ụ";
            let char7: string = "ê, ế, ề, ệ, ể, ễ, è, é, ẻ, ẽ, ẹ";
            let char8: string = "Ê, Ế, Ề, Ệ, Ể, Ễ, È, É, Ẻ, Ẽ, Ẹ";
            let char9: string = "í, ì, ị, ỉ, ĩ";
            let char10: string = "Í, Ì, Ỉ, Ĩ, Ị";
            let char11: string = "ý, ỳ, ỵ, ỷ, ỹ";
            let char12: string = "Ý, Ỳ, Ỵ, Ỷ, Ỹ";
            let char13: string = "đ";
            let char14: string = "Đ";
            let Char: string[] = [];
            Char.push(char1);
            Char.push(char2);
            Char.push(char3);
            Char.push(char4);
            Char.push(char5);
            Char.push(char6);
            Char.push(char7);
            Char.push(char8);
            Char.push(char9);
            Char.push(char10);
            Char.push(char11);
            Char.push(char12);
            Char.push(char13);
            Char.push(char14);
            for (let i = 0; i < s.length; i++) {
                chold = s.substr(i, 1);
                for (let k = 0; k <= 13; k++) {
                    if (Char[k].indexOf(chold) > -1 && chold.trim().length > 0) {
                        switch (k) {
                            case 0:
                                chnew = "a";
                                break;
                            case 1:
                                chnew = "A";
                                break;
                            case 2:
                                chnew = "o";
                                break;
                            case 3:
                                chnew = "O";
                                break;
                            case 4:
                                chnew = "u";
                                break;
                            case 5:
                                chnew = "U";
                                break;
                            case 6:
                                chnew = "e";
                                break;
                            case 7:
                                chnew = "E";
                                break;
                            case 8:
                                chnew = "i";
                                break;
                            case 9:
                                chnew = "I";
                                break;
                            case 10:
                                chnew = "y";
                                break;
                            case 11:
                                chnew = "Y";
                                break;
                            case 12:
                                chnew = "d";
                                break;
                            case 13:
                                chnew = "D";
                                break;
                        }
                        s = s.replace(chold, chnew);
                    }
                }
            }
            return s;
        } else {
            return s;
        }
    }

    FormatMonney(num: number) {
        var p = num.toFixed(2).split(".");
        return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
        }, "") + "." + p[1];
    }
}
