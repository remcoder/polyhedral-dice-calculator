
var size = 5;
var delay = 90;

function draw(pixel, dx, dy) {
    var ctx = $('canvas')[0].getContext('2d');
    var x = pixel.x * (size+1);
    var y = pixel.y * (size+1);
    ctx.fillRect(dx+x,dy+y,size,size);
}

function groupChars(pixels) {
    pixels.forEach(function(p) { p.charIndex = Math.floor(p.x / 9) ; });
    return _.groupBy(pixels, 'charIndex');
}


function intro() {
    pxxl('/fonts/tektite.bdf', 'RPG Dice', function (pixels) {

        var chars = groupChars(pixels);

        Object.keys(chars).forEach(function (c, i) {
            setTimeout(function () {
                chars[c].forEach(function (pixel) {
                    draw(pixel, 90, 40);
                });
            }, delay * (1 + i));
        });

    });

    size = 5;

    pxxl('/fonts/tektite.bdf', 'Calculator', function (pixels) {


        var chars = groupChars(pixels);

        Object.keys(chars).forEach(function (c, i) {
            setTimeout(function () {
                chars[c].forEach(function (pixel) {
                    draw(pixel, 20, 160);
                });
            }, delay * (12 + i));
        });

    });

    setTimeout(function () {

        $('canvas')[0].getContext('2d').clearRect(0, 0, 600, 300);
    }, 3000)
}

this.intro = intro;

