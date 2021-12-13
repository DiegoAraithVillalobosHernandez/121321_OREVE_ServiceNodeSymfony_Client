
const checkNotifications = (d1 , d2) => {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let flag = false;

    let d1d = parseInt(date1.getDate(), 10);
    let d1m = parseInt((date1.getMonth() + 1), 10);
    let d1y = parseInt(date1.getFullYear(), 10);
    let d2d = parseInt(date2.getDate(), 10);
    let d2m = parseInt((date2.getMonth() + 1), 10);
    let d2y = parseInt(date2.getFullYear(), 10);

    if(d1m == d2m && d1y == d2y){
        let res = d2d - d1d;

        if(res >= 0 && res <= 3){
            flag = true;
        }
    }

    return flag;
}