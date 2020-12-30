export class Utility {
    public static changeinLastTwoDays(oldNum: number, newNum: number) {
        const percentage = (newNum - oldNum) / oldNum * 100;
        return Number(percentage.toFixed(2));
    }
    public static getLast7Days(X = 8) {
        var dates = [];
        for (let I = 0; I < Math.abs(X); I++) {
            dates.push(Utility.getCombinedDate(new Date(new Date().getTime() - ((X >= 0 ? I : (I - I - I)) * 24 * 60 * 60 * 1000))));
        }
        return dates.reverse().slice(0, dates.length - 1);
    }
    public static getCombinedDate(date: Date) {
        return `${Utility.getMonth(date.getMonth())}'${date.getDate()}`;
    }
    public static getMonth(month: number) {
        switch(month) {
            case 0:
                return 'Jan';
            case 1:
                return 'Feb';
            case 2:
                return 'Mar';
            case 3:
                return 'Apr';
            case 4:
                return 'May';
            case 5:
                return 'Jun';
            case 6:
                return 'Jul';
            case 7:
                return 'Aug';
            case 8:
                return 'Sept';
            case 9:
                return 'Oct';
            case 10:
                return 'Nov';
            case 11:
                return 'Dec'; 
        }
    }
}