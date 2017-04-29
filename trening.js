$(document).ready(function () {
    var tt = new Test();
    tt.GetData().done(function (x) { console.log(x); });
});
class Test {
    constructor() {
        $('#board').click();
    }
    GetData() {
        var dfr = $.Deferred();
        setTimeout(function () { dfr.resolve(true); }, 5000);
        return dfr.promise();
    }
}
//# sourceMappingURL=trening.js.map